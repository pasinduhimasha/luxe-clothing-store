"use client";

import { useEffect, useState } from "react";
import ShopNavbar from "@/components/ShopNavbar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

export default function CartPage() {

  const user = useAuth();
  const [cart, setCart] = useState<any[]>([]);

  async function loadCart() {

    if (!user) return;

    const { data } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user.id);

    setCart(data || []);
  }

  useEffect(() => {
    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, [user]);

  // ⭐ Checkout
  async function checkout(items: any[]) {

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        amount: totalAmount,
        name: items.length === 1 ? items[0].name : "Cart Payment"
      })
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

 

  async function payAll() {
    checkout(cart);
  }

  async function removeItem(id: string) {

    await supabase
      .from("carts")
      .delete()
      .eq("id", id);

    loadCart();
    window.dispatchEvent(new Event("storage"));
  }

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">

      <ShopNavbar />

      <div className="px-6 md:px-20 py-28">

        <h1 className="text-5xl tracking-[10px] text-center font-extralight mb-16">
          YOUR CART
        </h1>

        {cart.length === 0 && (
          <p className="text-center text-white/50">
            Your cart is empty
          </p>
        )}

        {cart.length > 0 && (

          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

            <div className="md:col-span-2 space-y-6">

              {cart.map(item => (

                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl transition duration-300 shadow-lg"
                >

                  <div className="flex gap-6 items-center">

                    <img
                      src={item.image}
                      className="w-24 h-24 object-cover rounded-xl shadow-md"
                    />

                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>

                      <p className="text-white/60">
                        RS {item.price.toLocaleString("en-LK")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">

                  

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-fit sticky top-24 shadow-xl">

              <h2 className="text-xl tracking-wider mb-6">
                ORDER SUMMARY
              </h2>

              <div className="flex justify-between text-white/70 mb-4">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-2xl mb-8">
                <span>Total</span>
                <span>RS {total.toLocaleString("en-LK")}</span>
              </div>

              <button
                onClick={payAll}
                className="w-full bg-white text-black py-4 rounded-full hover:bg-gray-200 transition shadow-xl font-medium"
              >
                Pay All Items
              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}