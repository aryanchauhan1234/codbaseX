export const runJudge0 = async (sourceCode, languageId, input = "") => {
  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: sourceCode,
        language_id: languageId,
        stdin: input,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // ✅ Make sure this exists
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    console.log("Judge0 result:", response.data);
    return response.data;
  } catch (err) {
    console.error("Judge0 API error:", err.response?.data || err.message);
    throw new Error("Judge0 request failed");
  }
};
