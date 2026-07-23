"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function FloatingSignalComponent({
  icon: Icon,
  text,
  delay,
}: {
  icon: React.ElementType;
  text: string;
  delay: number;
}) {
  return (
    <motion.span
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="flex items-center gap-2 rounded-full border border-navy/[0.06] bg-white/60 px-4 py-2 text-xs font-semibold text-navy shadow-glass backdrop-blur-xl"
    >
      <motion.span
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-electric-cyan/10"
      >
        <Icon className="h-3.5 w-3.5 text-electric-cyan" />
      </motion.span>
      {text}
    </motion.span>
  );
}

export const FloatingSignal = memo(FloatingSignalComponent);
