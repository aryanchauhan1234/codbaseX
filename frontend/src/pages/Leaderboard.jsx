import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { Trophy, Medal, Award, User, Code, Target } from "lucide-react";

const Leaderboard = () => {
  const { authUser } = useAuthStore();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("totalSolved");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/leaderboard");
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Failed to fetch leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  const sortData = (criteria) => {
    const sorted = [...leaderboardData].sort((a, b) => {
      if (criteria === "totalSolved") {
        return b.totalSolved - a.totalSolved || b.totalRating - a.totalRating;
      } else if (criteria === "totalRating") {
        return b.totalRating - a.totalRating || b.totalSolved - a.totalSolved;
      } else if (criteria === "cfRating") {
        return b.cfRating - a.cfRating;
      } else if (criteria === "leetRating") {
        return b.leetRating - a.leetRating;
      }
      return 0;
    });
    setLeaderboardData(sorted);
    setSortBy(criteria);
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-500" />;
    return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-[4%]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600">Compete with fellow coders and climb the ranks!</p>
        </div>

        {/* Sort Options */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => sortData("totalSolved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "totalSolved"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Total Solved
            </button>
            <button
              onClick={() => sortData("totalRating")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "totalRating"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Total Rating
            </button>
            <button
              onClick={() => sortData("cfRating")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "cfRating"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              CF Rating
            </button>
            <button
              onClick={() => sortData("leetRating")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "leetRating"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              LC Rating
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Solved
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CF Solved
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LC Solved
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CF Rating
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LC Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      user.id === authUser?._id ? "bg-orange-50 border-l-4 border-orange-500" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.profilePic ? (
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={user.profilePic} 
                              alt={user.name}
                              onError={(e) => {
                                console.log(`Failed to load image for ${user.name}:`, user.profilePic);
                                e.target.onerror = null;
                                e.target.src = "https://codeforces.org/s/42249/images/icons/user.png";
                              }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                            {user.id === authUser?._id && (
                              <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.cfHandle && <span className="mr-2">CF: {user.cfHandle}</span>}
                            {user.leetHandle && <span>LC: {user.leetHandle}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-lg font-bold text-orange-600">{user.totalSolved}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-blue-600">{user.cfSolved}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-yellow-600">{user.leetSolved}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-blue-600">{user.cfRating || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-yellow-600">{user.leetRating || "N/A"}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {leaderboardData.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No users found in the leaderboard</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
