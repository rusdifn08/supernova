import { create } from "zustand";

type ProductsState = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

export const useProductsStore = create<ProductsState>((set) => ({
  activeTab: 0,
  setActiveTab: (activeTab) => set({ activeTab }),
}));
