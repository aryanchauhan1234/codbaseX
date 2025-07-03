import React, { useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import {useAuthStore} from "../store/useAuthStore.js"
import axios from "axios";

export default function CFContestSolveTime() {
  const {authUser} = useAuthStore();
  const user = authUser;
  const [contestNumber, setContestNumber] = useState("");
  const [contestId, setContestId] = useState(null);
  const [timeTakenMap, setTimeTakenMap] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContestIdByNumber = async (number) => {
    try {
      const res = await axios.get("https://codeforces.com/api/contest.list");
      const contests = res.data.result.filter((c) => c.phase === "FINISHED");
      const selected = contests[number - 1];
      return selected?.id;
    } catch (err) {
      console.error("Failed to fetch contest list", err);
      return null;
    }
  };

  const fetchSolveTimes = async (contestId) => {
    try {
      const contestRes = await axios.get(
        `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`
      );
      const contestInfo = contestRes.data.result.contest;
      const startTime = contestInfo.startTimeSeconds;
      const duration = contestInfo.durationSeconds;

      const subRes = await axios.get(
        `https://codeforces.com/api/user.status?handle=${user.cfHandle}&from=1&count=10000`
      );
      const allSubs = subRes.data.result;

      const filteredSubs = allSubs.filter(
        (sub) => sub.contestId === Number(contestId) && sub.verdict === "OK"
      );

      const earliestAccepted = {};
      for (const sub of filteredSubs) {
        const key = sub.problem.index;
        if (!earliestAccepted[key] || sub.creationTimeSeconds < earliestAccepted[key].time) {
          earliestAccepted[key] = {
            time: sub.creationTimeSeconds,
            withinContest: sub.creationTimeSeconds <= startTime + duration,
          };
        }
      }

      const timeTaken = {};
      for (const [index, { time, withinContest }] of Object.entries(earliestAccepted)) {
        timeTaken[index] = {
          minutes: Math.round((time - startTime) / 60),
          withinContest,
        };
      }

      setTimeTakenMap(timeTaken);
      setError("");
    } catch (err) {
      console.error("Error fetching solve times", err);
      setError("Could not load contest data. Please try again.");
      setTimeTakenMap({});
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setTimeTakenMap({});
    const id = await fetchContestIdByNumber(contestNumber);
    if (id) {
      setContestId(id);
      await fetchSolveTimes(id);
    } else {
      setError("Invalid contest number.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6  mb-10">
      <div className=" border rounded-3xl p-10 space-y-10">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-extrabold text-orange-800 tracking-tight">
            🕒 Time Taken Per Problem in Contest
          </h2>
          <p className="text-gray-600  mt-1 text-base">
            Enter contest number to see how quickly each problem was solved.
          </p>
        </div>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="number"
            min="1"
            placeholder="Enter Contest Number (e.g., 1 = latest)"
            value={contestNumber}
            onChange={(e) => setContestNumber(e.target.value)}
            className="flex-1 border border-orange-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-5 py-2 rounded-full font-semibold text-white text-sm transition shadow-md ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            }`}
          >
            {loading ? "⏳ Fetching..." : "Fetch Times"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 font-medium text-sm">{error}</div>
        )}

        {/* Results */}
        {Object.keys(timeTakenMap).length > 0 ? (
          <ul className="space-y-3">
            {Object.entries(timeTakenMap)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([problem, { minutes, withinContest }]) => (
                <li
                  key={problem}
                  className={`flex justify-between items-center px-4 py-3 rounded-2xl transition shadow-sm ${
                    withinContest
                      ? "bg-orange-100 hover:bg-orange-200"
                      : "bg-red-100 hover:bg-red-200"
                  }`}
                >
                  <span className="font-semibold text-orange-800 text-sm">
                    Problem {problem}
                  </span>
                  <span className="text-gray-700 text-sm">
                    {minutes} min{" "}
                    <span className="ml-2 italic font-medium text-xs">
                      ({withinContest ? "Within Contest" : "After Contest"})
                    </span>
                  </span>
                </li>
              ))}
          </ul>
        ) : (
          !error &&
          !loading && (
            <p className="text-gray-500 italic text-sm">
              Enter a contest number to view solve times.
            </p>
          )
        )}
      </div>
    </div>
  );
}
