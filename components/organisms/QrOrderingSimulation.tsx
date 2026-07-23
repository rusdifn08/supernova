"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clock,
  Loader2,
  QrCode,
  Wallet,
} from "lucide-react";
import { GlassCard } from "@/components/molecules/GlassCard";
import { QR_GRID, QR_MENU, QR_PHONE_STEPS } from "@/data/qr-menu";
import { useQrOrderingSimulationStore } from "@/stores/qr-ordering-simulation-store";
import { cn } from "@/utils/cn";
import { formatIDR } from "@/utils/format-idr";
import { qrCell } from "@/utils/qr-cell";

export function QrOrderingSimulation() {
  const phase = useQrOrderingSimulationStore((s) => s.phase);
  const scanOk = useQrOrderingSimulationStore((s) => s.scanOk);
  const cart = useQrOrderingSimulationStore((s) => s.cart);
  const order = useQrOrderingSimulationStore((s) => s.order);
  const status = useQrOrderingSimulationStore((s) => s.status);
  const cashierAck = useQrOrderingSimulationStore((s) => s.cashierAck);
  const scanTable = useQrOrderingSimulationStore((s) => s.scanTable);
  const addItem = useQrOrderingSimulationStore((s) => s.addItem);
  const removeItem = useQrOrderingSimulationStore((s) => s.removeItem);
  const placeOrder = useQrOrderingSimulationStore((s) => s.placeOrder);
  const setStatus = useQrOrderingSimulationStore((s) => s.setStatus);
  const setCashierAck = useQrOrderingSimulationStore((s) => s.setCashierAck);
  const reset = useQrOrderingSimulationStore((s) => s.reset);

  useEffect(() => {
    return () => {
      useQrOrderingSimulationStore.getState().reset();
    };
  }, []);

  const totalQty = Object.values(cart).reduce((s, q) => s + q, 0);
  const cartTotal = QR_MENU.reduce(
    (s, m) => s + (cart[m.id] ?? 0) * m.price,
    0
  );

  const statusStep = { new: 0, accepted: 1, cooking: 2, ready: 3 }[status];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Device 1: Customer Mobile */}
      <div className="flex flex-col items-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-soft">
          Customer Phone
        </p>
        {/* CSS-only phone mockup */}
        <GlassCard className="relative w-full max-w-[260px] overflow-hidden !rounded-[2rem] p-0">
          {/* Notch */}
          <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-navy/80" />
          <div className="min-h-[340px] p-4">
            <AnimatePresence mode="wait">
              {/* FASE 1 & 2 — Scan QR Meja (QR realistis + laser + flash sukses) */}
              {(phase === "scan" || phase === "scanning") && (
                <motion.div
                  key="scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <p className="mb-1 text-center font-heading text-sm font-bold text-navy">
                    Scan QR di Meja Anda
                  </p>
                  <p className="mb-4 text-center text-[11px] text-slate-soft">
                    Arahkan kamera ke QR Code Meja 4
                  </p>

                  {/* Viewfinder kamera */}
                  <div className="relative aspect-square w-full max-w-[190px] overflow-hidden rounded-2xl border-2 border-navy/10 bg-white p-4">
                    {/* Corner brackets — berdenyut saat scanning */}
                    {[
                      "left-1.5 top-1.5 border-l-[3px] border-t-[3px] rounded-tl-lg",
                      "right-1.5 top-1.5 border-r-[3px] border-t-[3px] rounded-tr-lg",
                      "left-1.5 bottom-1.5 border-b-[3px] border-l-[3px] rounded-bl-lg",
                      "right-1.5 bottom-1.5 border-b-[3px] border-r-[3px] rounded-br-lg",
                    ].map((pos) => (
                      <motion.span
                        key={pos}
                        animate={
                          phase === "scanning" && !scanOk
                            ? { opacity: [1, 0.4, 1] }
                            : { opacity: 1 }
                        }
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className={cn(
                          "absolute z-10 h-7 w-7",
                          scanOk ? "border-green-500" : "border-electric-cyan",
                          pos
                        )}
                      />
                    ))}

                    {/* QR code realistis 13×13 dengan finder pattern */}
                    <div
                      className="grid h-full w-full gap-[2px]"
                      style={{
                        gridTemplateColumns: `repeat(${QR_GRID}, 1fr)`,
                      }}
                    >
                      {Array.from({ length: QR_GRID * QR_GRID }, (_, i) => {
                        const r = Math.floor(i / QR_GRID);
                        const c = i % QR_GRID;
                        return (
                          <span
                            key={i}
                            className={cn(
                              "rounded-[1px]",
                              qrCell(r, c) ? "bg-navy" : "bg-transparent"
                            )}
                          />
                        );
                      })}
                    </div>

                    {/* Laser sweep bolak-balik saat scanning */}
                    {phase === "scanning" && !scanOk && (
                      <motion.div
                        initial={{ top: "6%" }}
                        animate={{ top: ["6%", "90%", "6%"] }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                        className="absolute left-1 right-1 z-10 h-[3px] rounded-full bg-electric-cyan shadow-[0_0_20px_5px_rgba(6,182,212,0.6)]"
                      />
                    )}

                    {/* Flash hijau + check saat QR berhasil terbaca */}
                    <AnimatePresence>
                      {scanOk && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-20 flex items-center justify-center bg-green-500/20 backdrop-blur-[2px]"
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg"
                          >
                            <Check className="h-6 w-6 text-white" />
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {phase === "scanning" ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={cn(
                        "mt-4 flex items-center gap-2 text-xs font-semibold",
                        scanOk ? "text-green-600" : "text-electric-cyan"
                      )}
                    >
                      {scanOk ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Meja 4 terhubung — membuka menu...
                        </>
                      ) : (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Memindai QR Code...
                        </>
                      )}
                    </motion.p>
                  ) : (
                    <motion.button
                      onClick={scanTable}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="mt-4 flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-bold text-white shadow-lg"
                    >
                      <QrCode className="h-4 w-4" />
                      Scan QR Meja 4
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* FASE 3 — Menu interaktif: pilih beberapa item + qty */}
              {phase === "menu" && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                      <Check className="h-3 w-3" /> Meja 4 Terhubung
                    </span>
                    <span className="text-[10px] text-slate-soft">QR Menu</span>
                  </div>

                  <div className="space-y-2">
                    {QR_MENU.map((m) => {
                      const qty = cart[m.id] ?? 0;
                      return (
                        <motion.div
                          key={m.id}
                          whileHover={{ scale: 1.02 }}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl border p-2.5 transition-colors",
                            qty > 0
                              ? "border-electric-cyan/50 bg-electric-cyan/5"
                              : "border-navy/5 bg-white/80"
                          )}
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-50 text-xl">
                            {m.emoji}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-navy">
                              {m.name}
                            </p>
                            <p className="text-[10px] font-semibold text-slate-soft">
                              {formatIDR(m.price)}
                            </p>
                          </div>
                          {qty === 0 ? (
                            <motion.button
                              onClick={() => addItem(m.id)}
                              whileTap={{ scale: 0.9 }}
                              className="rounded-lg bg-navy px-2.5 py-1.5 text-[10px] font-bold text-white"
                            >
                              + Tambah
                            </motion.button>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <motion.button
                                onClick={() => removeItem(m.id)}
                                whileTap={{ scale: 0.85 }}
                                className="flex h-6 w-6 items-center justify-center rounded-md bg-navy/10 text-xs font-bold text-navy"
                              >
                                −
                              </motion.button>
                              <motion.span
                                key={qty}
                                initial={{ scale: 1.4 }}
                                animate={{ scale: 1 }}
                                className="w-4 text-center text-xs font-bold text-navy"
                              >
                                {qty}
                              </motion.span>
                              <motion.button
                                onClick={() => addItem(m.id)}
                                whileTap={{ scale: 0.85 }}
                                className="flex h-6 w-6 items-center justify-center rounded-md bg-electric-cyan text-xs font-bold text-white"
                              >
                                +
                              </motion.button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Total + tombol pesan */}
                  <div className="mt-3 flex items-center justify-between border-t border-navy/5 pt-2.5">
                    <div>
                      <p className="text-[10px] text-slate-soft">Total</p>
                      <motion.p
                        key={cartTotal}
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        className="font-heading text-sm font-bold text-navy"
                      >
                        {formatIDR(cartTotal)}
                      </motion.p>
                    </div>
                    <motion.button
                      onClick={placeOrder}
                      whileHover={totalQty > 0 ? { scale: 1.05 } : {}}
                      whileTap={totalQty > 0 ? { scale: 0.95 } : {}}
                      className={cn(
                        "rounded-xl px-3.5 py-2 text-[11px] font-bold text-white transition",
                        totalQty > 0
                          ? "bg-navy shadow-lg"
                          : "cursor-not-allowed bg-slate-300"
                      )}
                    >
                      Pesan ({totalQty})
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* FASE 4 — Status pesanan live di HP customer */}
              {phase === "status" && order && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                >
                  <div className="mb-3 text-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 250, damping: 14 }}
                      className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-electric-cyan shadow-glow-cyan"
                    >
                      <Check className="h-5 w-5 text-white" />
                    </motion.span>
                    <p className="font-heading text-sm font-bold text-navy">
                      Pesanan Terkirim!
                    </p>
                    <p className="text-[10px] text-slate-soft">
                      Meja 4 · {formatIDR(order.total)}
                    </p>
                  </div>

                  {/* Timeline status yang tersinkron dengan Kitchen & Cashier */}
                  <div className="mb-3 flex items-center justify-between px-1">
                    {QR_PHONE_STEPS.map((s, i) => (
                      <div key={s} className="flex flex-1 items-center">
                        <div className="flex flex-col items-center gap-1">
                          <motion.span
                            animate={{
                              scale: statusStep === i ? [1, 1.2, 1] : 1,
                              backgroundColor:
                                statusStep >= i ? "#06B6D4" : "#E2E8F0",
                            }}
                            transition={
                              statusStep === i
                                ? { scale: { duration: 1.2, repeat: Infinity } }
                                : {}
                            }
                            className="flex h-5 w-5 items-center justify-center rounded-full"
                          >
                            {statusStep > i && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </motion.span>
                          <span
                            className={cn(
                              "text-[8px] font-bold",
                              statusStep >= i
                                ? "text-navy"
                                : "text-slate-soft"
                            )}
                          >
                            {s}
                          </span>
                        </div>
                        {i < QR_PHONE_STEPS.length - 1 && (
                          <div className="relative mx-0.5 mb-3 h-0.5 flex-1 rounded bg-slate-200">
                            <motion.div
                              animate={{
                                width: statusStep > i ? "100%" : "0%",
                              }}
                              className="absolute inset-y-0 left-0 rounded bg-electric-cyan"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 rounded-xl border border-navy/5 bg-white/80 p-2.5">
                    {order.items.map((it) => (
                      <div
                        key={it.name}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className="text-navy">
                          {it.emoji} {it.name} ×{it.qty}
                        </span>
                        <span className="font-semibold text-navy">
                          {formatIDR(it.price * it.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {status === "ready" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5 rounded-xl bg-green-100 p-2 text-center text-[11px] font-bold text-green-700"
                    >
                      🎉 Pesanan siap! Sedang diantar ke Meja 4
                    </motion.div>
                  )}

                  <button
                    onClick={reset}
                    className="mt-3 w-full text-center text-[11px] font-semibold text-electric-cyan transition hover:text-navy"
                  >
                    ↻ Coba simulasi lagi
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Home indicator */}
          <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-navy/20" />
        </GlassCard>
      </div>

      {/* Device 2: Kitchen Display System — interaktif: Terima → Masak → Selesai */}
      <div className="flex flex-col items-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-soft">
          Kitchen Display System
        </p>
        <GlassCard className="relative w-full max-w-[340px] overflow-hidden !rounded-2xl p-0">
          <div className="flex items-center justify-between border-b border-navy/5 bg-navy/5 px-4 py-2.5">
            <span className="font-heading text-xs font-bold text-navy">
              KDS — Kitchen
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-soft">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  order && status !== "ready"
                    ? "animate-pulse bg-amber-400"
                    : order
                    ? "bg-green-500"
                    : "bg-slate-300"
                )}
              />
              {order ? (status === "ready" ? "DONE" : "ACTIVE") : "WAITING"}
            </span>
          </div>

          <div className="min-h-[300px] space-y-2 p-4">
            <AnimatePresence mode="wait">
              {!order && (
                <motion.div
                  key="kds-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-[260px] flex-col items-center justify-center text-slate-soft"
                >
                  <Clock className="mb-2 h-8 w-8 opacity-30" />
                  <p className="text-xs">Menunggu pesanan masuk...</p>
                </motion.div>
              )}
              {order && (
                <motion.div
                  key="kds-order"
                  initial={{ opacity: 0, y: -40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 16 }}
                  className={cn(
                    "rounded-xl border p-3 transition-colors",
                    status === "new" && "border-amber-200 bg-amber-50",
                    status === "accepted" && "border-electric-cyan/40 bg-electric-cyan/5",
                    status === "cooking" && "border-orange-300 bg-orange-50",
                    status === "ready" && "border-green-300 bg-green-50"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    {status === "new" && (
                      <motion.span
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm"
                      >
                        New Order
                      </motion.span>
                    )}
                    {status === "accepted" && (
                      <span className="rounded-full bg-electric-cyan px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        Diterima
                      </span>
                    )}
                    {status === "cooking" && (
                      <motion.span
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                        className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                      >
                        🔥 Sedang Dimasak
                      </motion.span>
                    )}
                    {status === "ready" && (
                      <span className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        ✓ Selesai
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-slate-soft">
                      Meja 4
                    </span>
                  </div>

                  {/* Daftar item pesanan */}
                  <div className="mb-3 space-y-1">
                    {order.items.map((it) => (
                      <div
                        key={it.name}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-navy">
                          {it.emoji} {it.name}
                        </span>
                        <span className="font-bold text-navy">×{it.qty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Aksi dapur — berubah sesuai tahap */}
                  {status === "new" && (
                    <motion.button
                      onClick={() => setStatus("accepted")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full rounded-lg bg-navy py-2 text-[11px] font-bold text-white shadow-lg"
                    >
                      ✓ Terima Pesanan
                    </motion.button>
                  )}
                  {status === "accepted" && (
                    <motion.button
                      onClick={() => setStatus("cooking")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full rounded-lg bg-orange-500 py-2 text-[11px] font-bold text-white shadow-lg"
                    >
                      🔥 Mulai Masak
                    </motion.button>
                  )}
                  {status === "cooking" && (
                    <motion.button
                      onClick={() => setStatus("ready")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full rounded-lg bg-green-600 py-2 text-[11px] font-bold text-white shadow-lg"
                    >
                      ✓ Selesai Dimasak
                    </motion.button>
                  )}
                  {status === "ready" && (
                    <p className="rounded-lg bg-green-100 py-2 text-center text-[11px] font-bold text-green-700">
                      Pesanan diteruskan ke Cashier ✓
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>

      {/* Device 3: Cashier Display System — terima order & pantau status dapur */}
      <div className="flex flex-col items-center md:col-span-2 lg:col-span-1">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-soft">
          Cashier Display System
        </p>
        <GlassCard className="relative w-full max-w-[340px] overflow-hidden !rounded-2xl p-0">
          <div className="flex items-center justify-between border-b border-navy/5 bg-navy/5 px-4 py-2.5">
            <span className="font-heading text-xs font-bold text-navy">
              Cashier — Admin
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-soft">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  order && status === "ready"
                    ? "animate-pulse bg-green-500"
                    : order
                    ? "animate-pulse bg-electric-cyan"
                    : "bg-slate-300"
                )}
              />
              {order ? (status === "ready" ? "READY" : "MONITORING") : "WAITING"}
            </span>
          </div>

          <div className="min-h-[300px] space-y-2 p-4">
            <AnimatePresence mode="wait">
              {!order && (
                <motion.div
                  key="cashier-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-[260px] flex-col items-center justify-center text-slate-soft"
                >
                  <Wallet className="mb-2 h-8 w-8 opacity-30" />
                  <p className="text-xs">Belum ada transaksi baru...</p>
                </motion.div>
              )}
              {order && (
                <motion.div
                  key="cashier-order"
                  initial={{ opacity: 0, y: -40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 16,
                    delay: 0.15,
                  }}
                  className="rounded-xl border border-navy/10 bg-white/80 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-heading text-xs font-bold text-navy">
                      Order #0412 · Meja 4
                    </span>
                    {!cashierAck && (
                      <motion.span
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="rounded-full bg-luminous-pink px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                      >
                        Baru
                      </motion.span>
                    )}
                  </div>

                  <div className="mb-2 space-y-1">
                    {order.items.map((it) => (
                      <div
                        key={it.name}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className="text-navy">
                          {it.emoji} {it.name} ×{it.qty}
                        </span>
                        <span className="font-semibold text-navy">
                          {formatIDR(it.price * it.qty)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3 flex items-center justify-between border-t border-navy/5 pt-2">
                    <span className="text-[11px] font-semibold text-slate-soft">
                      Total
                    </span>
                    <span className="font-heading text-sm font-bold text-navy">
                      {formatIDR(order.total)}
                    </span>
                  </div>

                  {/* Aksi kasir: terima order */}
                  {!cashierAck ? (
                    <motion.button
                      onClick={() => setCashierAck(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full rounded-lg bg-navy py-2 text-[11px] font-bold text-white shadow-lg"
                    >
                      ✓ Terima Order
                    </motion.button>
                  ) : (
                    <div className="space-y-1.5">
                      <p className="rounded-lg bg-electric-cyan/10 py-1.5 text-center text-[10px] font-bold text-electric-cyan">
                        Order diterima kasir ✓
                      </p>
                      {/* Status dapur live di layar kasir */}
                      <div
                        className={cn(
                          "flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[10px] font-bold",
                          status === "new" && "bg-amber-50 text-amber-600",
                          status === "accepted" && "bg-electric-cyan/10 text-electric-cyan",
                          status === "cooking" && "bg-orange-50 text-orange-600",
                          status === "ready" && "hidden"
                        )}
                      >
                        {status === "new" && "Menunggu dapur menerima..."}
                        {status === "accepted" && "Dapur menerima pesanan"}
                        {status === "cooking" && (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.9, repeat: Infinity }}
                          >
                            🔥 Dapur sedang memasak...
                          </motion.span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PESANAN READY — muncul otomatis saat dapur selesai */}
                  <AnimatePresence>
                    {status === "ready" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 250, damping: 15 }}
                        className="mt-1.5"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(34,197,94,0.4)",
                              "0 0 0 8px rgba(34,197,94,0)",
                            ],
                          }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                          className="rounded-lg bg-green-500 py-2.5 text-center"
                        >
                          <p className="text-[11px] font-bold uppercase tracking-wide text-white">
                            🍽️ Pesanan Ready!
                          </p>
                          <p className="text-[9px] text-green-100">
                            Antar ke Meja 4 sekarang
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </div>
  );

}
