import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import dayjs from "dayjs";
import { useAuthStore } from "./useAuthStore"; // ✅ import to get cfHandle

export const useCfStorestemp = create((set, get) => ({
  isLoading: false,
  friendComparisons: [],

  setLoading: (val) => set({ isLoading: val }),

  updateCfHandle: async (cfHandle) => {
    const token = get().token;
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post(
        "/cfusers/cf-handle",
        { cfHandle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Also update the authUser store cfHandle
      useAuthStore.getState().updateCFHandle(cfHandle);
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCFData: async () => {
    const handle = useAuthStore.getState().authUser?.cfHandle;
    if (!handle) return null;

    try {
      set({ isLoading: true });
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const data = await res.json();
      return data.status === "OK" ? data.result[0] : null;
    } catch (err) {
      console.error("CF fetch error:", err);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCFSubmissions: async (count = 100) => {
    const handle = useAuthStore.getState().authUser?.cfHandle;
    if (!handle) return [];

    try {
      set({ isLoading: true });
      const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=${count}`
      );
      const data = await res.json();
      return data.status === "OK" ? data.result : [];
    } catch (err) {
      console.error("CF submissions fetch error:", err);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCFSubmissionsheat: async (count = 1000) => {
    const handle = useAuthStore.getState().authUser?.cfHandle;
    if (!handle) return [];

    try {
      set({ isLoading: true });
      const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=${count}`
      );
      const data = await res.json();
      return data.status === "OK" ? data.result : [];
    } catch (err) {
      console.error("CF heatmap fetch error:", err);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCFUserRating: async () => {
    const handle = useAuthStore.getState().authUser?.cfHandle;
    if (!handle) return [];

    try {
      set({ isLoading: true });
      const res = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
      const data = await res.json();
      return data.result;
    } catch (err) {
      console.error("CF user rating error:", err);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  groupSubmissionsByDate: (submissions) => {
    const map = new Map();
    submissions.forEach((sub) => {
      const date = dayjs.unix(sub.creationTimeSeconds).format("YYYY-MM-DD");
      map.set(date, (map.get(date) || 0) + 1);
    });
    return map;
  },

  compareFriends: async () => {
    const token = get().token;
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post(
        "/cfusers/compare-friends",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (err) {
      console.error("Compare Friends Error:", err);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  addFriends: async (friends) => {
    const token = get().token;
    try {
      set({ isLoading: true });
      await axiosInstance.post(
        "/cfusers/add-friends",
        { friends },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return true;
    } catch (err) {
      console.error("Add friends error:", err);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFriendComparisons: async () => {
    try {
      const res = await axios.get("/api/cf/friend-comparison");
      set({ friendComparisons: res.data });
    } catch (err) {
      console.error("Error fetching friend comparisons:", err);
    }
  },
  getTotalCFSolved: async () => {
  const handle = useAuthStore.getState().authUser?.cfHandle;
  if (!handle) return 0;

  try {
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`
    );
    const data = await res.json();
    if (data.status !== "OK") return 0;

    const submissions = data.result;
    const solvedSet = new Set();

    submissions.forEach((sub) => {
      if (sub.verdict === "OK") {
        const uniqueId = `${sub.problem.contestId}-${sub.problem.index}`;
        solvedSet.add(uniqueId);
      }
    });

    return solvedSet.size;
  } catch (err) {
    console.error("CF solved fetch error:", err);
    return 0;
  }
},

}));
