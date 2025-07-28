import User from '../models/user.model.js';
import axios from "axios";

export const updateCfHandle = async (req, res) => {
    const { cfHandle } = req.body;
    const userId = req.user._id;
    try {
        console.log(req.body);
        const user = await User.findByIdAndUpdate(
      userId,
      { cfHandle },
      { new: true }
    );
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCFUserData = async (req, res) => {
  try {
    const { handle } = req.params;
    
    if (!handle) {
      return res.status(400).json({ message: "Handle is required" });
    }

    console.log(`Fetching CF data for ${handle}`);

    const promises = [];
    let userData = {
      cfRating: 0,
      cfContests: 0,
      cfSolved: 0
    };

    // User info
    promises.push(
      axios.get(`https://codeforces.com/api/user.info?handles=${handle}`, { timeout: 8000 })
        .then(response => {
          if (response.data.status === "OK") {
            const cfUserData = response.data.result[0];
            userData.cfRating = cfUserData.rating || 0;
          }
        }).catch(() => {})
    );

    // Contest history
    promises.push(
      axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`, { timeout: 8000 })
        .then(response => {
          if (response.data.status === "OK") {
            userData.cfContests = response.data.result.length;
          }
        }).catch(() => {})
    );

    // Submissions
    promises.push(
      axios.get(`https://codeforces.com/api/user.status?handle=${handle}&count=3000`, { timeout: 15000 })
        .then(response => {
          if (response.data.status === "OK") {
            const solvedSet = new Set();
            response.data.result.forEach(sub => {
              if (sub.verdict === "OK" && sub.problem) {
                const key = `${sub.problem.contestId || 0}-${sub.problem.index}`;
                solvedSet.add(key);
              }
            });
            userData.cfSolved = solvedSet.size;
          }
        }).catch(() => {})
    );

    await Promise.allSettled(promises);

    res.json(userData);
  } catch (error) {
    console.error("CF user data error:", error);
    res.status(500).json({ message: "Failed to fetch Codeforces data" });
  }
};

export const getCFSubmissions = async (req, res) => {
  try {
    const { handle } = req.params;
    const { count = 1000 } = req.query;
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}&count=${count}`
    );
    
    if (response.data.status === "OK") {
      const submissions = response.data.result;
      res.json(submissions);
    } else {
      res.status(404).json({ message: "Submissions not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

export const getCFRating = async (req, res) => {
  try {
    const { handle } = req.params;
    const response = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    
    if (response.data.status === "OK") {
      const ratingHistory = response.data.result;
      res.json(ratingHistory);
    } else {
      res.status(404).json({ message: "Rating history not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rating history" });
  }
};

export const addFriends = async (req, res) => {
  try {
    const { friends } = req.body;
    const userId = req.user._id;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { cfFriends: friends },
      { new: true }
    );
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const compareFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    if (!user.cfHandle) {
      return res.json({ success: false, message: "Please set your Codeforces handle first" });
    }
    
    const friendsData = [];
    const allHandles = [user.cfHandle]; // Start with user's handle
    
    // Add friends handles if they exist
    if (user.cfFriends && user.cfFriends.length > 0) {
      allHandles.push(...user.cfFriends);
    }
    
    for (const handle of allHandles) {
      try {
        console.log(`Fetching data for: ${handle}`);
        
        // Get user's basic info
        const userResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`, { timeout: 10000 });
        
        if (userResponse.data.status === "OK") {
          const userInfo = userResponse.data.result[0];
          
          // Initialize user data
          let userData = {
            handle: handle,
            rating: userInfo.rating || 0,
            maxRating: userInfo.maxRating || 0,
            rank: userInfo.rank || "unrated",
            maxRank: userInfo.maxRank || "unrated",
            contribution: userInfo.contribution || 0,
            contestsAttended: 0,
            problemsSolved: 0,
            avatar: userInfo.titlePhoto || userInfo.avatar || "https://codeforces.org/s/42249/images/icons/user.png",
            isCurrentUser: handle === user.cfHandle // Mark if this is the current user
          };
          
          // Get contest history
          try {
            const ratingResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`, { timeout: 10000 });
            if (ratingResponse.data.status === "OK") {
              userData.contestsAttended = ratingResponse.data.result.length;
            }
          } catch (error) {
            console.warn(`Failed to fetch contest history for ${handle}`);
          }
          
          // Get submissions to count solved problems
          try {
            const submissionsResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&count=3000`, { timeout: 15000 });
            
            if (submissionsResponse.data.status === "OK") {
              const solvedSet = new Set();
              submissionsResponse.data.result.forEach(sub => {
                if (sub.verdict === "OK" && sub.problem) {
                  const key = `${sub.problem.contestId || 0}-${sub.problem.index}`;
                  solvedSet.add(key);
                }
              });
              userData.problemsSolved = solvedSet.size;
            }
          } catch (error) {
            console.warn(`Failed to fetch submissions for ${handle}`);
          }
          
          friendsData.push(userData);
          console.log(`Successfully fetched data for ${handle}`);
        }
      } catch (error) {
        console.error(`Error fetching data for ${handle}:`, error.message);
        // Add user with basic info even if API calls fail
        friendsData.push({
          handle: handle,
          rating: 0,
          maxRating: 0,
          rank: "unrated",
          maxRank: "unrated",
          contribution: 0,
          contestsAttended: 0,
          problemsSolved: 0,
          avatar: "https://codeforces.org/s/42249/images/icons/user.png",
          isCurrentUser: handle === user.cfHandle
        });
      }
    }
    
    // Sort by rating (highest first), but keep current user at top if they want
    friendsData.sort((a, b) => {
      // If one is current user, prioritize them (optional)
      // if (a.isCurrentUser) return -1;
      // if (b.isCurrentUser) return 1;
      
      // Sort by rating
      return (b.rating || 0) - (a.rating || 0);
    });
    
    console.log(`Returning comparison data for ${friendsData.length} users (including current user)`);
    res.json({ success: true, data: friendsData });
  } catch (error) {
    console.error("Compare friends error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
