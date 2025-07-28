import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const logoText = "CodbaseX".split("");

const containerVariants = {
  animate: { transition: { staggerChildren: 0.08 } },
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => setShowLogoutModal(true);
  const cancelLogout = () => setShowLogoutModal(false);
  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setShowLogoutModal(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* ✅ Responsive Navbar */}
      <div className="fixed top-0 z-50 w-full backdrop-blur-md shadow-md bg-white text-black">
        <div className="w-full px-4 sm:px-6 lg:px-2 py-1">
          <div className="flex items-center justify-between">
            {/* ✅ Logo - Responsive sizing */}
            <Link to="/" className="flex items-center">
              <motion.h1
                className="text-sm sm:text-xl lg:text-xl font-bold flex items-center"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                {logoText.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    className={i >= 7 ? "text-orange-500" : ""}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </Link>

            {/* ✅ Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* ✅ Desktop Menu - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3 lg:gap-5 text-sm lg:text-base font-semibold">
              <Link to="/leaderboard" className="px-2 lg:px-3 py-2 hover:bg-black/10 rounded transition-colors">
                Leaderboard
              </Link>
              <Link to="/dsa-visualizer" className="px-2 lg:px-3 py-2 hover:bg-black/10 rounded transition-colors">
                Algorithms
              </Link>
              <Link to="/QuestionTracker" className="px-2 lg:px-3 py-2 hover:bg-black/10 rounded transition-colors">
                Question Tracker
              </Link>

              {/* ✅ Profile Tracker Dropdown */}
              <div className="relative group">
                <div className="px-2 lg:px-3 py-2 hover:bg-black/10 rounded cursor-pointer transition-colors">
                  Profile Tracker
                </div>
                <div className="absolute top-full left-0 w-full h-4 group-hover:block hidden" />
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:flex flex-col z-50 text-black border">
                  <Link to="/CodeForces" className="px-4 py-3 hover:bg-gray-100 transition-colors">
                    Codeforces
                  </Link>
                  <Link to="/portfolio" className="px-4 py-3 hover:bg-gray-100 transition-colors">
                    Coding <span className="text-orange-500">Portfolio</span>
                  </Link>
                  <Link to="/events" className="px-4 py-3 hover:bg-gray-100 transition-colors">
                    Event Tracker
                  </Link>
                </div>
              </div>

              {/* ✅ Friends Dropdown */}
              <div className="relative group">
                <div className="px-2 lg:px-3 py-2 hover:bg-black/10 rounded cursor-pointer transition-colors">
                  Friends
                </div>
                <div className="absolute top-full w-full h-4 group-hover:block hidden" />
                <div className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:flex flex-col z-50 text-black border">
                  <Link to="/Freindcomparison" className="px-4 py-3 hover:bg-gray-100 transition-colors">
                    Comparison
                  </Link>
                  <Link to="/workingpage" className="px-4 py-3 hover:bg-gray-100 transition-colors">
                    Coding Battle
                  </Link>
                  <Link to="/workingpage" className="px-4 py-3 hover:bg-gray-100 transition-colors">
                    Create Room
                  </Link>
                  <Link to="/workingpage" className="px-4 py-3 hover:bg-gray-100 transition-colors">
                    Join Room
                  </Link>
                </div>
              </div>

              {/* ✅ Desktop Logout Button */}
              {authUser && (
                <button
                  onClick={handleLogoutClick}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 py-2 px-3 text-red-500 hover:bg-orange-100 rounded transition-colors disabled:opacity-50"
                >
                  <LogOut size={18} />
                  <span className="hidden lg:inline">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Mobile Menu - Slide down animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4 bg-white border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {/* ✅ Mobile Menu Links */}
              <Link 
                to="/leaderboard" 
                className="py-3 px-2 text-base font-medium hover:bg-gray-100 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                Leaderboard
              </Link>
              <Link 
                to="/dsa-visualizer" 
                className="py-3 px-2 text-base font-medium hover:bg-gray-100 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                Algorithms
              </Link>
              <Link 
                to="/QuestionTracker" 
                className="py-3 px-2 text-base font-medium hover:bg-gray-100 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                Question Tracker
              </Link>
              
              {/* ✅ Mobile Profile Tracker Section */}
              <div className="py-2">
                <div className="text-sm font-semibold text-gray-600 px-2 py-1">Profile Tracker</div>
                <Link 
                  to="/CodeForces" 
                  className="py-2 px-4 text-base hover:bg-gray-100 rounded transition-colors block"
                  onClick={closeMobileMenu}
                >
                  Codeforces
                </Link>
                <Link 
                  to="/portfolio" 
                  className="py-2 px-4 text-base hover:bg-gray-100 rounded transition-colors block"
                  onClick={closeMobileMenu}
                >
                  Coding <span className="text-orange-500">Portfolio</span>
                </Link>
                <Link 
                  to="/events" 
                  className="py-2 px-4 text-base hover:bg-gray-100 rounded transition-colors block"
                  onClick={closeMobileMenu}
                >
                  Event Tracker
                </Link>
              </div>

              {/* ✅ Mobile Friends Section */}
              <div className="py-2">
                <div className="text-sm font-semibold text-gray-600 px-2 py-1">Friends</div>
                <Link 
                  to="/Freindcomparison" 
                  className="py-2 px-4 text-base hover:bg-gray-100 rounded transition-colors block"
                  onClick={closeMobileMenu}
                >
                  Comparison
                </Link>
                <Link 
                  to="/workingpage" 
                  className="py-2 px-4 text-base hover:bg-gray-100 rounded transition-colors block"
                  onClick={closeMobileMenu}
                >
                  Coding Battle
                </Link>
                <Link 
                  to="/workingpage" 
                  className="py-2 px-4 text-base hover:bg-gray-100 rounded transition-colors block"
                  onClick={closeMobileMenu}
                >
                  Create Room
                </Link>
                <Link 
                  to="/workingpage" 
                  className="py-2 px-4 text-base hover:bg-gray-100 rounded transition-colors block"
                  onClick={closeMobileMenu}
                >
                  Join Room
                </Link>
              </div>

              {/* ✅ Mobile Logout Button */}
              {authUser && (
                <button
                  onClick={() => {
                    handleLogoutClick();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 py-3 px-2 text-red-500 hover:bg-red-50 rounded transition-colors mt-2"
                >
                  <LogOut size={20} />
                  <span className="text-base font-medium">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Responsive Logout Modal */}
      {showLogoutModal && (
        <LogoutConfirmationModal
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
          isLoading={isLoggingOut}
        />
      )}
    </>
  );
};

export default Navbar;
