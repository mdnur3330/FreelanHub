import React from "react";

const TaskBazaarLoading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Spinner */}
      <div className="w-20 h-20 border-8 border-t border-l border-b border-blue-500 rounded-full animate-spin mb-6"></div>

      {/* Brand Name */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-widest">
        TaskBazaar
      </h1>

      {/* Subtext */}
      <p className="mt-2 text-blue-500 text-sm md:text-base animate-pulse">
        Loading your experience...
      </p>
    </div>
  );
};

export default TaskBazaarLoading;
