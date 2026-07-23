import type { QrMenuItem } from "@/types/qr-ordering";

export const QR_MENU: QrMenuItem[] = [
  { id: "fries", name: "Truffle Fries", emoji: "🍟", price: 45000 },
  { id: "burger", name: "Wagyu Burger", emoji: "🍔", price: 85000 },
  { id: "matcha", name: "Matcha Latte", emoji: "🍵", price: 38000 },
];

export const QR_GRID = 13;

export const QR_PHONE_STEPS = ["Terkirim", "Diterima", "Dimasak", "Ready"];
