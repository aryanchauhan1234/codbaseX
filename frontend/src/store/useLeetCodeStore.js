import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useLeetCodeStore = create((set, get) => ({
  leetHandle: null,
  leetStats: null,
  isLoading: false,
  error: null,

  // 🔄 Manually set handle
  setLeetHandle: (handle) => set({ leetHandle: handle }),

  // ✅ Update handle in backend + sync with auth store
  updateLeetHandle: async (leetHandle) => {
    const token = useAuthStore.getState().token;
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(
        "/leetcode/update-leetcode",
        { leetHandle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({ leetHandle: res.data.leetHandle });
      useAuthStore.getState().updateLeetHandle(res.data.leetHandle);

      return { success: true };
    } catch (err) {
      console.error("Update handle error:", err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to update handle",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  // 📊 Fetch full LeetCode stats
  fetchLeetCodeStats: async (handle) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axiosInstance.get(`/leetcode/stats/${handle}`);
      const data = res.data;

      set({
        leetStats: {
          username: data.username,
          totalSolved: data.totalSolved,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
          contests: data.contests,
          rating: data.rating,
          globalRank: data.globalRank,
          topPercent: data.topPercent,
          topicWiseSolved: data.topicWiseSolved || {}, // ✅ include topic stats safely
        },
        leetHandle: data.username,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error("LeetCode fetch error:", err.message);
      set({
        error: err.response?.data?.message || "Failed to fetch LeetCode data",
        isLoading: false,
      });
    }
  },

  // ♻️ Reset store state
  resetLeetCodeData: () =>
    set({
      leetHandle: null,
      leetStats: null,
      isLoading: false,
      error: null,
    }),
}));
