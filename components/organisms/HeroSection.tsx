"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Lock,
  Package,
  Phone,
  Shield,
  Wallet,
  Wrench,
  Zap,
  Award,
} from "lucide-react";
import { FloatingSignal } from "@/components/atoms/FloatingSignal";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { ShimmerText } from "@/components/atoms/ShimmerText";
import { FloatingPlatformIcons } from "@/components/molecules/FloatingPlatformIcons";
import {
  staggerContainer,
  wordReveal,
} from "@/config/animation-variants";
import { WA_CONSULT_URL } from "@/config/whatsapp";
import { HERO_HEADLINE } from "@/data/hero";
import { scrollToId } from "@/hooks/use-scroll-to";
import { cn } from "@/utils/cn";
import { openWhatsApp } from "@/utils/open-whatsapp";

export function HeroSection() {
  const headline = HERO_HEADLINE;

  const scrollTo = scrollToId;

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pb-14 pt-28 text-center"
    >
      {/* Ikon 3 platform glass melayang — penegasan keunggulan multiplatform */}
      <FloatingPlatformIcons />

      {/* Badge otoritas — positioning No.1 dengan animasi loop (glow + ping) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
        whileHover={{ scale: 1.04, y: -2 }}
        className="relative mb-6 inline-flex cursor-default items-center gap-3 overflow-hidden rounded-full border border-navy/[0.08] bg-white/70 px-6 py-2.5 shadow-glass backdrop-blur-xl sm:px-8 sm:py-3"
      >
        {/* Kilau berjalan di dalam badge (loop) */}
        <span className="pointer-events-none absolute inset-0">
          <span className="absolute -left-[60%] top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-electric-cyan/15 to-transparent animate-[shimmer_4s_linear_infinite]" />
        </span>
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full bg-navy"
        >
          <Award className="h-3.5 w-3.5 text-white" />
        </motion.span>
        <span className="relative font-heading text-sm font-bold tracking-tight text-navy sm:text-base">
          No. 1 Layanan Multiplatform System di Indonesia
        </span>
      </motion.div>

      {/* Sub-badge spesialisasi dengan shimmer teks (loop) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm"
      >
        <span className="h-px w-6 bg-navy/20" />
        <ShimmerText>Specialist All-in-One Multiplatform Apps</ShimmerText>
        <span className="h-px w-6 bg-navy/20" />
      </motion.div>

      <motion.h1
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {headline.map((word, i) => (
          <motion.span
            key={i}
            variants={wordReveal}
            className={cn(
              "mr-[0.3em] inline-block",
              // Highlight kata kunci dengan shimmer navy→cyan (loop) — bukan ungu
              (word === "1x" ||
                word === "Bayar." ||
                word === "Selamanya.") &&
              "bg-[linear-gradient(110deg,#0F172A_35%,#06B6D4_50%,#0F172A_65%)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer"
            )}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 20 }}
        className="mt-7 max-w-2xl text-base leading-relaxed text-slate-soft sm:text-lg"
      >
        <strong className="text-navy">Tinggalkan vendor lama.</strong> Kami
        hadirkan ekosistem lengkap (Web, Desktop, &amp; Mobile) yang
        terintegrasi penuh hanya dengan{" "}
        <strong className="text-navy">sekali bayar!</strong>{" "}
        <strong className="text-electric-cyan">Bebas Tambah Fitur Kapan Saja.</strong>
      </motion.p>

      {/* Value chips — 3 pembeda utama dengan animasi masuk berjenjang */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 1.3 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        {[
          {
            icon: Package,
            title: "3 Platform Sekaligus",
            sub: "Web · Desktop · Mobile",
            iconBg: "bg-electric-cyan",
            subColor: "text-electric-cyan",
            hoverGlow: "0 16px 40px rgba(6,182,212,0.3)",
            hoverBorder: "hover:border-electric-cyan/50",
            sweep: "via-electric-cyan/10",
            delay: 0,
          },
          {
            icon: Wallet,
            title: "Biaya Layanan Rp49rb",
            sub: "Ringan per bulan",
            iconBg: "bg-vivid-purple",
            subColor: "text-vivid-purple",
            hoverGlow: "0 16px 40px rgba(124,58,237,0.3)",
            hoverBorder: "hover:border-vivid-purple/50",
            sweep: "via-vivid-purple/10",
            delay: 0.5,
          },
          {
            icon: Wrench,
            title: "Custom Fitur Fleksibel",
            sub: "Biaya terjangkau",
            iconBg: "bg-hot-magenta",
            subColor: "text-hot-magenta",
            hoverGlow: "0 16px 40px rgba(217,70,239,0.3)",
            hoverBorder: "hover:border-hot-magenta/50",
            sweep: "via-hot-magenta/10",
            delay: 1,
          },
        ].map((chip) => (
          <motion.div
            key={chip.title}
            variants={wordReveal}
            whileHover={{ y: -5, scale: 1.04, boxShadow: chip.hoverGlow }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "group relative flex cursor-default items-center gap-3 overflow-hidden rounded-2xl border border-navy/[0.06] bg-white/70 px-4 py-3 text-left shadow-glass backdrop-blur-xl transition-colors",
              chip.hoverBorder
            )}
          >
            {/* Kilau berwarna melintas berkala (loop) — highlight keunggulan */}
            <span className="pointer-events-none absolute inset-0">
              <motion.span
                animate={{ left: ["-40%", "130%"] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                  delay: chip.delay,
                }}
                className={cn(
                  "absolute top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent to-transparent",
                  chip.sweep
                )}
              />
            </span>
            {/* Ikon berwarna tema dengan denyut halus (loop) */}
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: chip.delay,
              }}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110",
                chip.iconBg
              )}
            >
              <chip.icon className="h-4 w-4 text-white" />
            </motion.span>
            <span className="relative">
              <span className="block text-sm font-bold text-navy">
                {chip.title}
              </span>
              <span className={cn("block text-[11px] font-semibold", chip.subColor)}>
                {chip.sub}
              </span>
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 100, damping: 20 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        {/* Primary CTA — langsung buka chat WhatsApp (CRO: zero friction) */}
        <MagneticButton onClick={() => openWhatsApp(WA_CONSULT_URL)} pulse>
          <Phone className="h-4 w-4" />
          Konsultasi Gratis
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
        {/* Secondary CTA — menuju simulasi (CRO: engagement loop) */}
        <MagneticButton variant="secondary" onClick={() => scrollTo("products")}>
          Lihat Simulasi
          <Zap className="h-4 w-4 text-vivid-purple" />
        </MagneticButton>
      </motion.div>

      {/* Trust micro-signals — mengambang bergiliran (loop) + ikon berdenyut */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <FloatingSignal icon={Shield} text="Source Code 100% Anda" delay={0} />
        <FloatingSignal icon={Lock} text="Data Tidak Disandera" delay={0.4} />
        <FloatingSignal icon={Layers} text="Web · Desktop · Mobile" delay={0.8} />
      </motion.div>
    </section>
  );
}
