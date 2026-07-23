import { Clock, ScanLine, Smartphone } from "lucide-react";
import type { ProductTab } from "@/types/products";

export const PRODUCT_TABS: ProductTab[] = [
  {
    id: "booking",
    label: "Booking System",
    icon: Clock,
    title: "Booking Apps with Management Operational",
    desc: "Real-time multiplatform booking yang mencegah double-booking. Zero missed revenue untuk studio foto, PS rental, klinik, dan arena olahraga.",
    market: "Photo Studios · PS Rentals · Clinics · Sports Arenas",
  },
  {
    id: "pos",
    label: "Cashier & Inventory",
    icon: ScanLine,
    title: "Cashier Apps & Automatic Stock Opname",
    desc: "POS secepat kilat terintegrasi native dengan inventory otomatis & QR barcode scanning. Stop kehilangan aset fisik.",
    market: "Retail · Pharmacy · F&B · Warehouse · Boutique",
  },
  {
    id: "qr",
    label: "QR Table Ordering",
    icon: Smartphone,
    title: "Fully Integrated Contactless QR Table Ordering",
    desc: "Pelanggan cukup scan QR di meja, pilih menu, dan pesan dari HP. Order otomatis masuk ke Kitchen Display System & Cashier Display secara bersamaan — dapur memasak, kasir memantau, pelanggan melihat status live.",
    market: "Restaurant · Cafe · Coffee Shop · Beach Club",
  },
];
