// store/useGlobalStore.js
import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  isLoading: false,
  setLoading: (val) => set({ isLoading: val }),
}));
