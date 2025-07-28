// src/lib/codeExecutor.js
import axios from "axios";

export const executeCode = async (language, code, input) => {
  const res = await axios.post("http://localhost:5001/api/judge/run", {
    language,
    code,
    input,
  });
  return res.data;
};
