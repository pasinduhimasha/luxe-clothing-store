"use client";

import { useState } from "react";
import ShopNavbar from "@/components/ShopNavbar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

type Product = {
  name: string;
  category: string;
  price: number;
  image: string;
};

export default function ShopPage() {

  const user = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products: Product[] = [
    {
      name: "Black Jacket",
      category: "Jackets",
      price: 4500,
      image: "jaket2.png"
    },
    {
      name: "White Hoodie",
      category: "Hoodies",
      price: 3200,
      image: "hoodies.png"
    },
    {
      name: "Classic T-Shirt",
      category: "T-Shirts",
      price: 4000,
      image: "tshirt.png"
    },
    {
      name: "Luxury Pants",
      category: "Pants",
      price: 6300,
      image: "pants2.png"
    }
  ];

  async function addToCart(product: Product) {

    if (!user) {
      alert("Login first");
      return;
    }

    const { error } = await supabase.from("carts").insert([
      {
        user_id: user.id,
        name: product.name,
        price: product.price,
        image: product.image
      }
    ]);

    if (error) {
      alert("Error adding to cart");
      return;
    }

    window.dispatchEvent(new Event("storage"));
    alert("Added to cart");
  }

  const categories = ["All", "Jackets", "Hoodies", "T-Shirts", "Pants"];

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (

    <div className="min-h-screen bg-black text-white">

      <ShopNavbar />

      <h1 className="text-5xl tracking-[10px] text-center mt-20 mb-14">
        SHOP
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-6 mb-14 flex-wrap">

        {categories.map(cat => (

          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 border rounded-full transition ${
              selectedCategory === cat
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            {cat}
          </button>

        ))}

      </div>

      {/* Products */}
      <div className="grid md:grid-cols-3 gap-8 px-10 max-w-6xl mx-auto">

        {filtered.map((product, index) => (

          <div key={index} className="bg-white/5 p-6 rounded-xl">

            <img
              src={product.image}
              className="h-48 w-full object-cover rounded-xl"
            />

            <h3 className="mt-4 text-lg">{product.name}</h3>

            <p className="text-white/60">Rs. {product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-white text-black py-2 rounded-full mt-4 hover:bg-gray-200 transition"
            >
              Add To Cart
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}