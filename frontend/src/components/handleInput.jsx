import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { useLeetCodeStore } from "../store/useLeetCodeStore";
import { useAuthStore } from "../store/useAuthStore";

const HandleInput = () => {
  const [cfHandle, setCfHandle] = useState("");
  const [leetHandle, setLeetHandleInput] = useState("");
  const { updateCfHandle } = useCfStorestemp();
  const { updateLeetHandle } = useLeetCodeStore();
  const { token } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cfHandle.trim()) {
      updateCfHandle(cfHandle);
    }

    if (leetHandle.trim()) {
      const result = await updateLeetHandle(leetHandle, token);
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url('/blur.png')` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-xl p-10 rounded-2xl bg-orange-500/90 backdrop-blur-lg shadow-2xl border border-orange-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-tight">
          Complete Your Details
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Codeforces Handle */}
          <div className="relative">
            <img
              src="/codeforces.png"
              alt="Codeforces"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 object-contain"
            />
            <input
              type="text"
              value={cfHandle}
              onChange={(e) => setCfHandle(e.target.value)}
              placeholder="Enter your Codeforces handle"
              className="pl-12 pr-4 py-3 w-full rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-white text-sm text-orange-900 placeholder:text-orange-700 bg-white/90 shadow"
            />
          </div>

          {/* LeetCode Handle */}
          <div className="relative">
            <img
              src="/leetcode.png"
              alt="LeetCode"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 object-contain"
            />
            <input
              type="text"
              value={leetHandle}
              onChange={(e) => setLeetHandleInput(e.target.value)}
              placeholder="Enter your LeetCode handle"
              className="pl-12 pr-4 py-3 w-full rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-white text-sm text-balck placeholder:text-orange-700 bg-white/90 shadow"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-white hover:bg-orange-100 text-orange-600 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 self-center shadow-lg border border-orange-500"
          >
            <Lock className="w-4 h-4" />
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
};

export default HandleInput;
