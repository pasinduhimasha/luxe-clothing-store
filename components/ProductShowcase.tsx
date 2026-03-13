"use client";

import { motion } from "framer-motion";

export default function ProductShowcase() {

  return (
    <section className="py-40 px-6">

      <h2 className="text-center text-4xl md:text-6xl font-extralight tracking-[12px] mb-20">
        COLLECTION
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {[1,2,3].map((item) => (

          <motion.div
            key={item}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 rounded-3xl p-6 backdrop-blur-sm"
          >

            <img
              src="/hero.jpg"
              className="rounded-2xl mb-6"
            />

            <h3 className="text-xl mb-2">LUXE Product</h3>

            <p className="text-white/50 text-sm">
              Premium fashion clothing design.
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}