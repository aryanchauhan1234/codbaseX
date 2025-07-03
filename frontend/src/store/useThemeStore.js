// import { create } from "zustand";

<<<<<<< HEAD
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "winter",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
=======
// export const useThemeStore = create((set) => ({
//   theme: localStorage.getItem("chat-theme") || "winter",
//   setTheme: (theme) => {
//     localStorage.setItem("chat-theme", theme);
//     set({ theme });
//   },
// }));
>>>>>>> 4345ce6 (update1)
