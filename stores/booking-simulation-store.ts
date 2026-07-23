import { create } from "zustand";
import type {
  BookingPackage,
  BookingStep,
  BookingStudio,
} from "@/types/booking";

type BookingSimulationState = {
  step: BookingStep;
  studio: BookingStudio | null;
  slot: string | null;
  pkg: BookingPackage | null;
  paying: boolean;
  toast: string | null;
  _payTimer: ReturnType<typeof setTimeout> | null;
  _toastTimer: ReturnType<typeof setTimeout> | null;
  selectStudio: (studio: BookingStudio) => void;
  setSlot: (slot: string) => void;
  setPkg: (pkg: BookingPackage) => void;
  setStep: (step: BookingStep) => void;
  pay: () => void;
  reset: () => void;
  clearToast: () => void;
};

const clearTimers = (state: BookingSimulationState) => {
  if (state._payTimer) clearTimeout(state._payTimer);
  if (state._toastTimer) clearTimeout(state._toastTimer);
};

export const useBookingSimulationStore = create<BookingSimulationState>(
  (set, get) => ({
    step: 0,
    studio: null,
    slot: null,
    pkg: null,
    paying: false,
    toast: null,
    _payTimer: null,
    _toastTimer: null,

    selectStudio: (studio) => set({ studio, step: 1 }),
    setSlot: (slot) => set({ slot }),
    setPkg: (pkg) => set({ pkg }),
    setStep: (step) => set({ step }),

    pay: () => {
      const { studio, slot } = get();
      clearTimers(get());
      set({ paying: true });

      const payTimer = setTimeout(() => {
        const toast = `Pembayaran berhasil! Booking ${studio?.name} ${slot} tersinkron ke Customer & Admin di 3 platform.`;
        set({ paying: false, step: 3, toast, _payTimer: null });

        const toastTimer = setTimeout(() => {
          set({ toast: null, _toastTimer: null });
        }, 4500);
        set({ _toastTimer: toastTimer });
      }, 1200);

      set({ _payTimer: payTimer });
    },

    reset: () => {
      clearTimers(get());
      set({
        step: 0,
        studio: null,
        slot: null,
        pkg: null,
        paying: false,
        toast: null,
        _payTimer: null,
        _toastTimer: null,
      });
    },

    clearToast: () => set({ toast: null }),
  })
);
