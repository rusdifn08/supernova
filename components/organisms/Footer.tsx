"use client";

import Image from "next/image";
import logo from "@/app/logo.webp";

export function Footer() {
  return (
    <footer className="border-t border-navy/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center">
            <Image
              src={logo}
              alt="Supernova Labs Studio"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
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
