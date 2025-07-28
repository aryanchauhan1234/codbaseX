import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import questionSearchRoute from "./routes/questionSearchRoute.js";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/cf.route.js";
import leetcodeRoutes from "./routes/leet.route.js";
import { setupSocket } from "./socket.js";
import judgeRoutes from "./routes/judge.js";
import questionRoutes from "./routes/question.route.js";
import leaderboardRoutes from "./routes/leaderboard.route.js";

// Load env variables FIRST
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cfusers", userRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api", questionSearchRoute);
app.use("/api/judge", judgeRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

setupSocket(server);

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({ 
    message: "Internal Server Error", 
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});
