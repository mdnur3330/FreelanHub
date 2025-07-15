import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Dashboard/Sidebar";
import {
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { userData, refetchUser, user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b">
        <div className="flex items-center justify-between w-full">
          {/* Logo & Sidebar Toggle */}
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
              <span className="hidden sm:inline text-xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
                TaskBazaar
              </span>
            </div>
          </div>

          {/* Header Right Section */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Notification Bell */}
            <button className="relative hover:text-blue-600 transition hidden sm:inline-block">
              <BellIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Info Box */}
            {userData ? (
              <div className="flex items-center gap-3 bg-blue-50 px-3 py-2 rounded-lg shadow-sm max-w-[220px] overflow-hidden">
                <img
                  src={userData?.image || "https://i.ibb.co/DgFMpNv/profile-placeholder.jpg"}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                />
                <div className="text-sm leading-tight text-right truncate">
                  <div className="text-gray-800 font-semibold truncate">{userData?.name}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                  <div className="text-xs text-blue-600 font-semibold">
                    Coin: <span className="font-bold">{userData?.coin}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 animate-pulse">Loading user...</div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex flex-1 relative">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r shadow-sm sticky top-30 h-[calc(100vh-40px)] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="absolute top-0 left-0 z-40 w-64 h-full bg-white shadow-md md:hidden">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 min-h-[70vh]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4 border-t">
        &copy; {new Date().getFullYear()} TaskBazaar. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
