import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "@/lib/socket";
import { useBattleStore } from "@/store/useBattleStore";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const setBattleData = useBattleStore((s) => s.setBattleData);

  const handleJoin = () => {
    if (!username.trim() || !roomId.trim()) {
      alert("Please enter both username and Room ID");
      return;
    }

    localStorage.setItem("username", username);
    socket.connect();
    socket.emit("joinRoom", { roomId, username });

    // Store partial data right after joining
    localStorage.setItem("battleRoomId", roomId);
    localStorage.setItem("battlePlayers", JSON.stringify([{ username }]));
    localStorage.setItem("battleQuestions", JSON.stringify([]));

    setBattleData({
      roomId,
      players: [{ username }],
      questions: [],
    });
  };

  useEffect(() => {
    socket.on("startBattle", (data) => {
      setBattleData({
        roomId: data.roomId,
        questions: data.questions,
        players: data.players,
        endTime: data.endTime,
      });

      // ✅ Store full battle data in localStorage
      localStorage.setItem("battleRoomId", data.roomId);
      localStorage.setItem("battlePlayers", JSON.stringify(data.players));
      localStorage.setItem("battleQuestions", JSON.stringify(data.questions));
      localStorage.setItem("battleEndTime", data.endTime);

      navigate(`/battle/${data.roomId}`);
    });

    socket.on("error", (err) => {
      alert(err.message || "Something went wrong!");
    });

    return () => {
      socket.off("startBattle");
      socket.off("error");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Join a Battle Room</h1>
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded mb-2 w-64"
      />
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 rounded mb-4 w-64"
      />
      <button
        onClick={handleJoin}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
