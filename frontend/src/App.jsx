import Navbar from "./components/Navbar";
import useThemeStore from "./store/useThemeStore";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
// import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CodeForces from "./pages/codeForces";
import Personalization from "./pages/personlization";
import AddFreind from "./components/AddFreind"
import FriendComparison from "./pages/FreindComparison";
import Portfolio from "./pages/Portfolio"; 
import Card from "./pages/card";
import { useGlobalStore } from "./store/useGlobalStore";
import GlobalLoader from "./components/GlobalLoader";
import QuestionTracker from "./pages/QuestionTracker";
import Footer from "./components/Footer";
import Events from "./pages/events"
import Dsavisualizer from "./pages/dsa-visualizer";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./components/Layout";
import BattleRoom from "./pages/BattleRoom";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Result from "./pages/Result";
import { setupBattleSocket } from "./lib/setupBattleSocket"; // ✅ ADD THIS
import Leaderboard from "./pages/Leaderboard";
import WorkingPage from "./pages/WorkingPage";

// import { useThemeStore } from "./store/useThemeStore";
import { useEffect,usena } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  // const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    // setupBattleSocket(); // now sockets like "startBattle" will always work
  }, [checkAuth]);

  useEffect(() => {
    // Suppress Google OAuth console errors during development
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('GSI_LOGGER') || args[0]?.includes?.('origin is not allowed')) {
        return; // Suppress Google OAuth errors
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  // useEffect(() => {
  //   initializeTheme(); // apply dark mode from localStorage on first load
  // }, []);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
      // <Layout>
      // <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col min-h-screen bg-white text-black" >
      {<Navbar />}
      {isLoading && <GlobalLoader />}

      {/* Main scrollable area with flex-grow */}
      <main className="flex-grow">
        <Routes>
          {/* <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/codeforces" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/codeforces" />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          {/* <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> */}
          <Route path="/codeforces" element={authUser ? <CodeForces /> : <Navigate to="/login" />} />
          <Route path="/Freindcomparison" element={authUser ? <FriendComparison /> : <Navigate to="/login" />} />
          <Route path="/personalization" element={authUser ? <Personalization /> : <Navigate to="/login" />} />
          <Route path="/addfreind" element={authUser ? <AddFreind /> : <Navigate to="/login" />} />
          <Route path="/portfolio" element={authUser ? <Portfolio /> : <Navigate to="/login" />} />
          <Route path="/events" element={<Events /> } />
          <Route path="/Card" element={authUser ?<Card />: <Navigate to="/login" /> } />
          <Route path="/dsa-visualizer" element={<Dsavisualizer /> } />
          <Route path="/QuestionTracker" element={<QuestionTracker /> } />
          <Route path="/create" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/result" element={<Result />} />
        <Route path="/battle/:roomId" element={<BattleRoom />} />
        <Route path="/workingpage" element={authUser ? <WorkingPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
      <Toaster />
    </div>
    // </Layout>
  );
};

export default App;
