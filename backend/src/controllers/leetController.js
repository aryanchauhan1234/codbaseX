import axios from "axios";
import User from "../models/user.model.js";



export const getLeetCodeStats = async (req, res) => {
  const { handle } = req.params;
  if (!handle) return res.status(400).json({ message: "Handle is required" });

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        rating
        attendedContestsCount
        globalRanking
        topPercentage
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username: handle },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data.data;

    if (!data || !data.matchedUser) {
      return res.status(404).json({ message: "LeetCode user not found" });
    }

    const acStats = data.matchedUser.submitStats.acSubmissionNum;
    const getCount = (difficulty) =>
      acStats.find((d) => d.difficulty === difficulty)?.count || 0;

    const result = {
      username: data.matchedUser.username,
      totalSolved: getCount("All"),
      easySolved: getCount("Easy"),
      mediumSolved: getCount("Medium"),
      hardSolved: getCount("Hard"),
      contests: data.userContestRanking?.attendedContestsCount ?? "N/A",
      rating: data.userContestRanking?.rating ?? "N/A",
      globalRank: data.userContestRanking?.globalRanking ?? "N/A",
      topPercent: data.userContestRanking?.topPercentage ?? "N/A",
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("LeetCode GraphQL error:", error.message);
    return res.status(500).json({ message: "Failed to fetch LeetCode data" });
  }
};



export const updateLeetCodeHandle = async (req, res) => {
  const userId = req.user._id;
  const { leetHandle } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { leetHandle },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ leetHandle: user.leetHandle });
  } catch (error) {
    console.error("Update leetcode handle error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
