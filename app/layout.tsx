import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Space Grotesk: heading geometris modern dengan kerning rapat (otoritas visual)
const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

// Plus Jakarta Sans: body font bersih & sangat legible
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Supernova Labs Studio — Premium Multiplatform Apps. 1x Bayar, Milik Anda Selamanya.",
  description:
    "Kami membangun sistem enterprise multiplatform (Web, Desktop, Mobile) yang 100% milik Anda. Tanpa langganan bulanan. Tanpa data disandera. Booking System, POS + Inventory, dan QR Table Ordering.",
  keywords: [
    "software agency",
    "aplikasi kasir",
    "booking system",
    "QR table ordering",
    "multiplatform apps",
    "one-time payment software",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${heading.variable} ${body.variable} font-body bg-pearl text-navy antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
