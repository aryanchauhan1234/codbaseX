import React, { useEffect, useState } from "react";
import { useLeetCodeStore } from "../store/useLeetCodeStore";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { useAuthStore } from "../store/useAuthStore";
import HandleInput from "../components/handleInput";
import Sidebar from "../components/Sidebar.jsx";
import { Loader } from "lucide-react";

const getCodeforcesRankName = (rating) => {
  if (rating >= 3000) return "Legendary Grandmaster";
  if (rating >= 2600) return "International Grandmaster";
  if (rating >= 2400) return "Grandmaster";
  if (rating >= 2300) return "International Master";
  if (rating >= 2100) return "Master";
  if (rating >= 1900) return "Candidate Master";
  if (rating >= 1600) return "Expert";
  if (rating >= 1400) return "Specialist";
  if (rating >= 1200) return "Pupil";
  return "Newbie";
};

const getLeetCodeRankName = (rating) => {
  if (rating >= 2600) return "Guardian";
  if (rating >= 2200) return "Knight";
  if (rating >= 1800) return "Crusader";
  if (rating >= 1400) return "Apprentice";
  if (rating >= 1000) return "Beginner";
  return "Novice";
};

const PortfolioPage = () => {
  const { authUser } = useAuthStore();
  const { setLeetHandle, leetStats, fetchLeetCodeStats } = useLeetCodeStore();
  const { fetchCFUserRating, fetchCFSubmissions, fetchCFData } = useCfStorestemp();

  const [cfContests, setCfContests] = useState(0);
  const [cfSolved, setCfSolved] = useState(0);
  const [cfRating, setCfRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAllData = async () => {
      try {
        if (authUser?.leetHandle) {
          setLeetHandle(authUser.leetHandle);
          await fetchLeetCodeStats(authUser.leetHandle);
        }

        if (authUser?.cfHandle) {
          const ratingList = await fetchCFUserRating();
          setCfContests(ratingList.length);

          const subs = await fetchCFSubmissions(10000);
          const solved = new Set();
          subs.forEach((sub) => {
            if (sub.verdict === "OK") {
              const key = `${sub.problem.contestId}-${sub.problem.index}`;
              solved.add(key);
            }
          });
          setCfSolved(solved.size);

          const cfData = await fetchCFData();
          if (cfData?.rating) setCfRating(cfData.rating);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [authUser]);

  const leetContests = leetStats?.contests || 0;
  const leetSolved = leetStats?.totalSolved || 0;
  const leetRating = leetStats?.rating || 0;

  const totalContests = leetContests + cfContests;
  const totalSolved = leetSolved + cfSolved;

  const leetRank = getLeetCodeRankName(leetRating);
  const cfRank = getCodeforcesRankName(cfRating);

  const Card = ({ label, value, big }) => (
    <div className={`border-orange-300 rounded-2xl shadow-md p-6 bg-white border ${big ? "w-full sm:w-[48%] h-40" : "w-full sm:w-[30%] h-32"} mb-4`}>
      <p className="text-xl text-gray-900">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${label === "Total Questions Solved" || label === "Total Contests" ? "text-orange-700 text-5xl" : "text-orange-500"}`}>
        {value}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-[5%] flex min-h-screen">
      {authUser.leetHandle && authUser.cfHandle && <Sidebar />}

      <div className="flex-1 p-6 space-y-6 bg-gray-50 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-orange-500">Coding</span> Portfolio
        </h1>

        {!authUser.leetHandle && !authUser.cfHandle && <HandleInput />}

        {authUser.leetHandle && authUser.cfHandle && (
          <>
            <div className="flex flex-wrap justify-between gap-4">
              <Card label="Total Questions Solved" value={totalSolved} big />
              <Card label="Total Contests" value={totalContests} big />
              <Card label="LeetCode Rating" value={leetRating || "N/A"} big />
              <Card label="Codeforces Rating" value={cfRating || "N/A"} big />
            </div>

            <div className="flex flex-wrap justify-between gap-4">
              <Card label="LeetCode Solved" value={leetSolved} />
              <Card label="Codeforces Solved" value={cfSolved} />
              <Card label="LeetCode Contests" value={leetContests} />
              <Card label="Codeforces Contests" value={cfContests} />
              <Card label="LeetCode Rank" value={leetRank} />
              <Card label="Codeforces Rank" value={cfRank} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
