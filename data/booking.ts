import { Camera, Package, Users } from "lucide-react";
import type { BookingPackage, BookingStudio } from "@/types/booking";

export const BOOKING_STUDIOS: BookingStudio[] = [
  { id: "A", name: "Studio A", type: "Self Photo", icon: Camera, from: 150000 },
  { id: "B", name: "Studio B", type: "Family & Group", icon: Users, from: 250000 },
  { id: "C", name: "Studio C", type: "Product Shoot", icon: Package, from: 350000 },
];

export const BOOKING_TIMES = ["13:00", "14:00", "15:00", "16:00"];

export const BOOKING_PACKAGES: BookingPackage[] = [
  { id: "basic", name: "Basic", dur: "30 menit", add: 0 },
  { id: "premium", name: "Premium", dur: "60 menit", add: 100000 },
  { id: "exclusive", name: "Exclusive", dur: "90 menit + Editing", add: 250000 },
];

export const BOOKING_STEP_LABELS = [
  "Pilih Studio",
  "Jadwal & Paket",
  "Pembayaran",
  "Sinkronisasi",
];
