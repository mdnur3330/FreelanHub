
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import useRoll from "../Hooqs/getRol";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role] = useRoll();
  const navigate = useNavigate();

  const githubRepoLink = "https://github.com/mdnur3330/Task-Bazaar";

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Name */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="TaskBazaar"
              className="h-8 w-8 object-cover"
            />
            <span className="text-xl font-bold text-purple-700 hidden sm:inline">
              TaskBazaar
            </span>
          </Link>

          {/* Navigation Right */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-purple-600 font-medium transition"
                >
                  Dashboard
                </Link>

                {/* Coin */}
                <span className="text-gray-600 font-medium hidden sm:inline">
                  💰 {role?.coin || 0} Coins
                </span>

                {/* Profile & Logout */}
                <div className="flex items-center gap-3">
                  <img
                    src={role?.img || "https://i.ibb.co/DgFMpNv/profile-placeholder.jpg"}
                    alt="Profile"
                    className="h-9 w-9 rounded-full border-2 border-purple-500 object-cover"
                  />
                  <button
                    onClick={handleLogout}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Login & Register */}
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="text-gray-700 hover:text-purple-600 font-medium transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Join as Developer */}
            <a
              href={githubRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition"
            >
              Join as Developer
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
