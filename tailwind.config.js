/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ===== SUPERNOVA LABS DESIGN SYSTEM (Light & Vibrant Edition) =====
        pearl: "#F8FAFC", // Soft Pearl - background dominan
        "lavender-snow": "#F5F3FF", // Lavender Snow - background gradasi
        "electric-cyan": "#06B6D4", // Electric Cyan - aksen fluid
        "vivid-purple": "#7C3AED", // Vivid Purple - brand utama
        "hot-magenta": "#D946EF", // Hot Magenta - aksen gradasi
        "luminous-pink": "#EC4899", // Luminous Pink - badge/notifikasi
        navy: "#0F172A", // Deep Space Navy - teks utama
        "slate-soft": "#64748B", // Slate Gray - teks sekunder
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        // Multi-layered premium glass shadow
        glass:
          "0 8px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)",
        "glass-lg":
          "0 20px 60px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)",
        // Glowing brand shadow untuk CTA hover
        "glow-purple": "0 15px 40px rgba(124,58,237,0.4)",
        "glow-cyan": "0 15px 40px rgba(6,182,212,0.35)",
        "glow-pink": "0 10px 30px rgba(236,72,153,0.35)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
        "brand-gradient-radial":
          "radial-gradient(circle at 30% 30%, #7C3AED 0%, #D946EF 50%, #06B6D4 100%)",
        "text-gradient":
          "linear-gradient(90deg, #7C3AED 0%, #D946EF 50%, #06B6D4 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(15,23,42,0.3)" },
          "50%": { boxShadow: "0 0 0 14px rgba(15,23,42,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "border-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-fast": "marquee 22s linear infinite",
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "border-flow": "border-flow 6s ease infinite",
      },
    },
  },
  plugins: [],
};
