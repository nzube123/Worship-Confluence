"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote: "Worship Confluence is a sacred reset for every worship leadership team.",
    name: "Pastor Hannah, New Hope Church",
  },
  {
    quote: "The environment of glory and teaching moved me deeply.",
    name: "Deacon Samuel, Grace Collective",
  },
  {
    quote: "Intense praise + prophetic word gave me next-level clarity.",
    name: "Elder Maria, River of Life",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-4xl rounded-2xl border border-white/20 bg-black/35 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Testimonials</h3>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/10"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            Prev
          </button>
          <button
            className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/10"
            onClick={next}
            aria-label="Next testimonial"
          >
            Next
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-white/20 bg-purple-950/70 p-6 text-sm"
        >
          <p className="leading-relaxed text-indigo-100">“{item.quote}”</p>
          <p className="mt-4 text-right text-xs text-purple-200">- {item.name}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
