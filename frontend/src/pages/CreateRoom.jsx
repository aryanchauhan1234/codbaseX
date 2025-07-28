import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "@/lib/socket";
import { useBattleStore } from "@/store/useBattleStore";

const CreateRoom = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();
  const setBattleData = useBattleStore((s) => s.setBattleData);

  const handleCreate = () => {
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("username", username);
    socket.connect();
    socket.emit("createRoom", { username });

    socket.once("roomCreated", ({ roomId }) => {
      setRoomId(roomId);
      setBattleData({
        roomId,
        players: [{ username }],
        questions: [],
      });

      // ✅ Store partial battle data in localStorage
      localStorage.setItem("battleRoomId", roomId);
      localStorage.setItem("battlePlayers", JSON.stringify([{ username }]));
      localStorage.setItem("battleQuestions", JSON.stringify([]));

      setWaiting(true);
    });
  };

  // ✅ Listen for startBattle and store everything
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

    return () => {
      socket.off("startBattle");
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Create a Battle Room</h1>

      {!roomId ? (
        <>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded mb-4 w-64"
          />
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create Room
          </button>
        </>
      ) : waiting ? (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">Room Created!</h2>
          <p className="mb-1">Share this Room ID with your friend:</p>
          <div className="flex justify-center items-center gap-2 mb-3">
            <code className="font-mono px-2 py-1 bg-white dark:bg-gray-800 rounded">
              {roomId}
            </code>
            <button
              onClick={handleCopy}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-200 mt-4 animate-bounce">
            Waiting for opponent to join...
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default CreateRoom;
