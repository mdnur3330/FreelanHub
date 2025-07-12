import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import useRoll from "../Hooqs/getRol";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role] = useRoll();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const githubRepoLink = "https://github.com/mdnur3330/Task-Bazaar";

  const handleLogout = () => {
        logOut().then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={role?.img || "/default-avatar.png"}
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-xl font-bold text-purple-700">
              TaskBazaar
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-purple-600 font-medium transition"
                >
                  Dashboard
                </Link>

                <span className="text-gray-600 font-medium hidden sm:inline">
                  💰 {role?.coin || 0} Coins
                </span>

                {/* Profile with dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                  >
                    <img
                      src={role?.img || "/default-avatar.png"}
                      alt="Profile"
                      className="h-9 w-9 rounded-full border-2 border-purple-500"
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50"
                      >
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
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
