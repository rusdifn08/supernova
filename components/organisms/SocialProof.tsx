"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SOCIAL_PROOF_BUSINESSES } from "@/data/social-proof";

export function SocialProof() {
  const doubled = [...SOCIAL_PROOF_BUSINESSES, ...SOCIAL_PROOF_BUSINESSES];

  return (
    <section className="relative py-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-soft"
      >
        Trusted by 50+ Businesses in Indonesia
      </motion.p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-pearl to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-lavender-snow to-transparent" />
        <div className="flex w-max animate-marquee gap-10">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide text-navy/30 grayscale transition hover:text-navy/60 hover:grayscale-0"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
