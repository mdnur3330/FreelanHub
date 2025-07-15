// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../../../providers/AuthProvider';
// import axiosSecure from '../../../Hooqs/useAxiosSecure';
// import { Link } from 'react-router'; 
// import Swal from 'sweetalert2';

// const MyTasks = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecur = axiosSecure;
//   const [myTask, setMyTask] = useState([]);

//   useEffect(() => {
//     const getTask = async () => {
//       try {
//         const { data } = await axiosSecur(`/my-task/${user?.email}`);
//         // Sort by completion_date descending
//         const sortedData = data.sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date));
//         setMyTask(sortedData);
//       } catch (error) {
//         console.log('Fetch Error:', error);
//       }
//     };
//     if (user?.email) getTask();
//   }, [user?.email, axiosSecur]);

//   const handleDelete = (task) => {
//     const { _id, required_workers, payable_amount, isCompleted } = task;
//     const refillAmount = required_workers * payable_amount;

//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecur.delete(`/delete-task/${_id}`).then(res => {
//           if (res.data) {
//             setMyTask((prev) => prev.filter((t) => t._id !== _id));
//             if (!isCompleted) {
//               axiosSecur.patch(`/update-coin/${user?.email}`, { coin: refillAmount })
//                 .then(() => {
//                   Swal.fire("Deleted!", "Task deleted and coins refunded.", "success");
//                 });
//             } else {
//               Swal.fire("Deleted!", "Task deleted.", "success");
//             }
//           }
//         }).catch(error => console.log(error));
//       }
//     });
//   };

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">My Tasks</h2>

//       <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
//         <table className="min-w-full table-auto text-sm text-gray-700">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="px-4 py-2">Image</th>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Details</th>
//               <th className="px-4 py-2">Workers</th>
//               <th className="px-4 py-2">Payable</th>
//               <th className="px-4 py-2">Deadline</th>
//               <th className="px-4 py-2">Submission</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myTask.map((task) => (
//               <tr key={task._id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">
//                   <img
//                     src={task.task_image_url || 'https://via.placeholder.com/100'}
//                     alt="Task"
//                     className="w-14 h-14 object-cover rounded-md border"
//                   />
//                 </td>
//                 <td className="px-4 py-2 max-w-[150px] truncate">{task.task_title}</td>
//                 <td className="px-4 py-2 max-w-[200px] truncate">{task.task_detail}</td>
//                 <td className="px-4 py-2 text-center">{task.required_workers}</td>
//                 <td className="px-4 py-2 text-center">{task.payable_amount}৳</td>
//                 <td className="px-4 py-2 text-center">{task.completion_date}</td>
//                 <td className="px-4 py-2 max-w-[150px] truncate">{task.submission_info}</td>
//                 <td className="px-4 py-2 text-center space-y-1 flex flex-col items-center">
//                   <Link
//                     to={`/dashboard/update-task/${task._id}`}
//                     className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600 transition"
//                   >
//                     Update
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(task)}
//                     className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {myTask.length === 0 && (
//               <tr>
//                 <td colSpan="8" className="text-center py-6 text-gray-500">
//                   No tasks found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyTasks;
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import axiosSecure from '../../../Hooqs/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const [myTask, setMyTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      try {
        const { data } = await axiosSecure(`/my-task/${user?.email}`);
        const sortedData = data.sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date));
        setMyTask(sortedData);
      } catch (error) {
        console.log('Fetch Error:', error);
      }
    };
    if (user?.email) getTask();
  }, [user?.email]);

  const handleDelete = (task) => {
    const { _id, required_workers, payable_amount, isCompleted } = task;
    const refillAmount = required_workers * payable_amount;

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
        axiosSecure.delete(`/delete-task/${_id}`).then(res => {
          if (res.data) {
            setMyTask((prev) => prev.filter((t) => t._id !== _id));
            if (!isCompleted) {
              axiosSecure.patch(`/update-coin/${user?.email}`, { coin: refillAmount })
                .then(() => {
                  Swal.fire("Deleted!", "Task deleted and coins refunded.", "success");
                });
            } else {
              Swal.fire("Deleted!", "Task deleted.", "success");
            }
          }
        }).catch(error => console.log(error));
      }
    });
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">My Tasks</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-full table-auto text-sm text-gray-700">
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
              <tr key={task._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={task.task_image_url || 'https://via.placeholder.com/100'}
                    alt="Task"
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-2 max-w-[150px] truncate">{task.task_title}</td>
                <td className="px-4 py-2 max-w-[200px] truncate">{task.task_detail}</td>
                <td className="px-4 py-2 text-center">{task.required_workers}</td>
                <td className="px-4 py-2 text-center">{task.payable_amount}৳</td>
                <td className="px-4 py-2 text-center">{task.completion_date}</td>
                <td className="px-4 py-2 max-w-[150px] truncate">{task.submission_info}</td>
                <td className="px-5 py-2 text-center space-y-1 flex gap-3 items-center">
                  <Link
                    to={`/dashboard/update-task/${task._id}`}
                    className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(task)}
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
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

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {myTask.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}

        {myTask.map((task) => (
          <div key={task._id} className="border rounded-lg p-4 shadow bg-white space-y-2">
            <div className="flex gap-3">
              <img
                src={task.task_image_url || 'https://via.placeholder.com/100'}
                alt="Task"
                className="w-16 h-16 object-cover rounded border"
              />
              <div>
                <h3 className="font-semibold text-blue-700">{task.task_title}</h3>
                <p className="text-sm text-gray-600">{task.task_detail}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p><span className="font-medium">Workers:</span> {task.required_workers}</p>
              <p><span className="font-medium">Payable:</span> {task.payable_amount}৳</p>
              <p><span className="font-medium">Deadline:</span> {task.completion_date}</p>
              <p><span className="font-medium">Submission:</span> {task.submission_info || "N/A"}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Link
                to={`/dashboard/update-task/${task._id}`}
                className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(task)}
                className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
