import { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import {useAuthStore} from "../store/useAuthStore.js"
export default function CodeforcesDashboard() {
  const { fetchCFData} = useCfStorestemp();
  const [cfData, setCfData] = useState(null);
  const {authUser} = useAuthStore();
const user = authUser;
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCFData();
        setCfData(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    // Only fetch if cfHandle exists
    if (user?.cfHandle) {
      getData();
    }
  }, [user?.cfHandle]);

  if (!cfData) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 mb-10">
      <div className=" backdrop-blur-xl border border-orange-500 shadow-2xl rounded-3xl p-10 space-y-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-orange-800 tracking-tight">
                {cfData.handle}
              </h2>
              <p className="text-lg md:text-xl text-orange-600 capitalize">{cfData.rank}</p>
              <a
                href={`https://codeforces.com/profile/${cfData.handle}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 px-5 py-2 text-sm md:text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-full shadow-md transition"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard label="Current Rating" value={cfData.rating} color="text-orange-600" />
          <InfoCard label="Max Rating" value={cfData.maxRating} color="text-amber-600" />
          <InfoCard label="Contribution" value={cfData.contribution} color="text-yellow-600" />
          <InfoCard label="Friend Of" value={cfData.friendOfCount} color="text-rose-600" />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
      <div className="text-sm text-gray-500 font-medium mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value ?? "N/A"}</div>
    </div>
  );
}
