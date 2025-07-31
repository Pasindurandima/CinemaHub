import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Film, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // ✅ Check localStorage for token + user info
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsAuthenticated(true);
      setUserName(user.firstName || "User");
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  }, []);

  const handleLogout = () => {
    // ✅ Clear storage & state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserName("");
    // Optionally, redirect to home page
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              CinemaHub
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive ? "text-red-500" : "text-gray-300 hover:text-red-400"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive ? "text-red-500" : "text-gray-300 hover:text-red-400"
                }`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/theaters"
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive ? "text-red-500" : "text-gray-300 hover:text-red-400"
                }`
              }
            >
              Theaters
            </NavLink>
            <NavLink
              to="/releases"
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive ? "text-red-500" : "text-gray-300 hover:text-red-400"
                }`
              }
            >
              Releases
            </NavLink>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-700 hover:bg-gray-600 text-white"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `transition-colors duration-200 font-medium ${
                      isActive
                        ? "text-red-500 border-b-2 border-red-600 pb-1"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-red-700 text-white shadow-lg ring-2 ring-red-600/50"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}