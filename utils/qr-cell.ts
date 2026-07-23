import { QR_GRID } from "@/data/qr-menu";

/** Pola QR realistis 13×13: 3 finder pattern + modul data pseudo-acak deterministik */
export function qrCell(r: number, c: number): boolean {
  const finder = (fr: number, fc: number) =>
    fr === 0 || fr === 4 || fc === 0 || fc === 4 || (fr === 2 && fc === 2);
  if (r < 5 && c < 5) return finder(r, c);
  if (r < 5 && c >= QR_GRID - 5) return finder(r, c - (QR_GRID - 5));
  if (r >= QR_GRID - 5 && c < 5) return finder(r - (QR_GRID - 5), c);
  return (r * 31 + c * 17 + ((r * c) % 7) * 13) % 9 < 4;
}
