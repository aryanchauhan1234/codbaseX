// src/lib/setupBattleSocket.js
import { socket } from "./socket";
import { useBattleStore } from "@/store/useBattleStore";

// Prevent duplicate listeners
let isInitialized = false;

export const setupBattleSocket = (navigate) => {
  if (isInitialized) return;
  isInitialized = true;

  const setBattleData = useBattleStore.getState().setBattleData;
  const updateSubmission = useBattleStore.getState().updateSubmission;

  console.log("hi88");
  socket.on("startBattle", (data) => {
    setBattleData({
      roomId: data.roomId,
      questions: data.questions,
      players: data.players,
      endTime: data.endTime,
    });
    navigate(`/battle/${data.roomId}`);
  });

  socket.on("battleTimerTick", ({ timeLeft }) => {
    useBattleStore.getState().setTimeLeft?.(timeLeft);
  });

  socket.on("submissionUpdate", ({ player, qIndex, result, liveScores }) => {
    updateSubmission(player, qIndex, result, liveScores);
  });

  socket.on("battleEnded", ({ scores, winner }) => {
    alert(`Battle Ended! Winner: ${winner}`);
    navigate("/result");
  });
};
