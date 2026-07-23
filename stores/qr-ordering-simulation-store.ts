import { create } from "zustand";
import { QR_MENU } from "@/data/qr-menu";
import type {
  OrderStatus,
  QrOrder,
  QrPhase,
} from "@/types/qr-ordering";

type QrOrderingSimulationState = {
  phase: QrPhase;
  scanOk: boolean;
  cart: Record<string, number>;
  order: QrOrder | null;
  status: OrderStatus;
  cashierAck: boolean;
  _scanOkTimer: ReturnType<typeof setTimeout> | null;
  _menuTimer: ReturnType<typeof setTimeout> | null;
  scanTable: () => void;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  placeOrder: () => void;
  setStatus: (status: OrderStatus) => void;
  setCashierAck: (ack: boolean) => void;
  reset: () => void;
};

const clearTimers = (state: QrOrderingSimulationState) => {
  if (state._scanOkTimer) clearTimeout(state._scanOkTimer);
  if (state._menuTimer) clearTimeout(state._menuTimer);
};

export const useQrOrderingSimulationStore = create<QrOrderingSimulationState>(
  (set, get) => ({
    phase: "scan",
    scanOk: false,
    cart: {},
    order: null,
    status: "new",
    cashierAck: false,
    _scanOkTimer: null,
    _menuTimer: null,

    scanTable: () => {
      if (get().phase !== "scan") return;
      clearTimers(get());
      set({ phase: "scanning", scanOk: false });

      const scanOkTimer = setTimeout(() => {
        set({ scanOk: true, _scanOkTimer: null });
      }, 1800);

      const menuTimer = setTimeout(() => {
        set({ phase: "menu", _menuTimer: null });
      }, 2500);

      set({ _scanOkTimer: scanOkTimer, _menuTimer: menuTimer });
    },

    addItem: (id) =>
      set((s) => ({ cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 } })),

    removeItem: (id) =>
      set((s) => {
        const qty = (s.cart[id] ?? 0) - 1;
        const next = { ...s.cart };
        if (qty <= 0) delete next[id];
        else next[id] = qty;
        return { cart: next };
      }),

    placeOrder: () => {
      const { cart } = get();
      const totalQty = Object.values(cart).reduce((sum, q) => sum + q, 0);
      if (totalQty === 0) return;

      const items = QR_MENU.filter((m) => cart[m.id]).map((m) => ({
        name: m.name,
        emoji: m.emoji,
        price: m.price,
        qty: cart[m.id],
      }));
      const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

      set({
        order: { items, total },
        status: "new",
        cashierAck: false,
        phase: "status",
      });
    },

    setStatus: (status) => set({ status }),
    setCashierAck: (cashierAck) => set({ cashierAck }),

    reset: () => {
      clearTimers(get());
      set({
        phase: "scan",
        scanOk: false,
        cart: {},
        order: null,
        status: "new",
        cashierAck: false,
        _scanOkTimer: null,
        _menuTimer: null,
      });
    },
  })
);
