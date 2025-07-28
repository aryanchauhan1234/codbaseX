import User from "../models/user.model.js";
import axios from "axios";

// Update interval: 30 minutes
const UPDATE_INTERVAL = 30 * 60 * 1000;

const shouldUpdateUser = (user) => {
  if (!user.leaderboardData?.lastUpdated) return true;
  const timeSinceUpdate = Date.now() - new Date(user.leaderboardData.lastUpdated).getTime();
  return timeSinceUpdate > UPDATE_INTERVAL;
};

const fetchUserData = async (user) => {
  let userData = {
    cfProfilePic: null,
    totalSolved: 0,
    cfSolved: 0,
    leetSolved: 0,
    cfRating: 0,
    leetRating: 0,
    cfContests: 0,
    leetContests: 0,
    totalRating: 0,
    lastUpdated: new Date()
  };

  const promises = [];

  // LeetCode
  if (user.leetHandle) {
    promises.push(
      axios.post(
        "https://leetcode.com/graphql",
        {
          query: `
            query getUserProfile($username: String!) {
              matchedUser(username: $username) {
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
              }
            }
          `,
          variables: { username: user.leetHandle },
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 8000
        }
      ).then(response => {
        const leetData = response.data.data;
        if (leetData?.matchedUser?.submitStats?.acSubmissionNum) {
          const acStats = leetData.matchedUser.submitStats.acSubmissionNum;
          const allStat = acStats.find(d => d.difficulty === "All");
          if (allStat) {
            userData.leetSolved = allStat.count;
          } else {
            const easy = acStats.find(d => d.difficulty === "Easy")?.count || 0;
            const medium = acStats.find(d => d.difficulty === "Medium")?.count || 0;
            const hard = acStats.find(d => d.difficulty === "Hard")?.count || 0;
            userData.leetSolved = easy + medium + hard;
          }

          if (leetData.userContestRanking) {
            userData.leetRating = leetData.userContestRanking.rating || 0;
            userData.leetContests = leetData.userContestRanking.attendedContestsCount || 0;
          }
        }
      }).catch(() => {
        console.log(`LeetCode fetch failed for ${user.leetHandle}`);
      })
    );
  }

  // Codeforces
  if (user.cfHandle) {
    promises.push(
      axios.get(`https://codeforces.com/api/user.info?handles=${user.cfHandle}`, { timeout: 8000 })
        .then(response => {
          if (response.data.status === "OK") {
            const cfUserData = response.data.result[0];
            userData.cfRating = cfUserData.rating || 0;
            userData.cfProfilePic = cfUserData.titlePhoto || cfUserData.avatar;
          }
        }).catch(() => {})
    );

    promises.push(
      axios.get(`https://codeforces.com/api/user.rating?handle=${user.cfHandle}`, { timeout: 8000 })
        .then(response => {
          if (response.data.status === "OK") {
            userData.cfContests = response.data.result.length;
          }
        }).catch(() => {})
    );

    promises.push(
      axios.get(`https://codeforces.com/api/user.status?handle=${user.cfHandle}&count=3000`, { timeout: 15000 })
        .then(response => {
          if (response.data.status === "OK") {
            const solvedSet = new Set();
            response.data.result.forEach(sub => {
              if (sub.verdict === "OK" && sub.problem) {
                const key = `${sub.problem.contestId || 0}-${sub.problem.index}-${sub.problem.name}`;
                solvedSet.add(key);
              }
            });
            userData.cfSolved = solvedSet.size;
            console.log(`[CF] ${user.cfHandle} solved ${userData.cfSolved} unique problems`);
          } else {
            console.warn(`[CF] Failed to fetch submissions for ${user.cfHandle}`);
          }
        }).catch(() => {
          console.warn(`[CF] Error fetching submissions for ${user.cfHandle}`);
        })
    );
  }

  await Promise.allSettled(promises);

  userData.totalSolved = userData.cfSolved + userData.leetSolved;
  userData.totalRating = userData.cfRating + userData.leetRating;

  return userData;
};

export const getLeaderboard = async (req, res) => {
  try {
    console.log("Fetching leaderboard data...");
    
    // Get all users with their handles and cached data
    const users = await User.find({}, {
      fullName: 1,
      email: 1,
      cfHandle: 1,
      leetHandle: 1,
      profilePic: 1,
      leaderboardData: 1
    });

    const leaderboardData = [];
    const usersToUpdate = [];

    // Check which users need updates
    for (const user of users) {
      if (shouldUpdateUser(user)) {
        usersToUpdate.push(user);
      }
    }

    console.log(`Updating ${usersToUpdate.length} users out of ${users.length}`);

    // Process users in smaller batches to avoid rate limiting
    const batchSize = 5;
    const userBatches = [];
    
    for (let i = 0; i < usersToUpdate.length; i += batchSize) {
      userBatches.push(usersToUpdate.slice(i, i + batchSize));
    }

    for (const batch of userBatches) {
      const batchPromises = batch.map(async (user) => {
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        
        try {
          const freshData = await fetchUserData(user);
          
          // Update user in database
          await User.findByIdAndUpdate(user._id, {
            leaderboardData: freshData
          });

          console.log(`Updated data for ${user.fullName}`);
        } catch (error) {
          console.error(`Failed to update ${user.fullName}:`, error.message);
        }
      });

      await Promise.allSettled(batchPromises);
    }

    // Get updated users data
    const updatedUsers = await User.find({}, {
      fullName: 1,
      email: 1,
      cfHandle: 1,
      leetHandle: 1,
      profilePic: 1,
      leaderboardData: 1
    });

    // Build leaderboard response
    updatedUsers.forEach(user => {
      const data = user.leaderboardData || {};
      
      // Determine best profile picture
      let finalProfilePic = user.profilePic;
      if (!finalProfilePic && data.cfProfilePic) {
        finalProfilePic = data.cfProfilePic;
      }
      if (!finalProfilePic) {
        finalProfilePic = "https://codeforces.org/s/42249/images/icons/user.png";
      }

      leaderboardData.push({
        id: user._id,
        name: user.fullName,
        email: user.email,
        profilePic: finalProfilePic,
        cfHandle: user.cfHandle,
        leetHandle: user.leetHandle,
        cfProfilePic: data.cfProfilePic,
        totalSolved: data.totalSolved || 0,
        cfSolved: data.cfSolved || 0,
        leetSolved: data.leetSolved || 0,
        cfRating: data.cfRating || 0,
        leetRating: data.leetRating || 0,
        cfContests: data.cfContests || 0,
        leetContests: data.leetContests || 0,
        totalRating: data.totalRating || 0
      });
    });

    leaderboardData.sort((a, b) => {
      if (b.totalSolved !== a.totalSolved) return b.totalSolved - a.totalSolved;
      return b.totalRating - a.totalRating;
    });

    console.log(`Leaderboard generated with ${leaderboardData.length} users`);
    res.status(200).json(leaderboardData);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard data" });
  }
};

// Force refresh endpoint for manual updates
export const refreshLeaderboard = async (req, res) => {
  try {
    const users = await User.find({});
    
    for (const user of users) {
      const freshData = await fetchUserData(user);
      await User.findByIdAndUpdate(user._id, {
        leaderboardData: freshData
      });
    }

    res.json({ message: "Leaderboard refreshed successfully" });
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ message: "Failed to refresh leaderboard" });
  }
};
