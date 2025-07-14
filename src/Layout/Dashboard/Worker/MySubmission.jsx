
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import axiosSecure from '../../../Hooqs/useAxiosSecure';


const MySubmisson = () => {
  const { user } = useContext(AuthContext);
  const axiosSecur = axiosSecure;
  const [myTask, setMyTask] = useState([]);

  // ✅ Fetch My Tasks
  useEffect(() => {
    const getSubmisson = async () => {
      try {
        const { data } = await axiosSecur(`/my-submissoin/${user?.email}`);
        setMyTask(data);
      } catch (error) {
        console.log('Fetch Error:', error);
      }
    };
    if (user?.email) getSubmisson();
  }, [user?.email, axiosSecur]);

 
console.log(myTask);

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">My Tasks</h2>
      <table className="min-w-full table-auto border border-gray-200 shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Buyer Name</th>
            <th className="px-4 py-2">Payable</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myTask.map((task) => (
            <tr key={task._id} className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-2">
                <img
                  src={task.taskImg || 'https://via.placeholder.com/100'}
                  alt="Task"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{task.task_title}</td>
              <td className="px-4 py-2 text-center">{task.buyer_name}</td>
              <td className="px-4 py-2 text-center">{task.payable_amount}৳</td>
             
              <td className="px-4 py-2 text-center space-x-2">
                {task.status}
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

export default MySubmisson;
