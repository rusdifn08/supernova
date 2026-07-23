"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Globe, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/utils/cn";

function FloatingPlatformIconsComponent() {
  const platforms = [
    {
      icon: Monitor,
      color: "text-vivid-purple",
      glow: "drop-shadow-[0_6px_18px_rgba(124,58,237,0.5)]",
      pos: "left-[5%] top-[26%] lg:left-[9%]",
      dur: 6,
      delay: 0,
    },
    {
      icon: Globe,
      color: "text-electric-cyan",
      glow: "drop-shadow-[0_6px_18px_rgba(6,182,212,0.5)]",
      pos: "right-[5%] top-[22%] lg:right-[10%]",
      dur: 7,
      delay: 0.8,
    },
    {
      icon: Smartphone,
      color: "text-hot-magenta",
      glow: "drop-shadow-[0_6px_18px_rgba(217,70,239,0.5)]",
      pos: "bottom-[28%] right-[12%] lg:right-[15%]",
      dur: 5.5,
      delay: 0.4,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
      {platforms.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1.9 + p.delay },
            scale: { duration: 0.8, delay: 1.9 + p.delay },
            y: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            rotate: {
              duration: p.dur * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
          className={cn("absolute", p.pos)}
        >
          <p.icon
            strokeWidth={1.7}
            className={cn("h-9 w-9 lg:h-10 lg:w-10", p.color, p.glow)}
          />
        </motion.div>
      ))}
    </div>
  );
}

export const FloatingPlatformIcons = memo(FloatingPlatformIconsComponent);
