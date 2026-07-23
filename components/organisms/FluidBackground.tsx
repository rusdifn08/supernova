"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function FluidBackground() {
  const { scrollYProgress } = useScroll();
  // Parallax: blobs bergerak lebih lambat dari konten → depth perception
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Struktur nested: div luar menangani parallax scroll, div dalam
          BERKELANA BEBAS seperti awan — translasi x+y ratusan pixel dengan
          jalur acak-organik + perubahan warna senada + morph bentuk */}

      {/* Blob 1 — keluarga Cyan, mengembara dari kiri-atas ke tengah */}
      <motion.div style={{ y: y1 }} className="absolute -left-32 top-20">
        <motion.div
          animate={{
            x: [0, 220, 80, 300, -60, 0],
            y: [0, 120, 260, 40, 180, 0],
            scale: [1, 1.15, 0.9, 1.1, 0.95, 1],
            backgroundColor: [
              "rgba(6,182,212,0.30)", // electric cyan
              "rgba(14,165,233,0.30)", // sky
              "rgba(45,212,191,0.26)", // teal
              "rgba(34,211,238,0.30)", // cyan terang
              "rgba(14,165,233,0.28)", // sky
              "rgba(6,182,212,0.30)",
            ],
            borderRadius: [
              "50% 50% 50% 50%",
              "58% 42% 55% 45%",
              "45% 55% 42% 58%",
              "52% 48% 60% 40%",
              "47% 53% 44% 56%",
              "50% 50% 50% 50%",
            ],
          }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="h-[480px] w-[480px] blur-[100px]"
        />
      </motion.div>

      {/* Blob 2 — keluarga Ungu, mengembara dari kanan ke tengah-kiri */}
      <motion.div style={{ y: y2 }} className="absolute -right-40 top-[30%]">
        <motion.div
          animate={{
            x: [0, -260, -100, -340, 40, 0],
            y: [0, -140, 100, -60, -200, 0],
            scale: [1, 0.9, 1.18, 0.95, 1.08, 1],
            backgroundColor: [
              "rgba(124,58,237,0.25)", // vivid purple
              "rgba(99,102,241,0.25)", // indigo
              "rgba(168,85,247,0.27)", // purple terang
              "rgba(139,92,246,0.24)", // violet
              "rgba(99,102,241,0.26)", // indigo
              "rgba(124,58,237,0.25)",
            ],
            borderRadius: [
              "50% 50% 50% 50%",
              "44% 56% 48% 52%",
              "60% 40% 55% 45%",
              "48% 52% 42% 58%",
              "54% 46% 58% 42%",
              "50% 50% 50% 50%",
            ],
          }}
          transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
          className="h-[560px] w-[560px] blur-[110px]"
        />
      </motion.div>

      {/* Blob 3 — keluarga Magenta, mengembara dari bawah-tengah ke atas */}
      <motion.div style={{ y: y3 }} className="absolute bottom-[10%] left-[35%]">
        <motion.div
          animate={{
            x: [0, 180, -220, 100, -120, 0],
            y: [0, -180, -60, -260, 40, 0],
            scale: [1, 1.12, 0.88, 1.06, 0.96, 1],
            backgroundColor: [
              "rgba(217,70,239,0.20)", // hot magenta
              "rgba(236,72,153,0.23)", // luminous pink
              "rgba(192,38,211,0.20)", // fuchsia dalam
              "rgba(244,114,182,0.21)", // pink lembut
              "rgba(236,72,153,0.22)", // pink
              "rgba(217,70,239,0.20)",
            ],
            borderRadius: [
              "50% 50% 50% 50%",
              "55% 45% 58% 42%",
              "42% 58% 46% 54%",
              "57% 43% 50% 50%",
              "46% 54% 55% 45%",
              "50% 50% 50% 50%",
            ],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="h-[420px] w-[420px] blur-[100px]"
        />
      </motion.div>

      {/* Blob 4 — aksen pengembara lintas warna, jelajah paling jauh
          (kiri ↔ kanan layar) sebagai "jembatan" pertemuan warna */}
      <motion.div className="absolute left-[40%] top-[6%]">
        <motion.div
          animate={{
            x: [0, -380, 200, -160, 320, 0],
            y: [0, 200, 60, 320, 140, 0],
            scale: [1, 1.2, 0.85, 1.1, 0.9, 1],
            backgroundColor: [
              "rgba(6,182,212,0.14)",
              "rgba(124,58,237,0.15)",
              "rgba(217,70,239,0.12)",
              "rgba(14,165,233,0.14)",
              "rgba(168,85,247,0.13)",
              "rgba(6,182,212,0.14)",
            ],
          }}
          transition={{ duration: 54, repeat: Infinity, ease: "easeInOut" }}
          className="h-[380px] w-[380px] rounded-full blur-[110px]"
        />
      </motion.div>
      {/* Floating decorative pills */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[12%] top-[18%] h-16 w-16 rounded-2xl border border-white/60 bg-white/40 shadow-glass backdrop-blur-xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, -8, 4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[55%] h-10 w-10 rounded-full border border-white/60 bg-white/30 shadow-glass backdrop-blur-xl"
      />
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 10, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[22%] right-[22%] h-12 w-24 rounded-full border border-white/50 bg-gradient-to-r from-vivid-purple/20 to-electric-cyan/20 shadow-glass backdrop-blur-xl"
      />
    </div>
  );
}
