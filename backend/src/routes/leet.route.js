import express from "express";
import { getLeetCodeStats,updateLeetCodeHandle } from "../controllers/leetController.js";
// import { updateLeetCodeHandle } from "../controllers/userController.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/stats/:handle", getLeetCodeStats);

router.put("/update-leetcode", protectRoute, updateLeetCodeHandle);

export default router;
