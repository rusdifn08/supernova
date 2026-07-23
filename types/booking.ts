import type { LucideIcon } from "lucide-react";

export type BookingStudio = {
  id: string;
  name: string;
  type: string;
  icon: LucideIcon;
  from: number;
};

export type BookingPackage = {
  id: string;
  name: string;
  dur: string;
  add: number;
};

export type BookingStep = 0 | 1 | 2 | 3;
