// import React from "react";
// import {
//   FaUserShield,
//   FaTasks,
//   FaClipboardList,
//   FaMoneyBillWave,
//   FaUsers,
//   FaWallet,
//   FaCoins,
// } from "react-icons/fa";
// import useRoll from "../../Hooqs/getRol";
// import { useEffect } from "react";
// import axiosSecure from "../../Hooqs/useAxiosSecure";
// import { useState } from "react";

// const DashBoardProfile = () => {
//   const [user] = useRoll();
//   const [state, setState] = useState()
//   console.log(state);
 
//     useEffect(()=>{
//         if(user?.role === "Buyer"){
//             const getStates = async ()=>{
//                 const res = await axiosSecure('/buyer-stats')
//                 setState(res.data)
//             }
//             getStates()
//         }else{
//             return 
//         }

//     },[user?.role])


//     useEffect(()=>{
//         if(user?.role === "Worker"){
//             const getStates = async ()=>{
//                 const res = await axiosSecure('/worker-stats')
//                 setState(res.data)
//             }
//             getStates()
//         }else{
//             return 
//         }

//     },[user?.role])


//     useEffect(()=>{
//         if(user?.role === "Admin"){
//             const getStates = async ()=>{
//                 const res = await axiosSecure('/admin-stats')
//                 setState(res.data)
//             }
//             getStates()
//         }else{
//             return 
//         }

//     },[user?.role])
// console.log(state);
//   // Define role-based items
//   const roleItems = {
//     Worker: [
//       { label: "Total Submission", task:state?.allTask, icon: FaUserShield},
//       { label: "Total pending submission", task:state?.pendingTask, icon: FaTasks},
//       { label: "Total Coin Earning", task:state?.totalEarning, icon: FaClipboardList},
//       { label: "Withdrawals", icon: FaMoneyBillWave},
//     ],
//     Buyer: [
//       { label: "Total Paid",  task:state?.totalPaid, icon: FaUserShield},
//       { label: "Total Pending Task", task:state?.pendingWorkers, icon: FaTasks},
//       { label: "All Tasks", task:state?.totalTasks, icon: FaClipboardList },
//       { label: "Wallet", task: user?.wallet, icon: FaWallet},
//     ],
//     Admin: [
//       { label: "Total Worker",task:state?.totalWorker, icon: FaUserShield},
//       { label: "Total Buyer", task:state?.totalBuyer, icon: FaUsers},
//       { label: "Total Payments", task:state?.totalPayments, icon: FaMoneyBillWave},
//       { label: "Total Coin", task:state?.totalCoin, icon: FaCoins},
//     ],
//   };

//   const currentItems = roleItems[user?.role] || [];

//   return (
//     <section className="bg-white pb-16 px-4 md:px-10">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Profile Box */}
//         <div className="bg-gradient-to-tr from-blue-700 to-purple-700 text-white p-8 rounded-lg flex flex-col justify-center items-center text-center shadow-lg">
//           <img
//             src={user?.img}
//             alt="profile"
//             className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-md"
//           />
//           <h2 className="text-xl font-semibold capitalize mb-1">{user?.user}</h2>
//           <p className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full capitalize mb-4">
//             {user?.role} Dashboard
//           </p>
//           <button className="mt-2 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-700 transition">
//             View Profile
//           </button>
//         </div>

//         {/* Role-Based Dashboard Cards */}
//         <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {currentItems.map((item, idx) => (
//             <a
//               href={item.link}
//               key={idx}
//               className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-xl transition group border border-gray-100 hover:border-blue-500"
//             >
//               <item.icon className="text-3xl text-blue-600 mx-auto mb-4 group-hover:scale-110 transition duration-200" />
//               <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600">
//                 {item.label}
//               </h4>
//               <p className="text-xs text-gray-500"> {item.task || 0}</p>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DashBoardProfile;
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
