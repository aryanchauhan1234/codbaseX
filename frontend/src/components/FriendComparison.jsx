import { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { ClipLoader } from "react-spinners";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const FriendComparison = () => {
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const compareFriends = useCfStorestemp((s) => s.compareFriends);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await compareFriends();
      if (res) {
        const processed = res.map((f) => ({
          ...f,
          avgSolvedPerContest:
            f.contestsAttended > 0
              ? parseFloat((f.problemsSolved / f.contestsAttended).toFixed(2))
              : 0,
        }));
        setComparison(processed);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen  flex items-start justify-center px-4 py-[8%]">
      <div className="w-full max-w-6xl bg-white border border-orange-200 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-6">
          👥 Codeforces Friend Comparison
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <ClipLoader size={50} color="#F97316" />
          </div>
        ) : comparison.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No friends to compare yet.
          </p>
        ) : (
          <>
            {/* TABLE */}
            <div className="overflow-x-auto rounded-xl border border-orange-100 mb-8">
              <table className="w-full text-sm text-gray-700 bg-orange-50 shadow rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-orange-100 text-orange-800 text-left">
                    <th className="p-3 font-semibold">Handle</th>
                    <th className="p-3 font-semibold">Rank</th>
                    <th className="p-3 font-semibold">Rating</th>
                    <th className="p-3 font-semibold">Max Rating</th>
                    <th className="p-3 font-semibold">Problems Solved</th>
                    <th className="p-3 font-semibold">Contests</th>
                    <th className="p-3 font-semibold">Avg Solved/Contest</th>
                    <th className="p-3 font-semibold">Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((f, idx) => (
                    <tr
                      key={f.handle}
                      className={`border-t ${
                        idx % 2 === 0 ? "bg-white" : "bg-orange-50"
                      }`}
                    >
                      <td className="p-3 font-medium text-orange-700">
                        {f.handle}
                      </td>
                      <td className="p-3">{f.rank || "N/A"}</td>
                      <td className="p-3 text-blue-600">{f.rating ?? "N/A"}</td>
                      <td className="p-3 text-green-600">
                        {f.maxRating ?? "N/A"}
                      </td>
                      <td className="p-3 text-yellow-600">
                        {f.problemsSolved ?? "N/A"}
                      </td>
                      <td className="p-3 text-orange-600">
                        {f.contestsAttended ?? "N/A"}
                      </td>
                      <td className="p-3 text-indigo-600">
                        {f.avgSolvedPerContest ?? "-"}
                      </td>
                      <td className="p-3 text-pink-600">
                        {f.contribution ?? "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BAR CHART */}
            <div className="w-full h-[500px]">
              <h3 className="text-xl font-bold text-orange-700 mb-4 text-center">
                📊 Full Metric Comparison
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparison}
                  margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="handle" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#3B82F6" name="Rating" />
                  <Bar dataKey="maxRating" fill="#10B981" name="Max Rating" />
                  <Bar dataKey="problemsSolved" fill="#FBBF24" name="Solved" />
                  <Bar dataKey="contestsAttended" fill="#F97316" name="Contests" />
                  <Bar dataKey="avgSolvedPerContest" fill="#6366F1" name="Avg/Contest" />
                  <Bar dataKey="contribution" fill="#EC4899" name="Contribution" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendComparison;
