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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded">
      <h2 className="text-3xl font-bold mb-4">{task.task_title}</h2>
      {/* <img src={task.task_image_url} alt="task" className="mb-4 w-full h-64 object-cover rounded" /> */}
      <p><strong>Email:</strong> {task.buyer}</p>
      <p><strong>Details:</strong> {task.task_detail}</p>
      <p><strong>Required Workers Left:</strong> {task.worker}</p>
      <p><strong>Pay Per Task:</strong> {task.payable_amount} coins</p>
      <p><strong>Deadline:</strong> {task.completion_date?.split("T")[0]}</p>
      <p><strong>What to submit:</strong> {task.submission_info}</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block mb-2 font-semibold">Your Submission:</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded focus:outline-blue-500"
          rows="5"
          placeholder="Enter your submission details (e.g., proof, description, link, etc.)"
          name="submissoinData"
          required
        ></textarea>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;
