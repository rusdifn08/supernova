export type OrderStatus = "new" | "accepted" | "cooking" | "ready";

export type QrPhase = "scan" | "scanning" | "menu" | "status";

export type QrMenuItem = {
  id: string;
  name: string;
  emoji: string;
  price: number;
};

export type QrOrderItem = {
  name: string;
  emoji: string;
  price: number;
  qty: number;
};

export type QrOrder = {
  items: QrOrderItem[];
  total: number;
};
