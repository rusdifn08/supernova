"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, ScanLine } from "lucide-react";
import { GlassCard } from "@/components/molecules/GlassCard";
import { usePosSimulationStore } from "@/stores/pos-simulation-store";
import { cn } from "@/utils/cn";
import { formatIDR } from "@/utils/format-idr";

export function PosSimulation() {
  const cart = usePosSimulationStore((s) => s.cart);
  const stock = usePosSimulationStore((s) => s.stock);
  const scanning = usePosSimulationStore((s) => s.scanning);
  const flashRow = usePosSimulationStore((s) => s.flashRow);
  const simulateScan = usePosSimulationStore((s) => s.simulateScan);

  useEffect(() => {
    return () => {
      usePosSimulationStore.getState().reset();
    };
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* LEFT: POS Checkout */}
      <GlassCard className="p-5" tilt>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-heading text-sm font-bold text-navy">
            POS Checkout
          </h4>
          <span className="rounded-full bg-vivid-purple/10 px-2 py-0.5 text-[10px] font-bold text-vivid-purple">
            LIVE
          </span>
        </div>

        {/* Scan Button with laser effect */}
        <motion.button
          onClick={simulateScan}
          disabled={scanning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative mb-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-vivid-purple/40 bg-vivid-purple/5 py-4 text-sm font-semibold text-vivid-purple"
        >
          {scanning && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.7, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-luminous-pink to-transparent shadow-[0_0_12px_#EC4899]"
            />
          )}
          <ScanLine className={cn("h-4 w-4", scanning && "animate-pulse")} />
          {scanning ? "Scanning QR..." : "Simulate Scan QR: Add 'Premium Coffee'"}
        </motion.button>

        <div className="min-h-[140px] space-y-2">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center text-xs text-slate-soft"
              >
                Keranjang kosong — scan untuk menambah item
              </motion.p>
            )}
            {cart.map((item, i) => (
              <motion.div
                key={`${item.name}-${i}`}
                initial={{ opacity: 0, x: -30, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-vivid-purple" />
                  <span className="text-sm font-medium text-navy">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-navy">
                  {formatIDR(item.price)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-navy/5 pt-3">
          <span className="text-xs font-medium text-slate-soft">Total</span>
          <span className="font-heading text-lg font-bold text-navy">
            {formatIDR(total)}
          </span>
        </div>
      </GlassCard>

      {/* RIGHT: Inventory Database */}
      <GlassCard className="p-5" tilt>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-heading text-sm font-bold text-navy">
            Inventory Database
          </h4>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-soft">
            Auto Sync
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-navy/5">
          <div className="grid grid-cols-3 bg-navy/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-soft">
            <span>SKU</span>
            <span>Item</span>
            <span className="text-right">Stock</span>
          </div>
          <motion.div
            animate={
              flashRow
                ? { backgroundColor: ["rgb(220,252,231)", "rgba(255,255,255,0.8)"] }
                : {}
            }
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 items-center bg-white/80 px-3 py-3 text-sm"
          >
            <span className="font-mono text-xs text-slate-soft">CF-001</span>
            <span className="font-medium text-navy">Premium Coffee</span>
            <motion.span
              key={stock}
              initial={{ scale: 1.3, color: "#16a34a" }}
              animate={{ scale: 1, color: "#0F172A" }}
              className="text-right font-heading text-base font-bold"
            >
              {stock}
            </motion.span>
          </motion.div>
          {[
            { sku: "TF-012", name: "Truffle Fries", stock: 48 },
            { sku: "ML-003", name: "Matcha Latte", stock: 72 },
          ].map((row) => (
            <div
              key={row.sku}
              className="grid grid-cols-3 border-t border-navy/5 bg-white/50 px-3 py-3 text-sm"
            >
              <span className="font-mono text-xs text-slate-soft">{row.sku}</span>
              <span className="font-medium text-navy">{row.name}</span>
              <span className="text-right font-heading font-bold text-navy">
                {row.stock}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-soft">
          Stock berkurang otomatis saat scan — zero lag inventory
        </p>
      </GlassCard>
    </div>
  );

}
