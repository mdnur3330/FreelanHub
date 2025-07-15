
// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../../../providers/AuthProvider';
// import axiosSecure from '../../../Hooqs/useAxiosSecure';


// const MySubmisson = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecur = axiosSecure;
//   const [myTask, setMyTask] = useState([]);

//   // ✅ Fetch My Tasks
//   useEffect(() => {
//     const getSubmisson = async () => {
//       try {
//         const { data } = await axiosSecur(`/my-submissoin/${user?.email}`);
//         setMyTask(data);
//       } catch (error) {
//         console.log('Fetch Error:', error);
//       }
//     };
//     if (user?.email) getSubmisson();
//   }, [user?.email, axiosSecur]);

 
// console.log(myTask);

//   return (
//     <div className="overflow-x-auto px-4 py-6">
//       <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">My Tasks</h2>
//       <table className="min-w-full table-auto border border-gray-200 shadow rounded">
//         <thead className="bg-blue-600 text-white">
//           <tr>
//             <th className="px-4 py-2">Image</th>
//             <th className="px-4 py-2">Title</th>
//             <th className="px-4 py-2">Buyer Name</th>
//             <th className="px-4 py-2">Payable</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {myTask.map((task) => (
//             <tr key={task._id} className="border-b hover:bg-gray-100 transition">
//               <td className="px-4 py-2">
//                 <img
//                   src={task.taskImg || 'https://via.placeholder.com/100'}
//                   alt="Task"
//                   className="w-16 h-16 object-cover rounded"
//                 />
//               </td>
//               <td className="px-4 py-2">{task.task_title}</td>
//               <td className="px-4 py-2 text-center">{task.buyer_name}</td>
//               <td className="px-4 py-2 text-center">{task.payable_amount}৳</td>
             
//               <td className="px-4 py-2 text-center space-x-2">
//                 {task.status}
//               </td>
//             </tr>
//           ))}
//           {myTask.length === 0 && (
//             <tr>
//               <td colSpan="8" className="text-center py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MySubmisson;
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../Hooqs/useAxiosSecure";

const MySubmisson = () => {
  const { user } = useContext(AuthContext);
  const [myTask, setMyTask] = useState([]);

  // ✅ Fetch My Tasks
  useEffect(() => {
    const getSubmisson = async () => {
      try {
        const { data } = await axiosSecure(`/my-submissoin/${user?.email}`);
        setMyTask(data);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    if (user?.email) getSubmisson();
  }, [user?.email]);

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-blue-700">
        📌 My Task Submissions
      </h2>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 shadow rounded">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Buyer Name</th>
              <th className="px-4 py-2 text-left">Payable</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {myTask.length > 0 ? (
              myTask.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-2">
                    <img
                      src={task.taskImg || "https://via.placeholder.com/100"}
                      alt="Task"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{task.task_title}</td>
                  <td className="px-4 py-2">{task.buyer_name}</td>
                  <td className="px-4 py-2">{task.payable_amount}৳</td>
                  <td className="px-4 py-2 capitalize font-medium text-blue-600">
                    {task.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards */}
      <div className="md:hidden space-y-4 mt-4">
        {myTask.length > 0 ? (
          myTask.map((task) => (
            <div
              key={task._id}
              className="border border-gray-200 rounded-lg shadow-md p-4 bg-white"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={task.taskImg || "https://via.placeholder.com/100"}
                  alt="task"
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-blue-700 text-lg">
                    {task.task_title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Buyer: {task.buyer_name}
                  </p>
                </div>
              </div>
              <p className="text-sm">
                💰 <span className="font-medium">Payable:</span> {task.payable_amount}৳
              </p>
              <p className="text-sm">
                📌 <span className="font-medium">Status:</span>{" "}
                <span className="capitalize text-green-600 font-semibold">
                  {task.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default MySubmisson;
