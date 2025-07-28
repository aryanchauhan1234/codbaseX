import axios from "axios";

export const getLeetCodeStats = async (req, res) => {
  try {
    const { handle } = req.params;
    
    console.log(`🔄 Fetching fresh LeetCode stats for ${handle}`);
    
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
        }
        userContestRanking(username: $username) {
          rating
          attendedContestsCount
          globalRanking
          topPercentage
        }
      }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username: handle },
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    const data = response.data.data;
    if (!data?.matchedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = data.matchedUser;
    const contestData = data.userContestRanking;
    const acStats = user.submitStats?.acSubmissionNum || [];

    // Calculate solved problems
    const allStat = acStats.find(d => d.difficulty === "All");
    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    if (allStat) {
      totalSolved = allStat.count;
      easySolved = acStats.find(d => d.difficulty === "Easy")?.count || 0;
      mediumSolved = acStats.find(d => d.difficulty === "Medium")?.count || 0;
      hardSolved = acStats.find(d => d.difficulty === "Hard")?.count || 0;
    }

    const leetStats = {
      username: user.username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      contests: contestData?.attendedContestsCount || 0,
      rating: contestData?.rating || 0,
      globalRank: contestData?.globalRanking || null,
      topPercent: contestData?.topPercentage || null,
    };

    res.json(leetStats);
  } catch (error) {
    console.error("LeetCode API error:", error.message);
    res.status(500).json({ message: "Failed to fetch LeetCode data" });
  }
};
