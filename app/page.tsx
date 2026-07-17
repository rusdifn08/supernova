"use client";

/**
 * ============================================================================
 * SUPERNOVA LABS STUDIO — Elite Landing Page
 * ============================================================================
 * CRO Psychology Map (Conversion Funnel):
 * 1. Hero         → Hook: "1x Bayar. Milik Anda Selamanya." (Liberation from SaaS)
 * 2. Social Proof → Authority before pitching
 * 3. Problem      → Agitate subscription fatigue vs ownership
 * 4. Simulations  → Prove technical superiority (Aha! moments)
 * 5. ROI Calc     → Financial closer (quantify waste)
 * 6. Tech Stack   → Justify premium price with elite stack
 * 7. FAQ          → Overcome final objections
 * 8. Lead Form    → Capture high-ticket leads
 * ============================================================================
 */

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coffee,
  Monitor,
  Smartphone,
  Globe,
  Sparkles,
  Zap,
  Shield,
  Lock,
  ArrowRight,
  Loader2,
  X,
  Send,
  Star,
  TrendingDown,
  Layers,
  ScanLine,
  MessageCircle,
  QrCode,
  CreditCard,
  Camera,
  Award,
  Wrench,
  Users,
  Wallet,
  Package,
  Phone,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* -------------------------------------------------------------------------- */
/*  UTILITIES                                                                  */
/* -------------------------------------------------------------------------- */

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ===== WhatsApp Links =====
// Konsultasi Gratis → link resmi wa.link
const WA_CONSULT_URL = "https://wa.link/y8k6c3";
// Order Langsung → wa.me ke 085174232225 dengan pesan terisi otomatis
const WA_ORDER_URL =
  "https://wa.me/6285174232225?text=" +
  encodeURIComponent(
    "Halo Supernova Labs Studio, saya tertarik order aplikasi multiplatform untuk bisnis saya."
  );
// Form leads → pesan berisi data form dikirim ke nomor ini
const WA_LEAD_NUMBER = "6285174289548";

function openWhatsApp(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

/* -------------------------------------------------------------------------- */
/*  SHARED ANIMATION VARIANTS                                                  */
/* -------------------------------------------------------------------------- */

const springReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

/* -------------------------------------------------------------------------- */
/*  ANIMATED TEXT HELPERS (loop, profesional & tidak norak)                    */
/* -------------------------------------------------------------------------- */

// Teks dengan sapuan kilau (shimmer) yang berjalan terus — aksen premium.
// Basis warna navy, kilau cyan; menghindari kesan "gradasi AI".
function ShimmerText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,#0F172A_35%,#06B6D4_50%,#0F172A_65%)]",
        "bg-[length:250%_100%] animate-shimmer",
        className
      )}
    >
      {children}
    </span>
  );
}

// 3 ikon platform (Desktop, Web, Mobile) — ikon murni tanpa kartu/background,
// dengan animasi mengambang halus DI TEMPAT (radius gerak kecil) + glow
// berwarna tema agar jelas terlihat tapi tidak mengganggu konten hero.
function FloatingPlatformIcons() {
  const platforms = [
    {
      icon: Monitor,
      color: "text-vivid-purple",
      glow: "drop-shadow-[0_6px_18px_rgba(124,58,237,0.5)]",
      pos: "left-[5%] top-[26%] lg:left-[9%]",
      dur: 6,
      delay: 0,
    },
    {
      icon: Globe,
      color: "text-electric-cyan",
      glow: "drop-shadow-[0_6px_18px_rgba(6,182,212,0.5)]",
      pos: "right-[5%] top-[22%] lg:right-[10%]",
      dur: 7,
      delay: 0.8,
    },
    {
      icon: Smartphone,
      color: "text-hot-magenta",
      glow: "drop-shadow-[0_6px_18px_rgba(217,70,239,0.5)]",
      pos: "bottom-[28%] right-[12%] lg:right-[15%]",
      dur: 5.5,
      delay: 0.4,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
      {platforms.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            // Gerak kecil di posisi masing-masing — tidak berkelana jauh
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1.9 + p.delay },
            scale: { duration: 0.8, delay: 1.9 + p.delay },
            y: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            rotate: {
              duration: p.dur * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
          className={cn("absolute", p.pos)}
        >
          <p.icon
            strokeWidth={1.7}
            className={cn("h-9 w-9 lg:h-10 lg:w-10", p.color, p.glow)}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Ikon 3 platform yang MENJELAJAH LUAS di dalam section (jangkauan translasi
// besar, jalur berbeda tiap ikon) — dipasang di setiap section utama dengan
// posisi awal yang berbeda-beda untuk terus menegaskan identitas multiplatform.
function SectionPlatformIcons({
  positions,
}: {
  // Kelas posisi Tailwind untuk [Desktop, Web, Mobile]
  positions: [string, string, string];
}) {
  const icons = [
    {
      icon: Monitor,
      color: "text-vivid-purple",
      glow: "drop-shadow-[0_6px_18px_rgba(124,58,237,0.45)]",
      path: { y: [0, -45, 25, -20, 0], x: [0, 35, -30, 20, 0], rotate: [0, 8, -6, 4, 0] },
      dur: 14,
      delay: 0,
    },
    {
      icon: Globe,
      color: "text-electric-cyan",
      glow: "drop-shadow-[0_6px_18px_rgba(6,182,212,0.45)]",
      path: { y: [0, 30, -40, 15, 0], x: [0, -40, 25, -15, 0], rotate: [0, -7, 5, -3, 0] },
      dur: 16,
      delay: 1,
    },
    {
      icon: Smartphone,
      color: "text-hot-magenta",
      glow: "drop-shadow-[0_6px_18px_rgba(217,70,239,0.45)]",
      path: { y: [0, -35, 20, -45, 0], x: [0, 25, -20, 35, 0], rotate: [0, 6, -8, 5, 0] },
      dur: 12,
      delay: 0.5,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
      {icons.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true }}
          animate={p.path}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            x: { duration: p.dur * 1.2, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            rotate: {
              duration: p.dur * 1.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
          className={cn("absolute", positions[i])}
        >
          <p.icon strokeWidth={1.7} className={cn("h-8 w-8", p.color, p.glow)} />
        </motion.div>
      ))}
    </div>
  );
}

// Trust-signal yang mengambang halus bergiliran (loop) + ikon berdenyut.
function FloatingSignal({
  icon: Icon,
  text,
  delay,
}: {
  icon: React.ElementType;
  text: string;
  delay: number;
}) {
  return (
    <motion.span
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="flex items-center gap-2 rounded-full border border-navy/[0.06] bg-white/60 px-4 py-2 text-xs font-semibold text-navy shadow-glass backdrop-blur-xl"
    >
      <motion.span
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-electric-cyan/10"
      >
        <Icon className="h-3.5 w-3.5 text-electric-cyan" />
      </motion.span>
      {text}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. FLUID BACKGROUND BLOBS (Parallax + Floating)                            */
/* -------------------------------------------------------------------------- */

function FluidBackground() {
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

/* -------------------------------------------------------------------------- */
/*  2. MAGNETIC CTA BUTTON                                                     */
/* -------------------------------------------------------------------------- */

function MagneticButton({
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

  // Primary: navy premium dengan aura glow berwarna yang "hidup" (loop) —
  // memancing klik tanpa terkesan norak (pola Linear/Raycast)
  const variants = {
    primary:
      "group bg-navy text-white ring-1 ring-white/10",
    secondary:
      "border-2 border-navy/10 bg-white/60 text-navy backdrop-blur-xl hover:border-navy/30 hover:bg-white/90 hover:shadow-glass-lg",
    ghost: "text-navy hover:text-vivid-purple",
  };

  const isPrimary = variant === "primary";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      // Glow berdenyut cyan↔ungu terus-menerus (CRO: tombol terasa "hidup")
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
        // Ikon di dalam tombol bergeser halus ke kanan saat hover
        "[&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
        className
      )}
    >
      {isPrimary && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          {/* Kilau otomatis melintas berkala (loop) — menarik mata ke CTA */}
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
          {/* Garis aksen cyan di tepi bawah — identitas tech */}
          <span className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-electric-cyan/70 to-transparent" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. GLASS CARD WRAPPER                                                      */
/* -------------------------------------------------------------------------- */

function GlassCard({
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
      style={tilt ? { rotateX: springX, rotateY: springY, transformPerspective: 900 } : undefined}
      whileHover={lift ? { y: -6, boxShadow: "0 24px 60px rgba(15,23,42,0.1)" } : undefined}
      transition={lift ? { type: "spring", stiffness: 250, damping: 22 } : undefined}
      className={cn(
        "rounded-3xl border border-white/80 bg-white/60 shadow-glass backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. NAVBAR                                                                  */
/* -------------------------------------------------------------------------- */

// Nav links tanpa pembungkus — tiap tombol berdiri sendiri. Scrollspy otomatis:
// saat user scroll, menu yang sesuai section aktif ter-highlight dan indikator
// underline cyan MELUNCUR antar tombol (layoutId). Klik = smooth scroll.
const NAV_SECTIONS = [
  { label: "Difference", id: "difference" },
  { label: "Product", id: "products" },
  { label: "ROI", id: "roi" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

function NavLinks({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [active, setActive] = useState<string>("");
  // Kunci scrollspy sesaat setelah klik agar indikator tidak "loncat-loncat"
  // melewati menu lain selama smooth scroll berlangsung
  const lockUntil = useRef(0);

  // Scrollspy KONTINU: pilih section terakhir yang sudah terlewati probe.
  // Dengan ini indikator tidak pernah hilang di antara dua section
  // (mis. saat melewati Tech Stack antara ROI dan FAQ) — transisi selalu
  // meluncur dari menu satu ke menu berikutnya.
  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      const probe = window.innerHeight * 0.42;
      let current = "";
      for (const s of NAV_SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    // Indikator langsung meluncur ke menu tujuan dalam SATU gerakan mulus,
    // scrollspy dikunci selama animasi scroll berjalan
    setActive(id);
    lockUntil.current = Date.now() + 1000;
    scrollTo(id);
  };

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_SECTIONS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-white" />
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

/* -------------------------------------------------------------------------- */
/*  5. HERO SECTION — The Hook                                                 */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  // Word-by-word reveal membangun anticipation on load (CRO: attention capture)
  const headline = [
    "Premium",
    "Multiplatform",
    "Apps.",
    "1x",
    "Bayar.",
    "Milik",
    "Anda",
    "Selamanya.",
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pb-14 pt-28 text-center"
    >
      {/* Ikon 3 platform glass melayang — penegasan keunggulan multiplatform */}
      <FloatingPlatformIcons />

      {/* Badge otoritas — positioning No.1 dengan animasi loop (glow + ping) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
        whileHover={{ scale: 1.04, y: -2 }}
        className="relative mb-6 inline-flex cursor-default items-center gap-3 overflow-hidden rounded-full border border-navy/[0.08] bg-white/70 px-6 py-2.5 shadow-glass backdrop-blur-xl sm:px-8 sm:py-3"
      >
        {/* Kilau berjalan di dalam badge (loop) */}
        <span className="pointer-events-none absolute inset-0">
          <span className="absolute -left-[60%] top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-electric-cyan/15 to-transparent animate-[shimmer_4s_linear_infinite]" />
        </span>
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full bg-navy"
        >
          <Award className="h-3.5 w-3.5 text-white" />
        </motion.span>
        <span className="relative font-heading text-sm font-bold tracking-tight text-navy sm:text-base">
          No. 1 Layanan Multiplatform System di Indonesia
        </span>
      </motion.div>

      {/* Sub-badge spesialisasi dengan shimmer teks (loop) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm"
      >
        <span className="h-px w-6 bg-navy/20" />
        <ShimmerText>Specialist All-in-One Multiplatform Apps</ShimmerText>
        <span className="h-px w-6 bg-navy/20" />
      </motion.div>

      <motion.h1
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {headline.map((word, i) => (
          <motion.span
            key={i}
            variants={wordReveal}
            className={cn(
              "mr-[0.3em] inline-block",
              // Highlight kata kunci dengan shimmer navy→cyan (loop) — bukan ungu
              (word === "1x" ||
                word === "Bayar." ||
                word === "Selamanya.") &&
              "bg-[linear-gradient(110deg,#0F172A_35%,#06B6D4_50%,#0F172A_65%)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer"
            )}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 20 }}
        className="mt-7 max-w-2xl text-base leading-relaxed text-slate-soft sm:text-lg"
      >
        <strong className="text-navy">Tinggalkan vendor lama.</strong> Kami
        hadirkan ekosistem lengkap (Web, Desktop, &amp; Mobile) yang
        terintegrasi penuh hanya dengan{" "}
        <strong className="text-navy">sekali bayar!</strong>{" "}
        <strong className="text-electric-cyan">Bebas Tambah Fitur Kapan Saja.</strong>
      </motion.p>

      {/* Value chips — 3 pembeda utama dengan animasi masuk berjenjang */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 1.3 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        {[
          {
            icon: Package,
            title: "3 Platform Sekaligus",
            sub: "Web · Desktop · Mobile",
            iconBg: "bg-electric-cyan",
            subColor: "text-electric-cyan",
            hoverGlow: "0 16px 40px rgba(6,182,212,0.3)",
            hoverBorder: "hover:border-electric-cyan/50",
            sweep: "via-electric-cyan/10",
            delay: 0,
          },
          {
            icon: Wallet,
            title: "Biaya Layanan Rp49rb",
            sub: "Ringan per bulan",
            iconBg: "bg-vivid-purple",
            subColor: "text-vivid-purple",
            hoverGlow: "0 16px 40px rgba(124,58,237,0.3)",
            hoverBorder: "hover:border-vivid-purple/50",
            sweep: "via-vivid-purple/10",
            delay: 0.5,
          },
          {
            icon: Wrench,
            title: "Custom Fitur Fleksibel",
            sub: "Biaya terjangkau",
            iconBg: "bg-hot-magenta",
            subColor: "text-hot-magenta",
            hoverGlow: "0 16px 40px rgba(217,70,239,0.3)",
            hoverBorder: "hover:border-hot-magenta/50",
            sweep: "via-hot-magenta/10",
            delay: 1,
          },
        ].map((chip) => (
          <motion.div
            key={chip.title}
            variants={wordReveal}
            whileHover={{ y: -5, scale: 1.04, boxShadow: chip.hoverGlow }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "group relative flex cursor-default items-center gap-3 overflow-hidden rounded-2xl border border-navy/[0.06] bg-white/70 px-4 py-3 text-left shadow-glass backdrop-blur-xl transition-colors",
              chip.hoverBorder
            )}
          >
            {/* Kilau berwarna melintas berkala (loop) — highlight keunggulan */}
            <span className="pointer-events-none absolute inset-0">
              <motion.span
                animate={{ left: ["-40%", "130%"] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                  delay: chip.delay,
                }}
                className={cn(
                  "absolute top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent to-transparent",
                  chip.sweep
                )}
              />
            </span>
            {/* Ikon berwarna tema dengan denyut halus (loop) */}
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: chip.delay,
              }}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110",
                chip.iconBg
              )}
            >
              <chip.icon className="h-4 w-4 text-white" />
            </motion.span>
            <span className="relative">
              <span className="block text-sm font-bold text-navy">
                {chip.title}
              </span>
              <span className={cn("block text-[11px] font-semibold", chip.subColor)}>
                {chip.sub}
              </span>
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 100, damping: 20 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        {/* Primary CTA — langsung buka chat WhatsApp (CRO: zero friction) */}
        <MagneticButton onClick={() => openWhatsApp(WA_CONSULT_URL)} pulse>
          <Phone className="h-4 w-4" />
          Konsultasi Gratis
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
        {/* Secondary CTA — menuju simulasi (CRO: engagement loop) */}
        <MagneticButton variant="secondary" onClick={() => scrollTo("products")}>
          Lihat Simulasi
          <Zap className="h-4 w-4 text-vivid-purple" />
        </MagneticButton>
      </motion.div>

      {/* Trust micro-signals — mengambang bergiliran (loop) + ikon berdenyut */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <FloatingSignal icon={Shield} text="Source Code 100% Anda" delay={0} />
        <FloatingSignal icon={Lock} text="Data Tidak Disandera" delay={0.4} />
        <FloatingSignal icon={Layers} text="Web · Desktop · Mobile" delay={0.8} />
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. SOCIAL PROOF MARQUEE                                                    */
/* -------------------------------------------------------------------------- */

function SocialProof() {
  const businesses = [
    "Lumina Photo Studio",
    "Warung Nusantara Group",
    "Pixel Gaming Arena",
    "Klinik Sehat Prima",
    "Boutique Atelier Jakarta",
    "Cafe Horizon Bali",
    "PS Zone Surabaya",
    "Dental Care Expert",
    "Retail Hub Indo",
    "SportZone Arena",
  ];
  const doubled = [...businesses, ...businesses];

  return (
    <section className="relative py-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-soft"
      >
        Trusted by 50+ Businesses in Indonesia
      </motion.p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-pearl to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-lavender-snow to-transparent" />
        <div className="flex w-max animate-marquee gap-10">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide text-navy/30 grayscale transition hover:text-navy/60 hover:grayscale-0"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. PROBLEM / AGITATION — SaaS vs Supernova                                 */
/* -------------------------------------------------------------------------- */

function ProblemSection() {
  const saasPoints = [
    "Beli Web & Mobile terpisah — biaya berlipat ganda",
    "Langganan bulanan mahal dan terus naik tiap tahun",
    "Data bisnis Anda disandera di cloud mereka",
    "Fitur dibatasi; setiap upgrade berbayar mahal",
    "Berhenti bayar → seluruh akses langsung hilang",
  ];
  const usPoints = [
    "Bayar 1x untuk 3 platform: Web, Desktop & Mobile sekaligus",
    "Biaya layanan ringan — hanya mulai Rp49.000/bulan",
    "Tambah fitur kustom kapan pun dengan biaya terjangkau",
    "Source code & data 100% milik Anda selamanya",
    "Unlimited users, tanpa paywall & tanpa data disandera",
  ];

  return (
    <section id="difference" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "left-[2%] top-[12%]",
          "right-[3%] top-[50%]",
          "left-[6%] bottom-[8%]",
        ]}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12 text-center"
      >
        <motion.span
          variants={springReveal}
          className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-electric-cyan"
        >
          Subscription Fatigue Ends Here
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl"
        >
          SaaS Tradisional vs{" "}
          <ShimmerText>Supernova Labs</ShimmerText>
        </motion.h2>
        <motion.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-xl text-slate-soft"
        >
          Setiap bulan Anda menyewa. Kami memberikan Anda kepemilikan.
        </motion.p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* LEFT — SaaS (muted, grayed out) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <GlassCard lift className="h-full p-8 opacity-70 grayscale">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200">
                <TrendingDown className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-500">
                  SaaS Tradisional
                </h3>
                <p className="text-xs text-slate-400">Bayar sewa selamanya</p>
              </div>
            </div>
            <ul className="space-y-3">
              {saasPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-500">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {p}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        {/* RIGHT — Supernova (highlighted, scaled up) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="md:scale-105"
        >
          <GlassCard lift className="relative h-full overflow-hidden p-8 ring-2 ring-vivid-purple/30">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-gradient opacity-20 blur-2xl" />
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">
                  Supernova Labs
                </h3>
                <p className="text-xs text-vivid-purple">1x Bayar · Milik Anda</p>
              </div>
              <span className="ml-auto rounded-full bg-luminous-pink/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-luminous-pink">
                Recommended
              </span>
            </div>
            <ul className="relative space-y-3">
              {usPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric-cyan" />
                  {p}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. PRODUCT SIMULATIONS                                                     */
/* -------------------------------------------------------------------------- */

/* --- Product 1: Booking Apps (Multi-step: Studio → Jadwal+Paket → Bayar → Sync) --- */
function BookingSimulation() {
  const studios = [
    { id: "A", name: "Studio A", type: "Self Photo", icon: Camera, from: 150000 },
    { id: "B", name: "Studio B", type: "Family & Group", icon: Users, from: 250000 },
    { id: "C", name: "Studio C", type: "Product Shoot", icon: Package, from: 350000 },
  ];
  const times = ["13:00", "14:00", "15:00", "16:00"];
  const packages = [
    { id: "basic", name: "Basic", dur: "30 menit", add: 0 },
    { id: "premium", name: "Premium", dur: "60 menit", add: 100000 },
    { id: "exclusive", name: "Exclusive", dur: "90 menit + Editing", add: 250000 },
  ];

  const [step, setStep] = useState(0); // 0 studio, 1 jadwal+paket, 2 bayar, 3 sync
  const [studio, setStudio] = useState<(typeof studios)[number] | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [pkg, setPkg] = useState<(typeof packages)[number] | null>(null);
  const [paying, setPaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const total = (studio?.from ?? 0) + (pkg?.add ?? 0);

  const pay = useCallback(() => {
    setPaying(true);
    // Simulasi proses payment gateway 1.2 detik
    setTimeout(() => {
      setPaying(false);
      setStep(3);
      setToast(
        `Pembayaran berhasil! Booking ${studio?.name} ${slot} tersinkron ke Customer & Admin di 3 platform.`
      );
      setTimeout(() => setToast(null), 4500);
    }, 1200);
  }, [studio, slot]);

  const reset = () => {
    setStep(0);
    setStudio(null);
    setSlot(null);
    setPkg(null);
  };

  const stepLabels = ["Pilih Studio", "Jadwal & Paket", "Pembayaran", "Sinkronisasi"];

  return (
    <GlassCard className="relative overflow-hidden p-6 sm:p-8">
      {/* Stepper header — indikator progres 4 langkah */}
      <div className="mb-8 flex items-center justify-between">
        {stepLabels.map((label, i) => (
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
            {i < stepLabels.length - 1 && (
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
              {studios.map((s) => (
                <motion.button
                  key={s.id}
                  onClick={() => {
                    setStudio(s);
                    setStep(1);
                  }}
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
              {times.map((t) => (
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
              {packages.map((p) => (
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
                onClick={() => setStep(0)}
                className="text-xs font-semibold text-slate-soft transition hover:text-navy"
              >
                ← Ganti studio
              </button>
              <MagneticButton
                onClick={() => slot && pkg && setStep(2)}
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
                onClick={() => setStep(1)}
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

/* --- Product 2: Cashier / POS + Inventory --- */
function PosSimulation() {
  const [cart, setCart] = useState<{ name: string; price: number }[]>([]);
  const [stock, setStock] = useState(100);
  const [scanning, setScanning] = useState(false);
  const [flashRow, setFlashRow] = useState(false);

  const simulateScan = useCallback(() => {
    if (scanning || stock <= 0) return;
    setScanning(true);
    // Laser scan visual 700ms, lalu item masuk cart + stock turun
    setTimeout(() => {
      setCart((prev) => [
        ...prev,
        { name: "Premium Coffee", price: 35000 },
      ]);
      setStock((s) => s - 1);
      setFlashRow(true);
      setScanning(false);
      setTimeout(() => setFlashRow(false), 800);
    }, 700);
  }, [scanning, stock]);

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

/* --- Product 3: QR Table Ordering (Scan → Menu Interaktif → Kitchen + Cashier) --- */

// Status pesanan yang tersinkron real-time di 3 perangkat
type OrderStatus = "new" | "accepted" | "cooking" | "ready";

// Menu yang bisa dipilih pelanggan
const QR_MENU = [
  { id: "fries", name: "Truffle Fries", emoji: "🍟", price: 45000 },
  { id: "burger", name: "Wagyu Burger", emoji: "🍔", price: 85000 },
  { id: "matcha", name: "Matcha Latte", emoji: "🍵", price: 38000 },
];

// Pola QR realistis 13×13: 3 finder pattern (kotak sudut) + modul data
// pseudo-acak deterministik — terlihat seperti QR code sungguhan
const QR_GRID = 13;
function qrCell(r: number, c: number): boolean {
  const finder = (fr: number, fc: number) =>
    fr === 0 || fr === 4 || fc === 0 || fc === 4 || (fr === 2 && fc === 2);
  if (r < 5 && c < 5) return finder(r, c);
  if (r < 5 && c >= QR_GRID - 5) return finder(r, c - (QR_GRID - 5));
  if (r >= QR_GRID - 5 && c < 5) return finder(r - (QR_GRID - 5), c);
  return (r * 31 + c * 17 + ((r * c) % 7) * 13) % 9 < 4;
}

function QrOrderingSimulation() {
  type Phase = "scan" | "scanning" | "menu" | "status";
  const [phase, setPhase] = useState<Phase>("scan");
  const [scanOk, setScanOk] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [order, setOrder] = useState<{
    items: { name: string; emoji: string; price: number; qty: number }[];
    total: number;
  } | null>(null);
  const [status, setStatus] = useState<OrderStatus>("new");
  const [cashierAck, setCashierAck] = useState(false);

  const scanTable = useCallback(() => {
    if (phase !== "scan") return;
    setPhase("scanning");
    // Laser sweep ~1.8s → flash sukses hijau → masuk ke menu
    setTimeout(() => setScanOk(true), 1800);
    setTimeout(() => setPhase("menu"), 2500);
  }, [phase]);

  const addItem = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const removeItem = (id: string) =>
    setCart((c) => {
      const qty = (c[id] ?? 0) - 1;
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const totalQty = Object.values(cart).reduce((s, q) => s + q, 0);
  const cartTotal = QR_MENU.reduce(
    (s, m) => s + (cart[m.id] ?? 0) * m.price,
    0
  );

  const placeOrder = useCallback(() => {
    if (totalQty === 0) return;
    const items = QR_MENU.filter((m) => cart[m.id]).map((m) => ({
      name: m.name,
      emoji: m.emoji,
      price: m.price,
      qty: cart[m.id],
    }));
    setOrder({ items, total: cartTotal });
    setStatus("new");
    setCashierAck(false);
    setPhase("status");
  }, [cart, cartTotal, totalQty]);

  const reset = () => {
    setPhase("scan");
    setScanOk(false);
    setCart({});
    setOrder(null);
    setStatus("new");
    setCashierAck(false);
  };

  // Posisi status pada timeline HP customer
  const statusStep = { new: 0, accepted: 1, cooking: 2, ready: 3 }[status];
  const phoneSteps = ["Terkirim", "Diterima", "Dimasak", "Ready"];

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
                    {phoneSteps.map((s, i) => (
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
                        {i < phoneSteps.length - 1 && (
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

/* --- Products Section with Tabs --- */
function ProductsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const products = [
    {
      id: "booking",
      label: "Booking System",
      icon: Clock,
      title: "Booking Apps with Management Operational",
      desc: "Real-time multiplatform booking yang mencegah double-booking. Zero missed revenue untuk studio foto, PS rental, klinik, dan arena olahraga.",
      market: "Photo Studios · PS Rentals · Clinics · Sports Arenas",
      component: <BookingSimulation />,
    },
    {
      id: "pos",
      label: "Cashier & Inventory",
      icon: ScanLine,
      title: "Cashier Apps & Automatic Stock Opname",
      desc: "POS secepat kilat terintegrasi native dengan inventory otomatis & QR barcode scanning. Stop kehilangan aset fisik.",
      market: "Retail · Pharmacy · F&B · Warehouse · Boutique",
      component: <PosSimulation />,
    },
    {
      id: "qr",
      label: "QR Table Ordering",
      icon: Smartphone,
      title: "Fully Integrated Contactless QR Table Ordering",
      desc: "Pelanggan cukup scan QR di meja, pilih menu, dan pesan dari HP. Order otomatis masuk ke Kitchen Display System & Cashier Display secara bersamaan — dapur memasak, kasir memantau, pelanggan melihat status live.",
      market: "Restaurant · Cafe · Coffee Shop · Beach Club",
      component: <QrOrderingSimulation />,
    },
  ];

  const current = products[activeTab];

  return (
    <section id="products" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "right-[2%] top-[8%]",
          "left-[2%] top-[38%]",
          "right-[5%] bottom-[12%]",
        ]}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12 text-center"
      >
        <motion.span
          variants={springReveal}
          className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-electric-cyan"
        >
          Interactive Portfolio
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl"
        >
          Tiga Pilar{" "}
          <ShimmerText>Produk Unggulan</ShimmerText>
        </motion.h2>
        <motion.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-xl text-slate-soft"
        >
          Jangan hanya baca — interaksikan. Klik, scan, dan lihat sistem
          bereaksi seperti software sungguhan.
        </motion.p>
      </motion.div>

      {/* Tabs — 3 Pilar utama: tombol BESAR & highlighted (produk = jantung bisnis) */}
      <div className="mb-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        {products.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => setActiveTab(i)}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "relative flex min-w-[240px] items-center gap-4 rounded-2xl px-6 py-5 text-left transition-colors sm:min-w-[260px]",
              activeTab === i
                ? "text-white"
                : "border border-navy/10 bg-white/70 text-navy backdrop-blur-xl hover:border-vivid-purple/40 hover:shadow-glass-lg"
            )}
          >
            {/* Highlight aktif meluncur mulus antar pilar (layoutId) */}
            {activeTab === i && (
              <motion.span
                layoutId="pillar-active-pill"
                transition={{ type: "spring", stiffness: 250, damping: 26 }}
                className="absolute inset-0 rounded-2xl bg-navy shadow-[0_20px_50px_rgba(15,23,42,0.35)] ring-2 ring-electric-cyan/40"
              />
            )}
            <span
              className={cn(
                "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                activeTab === i ? "bg-white/10" : "bg-vivid-purple/10"
              )}
            >
              <p.icon
                className={cn(
                  "h-6 w-6",
                  activeTab === i ? "text-electric-cyan" : "text-vivid-purple"
                )}
              />
            </span>
            <span className="relative z-10">
              <span
                className={cn(
                  "block text-[10px] font-bold uppercase tracking-[0.15em]",
                  activeTab === i ? "text-electric-cyan" : "text-slate-soft"
                )}
              >
                Pilar {i + 1}
              </span>
              <span className="block font-heading text-base font-bold sm:text-lg">
                {p.label}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Active Product Info + Simulation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="mb-8 text-center">
            <h3 className="font-heading text-xl font-bold text-navy sm:text-2xl">
              {current.title}
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-soft">
              {current.desc}
            </p>
            <p className="mt-2 text-xs font-semibold text-electric-cyan">
              {current.market}
            </p>
          </div>
          {current.component}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  9. ROI CALCULATOR — The Financial Closer                                   */
/* -------------------------------------------------------------------------- */

function RoiCalculator() {
  const [monthly, setMonthly] = useState(2_000_000);
  const min = 500_000;
  const max = 10_000_000;
  const years = 5;
  const wasted = monthly * 12 * years;
  const progress = ((monthly - min) / (max - min)) * 100;

  // Animated number counter
  const [display, setDisplay] = useState(wasted);
  useEffect(() => {
    let frame: number;
    const start = display;
    const diff = wasted - start;
    const duration = 400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + diff * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasted]);

  return (
    <section id="roi" className="relative mx-auto max-w-4xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "-left-[14%] top-[18%]",
          "-right-[16%] top-[35%]",
          "-left-[10%] bottom-[12%]",
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
          Financial Closer
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl"
        >
          Berapa yang Anda{" "}
          <ShimmerText>Buang?</ShimmerText>
        </motion.h2>
        <motion.p
          variants={springReveal}
          className="mx-auto mt-4 max-w-lg text-slate-soft"
        >
          Geser slider. Lihat berapa uang Anda yang hilang ke langganan SaaS
          dalam 5 tahun.
        </motion.p>
      </motion.div>

      <GlassCard className="p-8 sm:p-10">
        <label className="mb-2 block text-sm font-semibold text-navy">
          Biaya langganan software Anda per bulan?
        </label>
        <div className="mb-6 flex items-end justify-between">
          <span className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            {formatIDR(monthly)}
          </span>
          <span className="text-xs text-slate-soft">/bulan</span>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={100_000}
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          className="roi-slider mb-2"
          style={
            { "--slider-progress": `${progress}%` } as React.CSSProperties
          }
        />
        <div className="mb-10 flex justify-between text-[10px] font-medium text-slate-soft">
          <span>{formatIDR(min)}</span>
          <span>{formatIDR(max)}</span>
        </div>

        {/* Result — the gut-punch number */}
        <motion.div
          key={wasted}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl bg-gradient-to-br from-vivid-purple/10 via-hot-magenta/10 to-electric-cyan/10 p-6 text-center"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-soft">
            Dalam {years} tahun, Anda membuang
          </p>
          <p className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-5xl">
            {formatIDR(display)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-soft">
            Beralih ke{" "}
            <strong className="text-electric-cyan">Supernova Labs</strong> dan
            jadikan itu{" "}
            <strong className="text-navy">aset bisnis</strong> yang Anda miliki
            selamanya — bukan sewa yang hilang tiap bulan.
          </p>
        </motion.div>
      </GlassCard>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  10. TECH STACK MARQUEE                                                     */
/* -------------------------------------------------------------------------- */

function TechStack() {
  // Logo brand asli (gratis) via Simple Icons CDN — https://simpleicons.org
  const stack = [
    { name: "Next.js", slug: "nextdotjs/0F172A" },
    { name: "Rust", slug: "rust/CE412B" },
    { name: "Flutter", slug: "flutter" },
    { name: "Tauri", slug: "tauri" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Redis", slug: "redis" },
    { name: "Docker", slug: "docker" },
    { name: "TypeScript", slug: "typescript" },
  ];
  const doubled = [...stack, ...stack];

  return (
    <section className="py-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-soft"
      >
        Powered by Elite Tech Stack
      </motion.p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-pearl to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-lavender-snow to-transparent" />
        {/* Marquee berhenti saat hover agar logo bisa diamati */}
        <div className="flex w-max animate-marquee-fast gap-6 hover:[animation-play-state:paused]">
          {doubled.map((tech, i) => (
            <span
              key={`${tech.name}-${i}`}
              className="flex shrink-0 cursor-default items-center gap-2.5 rounded-2xl border border-white/80 bg-white/60 px-5 py-3 text-sm font-bold text-navy shadow-glass backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-vivid-purple/30 hover:shadow-glass-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt={`${tech.name} logo`}
                loading="lazy"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  11. FAQ — Overcoming Objections                                            */
/* -------------------------------------------------------------------------- */

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apakah ada biaya tersembunyi?",
      a: "Tidak ada. Anda membayar satu kali di awal untuk seluruh sistem (Web, Desktop & Mobile) yang menjadi milik Anda selamanya. Setelahnya hanya ada biaya layanan ringan mulai Rp49.000/bulan untuk pemeliharaan & dukungan — transparan, tanpa user-seat fee, dan tanpa fitur yang dikunci di balik paywall.",
    },
    {
      q: "Bagaimana dengan maintenance dan server?",
      a: "Sistem bisa di-deploy di server Anda sendiri (on-premise) atau cloud pilihan Anda (AWS, GCP, VPS lokal). Kami menyediakan dokumentasi lengkap + optional maintenance retainer jika Anda ingin dukungan berkelanjutan — sepenuhnya opsional, bukan kewajiban.",
    },
    {
      q: "Apakah bisa custom fitur sesuai bisnis saya?",
      a: "Ya — itu keunggulan utama kami. Setiap bisnis punya alur unik. Kami bangun sistem yang menyesuaikan workflow Anda (bukan sebaliknya seperti SaaS generik). Photo studio, F&B franchise, klinik, PS rental — semua bisa dikustomisasi penuh.",
    },
    {
      q: "Berapa lama proses pengerjaan?",
      a: "Tergantung scope. MVP multiplatform biasanya 6–12 minggu. Kami mulai dengan discovery call gratis untuk memetakan kebutuhan, lalu memberikan timeline & quotation yang transparan sebelum kontrak ditandatangani.",
    },
    {
      q: "Apakah tersedia di Web, Desktop, dan Mobile sekaligus?",
      a: "Ya. Itulah yang kami maksud 'All-in-One Multiplatform'. Satu codebase backend, tiga frontend (Web Next.js, Desktop Tauri/Rust, Mobile Flutter) yang tersinkronisasi real-time. Satu sistem, semua perangkat.",
    },
  ];

  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-5 py-24">
      <SectionPlatformIcons
        positions={[
          "-right-[20%] top-[10%]",
          "-left-[22%] top-[45%]",
          "-right-[15%] bottom-[15%]",
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
          FAQ
        </motion.span>
        <motion.h2
          variants={springReveal}
          className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl"
        >
          Pertanyaan yang Sering{" "}
          <ShimmerText>Muncul</ShimmerText>
        </motion.h2>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <GlassCard key={i} className="overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="pr-4 font-heading text-sm font-semibold text-navy sm:text-base">
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0"
              >
                <ChevronDown className="h-5 w-5 text-vivid-purple" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-navy/5 px-6 pb-5 pt-3 text-sm leading-relaxed text-slate-soft">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  12. LEAD FORM — Ultimate CTA                                               */
/* -------------------------------------------------------------------------- */

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    whatsapp: "",
  });

  // Label jenis bisnis yang mudah dibaca di pesan WhatsApp
  const businessLabels: Record<string, string> = {
    "photo-studio": "Photo Studio",
    fnb: "F&B / Cafe / Restaurant",
    retail: "Retail / Boutique",
    "ps-gaming": "PS / Gaming Rental",
    clinic: "Klinik / Dental",
    sports: "Sports Arena",
    other: "Lainnya",
  };

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
      `Jenis Bisnis: ${businessLabels[form.business] ?? form.business}`,
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

/* -------------------------------------------------------------------------- */
/*  13. FOOTER                                                                 */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-navy/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="font-heading text-sm font-bold text-navy">
            Supernova Labs Studio
          </span>
        </div>
        <p className="text-xs text-slate-soft">
          © {new Date().getFullYear()} · Specialist All-in-One Multiplatform
          Apps · 1x Bayar, Milik Anda Selamanya
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  14. SCROLL PROGRESS BAR                                                    */
/* -------------------------------------------------------------------------- */

// Indikator progres baca di paling atas — micro-interaction trending yang
// membuat halaman terasa "hidup" dan mendorong user scroll sampai bawah
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-vivid-purple"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  15. FLOATING WHATSAPP — Order Langsung                                     */
/* -------------------------------------------------------------------------- */

// CRO: jalur konversi instan yang selalu terlihat — klien bisa order langsung
// via WhatsApp (085174232225) tanpa harus scroll ke form.
function WhatsAppFloat() {
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

/* -------------------------------------------------------------------------- */
/*  ROOT PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <FluidBackground />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <ProblemSection />
        <ProductsSection />
        <RoiCalculator />
        <TechStack />
        <FaqSection />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
