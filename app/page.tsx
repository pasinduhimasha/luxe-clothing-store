"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";





export default function Home() {

  const router = useRouter();
  const user = useAuth();

  function handleClick() {
    if (user) {
      router.push("/shop");
    } else {
      router.push("/login");
    }
  }

  

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden scroll-smooth">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

  {/* ================= OUR LATEST DROPS ================= */}
<section id="latest" className="py-24 px-6 lg:px-20 text-center">

  <h2 className="text-5xl md:text-6xl font-extralight tracking-[12px] mb-20">
    OUR LATEST DROPS
  </h2>

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

    {[
      "tshirts.png",
      "hoodies3.png",
      "tshirts2.png"
    ].map((image, index) => (

      <div
        key={index}
        className="relative rounded-2xl overflow-hidden group"
      >

        <img
          src={image}
          alt="Latest Drop"
          className="w-full h-[360px] object-contain
                     transition duration-700 ease-out
                     group-hover:scale-105"
        />

      </div>

    ))}

  </div>

</section>


{/* ================= TOP SELLING ================= */}
<section id="topselling" className="py-24 px-6 lg:px-20 text-center">

  <h2 className="text-5xl md:text-6xl font-extralight tracking-[12px] mb-20">
    TOP SELLING
  </h2>

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

    {[
      "jacket.png",
      "hoodies2.png",
      "pants.png"
    ].map((image, index) => (

      <div
        key={index}
        className="relative rounded-2xl overflow-hidden group"
      >

        <img
          src={image}
          alt="Top Selling"
          className="w-full h-[360px] object-contain
                     transition duration-700 ease-out
                     group-hover:scale-105"
        />

      </div>

    ))}

  </div>

</section>

    {/* ================= MODERN HERO ================= */}
<section className="relative h-[85vh] w-full overflow-hidden">

  {/* Background Image */}
  <img
    src="/hero2.png"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />

  {/* Better Gradient Overlay (more premium) */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

  {/* Content */}
  <div className="relative z-10 h-full flex items-center px-6 lg:px-20">

    <div className="max-w-3xl space-y-6">

      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-[8px] leading-tight">
        FIND CLOTHES THAT
        <br />
        MATCH YOUR STYLE
      </h1>

      <p className="text-white/70 max-w-lg text-sm md:text-base">
        Explore our curated collection of premium clothing designed to elevate your wardrobe.
      </p>

      <div className="pt-4">
      <button
        onClick={handleClick}
        className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/20 transition duration-300"
      >
        SHOP NOW
      </button>
    </div>

    </div>

  </div>
</section>
      {/* ================= CATEGORIES ================= */}
          <section id="categories" className="py-32 px-6 lg:px-20 text-center">

        <h2 className="text-5xl md:text-6xl font-extralight tracking-[12px] mb-20">
          CATEGORIES
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {/* LEFT VERTICAL CARD */}
          <div className="row-span-2 relative h-[600px] rounded-3xl overflow-hidden group">

            <img
              src="tshirt.png"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-3xl font-light tracking-widest">
                T-SHIRTS
              </h3>
            </div>

          </div>

    {/* TOP HORIZONTAL CARD */}
    <div className="relative h-[280px] rounded-3xl overflow-hidden group">

      <img
        src="ACCESSORIES.png"
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-2xl font-light tracking-widest">
           ACCESSORIES 
        </h3>
      </div>

    </div>

    {/* RIGHT VERTICAL CARD */}
    <div className="row-span-2 relative h-[600px] rounded-3xl overflow-hidden group">

      <img
        src="hoodies.png"
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-3xl font-light tracking-widest">
          HOODIES
        </h3>
      </div>

    </div>

    {/* BOTTOM HORIZONTAL CARD */}
    <div className="relative h-[280px] rounded-3xl overflow-hidden group">

      <img
        src="pants2.png"
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-2xl font-light tracking-widest">
          PANTS
        </h3>
      </div>

    </div>

  </div>

</section>
      {/* EXISTING STORY + FOOTER */}
      <StorySection />
      <Footer />

    </main>
  );
}