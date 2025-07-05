import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import BinarySearchVisualizer from "../components/binary_search_vis";
import DFSVisualizer from "../components/Dfsvisualizer";
import QuickSortVisualizer from "../components/QuickSortVisualizer";
import DijkstraVisualizer from "../components/DijkstraVisualizer.jsx";
import QueueVisualizer from "../components/ QueueVisualizer.jsx";
import StackVisualizer from "../components/StackVisualizer.jsx";

const visualizers = {
  "Binary Search": <BinarySearchVisualizer />,
  "DFSVisualizer": <DFSVisualizer />,
  "QuickSortVisualizer": <QuickSortVisualizer />,
  "DijkstraVisualizer": <DijkstraVisualizer />,
  "StackVisualizer": <StackVisualizer />,
  "QueueVisualizer": <QueueVisualizer />
};

const DsaVisualizer = () => {
  const [selected, setSelected] = useState("Binary Search");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto px-4 py-12 gap-6 mt-[2%]">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-orange-700">Algorithms</h2>
        <ul className="space-y-2">
          {Object.keys(visualizers).map((name) => (
            <li
              key={name}
              className={`cursor-pointer px-3 py-2 rounded-lg transition duration-200 hover:bg-orange-100 hover:scale-[1.02] shadow-sm ${
                selected === name
                  ? "bg-orange-200 font-bold text-orange-800 scale-[1.02]"
                  : ""
              }`}
              onClick={() => setSelected(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-3">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {visualizers[selected]}
        </motion.div>
      </div>
    </div>
  );
};

export default DsaVisualizer;
