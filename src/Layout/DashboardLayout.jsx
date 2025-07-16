
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Navigate, Outlet, useNavigate } from "react-router";
import Sidebar from "./Dashboard/Sidebar";
import {
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../providers/AuthProvider";
import axiosSecure from "../Hooqs/useAxiosSecure";

const DashboardLayout = () => {
  const { userData, refetchUser, user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navegate = useNavigate()

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);



useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await axiosSecure.get(`/notifications/${user.email}`);
      setNotifications(res.data);
    } catch (error) {
      console.error("Notification fetch error:", error);
    }
  };
  if (user?.email) {
    fetchNotifications();
  }
}, [user?.email]);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToHome = ()=>{
    navegate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-blue-700 transition md:hidden"
            >
              {sidebarOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-2 min-w-[32px]">
              <div className="w-3 h-3 rounded-full bg-blue-600 md:w-4 md:h-4" />
              <button onClick={goToHome} className="cursor-pointer hidden sm:inline text-xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
                TaskBazaar
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5 relative">
            {/* Notification Bell */}
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="relative hover:text-blue-600 transition hidden sm:inline-block"
            >
              <BellIcon className="w-6 h-6 text-gray-600" />
              {notifications.length > 0 && (
                <>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </>
              )}
            </button>

            {/* Popup Notification */}
            {showPopup && (
              <div
                ref={popupRef}
                className="absolute top-10 right-0 w-72 md:w-80 max-h-96 overflow-y-auto bg-white border shadow-lg rounded-lg p-4 z-50"
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Notifications</h3>
                {notifications.length > 0 ? (
                  notifications.map((note, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-200 pb-2 mb-2 text-sm text-gray-700 hover:bg-blue-50 p-2 rounded cursor-pointer"
                      onClick={() => window.location.href = note.actionRoute}
                    >
                      <p>{note.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(note.time).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No notifications</p>
                )}
              </div>
            )}

            {/* User Info */}
            {userData ? (
              <div className="flex items-center gap-3 bg-blue-50 px-3 py-2 rounded-lg shadow-sm max-w-[220px] overflow-hidden">
                <img
                  src={userData?.image || "https://i.ibb.co/DgFMpNv/profile-placeholder.jpg"}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                />
                <div className="text-sm leading-tight  truncate">
                  <div className="text-gray-800 font-semibold truncate">{userData?.name}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                  <div className="text-xs text-blue-600 font-semibold">
                    Coin: <span className="font-bold mr-2">{userData?.coin}</span>
                    Role: <span className="font-bold">{userData?.role}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 animate-pulse">Loading user...</div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r shadow-sm sticky top-30 h-[calc(100vh-40px)] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Sidebar - Mobile */}
       {sidebarOpen && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0"
      onClick={() => setSidebarOpen(false)}
    ></div>

    {/* Sidebar with animation */}
   {sidebarOpen && (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    exit={{ x: "-100%" }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg overflow-y-auto"
  >
    {/* Close Button */}
    <button
      onClick={() => setSidebarOpen(false)}
      className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
    >
      <XMarkIcon className="w-6 h-6" />
    </button>

    {/* Sidebar Content */}
    <div className="mt-12">
      <Sidebar />
    </div>
  </motion.div>
)}

  </>
)}


        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 min-h-[70vh]">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="bg-white text-center text-sm text-gray-500 py-4 border-t">
        &copy; {new Date().getFullYear()} TaskBazaar. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
