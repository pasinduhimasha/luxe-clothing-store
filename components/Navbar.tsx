"use client";

import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Latest", link: "/#latest" },
    { name: "Top Selling", link: "/#topselling" },
    { name: "Categories", link: "/#categories" },
  ];

  // Load Cart Count
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

  // Welcome Popup
  useEffect(() => {

    if (user && pathname === "/") {

      const popupShown = sessionStorage.getItem("luxe_shop_popup");

      if (!popupShown) {
        setShowPopup(true);
        sessionStorage.setItem("luxe_shop_popup", "true");

        setTimeout(() => setShowPopup(false), 4000);
      }
    }

  }, [user, pathname]);

  async function logout() {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();

    setShowLogoutConfirm(false);
    setMobileOpen(false);
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-5">

          {/* Logo */}
          <Link href="/" className="tracking-[8px] font-light text-2xl text-white">
            LUXE
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="relative text-white/70 hover:text-white transition group"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}

                <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
              </Link>
            ))}

            {user ? (
              <>
                <Link href="/shop" className="relative text-white/70 hover:text-white transition group">
                  Shop
                </Link>

                <Link href="/cart" className="relative flex items-center text-white/70 hover:text-white transition group">
                  <div className="relative">
                    <ShoppingCart size={20} />

                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="px-6 py-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/20 transition backdrop-blur-xl"
                >
                  Logout
                </button>

              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 rounded-full border border-white/30 text-white hover:bg-white/20 transition backdrop-blur-xl"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-5 uppercase tracking-wider text-sm">

            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.link}
                className="block text-white/70 hover:text-white transition"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {user && (
              <>
                <Link href="/shop" className="block text-white/70 hover:text-white transition">
                  Shop
                </Link>

                <Link href="/cart" className="flex items-center gap-2 text-white/70 hover:text-white transition">
                  <ShoppingCart size={18}/>
                  Cart ({cartCount})
                </Link>

                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full text-left text-red-400 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <Link
                href="/login"
                className="block text-white hover:text-white transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* ⭐ Welcome Popup */}
      {showPopup && user && (
        <div className="fixed top-20 right-6 bg-black/80 backdrop-blur-xl border border-white/10 text-white px-6 py-3 rounded-xl shadow-2xl z-50 text-sm">
          ✨ Welcome! Now you can shop with LUXE
        </div>
      )}

      {/* ⭐ Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-[320px] text-center shadow-2xl">

            <h2 className="text-lg tracking-wider mb-3">
              Logout
            </h2>

            <p className="text-white/70 text-sm mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="px-5 py-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/20 transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}