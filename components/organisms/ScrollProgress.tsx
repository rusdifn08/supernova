"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Indikator progres baca di paling atas — micro-interaction trending yang
// membuat halaman terasa "hidup" dan mendorong user scroll sampai bawah
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-vivid-purple"
    />
  );
}
