"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/login"
      }
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Check your email to confirm registration!");
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <div className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-10 space-y-6">

        <h2 className="text-4xl font-extralight tracking-[12px] text-center">
          REGISTER
        </h2>

        <input
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-black/40 border border-white/10"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-black/40 border border-white/10"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-full hover:bg-gray-200 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button
          onClick={()=>router.push("/login")}
          className="w-full border border-white/20 py-3 rounded-full hover:bg-white/10 transition"
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}