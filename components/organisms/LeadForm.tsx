"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { ShimmerText } from "@/components/atoms/ShimmerText";
import { GlassCard } from "@/components/molecules/GlassCard";
import { SectionPlatformIcons } from "@/components/molecules/SectionPlatformIcons";
import { springReveal, staggerContainer } from "@/config/animation-variants";
import { WA_LEAD_NUMBER } from "@/config/whatsapp";
import { BUSINESS_LABELS } from "@/data/hero";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    whatsapp: "",
  });

    const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.business || !form.whatsapp) return;
    setLoading(true);

    // Susun pesan berisi data form, lalu buka WhatsApp ke nomor bisnis —
    // pesan sudah terisi otomatis, pengunjung tinggal tekan kirim
    const message = [
      "Halo Supernova Labs Studio, saya ingin konsultasi gratis.",
      "",
      `Nama: ${form.name}`,
      `Jenis Bisnis: ${BUSINESS_LABELS[form.business] ?? form.business}`,
      `Nomor WhatsApp: ${form.whatsapp}`,
    ].join("\n");

    setTimeout(() => {
      window.open(
        `https://wa.me/${WA_LEAD_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-2xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "-left-[30%] top-[22%]",
          "-right-[32%] top-[12%]",
          "-right-[25%] bottom-[18%]",
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
          Mulai Transformasi
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl"
        >
          Siap Memiliki Sistem{" "}
          <ShimmerText>Enterprise?</ShimmerText>
        </motion.h2>
        <motion.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-md text-slate-soft"
        >
          Isi form di bawah. Tim kami akan menghubungi Anda via WhatsApp untuk
          konsultasi gratis tanpa komitmen.
        </motion.p>
      </motion.div>

      <GlassCard className="p-8 sm:p-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-electric-cyan shadow-glow-cyan"
              >
                <Check className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="font-heading text-xl font-bold text-navy">
                Terima kasih, {form.name}!
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-soft">
                WhatsApp sudah terbuka dengan pesan Anda — cukup tekan tombol
                kirim untuk terhubung langsung dengan tim kami.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-soft">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Contoh: Budi Santoso"
                  className="w-full rounded-2xl border border-navy/10 bg-white/80 px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-soft/50 focus:border-vivid-purple/40 focus:ring-2 focus:ring-vivid-purple/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-soft">
                  Jenis Bisnis
                </label>
                <select
                  required
                  value={form.business}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, business: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-navy/10 bg-white/80 px-4 py-3 text-sm text-navy outline-none transition focus:border-vivid-purple/40 focus:ring-2 focus:ring-vivid-purple/20"
                >
                  <option value="" disabled>
                    Pilih jenis bisnis...
                  </option>
                  <option value="photo-studio">Photo Studio</option>
                  <option value="fnb">F&B / Cafe / Restaurant</option>
                  <option value="retail">Retail / Boutique</option>
                  <option value="ps-gaming">PS / Gaming Rental</option>
                  <option value="clinic">Klinik / Dental</option>
                  <option value="sports">Sports Arena</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-soft">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, whatsapp: e.target.value }))
                  }
                  placeholder="08xxxxxxxxxx"
                  className="w-full rounded-2xl border border-navy/10 bg-white/80 px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-soft/50 focus:border-vivid-purple/40 focus:ring-2 focus:ring-vivid-purple/20"
                />
              </div>

              {/* Pulsing submit — CRO: inviting CTA */}
              <MagneticButton
                type="submit"
                pulse
                className="mt-2 w-full !py-4"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Kirim & Dapatkan Konsultasi Gratis
                    <Send className="h-4 w-4" />
                  </>
                )}
              </MagneticButton>

              <p className="text-center text-[11px] text-slate-soft">
                Data Anda aman. Kami tidak akan spam atau menjual informasi Anda.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </GlassCard>
    </section>
  );
}
