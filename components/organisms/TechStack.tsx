"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/data/tech-stack";

export function TechStack() {
  const doubled = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-soft"
      >
        Powered by Elite Tech Stack
      </motion.p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-pearl to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-lavender-snow to-transparent" />
        {/* Marquee berhenti saat hover agar logo bisa diamati */}
        <div className="flex w-max animate-marquee-fast gap-6 hover:[animation-play-state:paused]">
          {doubled.map((tech, i) => (
            <span
              key={`${tech.name}-${i}`}
              className="flex shrink-0 cursor-default items-center gap-2.5 rounded-2xl border border-white/80 bg-white/60 px-5 py-3 text-sm font-bold text-navy shadow-glass backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-vivid-purple/30 hover:shadow-glass-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt={`${tech.name} logo`}
                loading="lazy"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
