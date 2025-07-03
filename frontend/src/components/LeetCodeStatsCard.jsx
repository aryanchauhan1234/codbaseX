import { useLeetCodeStore } from "../store/useLeetCodeStore";
import { useEffect } from "react";

export default function LeetCodeStatsCard() {
  const {
    leetHandle,
    leetStats,
    fetchLeetCodeStats,
    isLoading,
    error,
  } = useLeetCodeStore();

  useEffect(() => {
    if (leetHandle) {
      fetchLeetCodeStats(leetHandle);
    }
  }, [leetHandle]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!leetStats) return <p>No stats available</p>;
console.log(leetStats.contests);
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-orange-600">
        LeetCode Stats @{leetStats.username}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="Total Solved" value={leetStats.totalSolved} />
        <StatCard label="Easy Solved" value={leetStats.easySolved} />
        <StatCard label="Medium Solved" value={leetStats.mediumSolved} />
        <StatCard label="Hard Solved" value={leetStats.hardSolved} />
        <StatCard label="Contests" value={leetStats.contests} />
        <StatCard label="Rating" value={leetStats.rating} />
        <StatCard label="Global Rank" value={leetStats.globalRank || "N/A"} />
        <StatCard label="Top %" value={`${leetStats.topPercent || "N/A"}%`} />
      </div>
    </div>
  );
}

const StatCard = ({ label, value }) => (
  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-lg font-semibold text-orange-700">{value}</p>
  </div>
);
