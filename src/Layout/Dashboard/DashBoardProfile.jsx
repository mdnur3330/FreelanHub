
import React, { useEffect, useState } from "react";
import {
  FaUserShield,
  FaTasks,
  FaClipboardList,
  FaMoneyBillWave,
  FaUsers,
  FaWallet,
  FaCoins,
} from "react-icons/fa";
import useRoll from "../../Hooqs/getRol";
import axiosSecure from "../../Hooqs/useAxiosSecure";
import Button from "../../Component/SharedComponent/Button";

const DashBoardProfile = () => {
  const [user] = useRoll();
  const [state, setState] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.role) return;

      let endpoint = "";
      if (user.role === "Buyer") endpoint = "/buyer-stats";
      else if (user.role === "Worker") endpoint = "/worker-stats";
      else if (user.role === "Admin") endpoint = "/admin-stats";

      try {
        const res = await axiosSecure(endpoint);
        setState(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [user?.role]);

  const roleItems = {
    Worker: [
      { label: "Total Submission", task: state?.allTask, icon: FaUserShield },
      { label: "Pending Submission", task: state?.pendingTask, icon: FaTasks },
      { label: "Total Coin Earned", task: state?.totalEarning, icon: FaClipboardList },
      { label: "Withdrawals", task: 0, icon: FaMoneyBillWave },
    ],
    Buyer: [
      { label: "Total Paid", task: state?.totalPaid, icon: FaUserShield },
      { label: "Pending Tasks", task: state?.pendingWorkers, icon: FaTasks },
      { label: "All Tasks", task: state?.totalTasks, icon: FaClipboardList },
      { label: "Wallet", task: user?.wallet, icon: FaWallet },
    ],
    Admin: [
      { label: "Total Workers", task: state?.totalWorker, icon: FaUserShield },
      { label: "Total Buyers", task: state?.totalBuyer, icon: FaUsers },
      { label: "Total Payments", task: state?.totalPayments, icon: FaMoneyBillWave },
      { label: "Total Coin", task: state?.totalCoin, icon: FaCoins },
    ],
  };

  const currentItems = roleItems[user?.role] || [];

  return (
    <section className="bg-[#F3F9FB] py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Box */}
        <div className="bg-[#0F3D3E] text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
          <img
            src={user?.img || "https://i.ibb.co/DgFMpNv/profile-placeholder.jpg"}
            alt="profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 border-4 border-[#00C2C2] shadow-lg object-cover"
          />
          <h2 className="text-lg sm:text-xl font-bold capitalize">{user?.user}</h2>
          <p className="text-sm sm:text-base bg-[#00C2C2] text-white px-4 py-1 rounded-full mt-2 mb-4 capitalize">
            {user?.role} Dashboard
          </p>
          <Button label="View Profile" className="mt-3 border border-[#00C2C2] px-6 py-2 rounded-full hover:bg-[#00C2C2] hover:text-white transition-all text-sm sm:text-base"/>
        </div>

        {/* Role-Based Dashboard Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 hover:border-[#00C2C2] p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
              <item.icon className="text-3xl text-[#0F3D3E] mb-4 mx-auto group-hover:scale-110 group-hover:text-[#00C2C2] transition" />
              <h4 className="text-base sm:text-lg font-semibold text-center text-[#0F3D3E] group-hover:text-[#00C2C2]">
                {item.label}
              </h4>
              <p className="text-sm text-gray-500 text-center mt-1">
                {item.task !== undefined ? item.task : 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashBoardProfile;
