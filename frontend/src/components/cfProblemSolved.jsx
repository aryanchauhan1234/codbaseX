import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useCfStorestemp } from "../store/useCfStorestemp";

export default function CFProblemSolved() {
  const { user, fetchCFSubmissions } = useCfStorestemp();
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    const loadDistribution = async () => {
      const submissions = await fetchCFSubmissions( 5000);

      const solvedSet = new Set();
      const solved = submissions.filter((sub) => {
        const key = `${sub.problem.contestId}-${sub.problem.index}`;
        if (sub.verdict === "OK" && !solvedSet.has(key)) {
          solvedSet.add(key);
          return true;
        }
        return false;
      });

      const freqMap = new Map();
      for (const sub of solved) {
        const rating = sub.problem.rating;
        if (rating) {
          freqMap.set(rating, (freqMap.get(rating) || 0) + 1);
        }
      }

      const chartData = Array.from(freqMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([rating, count]) => ({ rating, count }));

      setDistribution(chartData);
    };

      loadDistribution();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto px-6 mt-5 mb-20">
      <div className=" border rounded-3xl p-10 space-y-6 shadow-none">
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-800 tracking-tight">
          🧠 Problem Rating Distribution
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={distribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} solved`, ""]}
              labelFormatter={(label) => `Rating: ${label}`}
            />
            <Bar
              dataKey="count"
              fill="#f97316" // orange-500
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
