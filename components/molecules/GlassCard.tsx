"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";

export function GlassCard({
  children,
  className,
  tilt = false,
  lift = false,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    rotateY.set(((x - midX) / midX) * 6);
    rotateX.set((-(y - midY) / midY) * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tilt
          ? { rotateX: springX, rotateY: springY, transformPerspective: 900 }
          : undefined
      }
      whileHover={
        lift ? { y: -6, boxShadow: "0 24px 60px rgba(15,23,42,0.1)" } : undefined
      }
      transition={
        lift ? { type: "spring", stiffness: 250, damping: 22 } : undefined
      }
      className={cn(
        "rounded-3xl border border-white/80 bg-white/60 shadow-glass backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
