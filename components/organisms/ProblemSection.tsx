"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingDown, X } from "lucide-react";
import logo from "@/app/logo.webp";
import { ShimmerText } from "@/components/atoms/ShimmerText";
import { GlassCard } from "@/components/molecules/GlassCard";
import { SectionPlatformIcons } from "@/components/molecules/SectionPlatformIcons";
import { springReveal, staggerContainer } from "@/config/animation-variants";
import { SAAS_POINTS, SUPERNOVA_POINTS } from "@/data/problem";

export function ProblemSection() {
    return (
    <section id="difference" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "left-[2%] top-[12%]",
          "right-[3%] top-[50%]",
          "left-[6%] bottom-[8%]",
        ]}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12 text-center"
      >
        <motion.span
          variants={springReveal}
          className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-electric-cyan"
        >
          Subscription Fatigue Ends Here
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl"
        >
          SaaS Tradisional vs{" "}
          <ShimmerText>Supernova Labs</ShimmerText>
        </motion.h2>
        <motion.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-xl text-slate-soft"
        >
          Setiap bulan Anda menyewa. Kami memberikan Anda kepemilikan.
        </motion.p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* LEFT — SaaS (muted, grayed out) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <GlassCard lift className="h-full p-8 opacity-70 grayscale">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200">
                <TrendingDown className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-500">
                  SaaS Tradisional
                </h3>
                <p className="text-xs text-slate-400">Bayar sewa selamanya</p>
              </div>
            </div>
            <ul className="space-y-3">
              {SAAS_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-500">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {p}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        {/* RIGHT — Supernova (highlighted, scaled up) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="md:scale-105"
        >
          <GlassCard lift className="relative h-full overflow-hidden p-8 ring-2 ring-vivid-purple/30">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-gradient opacity-20 blur-2xl" />
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src={logo}
                  alt="Supernova Labs Studio"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">
                  Supernova Labs
                </h3>
                <p className="text-xs text-vivid-purple">1x Bayar · Milik Anda</p>
              </div>
              <span className="ml-auto rounded-full bg-luminous-pink/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-luminous-pink">
                Recommended
              </span>
            </div>
            <ul className="relative space-y-3">
              {SUPERNOVA_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric-cyan" />
                  {p}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
