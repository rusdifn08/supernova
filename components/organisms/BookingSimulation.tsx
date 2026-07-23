"use client";

import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  Globe,
  Loader2,
  Monitor,
  QrCode,
  Smartphone,
  Wallet,
} from "lucide-react";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { GlassCard } from "@/components/molecules/GlassCard";
import {
  BOOKING_PACKAGES,
  BOOKING_STEP_LABELS,
  BOOKING_STUDIOS,
  BOOKING_TIMES,
} from "@/data/booking";
import { useBookingSimulationStore } from "@/stores/booking-simulation-store";
import type { BookingStep } from "@/types/booking";
import { cn } from "@/utils/cn";
import { formatIDR } from "@/utils/format-idr";

export function BookingSimulation() {
  const step = useBookingSimulationStore((s) => s.step);
  const studio = useBookingSimulationStore((s) => s.studio);
  const slot = useBookingSimulationStore((s) => s.slot);
  const pkg = useBookingSimulationStore((s) => s.pkg);
  const paying = useBookingSimulationStore((s) => s.paying);
  const toast = useBookingSimulationStore((s) => s.toast);
  const selectStudio = useBookingSimulationStore((s) => s.selectStudio);
  const setSlot = useBookingSimulationStore((s) => s.setSlot);
  const setPkg = useBookingSimulationStore((s) => s.setPkg);
  const setStep = useBookingSimulationStore((s) => s.setStep);
  const pay = useBookingSimulationStore((s) => s.pay);
  const reset = useBookingSimulationStore((s) => s.reset);

  useEffect(() => {
    return () => {
      useBookingSimulationStore.getState().reset();
    };
  }, []);

  const total = (studio?.from ?? 0) + (pkg?.add ?? 0);
  const goStep = (n: number) => setStep(n as BookingStep);

  return (
    <GlassCard className="relative overflow-hidden p-6 sm:p-8">
      {/* Stepper header — indikator progres 4 langkah */}
      <div className="mb-8 flex items-center justify-between">
        {BOOKING_STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <motion.span
                animate={{
                  scale: step === i ? 1.1 : 1,
                  backgroundColor: step >= i ? "#0F172A" : "#E2E8F0",
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              >
                {step > i ? <Check className="h-4 w-4" /> : i + 1}
              </motion.span>
              <span
                className={cn(
                  "hidden text-[10px] font-semibold sm:block",
                  step >= i ? "text-navy" : "text-slate-soft"
                )}
              >
                {label}
              </span>
            </div>
            {i < BOOKING_STEP_LABELS.length - 1 && (
              <div className="relative mx-1 h-0.5 flex-1 rounded-full bg-slate-200">
                <motion.div
                  animate={{ width: step > i ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-y-0 left-0 rounded-full bg-electric-cyan"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 0 — Pilih Studio */}
        {step === 0 && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            <p className="mb-4 text-center text-sm font-semibold text-navy">
              Langkah 1 — Pilih studio yang Anda inginkan
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {BOOKING_STUDIOS.map((s) => (
                <motion.button
                  key={s.id}
                  onClick={() => selectStudio(s)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-navy/10 bg-white/80 p-5 text-center transition-all hover:border-electric-cyan hover:shadow-glow-cyan"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy transition-transform group-hover:scale-110">
                    <s.icon className="h-6 w-6 text-white" />
                  </span>
                  <span>
                    <span className="block font-heading text-base font-bold text-navy">
                      {s.name}
                    </span>
                    <span className="block text-xs text-slate-soft">{s.type}</span>
                  </span>
                  <span className="text-xs font-semibold text-electric-cyan">
                    Mulai {formatIDR(s.from)}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 1 — Live Calendar + Jam + Paket */}
        {step === 1 && studio && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy">
                  <studio.icon className="h-4 w-4 text-white" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-navy">
                    {studio.name} — Hari Ini
                  </p>
                  <p className="text-[11px] text-slate-soft">{studio.type}</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                LIVE CALENDAR
              </span>
            </div>

            <p className="mb-2 text-xs font-semibold text-navy">Pilih jam</p>
            <div className="mb-5 grid grid-cols-4 gap-2">
              {BOOKING_TIMES.map((t) => (
                <motion.button
                  key={t}
                  onClick={() => setSlot(t)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center rounded-xl border text-sm font-semibold transition-all",
                    slot === t
                      ? "border-electric-cyan bg-electric-cyan text-white shadow-glow-cyan"
                      : "border-navy/10 bg-white/80 text-navy hover:border-electric-cyan"
                  )}
                >
                  <Clock className="mb-0.5 h-3.5 w-3.5" />
                  {t}
                </motion.button>
              ))}
            </div>

            <p className="mb-2 text-xs font-semibold text-navy">Pilih paket harga</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {BOOKING_PACKAGES.map((p) => (
                <motion.button
                  key={p.id}
                  onClick={() => setPkg(p)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "rounded-2xl border p-3 text-left transition-all",
                    pkg?.id === p.id
                      ? "border-navy bg-navy text-white shadow-lg"
                      : "border-navy/10 bg-white/80 text-navy hover:border-navy/30"
                  )}
                >
                  <span className="block font-heading text-sm font-bold">
                    {p.name}
                  </span>
                  <span
                    className={cn(
                      "block text-[11px]",
                      pkg?.id === p.id ? "text-white/70" : "text-slate-soft"
                    )}
                  >
                    {p.dur}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-xs font-bold",
                      pkg?.id === p.id ? "text-electric-cyan" : "text-electric-cyan"
                    )}
                  >
                    {p.add === 0 ? "Termasuk" : `+ ${formatIDR(p.add)}`}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => goStep(0)}
                className="text-xs font-semibold text-slate-soft transition hover:text-navy"
              >
                ← Ganti studio
              </button>
              <MagneticButton
                onClick={() => slot && pkg && goStep(2)}
                className={cn(
                  "!py-3",
                  (!slot || !pkg) && "pointer-events-none opacity-40"
                )}
              >
                Lanjut ke Pembayaran
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </motion.div>
        )}

        {/* STEP 2 — Pembayaran */}
        {step === 2 && studio && slot && pkg && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="mx-auto max-w-md"
          >
            <p className="mb-4 text-center text-sm font-semibold text-navy">
              Langkah 3 — Konfirmasi &amp; bayar
            </p>
            <div className="mb-4 space-y-2 rounded-2xl border border-navy/5 bg-white/80 p-4 text-sm">
              {[
                ["Studio", `${studio.name} · ${studio.type}`],
                ["Jam", `${slot} WIB`],
                ["Paket", `${pkg.name} (${pkg.dur})`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-soft">{k}</span>
                  <span className="font-semibold text-navy">{v}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-navy/5 pt-2">
                <span className="font-semibold text-navy">Total</span>
                <span className="font-heading text-lg font-bold text-navy">
                  {formatIDR(total)}
                </span>
              </div>
            </div>

            <p className="mb-2 text-xs font-semibold text-navy">Metode pembayaran</p>
            <div className="mb-5 grid grid-cols-3 gap-2">
              {[
                { icon: QrCode, label: "QRIS" },
                { icon: CreditCard, label: "Kartu" },
                { icon: Wallet, label: "E-Wallet" },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center",
                    i === 0
                      ? "border-electric-cyan bg-electric-cyan/10"
                      : "border-navy/10 bg-white/60"
                  )}
                >
                  <m.icon
                    className={cn(
                      "h-5 w-5",
                      i === 0 ? "text-electric-cyan" : "text-slate-soft"
                    )}
                  />
                  <span className="text-[11px] font-semibold text-navy">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => goStep(1)}
                className="text-xs font-semibold text-slate-soft transition hover:text-navy"
              >
                ← Kembali
              </button>
              <MagneticButton onClick={pay} pulse className="!py-3">
                {paying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Memproses...
                  </>
                ) : (
                  <>
                    Bayar {formatIDR(total)}
                    <CreditCard className="h-4 w-4" />
                  </>
                )}
              </MagneticButton>
            </div>
          </motion.div>
        )}

        {/* STEP 3 — Sinkronisasi Customer + Admin di 3 platform */}
        {step === 3 && studio && slot && pkg && (
          <motion.div
            key="sync"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            <div className="mb-6 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-electric-cyan shadow-glow-cyan"
              >
                <Check className="h-7 w-7 text-white" />
              </motion.span>
              <p className="font-heading text-lg font-bold text-navy">
                Booking Terkonfirmasi &amp; Tersinkron!
              </p>
              <p className="text-xs text-slate-soft">
                Data langsung muncul di sisi Customer &amp; Admin — real-time di 3 platform
              </p>
            </div>

            {/* Platform icons bounce */}
            <div className="mb-6 flex items-center justify-center gap-3">
              {[
                { icon: Smartphone, label: "Mobile", delay: 0 },
                { icon: Monitor, label: "Desktop", delay: 0.12 },
                { icon: Globe, label: "Web", delay: 0.24 },
              ].map((d) => (
                <motion.div
                  key={d.label}
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 0.6,
                    delay: d.delay,
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-electric-cyan/50 bg-electric-cyan/10 px-4 py-3 shadow-glow-cyan"
                >
                  <d.icon className="h-6 w-6 text-electric-cyan" />
                  <span className="text-[10px] font-bold uppercase text-navy">
                    {d.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Dua sisi: Customer App & Admin Dashboard */}
            <div className="grid gap-3 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-navy/5 bg-white/80 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-electric-cyan" />
                  <span className="text-xs font-bold text-navy">Aplikasi Customer</span>
                </div>
                <div className="rounded-xl bg-green-50 p-3">
                  <p className="text-[11px] font-bold text-green-700">
                    ✓ Booking Berhasil
                  </p>
                  <p className="mt-1 text-xs text-navy">
                    {studio.name} · {slot} · {pkg.name}
                  </p>
                  <p className="text-[10px] text-slate-soft">E-ticket dikirim</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                className="rounded-2xl border border-navy/5 bg-white/80 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-navy" />
                  <span className="text-xs font-bold text-navy">Dashboard Admin</span>
                </div>
                <motion.div
                  initial={{ backgroundColor: "rgb(220,252,231)" }}
                  animate={{ backgroundColor: "rgba(248,250,252,1)" }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="rounded-xl border border-amber-200 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                      Booking Baru
                    </span>
                    <span className="text-[10px] font-bold text-slate-soft">
                      {formatIDR(total)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-navy">
                    {studio.name} · {slot}
                  </p>
                  <p className="text-[10px] text-slate-soft">
                    Slot otomatis terkunci — anti double-booking
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={reset}
                className="text-xs font-semibold text-electric-cyan transition hover:text-navy"
              >
                ↻ Coba simulasi lagi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 right-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-electric-cyan/30 bg-white/90 p-4 shadow-glass-lg backdrop-blur-2xl"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-cyan">
              <Check className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-medium leading-snug text-navy">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );

}
