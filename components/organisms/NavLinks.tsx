"use client";

import { motion } from "framer-motion";
import { NAV_SECTIONS } from "@/config/navigation";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/utils/cn";

export function NavLinks({ scrollTo }: { scrollTo: (id: string) => void }) {
  const { active, select } = useScrollSpy(NAV_SECTIONS, scrollTo);

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_SECTIONS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => select(item.id)}
            className={cn(
              "group relative px-3.5 py-2 text-sm font-semibold transition-colors duration-300",
              isActive ? "text-navy" : "text-slate-soft hover:text-navy"
            )}
          >
            <motion.span
              className="relative inline-block"
              whileHover={{ y: -1.5 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
            >
              {item.label}
            </motion.span>
            {/* Indikator aktif — spring lembut, meluncur mulus antar menu */}
            {isActive && (
              <motion.span
                layoutId="nav-active-indicator"
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
                className="absolute inset-x-2.5 -bottom-0.5 h-[2.5px] rounded-full bg-electric-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              />
            )}
            {/* Underline hover untuk menu non-aktif */}
            {!isActive && (
              <span className="absolute inset-x-2.5 -bottom-0.5 h-[2.5px] origin-left scale-x-0 rounded-full bg-navy/25 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
