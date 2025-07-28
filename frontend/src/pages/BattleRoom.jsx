import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { runCode } from "../lib/judgeRunner";
import { useBattleStore } from "../store/useBattleStore";
import { socket } from "@/lib/socket";

const BattleRoom = () => {
  const navigate = useNavigate();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [code, setCode] = useState("// start coding...");
  const [language, setLanguage] = useState("cpp");
  const [theme, setTheme] = useState("vs-dark");
  const [timeLeft, setTimeLeft] = useState(3600);
  const [output, setOutput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    roomId,
    questions,
    players,
    submissions,
    username,
    setBattleData,
    updateSubmission,
  } = useBattleStore();

  // ✅ Restore Zustand + localStorage
  useEffect(() => {
    const storedRoomId = localStorage.getItem("battleRoomId");
    const storedPlayers = JSON.parse(localStorage.getItem("battlePlayers") || "[]");
    const storedQuestions = JSON.parse(localStorage.getItem("battleQuestions") || "[]");
    const storedEndTime = localStorage.getItem("battleEndTime");
    const storedUsername = localStorage.getItem("username");

    if (storedRoomId && storedPlayers.length && storedQuestions.length) {
      setBattleData({
        roomId: storedRoomId,
        players: storedPlayers,
        questions: storedQuestions,
        endTime: storedEndTime,
      });

      socket.connect();
      socket.emit("rejoinRoom", { roomId: storedRoomId, username: storedUsername });
    }
  }, []);

  // ✅ Socket battle events
  useEffect(() => {
    socket.on("battleTimerTick", ({ timeLeft }) => {
      setTimeLeft(timeLeft);
    });

    socket.on("submissionUpdate", ({ player, qIndex, result, liveScores }) => {
      updateSubmission(player, qIndex, result, liveScores);
    });

    const handleBattleEnded = ({ scores, winner }) => {
      socket.disconnect();
      localStorage.removeItem("battleRoomId");
      localStorage.removeItem("battlePlayers");
      localStorage.removeItem("battleQuestions");
      localStorage.removeItem("battleEndTime");

      navigate("/result", { state: { scores, winner } });
      setBattleData({ roomId: null, questions: [], players: [] });
    };

    socket.on("battleEnded", handleBattleEnded);

    return () => {
      socket.off("battleTimerTick");
      socket.off("submissionUpdate");
      socket.off("battleEnded", handleBattleEnded);
    };
  }, [navigate, updateSubmission]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const question = questions[currentQIndex];
    const input = question.testCases[0].input;
    const expectedOutput = question.testCases[0].output;

    try {
      const languageMap = {
        cpp: 54,        // C++ (GCC 12)
        js: 93,         // JavaScript (Node.js 18)
        python: 92,     // Optional: Python 3.11
        java: 91,       // Optional: Java OpenJDK
      };

      const languageId = languageMap[language] || 54;
      const { output: userOutput, time, wrongAttempts, correct } = await runCode(
        code,
        input,
        // expectedOutput,
        languageId
      );
      console.log(languageId);
      setOutput(userOutput);

      socket.emit("submitCode", {
        roomId,
        player: username,
        qIndex: currentQIndex,
        result: { correct, time, wrongAttempts },
      });
    } catch (err) {
      console.error(err);
      setOutput("Error running code");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndBattle = () => {
    if (socket.connected) {
      socket.emit("endBattle", { roomId });
    }
  };

  if (!questions || questions.length === 0 || !players || players.length < 2) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Waiting for opponent to join or data to load...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-black text-black dark:text-white mt-[4%]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Room: {roomId}</h2>
        <div className="font-mono text-lg">
          Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      {/* Language + Theme */}
      <div className="flex gap-4 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="cpp">C++</option>
          <option value="js">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      {/* Question Selector */}
      <div className="flex gap-4 mb-4">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => setCurrentQIndex(i)}
            className={`px-4 py-2 rounded ${currentQIndex === i ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Q{i + 1}
          </button>
        ))}
      </div>

      {/* Question Info */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">{questions[currentQIndex]?.title}</h3>
        <p className="mb-2">{questions[currentQIndex]?.description}</p>

        <details className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
          <summary className="cursor-pointer font-semibold">Test Case</summary>
          <div className="mt-2">
            <p><strong>Input:</strong> {questions[currentQIndex]?.testCases[0]?.input}</p>
            <p><strong>Expected Output:</strong> {questions[currentQIndex]?.testCases[0]?.output}</p>
          </div>
        </details>
      </div>

      {/* Code Editor */}
      <Editor
        height="300px"
        defaultLanguage={language}
        value={code}
        onChange={(val) => setCode(val)}
        theme={theme}
        className="mb-4"
      />

      {/* Submit Button */}
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={submitting || timeLeft <= 0}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <pre className="bg-black text-white p-2 rounded max-w-xl overflow-x-auto">
          {output}
        </pre>
      </div>

      {/* End Battle */}
      <div className="mt-6">
        <button
          onClick={handleEndBattle}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          End Battle
        </button>
      </div>

      {/* Live Scoreboard */}
      <div className="mt-6">
        <h4 className="text-lg font-bold mb-2">Live Scores</h4>
        <ul className="bg-white dark:bg-gray-800 rounded p-4 shadow">
          {players.map((p, i) => (
            <li key={i} className="flex justify-between border-b py-1">
              <span>{p}</span>
              <span>{submissions[p]?.score ?? 0} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BattleRoom;
