import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HandleChart = () => {
  const [handle, setHandle] = useState("");
  const [ratingData, setRatingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRating = async () => {
    if (!handle) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
      const data = res.data.result.map((entry) => ({
        name: entry.contestName,
        rating: entry.newRating,
      }));
      setRatingData(data);
    } catch (err) {
      setError("Handle not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Codeforces Rating Tracker</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Codeforces handle"
          className="input input-bordered w-full"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchRating} disabled={loading}>
          {loading ? "Loading..." : "Track"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {ratingData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={ratingData}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rating" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HandleChart;
