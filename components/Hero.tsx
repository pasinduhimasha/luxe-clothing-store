"use client";

import { useEffect, useRef } from "react";

export default function Hero() {

  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleScroll = () => {

      const scrollY = window.scrollY;

      if (bgRef.current) {
        bgRef.current.style.transform =
          `translateY(${scrollY * 0.35}px) scale(1.1)`;
      }

      if (textRef.current) {
        textRef.current.style.transform =
          `translateY(${scrollY * 0.2}px)`;
      }

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
   <section className="relative h-screen overflow-hidden mt-[65px] md:mt-[85px]">

      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: "url('/hero.jpg')"
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Content */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6 transition-transform duration-300"
      >

        <h1 className="text-6xl md:text-9xl tracking-[22px] font-extralight">
          LUXE CLOTING
        </h1>

        <p className="mt-8 text-white/60 max-w-xl tracking-widest text-sm md:text-base">
          Premium cinematic clothing experience
        </p>

      </div>

    </section>
  );
}