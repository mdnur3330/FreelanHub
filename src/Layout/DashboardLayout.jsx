import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Dashboard/Sidebar";
import { BellIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { userData, refetchUser, user } = useContext(AuthContext);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-3xl font-extrabold text-blue-700 tracking-wide">
          TaskBazaar
        </div>

        <div className="flex items-center gap-6">
          <button className="relative hover:text-blue-600 transition">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {userData ? (
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg shadow-sm">
              <img
                src={userData?.image || "https://i.ibb.co/DgFMpNv/profile-placeholder.jpg"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <div className="text-sm text-right">
                <div className="text-gray-800 font-semibold">{userData?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
                <div className="text-xs text-blue-600 font-semibold">
                  Coin: <span className="font-bold">{userData?.coin}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 animate-pulse">
              Loading user...
            </div>
          )}
        </div>
      </header>

      {/* Layout Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block sticky top-[20%] h-[calc(100vh-20%)]">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[70vh]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4 shadow-inner">
        &copy; {new Date().getFullYear()} TaskBazaar. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
