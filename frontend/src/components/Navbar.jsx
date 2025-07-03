import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";

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
      {/* Navbar */}
      <div className="fixed top-0 z-50 w-full bg-ora backdrop-blur-md shadow-md">
        <div className="w-full px-3 py-2 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all">
              <img className="w-8" src="/logo.png" alt="Logo" />
              <h1 className="text-lg font-bold flex items-center">
                <span className="text-black">Cod</span>
                <span className="text-orange-500">efolio</span>
              </h1>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-5 text-base font-semibold">
              <Link to="/" className="px-2.5 py-1 hover:bg-white/20 rounded transition text-black">
                Leaderboard
              </Link>
              <Link to="/dsa-visualizer" className="px-2.5 py-1 hover:bg-white/20 rounded transition text-black">
                Algorithms
              </Link>

              {/* Dropdown */}
              <div className="relative group">
                <div className="px-2.5 py-1 hover:bg-white/20 rounded transition text-black cursor-pointer">
                  Profile Tracker
                </div>
                <div className="absolute top-full left-0 w-full h-4 group-hover:block hidden"></div>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:flex flex-col z-50">
                  <Link to="/CodeForces" className="px-4 py-2 text-base text-black hover:bg-gray-100 rounded-t">
                    Codeforces
                  </Link>
                  <Link to="/portfolio" className="px-4 py-2 text-base text-black hover:bg-gray-100">
                    Coding <span className="text-orange-500">Portfolio</span>
                  </Link>
                  <Link to="/events" className="px-4 py-2 text-base text-black hover:bg-gray-100">
                    Event Tracker
                  </Link>
                </div>
              </div>

              <Link to="/Freindcomparison" className="px-2.5 py-1 hover:bg-white/20 rounded transition text-black">
                Friends
              </Link>

              {authUser && (
                <button
                  onClick={handleLogoutClick}
                  className="px-2.5 py-1 hover:bg-white/20 rounded transition text-black"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Logout Modal */}
      {showLogoutModal && (
        <LogoutConfirmationModal onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </>
  );
};

export default Navbar;
