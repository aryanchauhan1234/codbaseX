import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    cfHandle: {
      type: String,
      default: "",
    },
    leetHandle: {
      type: String,
      default: "",
    },
    cfFriends: {
      type: [String],
      default: [],
    },
    friends: {
      type: [String],
      default: [],
    },
    // Leaderboard data cache
    leaderboardData: {
      cfProfilePic: { type: String, default: null },
      totalSolved: { type: Number, default: 0 },
      cfSolved: { type: Number, default: 0 },
      leetSolved: { type: Number, default: 0 },
      cfRating: { type: Number, default: 0 },
      leetRating: { type: Number, default: 0 },
      cfContests: { type: Number, default: 0 },
      leetContests: { type: Number, default: 0 },
      totalRating: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: null }
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
