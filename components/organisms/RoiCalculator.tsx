"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShimmerText } from "@/components/atoms/ShimmerText";
import { GlassCard } from "@/components/molecules/GlassCard";
import { SectionPlatformIcons } from "@/components/molecules/SectionPlatformIcons";
import { springReveal, staggerContainer } from "@/config/animation-variants";
import { formatIDR } from "@/utils/format-idr";

export function RoiCalculator() {
  const [monthly, setMonthly] = useState(2_000_000);
  const min = 500_000;
  const max = 10_000_000;
  const years = 5;
  const wasted = monthly * 12 * years;
  const progress = ((monthly - min) / (max - min)) * 100;

  // Animated number counter
  const [display, setDisplay] = useState(wasted);
  useEffect(() => {
    let frame: number;
    const start = display;
    const diff = wasted - start;
    const duration = 400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + diff * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasted]);

  return (
    <section id="roi" className="relative mx-auto max-w-4xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "-left-[14%] top-[18%]",
          "-right-[16%] top-[35%]",
          "-left-[10%] bottom-[12%]",
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
          Financial Closer
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl"
        >
          Berapa yang Anda{" "}
          <ShimmerText>Buang?</ShimmerText>
        </motion.h2>
        <motion.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-lg text-slate-soft"
        >
          Geser slider. Lihat berapa uang Anda yang hilang ke langganan SaaS
          dalam 5 tahun.
        </motion.p>
      </motion.div>

      <GlassCard className="p-8 sm:p-10">
        <label className="mb-2 block text-sm font-semibold text-navy">
          Biaya langganan software Anda per bulan?
        </label>
        <div className="mb-6 flex items-end justify-between">
          <span className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            {formatIDR(monthly)}
          </span>
          <span className="text-xs text-slate-soft">/bulan</span>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={100_000}
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          className="roi-slider mb-2"
          style={
            { "--slider-progress": `${progress}%` } as React.CSSProperties
          }
        />
        <div className="mb-10 flex justify-between text-[10px] font-medium text-slate-soft">
          <span>{formatIDR(min)}</span>
          <span>{formatIDR(max)}</span>
        </div>

        {/* Result — the gut-punch number */}
        <motion.div
          key={wasted}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl bg-gradient-to-br from-vivid-purple/10 via-hot-magenta/10 to-electric-cyan/10 p-6 text-center"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-soft">
            Dalam {years} tahun, Anda membuang
          </p>
          <p className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-5xl">
            {formatIDR(display)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-soft">
            Beralih ke{" "}
            <strong className="text-electric-cyan">Supernova Labs</strong> dan
            jadikan itu{" "}
            <strong className="text-navy">aset bisnis</strong> yang Anda miliki
            selamanya — bukan sewa yang hilang tiap bulan.
          </p>
        </motion.div>
      </GlassCard>
    </section>
  );
}
