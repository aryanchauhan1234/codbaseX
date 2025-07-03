// components/FloatingPersonalizeButton.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Wand2 } from "lucide-react"; // or any icon you prefer

export default function FloatingPersonalizeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/personalization")}
      className=" min-w-screen fixed bottom-6 right-6 z-50 p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-200"
      title="Personalized Insights"
    >
      <Wand2 size={24} />
    </button>
  );
}
