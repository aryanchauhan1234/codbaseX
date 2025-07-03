import React, { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import dayjs from "dayjs";

export default function CFStreakTracker() {
  const { user, fetchCFSubmissions } = useCfStorestemp();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    const load = async () => {
      const submissions = await fetchCFSubmissions(5000);

      const datesSet = new Set();
      submissions.forEach((sub) => {
        if (sub.verdict === "OK") {
          const dateStr = dayjs.unix(sub.creationTimeSeconds).format("YYYY-MM-DD");
          datesSet.add(dateStr);
        }
      });

      const sortedDates = Array.from(datesSet).sort();
      let currStreak = 1;
      let maxStreakFound = 1;

      for (let i = 1; i < sortedDates.length; i++) {
        const prev = dayjs(sortedDates[i - 1]);
        const curr = dayjs(sortedDates[i]);
        if (curr.diff(prev, "day") === 1) {
          currStreak++;
        } else {
          currStreak = 1;
        }
        maxStreakFound = Math.max(maxStreakFound, currStreak);
      }

      let today = dayjs().format("YYYY-MM-DD");
      let yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      let count = 0;
      while (datesSet.has(today) || datesSet.has(yesterday)) {
        if (datesSet.has(today)) count++;
        else break;
        today = dayjs(today).subtract(1, "day").format("YYYY-MM-DD");
      }

      setCurrentStreak(count);
      setMaxStreak(maxStreakFound);
    };

    load();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto px-6 mb-10">
      <div className=" border rounded-3xl p-10 space-y-6">
        {/* <h2 className="text-2xl md:text-3xl font-extrabold text-orange-800 tracking-tight">
          🔥 Streak Tracker
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border">
            <p className="text-sm text-gray-500 mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-black-600">
              {currentStreak} 🔁
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border">
            <p className="text-sm text-gray-500 mb-1">Longest Streak</p>
            <p className="text-3xl font-bold text-orange-600">
              {maxStreak} 🏆
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
