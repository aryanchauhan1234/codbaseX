import { axiosInstance } from "../lib/axios";

// ✅ Default languageId = 54 for modern C++
export const runCode = async (code, input, languageId ) => {
  try {
    const res = await axiosInstance.post("/judge/run", {
      code,
      input,
      languageId,
    });
    console.log("9911");

    if (!res.data) {
      throw new Error("Empty response from server");
    }

    return res.data; // contains { output, time, correct, error, memory }
  } catch (error) {
    console.error("runCode error:", error);
    throw new Error("Server error: " + (error.response?.data?.message || error.message));
  }
};
