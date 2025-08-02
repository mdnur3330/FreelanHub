
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import useRoll from "../Hooqs/getRol";
import logo from '../assets/logo.svg'
import { FiUser } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import Button from "./SharedComponent/Button";

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
    <nav className="bg-[#1D3E3E] text-white shadow-md sticky top-0 left-0 right-0 z-50">
      <div className="max-w-11/12 mx-auto sm:px-3 lg:px-5">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Name */}
          <Link to="/" className="items-center gap-2 hidden md:block">
             <img src={logo} alt="" />
          </Link>

          {/* Navigation Right */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="text-white font-medium transition"
                >
                  Dashboard
                </Link>

                {/* Coin */}
                <span className="text-white font-medium">
                  💰 {role?.coin || 0} Coins
                </span>

                

                {/* Profile & Logout */}
                <div className="flex items-center gap-3">
                  <img
                    src={role?.img || "https://i.ibb.co/DgFMpNv/profile-placeholder.jpg"}
                    alt="Profile"
                    className="h-9 w-9 rounded-full border-2 object-cover"
                  />
              
                  <Button onClick={handleLogout} className="text-white rounded-md font-medium bg-[#04B2B2] hover:bg-[#04b2b2c9] transition"  label="Logout"/>
                </div>
              </>
            ) : (
              <>

              {/* Join as Developer */}
            <a
              href={githubRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#04B2B2] text-white px-2 py-1 hidden md:block rounded-md font-medium hover:bg-[#04b2b2c9] transition"
            >
              Join as Developer
            </a>
                {/* Login & Register */}
                <Link
                  to="/login"
                  className="font-medium transition flex gap-3 items-center"
                >
                  <FiUser />Login
                </Link>
                <Link
                  to="/sign-up"
                  className="font-medium transition flex gap-3 items-center"
                >
                  <BiUserPlus /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
