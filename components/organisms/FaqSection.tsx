"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ShimmerText } from "@/components/atoms/ShimmerText";
import { GlassCard } from "@/components/molecules/GlassCard";
import { SectionPlatformIcons } from "@/components/molecules/SectionPlatformIcons";
import { springReveal, staggerContainer } from "@/config/animation-variants";
import { FAQS } from "@/data/faq";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

    return (
    <section id="faq" className="relative mx-auto max-w-3xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "-right-[20%] top-[10%]",
          "-left-[22%] top-[45%]",
          "-right-[15%] bottom-[15%]",
        ]}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-10 text-center"
      >
        <motion.span
          variants={springReveal}
          className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-electric-cyan"
        >
          FAQ
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl"
        >
          Pertanyaan yang Sering{" "}
          <ShimmerText>Muncul</ShimmerText>
        </motion.h2>
      </motion.div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <GlassCard key={i} className="overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="pr-4 font-heading text-sm font-semibold text-navy sm:text-base">
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-vivid-purple" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-navy/5 px-6 pb-5 pt-3 text-sm leading-relaxed text-slate-soft">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
