import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useCfStorestemp } from "../store/useCfStorestemp";

const COLORS = [
  "#34d399", // OK - green
  "#f87171", // WRONG_ANSWER - red
  "#fbbf24", // TIME_LIMIT_EXCEEDED - yellow
  "#60a5fa", // COMPILATION_ERROR - blue
  "#a78bfa", // RUNTIME_ERROR - purple
  "#f472b6", // MEMORY_LIMIT_EXCEEDED - pink
  "#facc15", // SKIPPED - light yellow
  "#94a3b8", // OTHER - grayish
];

export default function CFVerdictDistribution() {
  const { user, fetchCFSubmissions } = useCfStorestemp();
  const [verdictData, setVerdictData] = useState([]);

  useEffect(() => {
    const loadVerdicts = async () => {
      const submissions = await fetchCFSubmissions(user?.cfHandle, 3000);
      const freqMap = new Map();

      for (const sub of submissions) {
        const verdict = sub.verdict || "UNKNOWN";
        freqMap.set(verdict, (freqMap.get(verdict) || 0) + 1);
      }

      const chartData = Array.from(freqMap.entries()).map(([verdict, count]) => ({
        name: verdict.replace(/_/g, " "),
        value: count,
      }));

      setVerdictData(chartData);
    };

    if (user?.cfHandle) loadVerdicts();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto px-6 mt-10 mb-20">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-800 mb-6">
          🧾 Verdict Distribution
        </h2>
        <div className="bg-orange-50 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={verdictData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {verdictData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderColor: "#f97316", borderRadius: "0.5rem" }}
              />
              <Legend layout="horizontal" verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
