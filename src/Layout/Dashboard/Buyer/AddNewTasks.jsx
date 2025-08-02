import React, { useContext } from "react";
import useRoll from "../../../Hooqs/getRol";
import Swal from "sweetalert2";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router";
import Button from "../../../Component/SharedComponent/Button";

const AddNewTasks = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [roll] = useRoll();
  const coin = roll?.coin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const taskData = Object.fromEntries(formData.entries());
    taskData.worker = parseInt(taskData.required_workers);
    taskData.amount = parseInt(taskData.payable_amount);
    const total = taskData.worker * taskData.amount;
    taskData.total = total;
    taskData.buyer = user.email;
    taskData.buyer_name = roll.user;
       console.log(taskData);

    if (total > coin) {
      Swal.fire({
        title: "Insufficient Coin",
        text: "Not available Coin. Purchase Coin",
        icon: "warning",
        confirmButtonText: "Go to Purchase Page",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/purchase-coin");
        }
      });
      return;
    }

    try {
      const result = await axiosSecure.post("/add-task", taskData);
      console.log(result);
            Swal.fire({
        title: "Task Added",
        text: "Your task has been successfully created.",
        icon: "success",
      });
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create a New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Task Title</label>
          <input
            type="text"
            name="task_title"
            className="w-full border rounded p-2"
            placeholder="e.g., Watch my YouTube video and comment"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Task Detail</label>
          <textarea
            name="task_detail"
            className="w-full border rounded p-2"
            rows="4"
            placeholder="Provide detailed description of the task"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Required Workers</label>
            <input
              type="number"
              name="required_workers"
              className="w-full border rounded p-2"
              placeholder="e.g., 100"
              required
            />
          </div>

          <div>
            <label className="block font-medium">
              Payable Amount (per worker)
            </label>
            <input
              type="number"
              name="payable_amount"
              className="w-full border rounded p-2"
              placeholder="e.g., 10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Completion Date</label>
          <input
            type="date"
            name="completion_date"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Submission Info</label>
          <input
            type="text"
            name="submission_info"
            className="w-full border rounded p-2"
            placeholder="e.g., Screenshot, proof, etc."
            required
          />
        </div>

        <div>
          <label className="block font-medium">Task Image URL</label>
          <input
            type="url"
            name="task_image_url"
            className="w-full border rounded p-2"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type=""
         
        >
          
        </button>
        <Button label="Submit Task" type="submit" className="w-full bg-[#04B2B2] hover:bg-[#04b2b2c9] transition text-white py-2 px-4 roundedcursor-pointer"/>
      </form>
    </div>
  );
};

export default AddNewTasks;
