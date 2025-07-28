// src/pages/Result.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { scores, winner } = state || {};

  if (!scores) {
    return <p className="p-6">No result available.</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Battle Result</h2>
      <p className="mb-2">🏆 Winner: <strong>{winner}</strong></p>

      <ul className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md">
        {Object.entries(scores).map(([user, score]) => (
          <li key={user} className="flex justify-between border-b py-1">
            <span>{user}</span>
            <span>{score} pts</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Result;
