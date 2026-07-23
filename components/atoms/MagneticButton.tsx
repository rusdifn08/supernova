"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className,
  type = "button",
  pulse = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  pulse?: boolean;
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold tracking-tight transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-vivid-purple/50";

  const variants = {
    primary: "group bg-navy text-white ring-1 ring-white/10",
    secondary:
      "border-2 border-navy/10 bg-white/60 text-navy backdrop-blur-xl hover:border-navy/30 hover:bg-white/90 hover:shadow-glass-lg",
    ghost: "text-navy hover:text-vivid-purple",
  };

  const isPrimary = variant === "primary";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      animate={
        isPrimary
          ? {
              boxShadow: [
                "0 10px 30px rgba(6,182,212,0.3)",
                "0 12px 38px rgba(124,58,237,0.38)",
                "0 10px 30px rgba(6,182,212,0.3)",
              ],
            }
          : undefined
      }
      whileHover={
        isPrimary
          ? {
              scale: 1.05,
              y: -2,
              boxShadow: "0 18px 50px rgba(6,182,212,0.5)",
            }
          : { scale: 1.05, y: -2 }
      }
      whileTap={{ scale: 0.95 }}
      transition={
        isPrimary
          ? {
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 300, damping: 20 },
              y: { type: "spring", stiffness: 300, damping: 20 },
            }
          : { type: "spring", stiffness: 300, damping: 20 }
      }
      className={cn(
        base,
        variants[variant],
        pulse && !isPrimary && "animate-pulse-soft",
        "[&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
        className
      )}
    >
      {isPrimary && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <motion.span
            animate={{ left: ["-60%", "140%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 2.4,
              ease: "easeInOut",
            }}
            className="absolute top-0 h-full w-1/3 -skew-x-12 bg-white/25"
          />
          <span className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-electric-cyan/70 to-transparent" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
