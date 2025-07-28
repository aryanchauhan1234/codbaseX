import express from "express";
import { checkAuth, login, logout, signup, googleLogin } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleLogin);
router.get("/check", protectRoute, checkAuth);

export default router;
