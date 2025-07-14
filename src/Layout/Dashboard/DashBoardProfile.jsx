import React from "react";
import {
  FaUserShield,
  FaTasks,
  FaClipboardList,
  FaCoins,
  FaMoneyBillWave,
  FaUsers,
  FaUserEdit,
  FaWallet,
} from "react-icons/fa";
import useRoll from "../../Hooqs/getRol";

const AchievementSection = () => {
  const [user] = useRoll();
  console.log(user);

  // Define role-based items
  const roleItems = {
    Worker: [
      { label: "Home", icon: FaUserShield, link: "/" },
      { label: "Approved Task List", icon: FaTasks, link: "/dashboard/approved-task" },
      { label: "My Submissions", icon: FaClipboardList, link: "/dashboard/submissions" },
      { label: "Withdrawals", icon: FaMoneyBillWave, link: "/dashboard/withDrawal-form" },
    ],
    Buyer: [
      { label: "Home", icon: FaUserShield, link: "/" },
      { label: "Add New Tasks", icon: FaTasks, link: "/dashboard/add-task" },
      { label: "My Tasks", icon: FaClipboardList, link: "/dashboard/my-task" },
      { label: "Purchase Coin", icon: FaCoins, link: "/dashboard/purchase-coin" },
      { label: "Payment History", icon: FaWallet, link: "/dashboard/paymenthistory" },
    ],
    Admin: [
      { label: "Home", icon: FaUserShield, link: "/dashboard/home" },
      { label: "Manage Users", icon: FaUsers, link: "/dashboard/manage-users" },
      { label: "Manage Tasks", icon: FaUserEdit, link: "/dashboard/manage-tasks" },
    ],
  };

  const currentItems = roleItems[user?.role] || [];

  return (
    <section className="bg-white pb-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Box */}
        <div className="bg-gradient-to-tr from-blue-700 to-purple-700 text-white p-8 rounded-lg flex flex-col justify-center items-center text-center shadow-lg">
          <img
            src={user?.img}
            alt="profile"
            className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-md"
          />
          <h2 className="text-xl font-semibold capitalize mb-1">{user?.user}</h2>
          <p className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full capitalize mb-4">
            {user?.role} Dashboard
          </p>
          <button className="mt-2 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-700 transition">
            View Profile
          </button>
        </div>

        {/* Role-Based Dashboard Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentItems.map((item, idx) => (
            <a
              href={item.link}
              key={idx}
              className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-xl transition group border border-gray-100 hover:border-blue-500"
            >
              <item.icon className="text-3xl text-blue-600 mx-auto mb-4 group-hover:scale-110 transition duration-200" />
              <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600">
                {item.label}
              </h4>
              <p className="text-xs text-gray-500">Go to {item.label}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
