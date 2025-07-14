// import { useState } from "react";
// import { FaTrashAlt } from "react-icons/fa";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([
//     {
//       _id: "1",
//       display_name: "John Doe",
//       user_email: "john@example.com",
//       photo_url: "https://i.pravatar.cc/40",
//       role: "Buyer",
//       coin: 120
//     },
//     {
//       _id: "2",
//       display_name: "Alice Smith",
//       user_email: "alice@example.com",
//       photo_url: "https://i.pravatar.cc/41",
//       role: "Worker",
//       coin: 300
//     }
//   ]);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-xl shadow">
//           <thead>
//             <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//               <th className="px-4 py-2">Photo</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Role</th>
//               <th className="px-4 py-2">Coin</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-t hover:bg-gray-50 text-sm">
//                 <td className="px-4 py-2">
//                   <img
//                     src={user.photo_url}
//                     alt={user.display_name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                 </td>
//                 <td className="px-4 py-2">{user.display_name}</td>
//                 <td className="px-4 py-2">{user.user_email}</td>
//                 <td className="px-4 py-2">
//                   <select
//                     defaultValue={user.role}
//                     className="border px-2 py-1 rounded-md"
//                   >
//                     <option value="Admin">Admin</option>
//                     <option value="Buyer">Buyer</option>
//                     <option value="Worker">Worker</option>
//                   </select>
//                 </td>
//                 <td className="px-4 py-2">{user.coin}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     title="Remove User"
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


import React, { useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import axiosSecure from '../../../Hooqs/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageTask = () => {
  const axiosSecur = axiosSecure;
  const [myTask, setMyTask] = useState([]);
 

  //  Delete Task Handler
  const handleDelete = (id) => {
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    }); 
    

     axiosSecur.delete(`/delete-task/${id}`).then(res =>{
       if (res.data) {
        setMyTask((prev) => prev.filter((task) => task._id !== id));
         console.log(res.data)
      }
     }).catch(error => console.log(error))
  }
});

   
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">My Tasks</h2>
      <table className="min-w-full table-auto border border-gray-200 shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Workers</th>
            <th className="px-4 py-2">Payable</th>
            <th className="px-4 py-2">Deadline</th>
            <th className="px-4 py-2">Submission</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myTask.map((task) => (
            <tr key={task._id} className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-2">
                <img
                  src={task.task_image_url || 'https://via.placeholder.com/100'}
                  alt="Task"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{task.task_title}</td>
              <td className="px-4 py-2">{task.task_detail}</td>
              <td className="px-4 py-2 text-center">{task.required_workers}</td>
              <td className="px-4 py-2 text-center">{task.payable_amount}৳</td>
              <td className="px-4 py-2 text-center">{task.completion_date}</td>
              <td className="px-4 py-2">{task.submission_info}</td>
              <td className="px-4 py-2 text-center space-x-2">
                
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {myTask.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTask;

