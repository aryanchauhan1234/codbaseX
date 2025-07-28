import { create } from "zustand";

export const useBattleStore = create((set) => ({
  roomId: localStorage.getItem("battleRoomId") || null,
  questions: [],
  players: [],
  username: localStorage.getItem("username") || "Player",
  submissions: {},

  setBattleData: (data) =>
    set(() => {
      localStorage.setItem("battleRoomId", data.roomId); // ✅ persist
      return {
        roomId: data.roomId,
        questions: data.questions,
        players: data.players,
      };
    }),

  updateSubmission: (player, qIndex, result, liveScores) =>
    set((state) => ({
      submissions: {
        ...state.submissions,
        [player]: {
          ...state.submissions[player],
          [qIndex]: result,
          score: liveScores[player],
        },
      },
    })),

  resetBattleData: () =>
    set(() => {
      localStorage.removeItem("battleRoomId");
      return {
        roomId: null,
        questions: [],
        players: [],
        submissions: {},
      };
    }),
}));
