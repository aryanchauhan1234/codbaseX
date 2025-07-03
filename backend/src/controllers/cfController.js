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

// controllers/compareFriends.controller.js

// controllers/cfController.js
export const compareFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userHandle = user.cfHandle;
    const friends = user.friends;

    if (!userHandle || friends.length === 0) {
      return res.status(400).json({ message: "User or friends not set" });
    }

    // Prepare comparison data
    const allHandles = [userHandle, ...friends];
    const compareResults = [];

    for (let handle of allHandles) {
      const userInfoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const userRatingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
      const userSubmissionsRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&count=1000`);

      const info = await userInfoRes.json();
      const rating = await userRatingRes.json();
      const subs = await userSubmissionsRes.json();

      if (info.status !== "OK" || rating.status !== "OK" || subs.status !== "OK") continue;

      const acceptedProblems = new Set(
        subs.result.filter(s => s.verdict === "OK").map(s => `${s.problem.contestId}-${s.problem.index}`)
      );

      compareResults.push({
        handle,
        rank: info.result[0].rank,
        rating: info.result[0].rating,
        maxRating: info.result[0].maxRating,
        problemsSolved: acceptedProblems.size,
        contestsAttended: rating.result.length,
      });
    }

    res.status(200).json({ data: compareResults });
  } catch (err) {
    console.error("Compare friends failed:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// controllers/cfController.js
export const addFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const { friends } = req.body;
    console.log(friends)

    await User.findByIdAndUpdate(userId, {
      $set: { friends },
    });

    res.status(200).json({ message: "Friends added" });
  } catch (err) {
    console.error("Error adding friends:", err);
    res.status(500).json({ message: "Server error" });
  }
};

