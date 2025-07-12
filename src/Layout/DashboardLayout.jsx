// import React, { useContext, useEffect, useState } from "react";
// import { Outlet } from "react-router";
// import Sidebar from "./Dashboard/Sidebar";
// import { BellIcon } from "@heroicons/react/24/outline";
// import axiosSecure from "../Hooqs/useAxiosSecure";
// import { AuthContext } from "../providers/AuthProvider";

// const DashboardLayout = () => {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState();
//   useEffect(() => {
//     const getData = async () => {
//       if (!user?.email) {
//         return "user email must be needed";
//       }
//       try {
//         const res = await axiosSecure(`/user-details/${user?.email}`);
//         console.log(res.data);
//         setUsers(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getData();
//   }, [user?.email, user?.coin]);
//   console.log(users);
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-blue-600 tracking-wide">
//           TaskBazaar
//         </div>

//         {/* Right Panel */}
//         <div className="flex items-center gap-6">
//           {/* Notification */}
//           <button className="relative hover:text-blue-600 transition">
//             <BellIcon className="w-6 h-6 text-gray-600" />
//             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
//             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* User Info */}
//           {users ? (
//             <div className="flex items-center gap-3">
//               <img
//                 src={user?.image}
//                 alt="User"
//                 className="w-10 h-10 rounded-full border-2 border-blue-500"
//               />
//               <div className="text-sm text-right">
//                 <div className="text-gray-800 font-semibold">{users?.name}</div>
//                 <div className="text-xs text-gray-500">{users?.email}</div>
//                 <div className="text-xs text-blue-500">
//                   Coin: <span className="font-bold">{users?.coin}</span>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-sm text-gray-500 animate-pulse">
//               Loading user...
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Body */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r hidden md:block shadow-sm">
//           <Sidebar />
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           <div className="bg-white rounded-2xl shadow-md p-6 min-h-[70vh]">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white text-center text-sm text-gray-500 py-4 shadow-inner">
//         &copy; {new Date().getFullYear()} TaskBazaar. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default DashboardLayout;




import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Dashboard/Sidebar";
import { BellIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { userData, refetchUser, user } = useContext(AuthContext);
  useEffect(()=>{
    refetchUser()
  },[userData?.coin])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600 tracking-wide">
          TaskBazaar
        </div>

        <div className="flex items-center gap-6">
          <button className="relative hover:text-blue-600 transition">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={userData?.image}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <div className="text-sm text-right">
                <div className="text-gray-800 font-semibold">{userData?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
                <div className="text-xs text-blue-500">
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

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r hidden md:block shadow-sm">
          <Sidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-md p-6 min-h-[70vh]">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="bg-white text-center text-sm text-gray-500 py-4 shadow-inner">
        &copy; {new Date().getFullYear()} TaskBazaar. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
