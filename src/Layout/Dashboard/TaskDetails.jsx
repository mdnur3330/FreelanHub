// src/pages/Dashboard/Worker/TaskDetails.jsx
import React, { useContext, useEffect, useState, } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import axiosSecure from "../../Hooqs/useAxiosSecure";
import useRoll from "../../Hooqs/getRol";
import { AuthContext } from "../../providers/AuthProvider";

const TaskDetails = () => {
  const {user} = useContext(AuthContext)
  const [role] = useRoll()
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axiosSecure(`/task-datails/${id}`);
        setTask(data);
      } catch (err) {
        console.error("Error fetching task details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);
  console.log(task);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payableAmount = parseInt(task.payable_amount)
    const submissionData = {
      taskId: task._id.toString(),
      task_title: task.task_title,
      payable_amount: payableAmount,
      worker_name: role.user,
      worker_email: user?.email,
      buyer_email : task.buyer,
      buyer_name: task.buyer_name,
      required_workers_left: task.worker,
      submissoin_data: e.target.submissoinData.value,
      status: "pending",
      taskImg: task.task_image_url
    };
    

    try {
      const res = await axiosSecure.post('/submiteted-task', submissionData);
      if (res.data.insertedId) {
        console.log(res.data);
        Swal.fire("Success", "Task submitted successfully!", "success");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading task...</p>;
  if (!task) return <p className="text-center mt-10 text-red-600">Task not found!</p>;

  return (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
        {task.task_title}
      </h2>

      <div className="space-y-4 text-gray-700 leading-relaxed">
        <div className="flex flex-col sm:flex-row gap-2">
          <span className="font-semibold w-48">👤 Buyer Name:</span>
          <span>{task.buyer_name || "N/A"}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <span className="font-semibold w-48">📧 Buyer Email:</span>
          <span>{task.buyer}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <span className="font-semibold w-48">📝 Task Details:</span>
          <span>{task.task_detail}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <span className="font-semibold w-48">👥 Workers Left:</span>
          <span>{task.worker}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <span className="font-semibold w-48">💰 Pay per Task:</span>
          <span>{task.payable_amount} coins</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <span className="font-semibold w-48">⏰ Deadline:</span>
          <span>{task.completion_date?.split("T")[0]}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <span className="font-semibold w-48">📦 Submission Info:</span>
          <span>{task.submission_info}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10">
        <label className="block mb-3 font-semibold text-lg text-gray-800">
          Your Submission:
        </label>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
          rows="6"
          placeholder="Enter your submission details (e.g., proof, description, link, etc.)"
          name="submissoinData"
          required
        ></textarea>

        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all shadow-sm"
        >
          ✅ Submit Task
        </button>
      </form>
    </div>
  </div>
);


};

export default TaskDetails;
