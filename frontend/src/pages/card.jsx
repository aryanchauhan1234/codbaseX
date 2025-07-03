import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { useLeetCodeStore } from "../store/useLeetCodeStore";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
const Card = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const { authUser } = useAuthStore();
  const { fetchCFData, fetchCFUserRating, fetchCFSubmissions } = useCfStorestemp();
  const { fetchLeetCodeStats, leetStats } = useLeetCodeStore();

  const [cfUser, setCfUser] = useState(null);
  const [cfRating, setCfRating] = useState(null);
  const [cfContests, setCfContests] = useState(0);
  const [cfSolved, setCfSolved] = useState(0);

  const navigate = useNavigate();
  const cardRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authUser?.cfHandle) {
          const data = await fetchCFData();
          setCfUser(data);

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

          if (data?.rating) setCfRating(data.rating);
        }

        if (authUser?.leetHandle) {
          await fetchLeetCodeStats(authUser.leetHandle);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [authUser]);

  const handleDownloadImage = async () => {
    if (cardRef.current) {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });
        saveAs(dataUrl, `${authUser.fullName}_codtrac_card.png`);
      } catch (err) {
        console.error("Export failed:", err);
        alert("Couldn't download the card. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!authUser) return <div className="text-center mt-10">Login to view your card</div>;

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="text-sm text-gray-600 font-medium">Loading your card...</p>
        </div>
      </div>
    );
  }

  const totalSolved = (leetStats?.totalSolved || 0) + cfSolved;
  const totalContests = (leetStats?.contests || 0) + cfContests;

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

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-[#f9fafb] p-6 gap-10">
      {/* Card */}
      <div
        ref={cardRef}
        className="relative mt-6 bg-white rounded-3xl border border-gray-200 p-6 w-full max-w-sm shadow-xl text-center overflow-visible"
      >

        {/* Header */}
        <h2 className="text-xs font-bold mb-1 text-left tracking-wider text-gray-600">
          <span className="text-orange-500">CODEFOLIO</span> CARD
        </h2>

        {/* Download Button */}
        <button
          onClick={handleDownloadImage}
          disabled={loading}
          className={`absolute top-4 right-4 ${
            loading ? "cursor-not-allowed opacity-50" : "hover:text-orange-500"
          } text-gray-500 transition`}
          title="Download as image"
        >
          <FiDownload className="text-lg" />
        </button>

        {/* Avatar */}
        <div className="relative flex justify-center mt-2">
          <img
            loading="eager"
            src={cfUser?.titlePhoto || "https://codeforces.org/s/42249/images/icons/user.png"}
            alt="avatar"
            className="rounded-full border-4 border-orange-300 w-[50%] h-[50%] object-cover shadow"
          />
        </div>

        <p className="inline-block bg-orange-100 text-orange-700 rounded-full px-3 py-1 mt-4 text-sm font-medium">
          @{authUser.fullName}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div>
            <p className="text-gray-500 font-medium">Total Solved</p>
            <p className="text-xl font-bold text-orange-600">{totalSolved}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Total Contests</p>
            <p className="text-xl font-bold text-green-600">{totalContests}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">CF Rank</p>
            <p className="text-sm text-blue-600">
              {getCodeforcesRankName(cfRating)} ({cfRating || "N/A"})
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">LC Rank</p>
            <p className="text-sm text-yellow-600">
              {getLeetCodeRankName(leetStats?.rating)} ({leetStats?.rating || "N/A"})
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-6">
          <p className="text-gray-500 text-xs font-medium mb-2">Find me on</p>
          <div className="flex justify-center gap-5 text-xl">
            {cfUser?.handle && (
              <a href={`https://codeforces.com/profile/${cfUser.handle}`} target="_blank" rel="noreferrer">
                <SiCodeforces className="text-blue-500 hover:scale-110 transition" />
              </a>
            )}
            {leetStats?.username && (
              <a href={`https://leetcode.com/${leetStats.username}`} target="_blank" rel="noreferrer">
                <SiLeetcode className="text-yellow-500 hover:scale-110 transition" />
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm">
          {["C++", "DSA", "CP", "PYTHON"].map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="text-center max-w-lg">
        <img src="/photo2.png" alt="mascot" className="w-[30%] h-[30%] mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-800 leading-snug">
          Here's Your <span className="text-orange-500">#Codefolio</span> Card
        </h3>
        <p className="mt-2 text-gray-500 font-medium text-sm">
          Show off your journey in CP & DSA!
        </p>
      </div>
    </div>
  );
};

export default Card;
