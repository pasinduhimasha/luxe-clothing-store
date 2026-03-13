"use client";

import { motion } from "framer-motion";

export default function StorySection() {

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-40">

      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extralight tracking-[14px]"
      >
        LUXE STORY
      </motion.h2>

      <p className="mt-10 max-w-2xl text-white/60 leading-loose">
        LUXE represents modern luxury clothing experience.
        Our collection is designed for cinematic lifestyle fashion.
        Minimal, premium, and timeless design philosophy.
      </p>

    </section>
  );
}