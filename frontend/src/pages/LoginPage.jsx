import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import {axiosInstance} from "../lib/axios";
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
    login(formData); // Your existing email/password logic
  };
const setAuthUser = useAuthStore((state) => state.setAuthUser);

const handleGoogleLogin = async (credentialResponse) => {
  try {
    const res = await axiosInstance.post("/auth/google", {
      token: credentialResponse.credential,
    });

      setAuthUser(res.data); // update auth store
    toast.success("Logged in with Google!");
    // optionally navigate somewhere, e.g., useNavigate()("/dashboard");
  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Google login failed");
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT - FORM SECTION */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-6 md:px-12 py-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="size-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <SmilePlus className="size-6 text-orange-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-orange-600">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Mail className="absolute left-3 top-10 transform -translate-y-1/2 text-gray-400 size-5" />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Lock className="absolute left-3 top-10 transform -translate-y-1/2 text-gray-400 size-5" />
              <button
                type="button"
                className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold shadow-md transition"
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
              <span className="mx-3 text-gray-500 text-sm">or continue with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google Sign In */}
            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google login failed")} />
            </div>

            <p className="w-[80%] text-xs text-gray-400 text-center mt-4 px-4 mx-auto">
              By signing in or creating an account, you are agreeing to our{" "}
              <a href="/terms" className="text-orange-500 hover:underline">Terms & Conditions</a> and our{" "}
              <a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a>.
            </p>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT - THEME DESIGN */}
      <div className="mt-[4%] hidden md:flex w-1/2 bg-orange-500 text-white flex-col justify-center px-10 py-16 space-y-10 relative overflow-hidden">
        <h2 className="text-3xl font-bold">Welcome to <span className="text-black"> Code</span>Tracker</h2>

        <div className="space-y-6">
          <Feature icon="📊" title="All in One Coding Profile" desc="Showcase your complete coding portfolio, track all stats, and share your progress effortlessly in one place." />
          <Feature icon="📄" title="Follow Popular Sheets" desc="Organize questions and follow popular coding Sheets in one place for seamless revision." />
          <Feature icon="🏆" title="Contest Tracker" desc="Stay on top of contests by tracking schedules and setting reminders with a single click." />
        </div>

        {/* Optional blobs */}
        <div className="absolute right-10 top-10 w-40 h-40 bg-orange-400/20 rounded-full blur-2xl"></div>
        <div className="absolute left-[-20px] bottom-10 w-32 h-32 bg-orange-300/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-white text-orange-500 p-3 rounded-lg shadow-sm text-xl">{icon}</div>
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-orange-100">{desc}</p>
    </div>
  </div>
);

export default LoginPage;
