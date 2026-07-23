"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WA_ORDER_URL } from "@/config/whatsapp";

// CRO: jalur konversi instan yang selalu terlihat — klien bisa order langsung
// via WhatsApp (085174232225) tanpa harus scroll ke form.
export function WhatsAppFloat() {
  return (
    <motion.a
      href={WA_ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-4 pr-6 text-white shadow-[0_12px_35px_rgba(37,211,102,0.45)] transition-shadow hover:shadow-[0_18px_45px_rgba(37,211,102,0.55)]"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-25" />
        <MessageCircle className="relative h-5 w-5 fill-white/20" />
      </span>
      <span className="text-sm font-bold tracking-tight">Order Langsung</span>
    </motion.a>
  );
}
