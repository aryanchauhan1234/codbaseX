import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller.js";

const router = express.Router();

// All routes require authentication
router.use(protectRoute);

router.get("/", getQuestions);
router.post("/", addQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
