
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Outlet } from "react-router";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../providers/AuthProvider";
import axiosSecure from "../Hooqs/useAxiosSecure";
import Sidebar from "./Dashboard/Sidebar";

const DashboardLayout = () => {
  const { userData, refetchUser, user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

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

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F9FB]">
      {/* Header */}
      <header className="bg-[#0F3D3E] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white md:hidden"
          >
            {sidebarOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>
          <div onClick={goToHome} className="cursor-pointer flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00C2C2]" />
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              FreelanHub
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="relative text-white hover:text-[#00C2C2]"
          >
            <BellIcon className="w-6 h-6" />
            {notifications.length > 0 && (
              <>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </>
            )}
          </button>
          <img
            src={userData?.image || "https://i.ibb.co/DgFMpNv/profile-placeholder.jpg"}
            className="w-10 h-10 rounded-full border-2 border-[#00C2C2] object-cover"
            alt="user"
          />
          <div className="text-sm leading-tight truncate hidden sm:block text-white">
            <div className="font-semibold truncate">{userData?.name}</div>
            <div className="text-xs text-gray-200 truncate">{user?.email}</div>
            <div className="text-xs text-[#00C2C2] font-semibold">
              Coin: <span className="font-bold mr-2">{userData?.coin}</span>
              Role: <span className="font-bold">{userData?.role}</span>
            </div>
          </div>

          {showPopup && (
            <div
              ref={popupRef}
              className="absolute top-12 right-0 w-80 max-h-96 overflow-y-auto bg-white text-black border rounded-lg shadow-lg p-4 z-50"
            >
              <h3 className="text-lg font-semibold text-[#00C2C2] mb-2">Notifications</h3>
              {notifications.length > 0 ? (
                notifications.map((note, idx) => (
                  <div
                    key={idx}
                    onClick={() => window.location.href = note.actionRoute}
                    className="cursor-pointer flex items-start gap-3 border-b py-2 hover:bg-[#E0F7F7] px-2 rounded"
                  >
                    <div className="w-8 h-8 bg-[#E0F7F7] rounded flex items-center justify-center text-[#00C2C2]">
                      📨
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{note.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(note.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No notifications</p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Layout Content */}
      <div className="flex flex-1 relative">
        <aside className="hidden md:block w-64 bg-[#1D3E3E] border-r shadow-sm sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 z-50 w-64 h-full bg-[#1D3E3E] shadow-lg"
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-600 hover:text-red-500"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 min-h-[70vh]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F3D3E] text-center text-sm text-white py-4 border-t">
        &copy; {new Date().getFullYear()} FreelanHub. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
