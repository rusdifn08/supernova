"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Globe, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/utils/cn";

function SectionPlatformIconsComponent({
  positions,
}: {
  positions: [string, string, string];
}) {
  const icons = [
    {
      icon: Monitor,
      color: "text-vivid-purple",
      glow: "drop-shadow-[0_6px_18px_rgba(124,58,237,0.45)]",
      path: { y: [0, -45, 25, -20, 0], x: [0, 35, -30, 20, 0], rotate: [0, 8, -6, 4, 0] },
      dur: 14,
      delay: 0,
    },
    {
      icon: Globe,
      color: "text-electric-cyan",
      glow: "drop-shadow-[0_6px_18px_rgba(6,182,212,0.45)]",
      path: { y: [0, 30, -40, 15, 0], x: [0, -40, 25, -15, 0], rotate: [0, -7, 5, -3, 0] },
      dur: 16,
      delay: 1,
    },
    {
      icon: Smartphone,
      color: "text-hot-magenta",
      glow: "drop-shadow-[0_6px_18px_rgba(217,70,239,0.45)]",
      path: { y: [0, -35, 20, -45, 0], x: [0, 25, -20, 35, 0], rotate: [0, 6, -8, 5, 0] },
      dur: 12,
      delay: 0.5,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
      {icons.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true }}
          animate={p.path}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            x: { duration: p.dur * 1.2, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            rotate: {
              duration: p.dur * 1.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
          className={cn("absolute", positions[i])}
        >
          <p.icon strokeWidth={1.7} className={cn("h-8 w-8", p.color, p.glow)} />
        </motion.div>
      ))}
    </div>
  );
}

export const SectionPlatformIcons = memo(SectionPlatformIconsComponent);
