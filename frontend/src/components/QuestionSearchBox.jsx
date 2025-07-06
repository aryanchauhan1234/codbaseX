import React, { useState, useEffect } from "react";
import axios from "axios";

const platformData = {
  "leetcode.com": {
    name: "LeetCode",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
  },
  "geeksforgeeks.org": {
    name: "GFG",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
  },
};

const QuestionSearchBox = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 1) {
        search(query);
      }
    }, 300); // delay for 300ms

    return () => clearTimeout(timeout);
  }, [query]);

  const search = async (q) => {
    try {
      const modifiedQuery = `${q} site:leetcode.com OR site:geeksforgeeks.org`;

      const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
        params: {
           key: import.meta.env.VITE_GOOGLE_API_KEY, // Replace with valid key
          cx: import.meta.env.VITE_GOOGLE_CX_ID, // Replace with your cx
          q: modifiedQuery,
        },
      });

      const items = response.data.items || [];

      const parsedResults = items.map((item) => {
        const hostname = new URL(item.link).hostname.replace("www.", "");
        const platform = platformData[hostname];

        return {
          title: item.title,
          url: item.link,
          platform: platform?.name || hostname,
          icon: platform?.icon || null,
        };
      });

      setResults(parsedResults);
    } catch (err) {
      console.error("CSE API error:", err);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a question (e.g., Binary Search)"
        className="w-full px-4 py-2 border rounded-md text-sm"
      />

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {results.map((result, idx) => (
          <div
            key={idx}
            onClick={() => {
              onSelect(result);
              setQuery(""); // clear input
              setResults([]); // clear results
            }}
            className="cursor-pointer p-3 border rounded-lg bg-white shadow hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              {result.icon && (
                <img src={result.icon} alt={result.platform} className="w-5 h-5" />
              )}
              <span className="font-medium text-sm">{result.title}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{result.platform}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSearchBox;
