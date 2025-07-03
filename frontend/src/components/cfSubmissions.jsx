import { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";

export default function CFSubmissions() {
  const { fetchCFSubmissions, user } = useCfStorestemp();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    // if (user?.cfHandle) {
      fetchCFSubmissions().then(setSubs);
    // }
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto px-6 mt-10 mb-20">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-800 mb-6">
          📤 Recent Submissions
        </h2>

        <ul className="space-y-4">
          {subs.length > 0 ? (
            subs.slice(0, 10).map((sub) => (
              <li
                key={sub.id}
                className="flex justify-between items-center bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-all p-4 rounded-xl"
              >
                <div className="w-4/5">
                  <p className="font-medium text-orange-900 text-sm truncate">
                    {sub.problem.name}
                  </p>
                  <p className="text-xs text-orange-700">
                    {sub.problem.tags?.join(", ") || "No tags"}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    sub.verdict === "OK"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {sub.verdict}
                </span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">Loading submissions...</p>
          )}
        </ul>
      </div>
    </div>
  );
}
