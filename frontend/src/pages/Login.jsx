import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Film,
  Eye,
  EyeOff,
  User,
  Lock,
  ArrowRight,
  CheckCircle,
  X,
  Home,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        // ✅ Save JWT token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setShowSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* ✅ Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md mx-4 border border-red-500/30 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Welcome Back!
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Login successful! Welcome back to CinemaHub.
                Get ready to discover amazing movies and book your favorite shows.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeSuccess}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* ✅ Form */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Film className="w-10 h-10 text-red-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              CinemaHub
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue your movie journey</p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ✅ Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* ✅ Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ✅ Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-600 focus:ring-2"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* ✅ Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center group shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-200"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center justify-center"
          >
            ← Back to CinemaHub
          </Link>
        </div>
      </div>
    </div>
  );
}
