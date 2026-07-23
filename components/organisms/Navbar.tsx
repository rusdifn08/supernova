"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Monitor, Phone, Smartphone } from "lucide-react";
import logo from "@/app/logo.webp";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { NavLinks } from "@/components/organisms/NavLinks";
import { WA_CONSULT_URL } from "@/config/whatsapp";
import { cn } from "@/utils/cn";
import { openWhatsApp } from "@/utils/open-whatsapp";
import { scrollToId } from "@/hooks/use-scroll-to";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";

export function Navbar() {
  const scrolled = useScrollThreshold(40);
  const scrollTo = scrollToId;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/60 bg-white/70 py-3 shadow-glass backdrop-blur-2xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <button
          onClick={() => scrollTo("hero")}
          className="group flex items-center gap-2.5"
        >
          <motion.span
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-9 w-9 items-center justify-center"
          >
            <Image
              src={logo}
              alt="Supernova Labs Studio"
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
          </motion.span>
          <span className="font-heading text-lg font-bold tracking-tight text-navy">
            Supernova Labs{" "}
            <span className="text-electric-cyan">Studio</span>
          </span>
          {/* Trio ikon platform — kecil tapi jelas, penegasan bisnis technology */}
          <span className="ml-1 hidden items-center gap-1 sm:flex">
            {[
              { icon: Monitor, color: "text-vivid-purple", bg: "bg-vivid-purple/10", delay: 0 },
              { icon: Globe, color: "text-electric-cyan", bg: "bg-electric-cyan/10", delay: 0.35 },
              { icon: Smartphone, color: "text-hot-magenta", bg: "bg-hot-magenta/10", delay: 0.7 },
            ].map((p, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -2.5, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
                whileHover={{ scale: 1.2 }}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-md border border-white/80 backdrop-blur-xl",
                  p.bg
                )}
              >
                <p.icon className={cn("h-3 w-3", p.color)} />
              </motion.span>
            ))}
          </span>
        </button>

        {/* Nav links berdampingan dengan CTA — tanpa pembungkus */}
        <div className="flex items-center gap-4">
          <NavLinks scrollTo={scrollTo} />
          <MagneticButton
            onClick={() => openWhatsApp(WA_CONSULT_URL)}
            className="!px-5 !py-2.5 text-xs"
          >
            <Phone className="h-3.5 w-3.5" />
            Konsultasi Gratis
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}
