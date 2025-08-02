

import React, { useState, useEffect } from 'react';
import axiosSecure from '../../../Hooqs/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageTask = () => {
  const axiosSecur = axiosSecure;
  const [myTask, setMyTask] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecur('all-task');
        setMyTask(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
        axiosSecur.delete(`/delete-task/${id}`).then(res => {
          if (res.data) {
            setMyTask(prev => prev.filter(task => task._id !== id));
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          }
        }).catch(error => console.log(error));
      }
    });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-6 text-center">My Tasks</h2>

      {/* 📱 Mobile View: Card */}
      <div className="sm:hidden space-y-4">
        {myTask?.map(task => (
          <div
            key={task._id}
            className="border rounded-lg shadow p-4 bg-white space-y-2"
          >
            <img
              src={task.task_image_url || "https://via.placeholder.com/100"}
              alt="Task"
              className="w-full h-40 object-cover rounded"
            />
            <p><span className="font-semibold">Title:</span> {task.task_title}</p>
            <p><span className="font-semibold">Details:</span> {task.task_detail}</p>
            <p><span className="font-semibold">Workers:</span> {task.required_workers}</p>
            <p><span className="font-semibold">Payable:</span> {task.payable_amount}৳</p>
            <p><span className="font-semibold">Deadline:</span> {task.completion_date}</p>
            <p><span className="font-semibold">Submission:</span> {task.submission_info}</p>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
        {myTask?.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>

      {/* 💻 Desktop View: Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 shadow rounded">
          <thead className=" text-white">
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
            {myTask?.map((task) => (
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
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {myTask?.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;
