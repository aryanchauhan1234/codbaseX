import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import Lottie from "lottie-react";
import visualAnimation from "../styles/visual.json"; // ✅ Ensure path is correct

const visualizers = [
  { key: "binary-search", label: "Binary Search" },
  { key: "dfs", label: "DFS" },
  { key: "dijkstra", label: "Dijkstra" },
  { key: "stack", label: "Stack" },
  { key: "queue", label: "Queue" },
  { key: "quicksort", label: "QuickSort" },
];

const VisualizerPage = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 transition-all duration-300">


      {/* Main Content */}
      <div className="flex-1 p-6">
        {!active ? (
          <motion.div
            className="text-center mt-10 text-gray-600 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Lottie
              animationData={visualAnimation}
              loop
              autoplay
              className="w-[300px] sm:w-[400px] md:w-[450px] mb-[6%]"
            />
            <h1 className="text-4xl font-extrabold mb-4">
              Choose a <span className="text-orange-500">Visualizer</span>
            </h1>
            <p className="text-lg text-gray-500">
              Click an algorithm from the sidebar to begin.
            </p>
          </motion.div>
        ) : (
          <div className="p-6 border rounded-xl bg-white shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {visualizers.find((v) => v.key === active)?.label} Visualizer
            </h2>
            <p className="text-gray-600">
              Component for <strong>{active}</strong> will be rendered here.
            </p>
            {/* TODO: Render actual visualizer */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizerPage;
