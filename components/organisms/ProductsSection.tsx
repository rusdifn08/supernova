"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ShimmerText } from "@/components/atoms/ShimmerText";
import { SectionPlatformIcons } from "@/components/molecules/SectionPlatformIcons";
import { springReveal, staggerContainer } from "@/config/animation-variants";
import { PRODUCT_TABS } from "@/data/products";
import { useProductsStore } from "@/stores/products-store";
import { cn } from "@/utils/cn";

function SimulationFallback({ minHeight }: { minHeight: string }) {
  return (
    <div
      className="w-full animate-pulse rounded-3xl border border-white/80 bg-white/40"
      style={{ minHeight }}
      aria-hidden
    />
  );
}

const BookingSimulation = dynamic(
  () =>
    import("@/components/organisms/BookingSimulation").then(
      (m) => m.BookingSimulation
    ),
  { loading: () => <SimulationFallback minHeight="28rem" /> }
);

const PosSimulation = dynamic(
  () =>
    import("@/components/organisms/PosSimulation").then((m) => m.PosSimulation),
  { loading: () => <SimulationFallback minHeight="22rem" /> }
);

const QrOrderingSimulation = dynamic(
  () =>
    import("@/components/organisms/QrOrderingSimulation").then(
      (m) => m.QrOrderingSimulation
    ),
  { loading: () => <SimulationFallback minHeight="28rem" /> }
);

function ActiveSimulation({ tab }: { tab: number }) {
  if (tab === 0) return <BookingSimulation />;
  if (tab === 1) return <PosSimulation />;
  return <QrOrderingSimulation />;
}

export function ProductsSection() {
  const activeTab = useProductsStore((s) => s.activeTab);
  const setActiveTab = useProductsStore((s) => s.setActiveTab);
  const current = PRODUCT_TABS[activeTab];

  return (
    <section id="products" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "right-[2%] top-[8%]",
          "left-[2%] top-[38%]",
          "right-[5%] bottom-[12%]",
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
          Interactive Portfolio
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl"
        >
          Tiga Pilar{" "}
          <ShimmerText>Produk Unggulan</ShimmerText>
        </motion.h2>
        <motion.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-xl text-slate-soft"
        >
          Jangan hanya baca — interaksikan. Klik, scan, dan lihat sistem
          bereaksi seperti software sungguhan.
        </motion.p>
      </motion.div>

      <div className="mb-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        {PRODUCT_TABS.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => setActiveTab(i)}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "relative flex min-w-[240px] items-center gap-4 rounded-2xl px-6 py-5 text-left transition-colors sm:min-w-[260px]",
              activeTab === i
                ? "text-white"
                : "border border-navy/10 bg-white/70 text-navy backdrop-blur-xl hover:border-vivid-purple/40 hover:shadow-glass-lg"
            )}
          >
            {activeTab === i && (
              <motion.span
                layoutId="pillar-active-pill"
                transition={{ type: "spring", stiffness: 250, damping: 26 }}
                className="absolute inset-0 rounded-2xl bg-navy shadow-[0_20px_50px_rgba(15,23,42,0.35)] ring-2 ring-electric-cyan/40"
              />
            )}
            <span
              className={cn(
                "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                activeTab === i ? "bg-white/10" : "bg-vivid-purple/10"
              )}
            >
              <p.icon
                className={cn(
                  "h-6 w-6",
                  activeTab === i ? "text-electric-cyan" : "text-vivid-purple"
                )}
              />
            </span>
            <span className="relative z-10">
              <span
                className={cn(
                  "block text-[10px] font-bold uppercase tracking-[0.15em]",
                  activeTab === i ? "text-electric-cyan" : "text-slate-soft"
                )}
              >
                Pilar {i + 1}
              </span>
              <span className="block font-heading text-base font-bold sm:text-lg">
                {p.label}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="mb-8 text-center">
            <h3 className="font-heading text-xl font-bold text-navy sm:text-2xl">
              {current.title}
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-soft">
              {current.desc}
            </p>
            <p className="mt-2 text-xs font-semibold text-electric-cyan">
              {current.market}
            </p>
          </div>
          <ActiveSimulation tab={activeTab} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
