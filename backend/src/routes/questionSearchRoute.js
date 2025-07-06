import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

const extractDuckDuckGoResults = async (query, platform, site) => {
  const searchURL = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}+site:${site}`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    "Accept":
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://duckduckgo.com/",
  };

  try {
    const { data } = await axios.get(searchURL, { headers });
    const $ = cheerio.load(data);

    const results = [];

    $(".result__url").each((_, el) => {
      const link = $(el).text().trim();
      const title = $(el).closest(".result").find(".result__title").text().trim();

      if (link.includes(site)) {
        results.push({
          title: title || query,
          url: link.startsWith("http") ? link : `https://${link}`,
          platform,
        });
      }
    });

    return results.slice(0, 3);
  } catch (err) {
    console.error(`❌ Error scraping ${platform}:`, err.message);
    return [];
  }
};

router.get("/search-question", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  const leetcode = await extractDuckDuckGoResults(query, "LeetCode", "leetcode.com");
  const gfg = await extractDuckDuckGoResults(query, "GFG", "geeksforgeeks.org");

  return res.json([...leetcode, ...gfg]);
});

export default router;
