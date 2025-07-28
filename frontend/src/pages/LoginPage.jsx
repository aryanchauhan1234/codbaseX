import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Eye, EyeOff, Loader2, Lock, Mail, SmilePlus } from "lucide-react";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    login(formData);
  };

  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google credential response:", credentialResponse);
    
    if (!credentialResponse?.credential) {
      toast.error("No credential received from Google");
      return;
    }

    try {
      console.log("Sending request to backend...");
      const res = await axiosInstance.post("/auth/google", {
        token: credentialResponse.credential,
      });
      
      console.log("Backend response:", res.data);
      setAuthUser(res.data);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    toast.error("Google login failed. Please try regular login.");
  };

  return (
    <div className="flex min-h-screen overflow-hidden font-sans mt-[4%]">
      {/* LEFT – Codfolio Info */}
      <div className="hidden md:flex w-1/2 bg-orange-500 text-white flex-col justify-center items-center p-10 relative overflow-hidden rounded-r-3xl space-y-6">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-black">CodbaseX</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
          <div className="bg-white text-orange-600 rounded-xl p-5 shadow-xl">
            <h3 className="text-lg font-bold">📊 All-in-One Tracker</h3>
            <p className="text-sm text-gray-600">Manage all your coding progress from Codeforces, LeetCode & more</p>
          </div>
          <div className="bg-white text-orange-600 rounded-xl p-5 shadow-xl">
            <h3 className="text-lg font-bold">📅 Contest Alerts</h3>
            <p className="text-sm text-gray-600">Never miss a contest with smart reminders & timelines</p>
          </div>
          <div className="bg-white text-orange-600 rounded-xl p-5 shadow-xl">
            <h3 className="text-lg font-bold">🧠 Personalized Insights</h3>
            <p className="text-sm text-gray-600">Get topic suggestions based on your weaknesses</p>
          </div>
        </div>

        <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl top-[-50px] left-[-50px]" />
      </div>

      {/* RIGHT – Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-10 bg-white relative z-10">
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-center mb-6">
          </div>
            <div className="flex items-center mb-8 text-sm text-gray-500 gap-2 ">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-orange-500"
            >
              ←
            </button>
            <p>
              Create Account?{" "}
              <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* <div className="text-center mb-6 mr-[40%]"> */}
            <h1 className="text-3xl font-bold text-black">Sign In</h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
          {/* </div> */}

          <form onSubmit={handleSubmit} className="space-y-5 mt-5">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full py-3 pl-10 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Mail className="absolute left-3 top-3.5 text-gray-400 size-5" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full py-3 pl-10 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Lock className="absolute left-3 top-3.5 text-gray-400 size-5" />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold shadow-md transition"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin size-5" />
                  Logging in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-3 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google */}
            <div className="flex justify-center">
              <GoogleLogin 
                onSuccess={handleGoogleLogin} 
                onError={handleGoogleError}
                useOneTap={false}
                auto_select={false}
              />
            </div>
          </form>

          <p className="text-xs text-center text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-orange-500 hover:underline">Terms</a> and{" "}
            <a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a>.
          </p>

          {/* <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
