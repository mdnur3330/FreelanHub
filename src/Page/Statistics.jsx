import React from "react";
import { FaUsers, FaTasks, FaCoins } from "react-icons/fa";

const Statistics = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Platform Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Total Tasks Done */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="flex justify-center text-blue-600 mb-4">
              <FaTasks className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">25,000+</h3>
            <p className="text-gray-600">Total Tasks Completed</p>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="flex justify-center text-green-600 mb-4">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">10,000+</h3>
            <p className="text-gray-600">Registered Users</p>
          </div>

          {/* Total Coins Earned */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="flex justify-center text-yellow-500 mb-4">
              <FaCoins className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">5,00,000+</h3>
            <p className="text-gray-600">Coins Earned</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
