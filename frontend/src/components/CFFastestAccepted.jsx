import React, { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import {useAuthStore} from "../store/useAuthStore.js"

export default function CFFastestAccepted() {
  const {authUser}=useAuthStore();
  const user = authUser;
  const { fetchCFSubmissions } = useCfStorestemp();
  const [fastestSubmissions, setFastestSubmissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const submissions = await fetchCFSubmissions(3000);

      const accepted = submissions.filter(sub => sub.verdict === "OK");

      const bestMap = new Map();

      for (const sub of accepted) {
        const key = `${sub.problem.contestId}-${sub.problem.index}`;
        const time = sub.timeConsumedMillis || sub.executionTime || 0;
        const existing = bestMap.get(key);

        if (!existing || time < existing.executionTime) {
          bestMap.set(key, {
            id: key,
            name: sub.problem.name,
            rating: sub.problem.rating || "Unrated",
            executionTime: time,
            contestId: sub.contestId,
            index: sub.problem.index,
          });
        }
      }

      const sorted = Array.from(bestMap.values())
        .sort((a, b) => a.executionTime - b.executionTime)
        .slice(0, 10);

      setFastestSubmissions(sorted);
    };

    load();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto px-6 mt-5 mb-20">
      <div className=" rounded-3xl p-10 space-y-6 shadow-none">
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-800 tracking-tight">
          ⚡ Fastest Accepted Solutions
        </h2>

        <div className="grid gap-4">
          {fastestSubmissions.map((sub, idx) => (
            <a
              key={sub.id}
              href={`https://codeforces.com/contest/${sub.contestId}/problem/${sub.index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div className="text-gray-800 font-semibold w-3/4">
                  {idx + 1}. {sub.name}
                  <span className="ml-2 text-sm text-gray-500">[{sub.rating}]</span>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  {sub.executionTime} ms
                </div>
              </div>
            </a>
          ))}
          {fastestSubmissions.length === 0 && (
            <p className="text-gray-500 text-sm">No data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
