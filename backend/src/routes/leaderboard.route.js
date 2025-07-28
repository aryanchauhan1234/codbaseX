import express from "express";
import { getLeaderboard, refreshLeaderboard } from "../controllers/leaderboardController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getLeaderboard);
router.post("/refresh", protectRoute, refreshLeaderboard);

export default router;
