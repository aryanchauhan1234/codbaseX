import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import logoAnimation from "../styles/logo.json";

const logoText = "Codfolio".split("");

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -2, 1, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };
  const cancelLogout = () => setShowLogoutModal(false);

  return (
    <>
      <div className="fixed top-0 z-50 w-full backdrop-blur-md shadow-md bg-white text-black transition-colors duration-500">
        <div className="w-full px-3 py-1 relative">
          <div className="flex items-center justify-between">
            {/* Logo with Lottie */}
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-all"
            >
              <Lottie
                animationData={logoAnimation}
                loop
                autoplay
                className="w-10 h-10"
              />
              <motion.h1
                className="text-lg font-bold flex items-center"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {logoText.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    className={i >= 3 ? "text-orange-500" : ""}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-5 text-base font-semibold">
              <Link
                to="/leaderboard"
                className="px-2.5 py-1 hover:bg-black/10 rounded"
              >
                Leaderboard
              </Link>
              <Link
                to="/dsa-visualizer"
                className="px-2.5 py-1 hover:bg-black/10 rounded"
              >
                Algorithms
              </Link>
              <Link
                to="/QuestionTracker"
                className="px-2.5 py-1 hover:bg-black/10 rounded"
              >
                Question Tracker
              </Link>

              {/* Dropdown */}
              <div className="relative group">
                <div className="px-2.5 py-1 hover:bg-black/10 rounded cursor-pointer">
                  Profile Tracker
                </div>
                <div className="absolute top-full left-0 w-full h-4 group-hover:block hidden" />
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:flex flex-col z-50 text-black">
                  <Link
                    to="/CodeForces"
                    className="px-4 py-2 text-base hover:bg-gray-100"
                  >
                    Codeforces
                  </Link>
                  <Link
                    to="/portfolio"
                    className="px-4 py-2 text-base hover:bg-gray-100"
                  >
                    Coding <span className="text-orange-500">Portfolio</span>
                  </Link>
                  <Link
                    to="/events"
                    className="px-4 py-2 text-base hover:bg-gray-100"
                  >
                    Event Tracker
                  </Link>
                </div>
              </div>

              {/* Friends Dropdown */}
              <div className="relative group">
                <div className="px-2.5 py-1 hover:bg-black/10 rounded cursor-pointer">
                  Friends
                </div>
                <div className="absolute top-full w-full h-4 group-hover:block hidden" />
                <div className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:flex flex-col z-50 text-black">
                  <Link
                    to="/Freindcomparison"
                    className="px-4 py-2 text-base hover:bg-gray-100"
                  >
                    Comparison
                  </Link>
                  <Link
                    to="/battle/:roomId"
                    className="px-4 py-2 text-base hover:bg-gray-100"
                  >
                    Coding <span className="text-orange-500">Battle</span>
                  </Link>
                  <Link
                    to="/create"
                    className="px-4 py-2 text-base hover:bg-gray-100"
                  >
                    Create Room
                  </Link>
                  <Link
                    to="/join"
                    className="px-4 py-2 text-base hover:bg-gray-100"
                  >
                    Join Room
                  </Link>
                </div>
              </div>

              {/* Logout */}
              {authUser && (
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 py-1.5 text-red-500 hover:bg-orange-100 rounded transition"
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutConfirmationModal
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </>
  );
};

export default Navbar;
