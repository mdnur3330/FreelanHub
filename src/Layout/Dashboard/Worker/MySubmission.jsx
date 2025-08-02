
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../Hooqs/useAxiosSecure";

const MySubmisson = () => {
  const { user } = useContext(AuthContext);
  const [myTask, setMyTask] = useState([]);
  const [totalTask, setTotalTasks] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;



  const pageNumber = Math.ceil(totalTask / perPage)
  const number = [...Array(pageNumber).keys()]


  useEffect(() => {
  const fetchTasks = async () => {
    const res = await axiosSecure.get(`/my-submissoin/${user?.email}?page=${currentPage}&limit=${perPage}`);

    setMyTask(res.data.tasks);
    setTotalTasks(res.data.totalTasks);
  
  };
  fetchTasks();
}, [currentPage,perPage, user?.email]);



  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center ">
        📌 My Task Submissions
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 shadow rounded">
          <thead className="bg-[#1D3E3E] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Buyer Name</th>
              <th className="px-4 py-2 text-left">Payable</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {myTask?.length > 0 ? (
              myTask?.map((task) => (
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
                  <td className="px-4 py-2 capitalize font-medium">
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

      {/*  Mobile Cards */}
      <div className="md:hidden space-y-4 mt-4">
        {myTask?.length > 0 ? (
          myTask?.map((task) => (
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
                  <h3 className="font-semibold text-lg">
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
      {number?.map((page) => (
  <button
    key={page}
    onClick={() => setCurrentPage(page)}
    className={`btn m-2 px-4 py-2 rounded-2xl transition-colors duration-200 ${
      currentPage === page
        ? "bg-yellow-500 text-black"
        : "bg-[#1D3E3E] text-white"
    }`}
  >
    {page + 1}
  </button>
))}
{/* <select name="" id="" className="bg-indigo-500 m-2 px-4 py-2 rounded-xl text-white"
onChange={(e)=>handelPage(e.target.value)}>
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="20">20</option>
</select> */}
    </div>
  );
};

export default MySubmisson;
