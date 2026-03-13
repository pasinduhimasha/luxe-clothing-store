"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

export default function ShopNavbar() {

  const user = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load cart count
  async function loadCart() {

    if (!user) return;

    const { count } = await supabase
      .from("carts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setCartCount(count || 0);
  }

  useEffect(() => {

    loadCart();

    const handler = () => loadCart();

    window.addEventListener("storage", handler);

    return () => window.removeEventListener("storage", handler);

  }, [user]);

  return (
    <>
      <nav className="backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 lg:px-10 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="tracking-[8px] font-light text-2xl text-white hover:opacity-80 transition"
        >
          LUXE
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm uppercase tracking-wider items-center">

          {/* Home */}
          <Link href="/" className="relative group text-white/70 hover:text-white transition duration-300">
            Home
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Shop */}
          <Link href="/shop" className="relative group text-white/70 hover:text-white transition duration-300">
            Shop
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative group text-white/70 hover:text-white transition duration-300">

            <div className="relative flex items-center">
              <ShoppingCart size={18} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </div>

            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>

          </Link>

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl bg-black/90 border-b border-white/10 px-6 py-6 space-y-6 uppercase tracking-wider text-sm">

          <Link href="/" className="block text-white/70 hover:text-white transition" onClick={()=>setMobileOpen(false)}>
            Home
          </Link>

          <Link href="/shop" className="block text-white/70 hover:text-white transition" onClick={()=>setMobileOpen(false)}>
            Shop
          </Link>

          <Link href="/cart" className="flex items-center gap-2 text-white/70 hover:text-white transition" onClick={()=>setMobileOpen(false)}>
            <ShoppingCart size={18}/>
            Cart ({cartCount})
          </Link>

        </div>
      )}
    </>
  );
}