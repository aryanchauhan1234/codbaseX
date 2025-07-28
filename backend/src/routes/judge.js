import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const router = express.Router();
const JUDGE0_BASE = "https://judge0-ce.p.rapidapi.com"; // ✅ For free RapidAPI

const JUDGE0_HEADERS = {
    "content-type": "application/json",
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // ✅ must be set in .env
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

// ✅ POST /api/judge/run
router.post("/run", async (req, res) => {
  const { code, input, languageId } = req.body;

  try {
    const submissionRes = await axios.post(
      `${JUDGE0_BASE}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        stdin: input,
        language_id: languageId,
      },
      {
        headers: JUDGE0_HEADERS,
      }
    );

    const result = submissionRes.data;

    res.json({
      output: result.stdout,
      time: parseFloat(result.time) || 0,
      memory: result.memory,
      correct: result.status.id === 3,
      error: result.stderr || result.compile_output,
    });
  } catch (error) {
    // ✅ Print full detailed error
    console.error("❌ /run route error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Headers:", JSON.stringify(error.response.headers, null, 2));
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    res.status(500).json({ message: "Judge0 request failed" });
  }
});


export default router;
