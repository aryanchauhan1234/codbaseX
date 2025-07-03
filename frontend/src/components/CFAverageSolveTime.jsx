import React, { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";

export default function CFAverageSolveTime() {
  const { user, fetchCFSubmissions } = useCfStorestemp();
  const [avgTime, setAvgTime] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const calculateAvg = async () => {
      const submissions = await fetchCFSubmissions(3000);
      const accepted = submissions.filter(sub => sub.verdict === "OK");

      const uniqueSolved = new Map();

      for (const sub of accepted) {
        const key = `${sub.problem.contestId}-${sub.problem.index}`;
        const time = sub.timeConsumedMillis;

        if (!uniqueSolved.has(key) || time < uniqueSolved.get(key)) {
          uniqueSolved.set(key, time);
        }
      }

      const totalTime = Array.from(uniqueSolved.values()).reduce((a, b) => a + b, 0);
      const totalProblems = uniqueSolved.size;

      setCount(totalProblems);
      setAvgTime(totalProblems > 0 ? Math.round(totalTime / totalProblems) : 0);
    };

    if (user?.cfHandle) calculateAvg();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">⏱️ Average Solve Time</h2>
      {avgTime !== null ? (
        <p className="text-gray-700 text-lg">
          Across <strong>{count}</strong> unique accepted problems, your average solve time is:  
          <span className="font-bold text-blue-600"> {avgTime} ms</span>
        </p>
      ) : (
        <p className="text-gray-500">Loading data...</p>
      )}
    </div>
  );
}
