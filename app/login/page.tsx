"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ========================
  // Email Login
  // ========================
  async function login() {

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  // ========================
  // Google Login
  // ========================
  async function googleLogin() {

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 pt-24">

        <div className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-10 space-y-6 shadow-2xl">

          {/* Title */}
          <h2 className="text-4xl font-extralight tracking-[14px] text-center">
            LUXE
          </h2>

          <p className="text-center text-white/50 text-sm">
            Premium shopping experience
          </p>

          {/* Email Input */}
          <input
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-white/30 transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-white/30 transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <button
            disabled={loading}
            onClick={login}
            className="w-full bg-white text-black py-3 rounded-full hover:bg-gray-200 transition font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Navigation */}
          <button
            onClick={() => router.push("/register")}
            className="w-full border border-white/20 py-3 rounded-full hover:bg-white/10 transition"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-white/30 text-sm">
            <div className="flex-1 h-[1px] bg-white/10"></div>
            <span>OR</span>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={googleLogin}
            className="w-full border border-white/20 py-3 rounded-full hover:bg-white/10 transition flex justify-center"
          >
            Continue with Google
          </button>

        </div>
      </div>
    </>
  );
}