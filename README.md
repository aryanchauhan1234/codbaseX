# 🚀 CodbaseX – Competitive Programming Portfolio Tracker

**CodbaseX** is a full-stack MERN web app that helps users visualize, track, and improve their competitive programming journey across platforms like **Codeforces**, **LeetCode**, and **CodeChef** — all in one place.

---

## 🔥 Features

- 📈 **CodbaseX-Style Dashboard** – Clean UI with rating graphs, submission heatmaps, milestones, and topic stats.
- 🧠 **Personalized Insights** – Detect weak topics, activity drop alerts, and rating trend analysis.
- 🤝 **Friend Comparison** – Compare ratings, problems solved, and contest performance across friends.
- 📆 **Event Tracker** – See all upcoming contests in a calendar view.
- ✅ **Question Tracker** – Track custom DSA question lists or company-wise questions (e.g., Google, Amazon).
- 🎯 **DSA Visualizers** – Interactive visualizations for Binary Search, DFS, Dijkstra, Quick Sort, etc.
- 🔐 **JWT Authentication** – Secure and scalable login system.
- ⚡ **Real-time Stats** – Fetched using Codeforces and LeetCode APIs (GraphQL + REST).

---

## 🛠 Tech Stack

### 🖥 Frontend:
- React.js
- TailwindCSS
- Zustand (State Management)
- Framer Motion
- Recharts
- Lucide-react + shadcn/ui

### 🔧 Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Auth
- Axios for API calls

### 📡 APIs:
- Codeforces API
- LeetCode GraphQL API (via `alfa-leetcode-api`)

---

## 🎨 Visualizers Used

- Binary Search (with step-by-step highlighting)
- DFS & Dijkstra (SVG-based circular layout with edge weights)
- Quick Sort (animated pivot-based visualization)

---

## 🖼 Screenshots

> *(Add GIFs or screenshots of the dashboard, visualizers, heatmap, and comparison pages here)*

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/CodbaseX.git
cd CodbaseX

# Install dependencies
npm install  # or yarn

# Setup .env file with MongoDB URI and JWT secrets
touch .env

# Start the app
npm run dev  # or yarn dev
