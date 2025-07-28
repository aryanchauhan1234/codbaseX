import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDark: false,

  toggleTheme: () =>
    set((state) => {
      const newMode = !state.isDark;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return { isDark: newMode };
    }),

  initializeTheme: () => {
    const stored = localStorage.getItem("darkMode");
    const isDark = stored ? JSON.parse(stored) : false;

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    set({ isDark });
  },
}));

export default useThemeStore;
