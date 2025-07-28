import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
 setAuthUser: (user) => set({ authUser: user }),
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      
      // Clear any cached data
      localStorage.removeItem("battleRoomId");
      localStorage.removeItem("battlePlayers");
      localStorage.removeItem("battleQuestions");
      localStorage.removeItem("battleEndTime");
      localStorage.removeItem("username");
      
      // Navigate to login page
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
   // ✅ Update only cfHandle in authUser
  updateCFHandle: (cfHandle) => {
    set((state) => ({
      authUser: {
        ...state.authUser,
        cfHandle,
      },
    }));
  },
  updateLeetHandle: (leetHandle) =>
  set((state) => ({
    authUser: { ...state.authUser, leetHandle },
  })),
}));
