// routes/cf.route.js
import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { updateCfHandle, compareFriends , addFriends} from "../controllers/cfController.js";

const router = express.Router();

router.post("/cf-handle", protectRoute, updateCfHandle);
router.post("/compare-friends", protectRoute, compareFriends);
router.post("/add-friends", protectRoute, addFriends)

export default router;
