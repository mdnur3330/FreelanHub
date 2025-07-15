import React from "react";
import {
  FaUserShield,
  FaTasks,
  FaClipboardList,
  FaMoneyBillWave,
  FaUsers,
  FaUserEdit,
  FaWallet,
} from "react-icons/fa";
import useRoll from "../../Hooqs/getRol";
import { useEffect } from "react";
import axiosSecure from "../../Hooqs/useAxiosSecure";
import { useState } from "react";

const DashBoardProfile = () => {
  const [user] = useRoll();
  const [state, setState] = useState()
  console.log(state);
 
    useEffect(()=>{
        if(user?.role === "Buyer"){
            const getStates = async ()=>{
                const res = await axiosSecure('/buyer-stats')
                setState(res.data)
            }
            getStates()
        }else{
            return 
        }

    },[user?.role])


    useEffect(()=>{
        if(user?.role === "Worker"){
            const getStates = async ()=>{
                const res = await axiosSecure('/worker-stats')
                setState(res.data)
            }
            getStates()
        }else{
            return 
        }

    },[user?.role])
console.log(state);
  // Define role-based items
  const roleItems = {
    Worker: [
      { label: "Total Submission", task:state?.allTask, icon: FaUserShield},
      { label: "Total pending submission", task:state?.pendingTask, icon: FaTasks},
      { label: "Total Coin Earning", task:state?.totalEarning, icon: FaClipboardList},
      { label: "Withdrawals", icon: FaMoneyBillWave, link: "/dashboard/withDrawal-form" },
    ],
    Buyer: [
      { label: "Total Paid",  task:state?.totalPaid, icon: FaUserShield},
      { label: "Total Pending Task", task:state?.pendingWorkers, icon: FaTasks},
      { label: "All Tasks", task:state?.totalTasks, icon: FaClipboardList },
      { label: "Wallet", task: user?.wallet, icon: FaWallet},
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
              <p className="text-xs text-gray-500"> {item.task || 0}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashBoardProfile;
