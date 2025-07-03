import express from "express";
import { checkAuth, login, logout, signup,googleLogin,googleSignup } from "../controllers/auth.controller.js";
import  protectRoute  from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleLogin);
router.post("/google", googleSignup);
router.get("/check", protectRoute, checkAuth);
// router.put("/update-profile", protectRoute, updateProfile);
// router.put("/savehandle", protectRoute, savehandle);

export default router;
