import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCfStorestemp } from "../store/useCfStorestemp";
import dayjs from "dayjs";

export default function CFRatingGraph() {
  const { user, fetchCFUserRating } = useCfStorestemp();
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    const loadRating = async () => {
      const data = await fetchCFUserRating();
      const transformed = data.map((entry) => ({
        name: dayjs.unix(entry.ratingUpdateTimeSeconds).format("MMM YYYY"),
        rating: entry.newRating,
      }));
      setRatingData(transformed);
    };

    loadRating();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto px-6 mb-10">
      <div className=" borderrounded-3xl p-10 shadow-none space-y-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-800 tracking-tight">
          📈 Rating History
        </h2>
        <div className="bg-white rounded-2xl shadow-md p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" minTickGap={20} />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                formatter={(value) => [`Rating: ${value}`, ""]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#f97316" // orange-500
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
