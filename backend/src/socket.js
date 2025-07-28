import { Server } from "socket.io";
import fs from "fs";

// ✅ Load questions from correct path
const battleQuestions = JSON.parse(fs.readFileSync("src/data/battleQuestions.json"));

const getRandomQuestions = (count = 3) => {
  const shuffled = [...battleQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const BATTLE_DURATION = 60 * 60 * 1000; // 1 hour in ms

export const setupSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  const rooms = {}; // key = roomId

  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    socket.on("createRoom", ({ username }) => {
      const roomId = Math.random().toString(36).substring(2, 8);
      rooms[roomId] = {
        players: [{ id: socket.id, username }],
        questions: getRandomQuestions(),
        submissions: {},
        timer: null,
        startTime: null,
        endTime: null,
      };
      socket.join(roomId);
      socket.emit("roomCreated", { roomId });
    });

    socket.on("joinRoom", ({ roomId, username }) => {
      const room = rooms[roomId];
      if (!room || room.players.length >= 2) {
        socket.emit("error", { message: "Invalid or full room" });
        return;
      }

      room.players.push({ id: socket.id, username });
      socket.join(roomId);

      const now = Date.now();
      room.startTime = now;
      room.endTime = now + BATTLE_DURATION;

      io.to(roomId).emit("startBattle", {
        roomId,
        players: room.players.map((p) => p.username),
        questions: room.questions,
        endTime: room.endTime,
      });

      room.timer = setInterval(() => {
        const timeLeft = Math.max(0, Math.floor((room.endTime - Date.now()) / 1000));
        io.to(roomId).emit("battleTimerTick", { timeLeft });

        if (timeLeft <= 0) {
          clearInterval(room.timer);
          finishBattle(roomId);
        }
      }, 1000);
    });

    socket.on("submitCode", ({ roomId, player, qIndex, result }) => {
      const room = rooms[roomId];
      if (!room) return;

      room.submissions[player] = room.submissions[player] || [];
      room.submissions[player][qIndex] = result;

      const liveScores = calculateScores(room);
      io.to(roomId).emit("submissionUpdate", {
        player,
        qIndex,
        result,
        liveScores,
      });

      const allDone = room.players.every((p) => {
        return room.submissions[p.username]?.length === 3;
      });

      if (allDone) {
        clearInterval(room.timer);
        finishBattle(roomId);
      }
    });

    // ✅ NEW: End Battle manually
    socket.on("endBattle", ({ roomId }) => {
      const room = rooms[roomId];
      if (!room) return;

      clearInterval(room.timer);
      finishBattle(roomId);
    });

    // ✅ ✅ ✅ REJOIN ROOM after refresh
    socket.on("rejoinRoom", ({ roomId, username }) => {
      const room = rooms[roomId];
      if (!room) {
        socket.emit("error", { message: "Room not found or expired" });
        return;
      }

      const player = room.players.find((p) => p.username === username);
      if (player) {
        player.id = socket.id;
        socket.join(roomId);
        console.log(`${username} rejoined room ${roomId}`);

        const timeLeft = Math.max(0, Math.floor((room.endTime - Date.now()) / 1000));

        socket.emit("startBattle", {
          roomId,
          players: room.players.map((p) => p.username),
          questions: room.questions,
          endTime: room.endTime,
        });

        socket.emit("battleTimerTick", { timeLeft });

        const liveScores = calculateScores(room);
        Object.entries(room.submissions).forEach(([player, subs]) => {
          subs.forEach((result, qIndex) => {
            socket.emit("submissionUpdate", {
              player,
              qIndex,
              result,
              liveScores,
            });
          });
        });
      } else {
        socket.emit("error", { message: "Player not found in room" });
      }
    });

    // ✅ Final scoring
    function finishBattle(roomId) {
      const room = rooms[roomId];
      if (!room) return;

      const scores = calculateScores(room);
      const usernames = room.players.map((p) => p.username);
      const winner = scores[usernames[0]] > scores[usernames[1]]
        ? usernames[0]
        : usernames[1];

      io.to(roomId).emit("battleEnded", { scores, winner });

      delete rooms[roomId]; // Clean up
    }

    // ✅ Score calculator
    function calculateScores(room) {
      const scores = {};
      room.players.forEach((p) => {
        const user = p.username;
        let score = 0;
        const subs = room.submissions[user] || [];
        subs.forEach((sub) => {
          if (sub.correct) {
            score += 100 - sub.time;
            score -= (sub.wrongAttempts || 0) * 20;
          }
        });
        scores[user] = score;
      });
      return scores;
    }
  });
};
