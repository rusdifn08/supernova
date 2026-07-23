import { create } from "zustand";
import type { PosCartItem } from "@/types/pos";

type PosSimulationState = {
  cart: PosCartItem[];
  stock: number;
  scanning: boolean;
  flashRow: boolean;
  _scanTimer: ReturnType<typeof setTimeout> | null;
  _flashTimer: ReturnType<typeof setTimeout> | null;
  simulateScan: () => void;
  reset: () => void;
};

const clearTimers = (state: PosSimulationState) => {
  if (state._scanTimer) clearTimeout(state._scanTimer);
  if (state._flashTimer) clearTimeout(state._flashTimer);
};

export const usePosSimulationStore = create<PosSimulationState>((set, get) => ({
  cart: [],
  stock: 100,
  scanning: false,
  flashRow: false,
  _scanTimer: null,
  _flashTimer: null,

  simulateScan: () => {
    const { scanning, stock } = get();
    if (scanning || stock <= 0) return;

    clearTimers(get());
    set({ scanning: true });

    const scanTimer = setTimeout(() => {
      set((s) => ({
        cart: [...s.cart, { name: "Premium Coffee", price: 35000 }],
        stock: s.stock - 1,
        flashRow: true,
        scanning: false,
        _scanTimer: null,
      }));

      const flashTimer = setTimeout(() => {
        set({ flashRow: false, _flashTimer: null });
      }, 800);
      set({ _flashTimer: flashTimer });
    }, 700);

    set({ _scanTimer: scanTimer });
  },

  reset: () => {
    clearTimers(get());
    set({
      cart: [],
      stock: 100,
      scanning: false,
      flashRow: false,
      _scanTimer: null,
      _flashTimer: null,
    });
  },
}));
