import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { Trophy, Medal, Award, User, Code, Target, RefreshCw, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const { authUser } = useAuthStore();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  const refreshLeaderboard = async () => {
    try {
      setRefreshing(true);
      toast.loading("Refreshing leaderboard data...", { id: "refresh" });
      await axiosInstance.post("/leaderboard/refresh");
      await fetchLeaderboard();
      toast.success("Leaderboard refreshed successfully!", { id: "refresh" });
    } catch (error) {
      console.error("Error refreshing leaderboard:", error);
      toast.error("Failed to refresh leaderboard", { id: "refresh" });
    } finally {
      setRefreshing(false);
    }
  };

  const sortData = (criteria) => {
    const sorted = [...leaderboardData].sort((a, b) => {
      if (criteria === "totalSolved") {
        return b.totalSolved - a.totalSolved || b.totalRating - a.totalRating;
      } else if (criteria === "totalRating") {
        return b.totalRating - a.totalRating || b.totalSolved - a.totalSolved;
      } else if (criteria === "cfRating") {
        return (b.cfRating || 0) - (a.cfRating || 0);
      } else if (criteria === "leetRating") {
        return (b.leetRating || 0) - (a.leetRating || 0);
      } else if (criteria === "cfSolved") {
        return b.cfSolved - a.cfSolved;
      } else if (criteria === "leetSolved") {
        return b.leetSolved - a.leetSolved;
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
    return (
      <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
        <span className="text-sm font-bold text-gray-600">{rank}</span>
      </div>
    );
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-8 mt-[4%]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🏆 <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Leaderboard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">Compete with fellow coders and climb the ranks!</p>
          
          <button
            onClick={refreshLeaderboard}
            disabled={refreshing}
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Participants</p>
                <p className="text-3xl font-bold text-gray-900">{leaderboardData.length}</p>
              </div>
              <User className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Problems Solved</p>
                <p className="text-3xl font-bold text-gray-900">
                  {leaderboardData.reduce((sum, user) => sum + (user.totalSolved || 0), 0)}
                </p>
              </div>
              <Code className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(leaderboardData.reduce((sum, user) => sum + (user.totalRating || 0), 0) / leaderboardData.length) || 0}
                </p>
              </div>
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
        </motion.div>

        {/* Sort Options */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort by:</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { key: "totalSolved", label: "Total Solved", icon: Code, color: "orange" },
              { key: "totalRating", label: "Total Rating", icon: Target, color: "orange" },
              { key: "cfSolved", label: "CF Solved", icon: Code, color: "blue" },
              { key: "leetSolved", label: "LC Solved", icon: Code, color: "yellow" },
              { key: "cfRating", label: "CF Rating", icon: Star, color: "blue" },
              { key: "leetRating", label: "LC Rating", icon: Star, color: "yellow" }
            ].map(({ key, label, icon: Icon, color }) => (
              <button
                key={key}
                onClick={() => sortData(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center ${
                  sortBy === key
                    ? `bg-${color}-500 text-white shadow-lg`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        {leaderboardData.length >= 3 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-center items-end gap-4 mb-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    {leaderboardData[1]?.profilePic ? (
                      <img 
                        className="w-16 h-16 rounded-full object-cover border-4 border-gray-300" 
                        src={leaderboardData[1].profilePic} 
                        alt={leaderboardData[1].name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://codeforces.org/s/42249/images/icons/user.png";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-300">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <Medal className="w-8 h-8 text-gray-400 absolute -top-2 -right-2 bg-white rounded-full p-1" />
                  </div>
                  <h3 className="font-bold text-gray-900">{leaderboardData[1]?.name}</h3>
                  <p className="text-2xl font-bold text-orange-600">{leaderboardData[1]?.totalSolved}</p>
                </div>
                <div className="h-20 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2nd</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    {leaderboardData[0]?.profilePic ? (
                      <img 
                        className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400" 
                        src={leaderboardData[0].profilePic} 
                        alt={leaderboardData[0].name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://codeforces.org/s/42249/images/icons/user.png";
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center border-4 border-yellow-400">
                        <User className="w-10 h-10 text-white" />
                      </div>
                    )}
                    <Trophy className="w-10 h-10 text-yellow-500 absolute -top-2 -right-2 bg-white rounded-full p-1" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{leaderboardData[0]?.name}</h3>
                  <p className="text-3xl font-bold text-orange-600">{leaderboardData[0]?.totalSolved}</p>
                </div>
                <div className="h-32 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1st</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    {leaderboardData[2]?.profilePic ? (
                      <img 
                        className="w-16 h-16 rounded-full object-cover border-4 border-orange-400" 
                        src={leaderboardData[2].profilePic} 
                        alt={leaderboardData[2].name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://codeforces.org/s/42249/images/icons/user.png";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-orange-400 flex items-center justify-center border-4 border-orange-400">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <Award className="w-8 h-8 text-orange-500 absolute -top-2 -right-2 bg-white rounded-full p-1" />
                  </div>
                  <h3 className="font-bold text-gray-900">{leaderboardData[2]?.name}</h3>
                  <p className="text-2xl font-bold text-orange-600">{leaderboardData[2]?.totalSolved}</p>
                </div>
                <div className="h-16 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3rd</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leaderboard Table */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Solved
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CF Solved
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LC Solved
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CF Rating
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LC Rating
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Rating
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contests
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      user.id === authUser?._id ? "bg-orange-50 border-l-4 border-orange-500" : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRankBadge(index + 1)}`}>
                          #{index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {user.profilePic ? (
                            <img 
                              className="h-12 w-12 rounded-full object-cover border-2 border-gray-200" 
                              src={user.profilePic} 
                              alt={user.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://codeforces.org/s/42249/images/icons/user.png";
                              }}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center border-2 border-gray-200">
                              <User className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {user.name}
                            {user.id === authUser?._id && (
                              <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.cfHandle && <span className="mr-3 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">CF: {user.cfHandle}</span>}
                            {user.leetHandle && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">LC: {user.leetHandle}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-lg font-bold text-orange-600">{user.totalSolved || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-semibold text-blue-600">{user.cfSolved || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-semibold text-yellow-600">{user.leetSolved || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-semibold text-blue-600">{user.cfRating || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-semibold text-yellow-600">{user.leetRating || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-semibold text-purple-600">{user.totalRating || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-600">
                        <div>CF: {user.cfContests || 0}</div>
                        <div>LC: {user.leetContests || 0}</div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {leaderboardData.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No users found in the leaderboard</p>
            <p className="text-gray-400 text-sm mt-2">Be the first to join and compete!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
