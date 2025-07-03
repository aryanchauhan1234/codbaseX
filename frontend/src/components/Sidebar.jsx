import { Home, BarChart, User, Settings, Users, MapPin, GraduationCap , Lock} from "lucide-react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCfStorestemp } from "../store/useCfStorestemp";

const Sidebar = () => {
  const navigate = useNavigate();
  const { fetchCFData } = useCfStorestemp();
  const [cfUser, setCfUser] = useState(null);
  const { authUser } = useAuthStore();
  const user=authUser;
  const handle = user?.cfHandle || user?.handle;

  useEffect(() => {
    const fetchUser = async () => {
      if (handle) {
        const data = await fetchCFData(handle);
        setCfUser(data);
      }
    };
    fetchUser();
  }, [handle]);

  return (
    <div className="  min-h-screen w-90 bg-white border-r border-gray-200 shadow-sm px-4 py-6 flex flex-col  rounded-2xl">
      {/* Top: User Info */}
      {cfUser && (
  <div className="flex flex-col gap-4 items-center mb-6">
    <img
      src={cfUser.titlePhoto}
      alt="User avatar"
      className=" rounded-3xl h-40 w-30 border-orange-300 border-solid border"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://codeforces.org/s/42249/images/icons/user.png";
      }}
    />
    <p className="text-2xl text-center font-bold">{authUser.fullName}</p>

    {/* ✅ Horizontal Line */}
    <hr className="w-full border-t border-gray-300" />

    <div className="w-full text-left flex flex-col gap-2">
      <div className="flex gap-1">
      <MapPin className="w-4 h-4 text-orange-500" />
      <p className="text-sm text-gray-500">{authUser.location || "India"}</p></div>
      <divc className="flex gap-1">
       <GraduationCap className="w-4 h-4 text-orange-500" />
      <p className="text-sm text-gray-500">{authUser.college || "Netaji Subhas University of Technology"}</p></divc>
    </div>
  </div>
)}

 <hr className="w-full border-t border-gray-300" />

      {/* Navigation Links */}

      {/* Social Icons */}
      <div className="flex flex-col space-y-4">
    
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">View Leaderboard</button>
<button onClick={() => navigate("/card")} className="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2">
  <span>Unlock Card</span>
  <Lock className="w-4 h-4" />
</button>
          {/* <Lock className="w-4 h-4 text-orange-500" /> */}
      </div>
      <div className="mt-10 flex justify-center space-x-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <img src="../github.png" alt="GitHub" className="w-6 h-6" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="../linkdin.svg" alt="LinkedIn" className="w-6 h-6" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="../x.png" alt="Twitter" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
