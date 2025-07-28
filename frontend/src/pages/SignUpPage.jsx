import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, UserPlus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { axiosInstance } from "../lib/axios.js";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const handleGoogleSignup = async (response) => {
    try {
      const res = await axiosInstance.post("/auth/google", {
        token: response.credential,
      });
      setAuthUser(res.data);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google signup error:", err);
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden font-sans mt-[4%]">
      {/* LEFT SECTION – CODFOLIO INFO */}
      <div className="hidden md:flex w-1/2 bg-orange-500 text-white flex-col justify-center items-center p-10 relative overflow-hidden rounded-r-3xl space-y-6">
        <h2 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-black">Codfolio</span>
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
          <div className="bg-white text-orange-600 rounded-xl p-5 shadow-xl">
            <h3 className="text-lg font-bold">🔥 Streak Tracker</h3>
            <p className="text-sm text-gray-600">7-day LeetCode streak maintained!</p>
          </div>

          <div className="bg-white text-orange-600 rounded-xl p-5 shadow-xl">
            <h3 className="text-lg font-bold">📈 CF Rating</h3>
            <p className="text-sm text-gray-600">Current: 1331 | Max: 1410</p>
          </div>

          <div className="bg-white text-orange-600 rounded-xl p-5 shadow-xl">
            <h3 className="text-lg font-bold">📚 1000+ DSA Problems</h3>
            <p className="text-sm text-gray-600">Solved across CF, LC, GFG & CN</p>
          </div>
        </div>

        {/* Background Shape */}
        <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl top-[-50px] left-[-50px]" />
      </div>

      {/* RIGHT SECTION – SIGNUP FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-10 bg-white relative z-10">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center mb-8 text-sm text-gray-500 gap-2 ">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-orange-500"
            >
              ←
            </button>
            <p>
              Already member?{" "}
              <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
          <p className="text-sm text-gray-400 mb-6">Secure your Codfolio dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full py-3 pl-10 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <User className="absolute left-3 top-3.5 text-gray-400 size-5" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
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
                placeholder="Password"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-md transition"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin size-5 mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  Sign Up <span className="ml-2">→</span>
                </>
              )}
            </button>

            {/* Google */}
            <div className="flex justify-center my-2">
              <GoogleLogin
                onSuccess={handleGoogleSignup}
                onError={() => toast.error("Google signup failed")}
              />
            </div>
          </form>

          <p className="text-xs text-center text-gray-400 mt-6">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-orange-500 hover:underline">Terms</a> and{" "}
            <a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
