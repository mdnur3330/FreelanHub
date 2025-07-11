import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useRoll from "../../../Hooqs/getRol";

const TaskToReview = () => {
   const [roll] = useRoll()
   console.log(roll);
   const [submissions, setSubmissions] = useState([])
    const {user} = useContext(AuthContext)
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(submissions);
  useEffect(()=>{
    const getData = async()=>{
        if (!user?.email) {
  return <p className="text-center text-gray-500">Loading user info...</p>;
}



        try{
            const res = await axiosSecure('/task-to-review',{
                params: {
          email: user.email,
          role: userRole,
          status: 'pending'
  }
            })
            setSubmissions(res.data)
        }catch(error){
            console.log(error);
        }
    }
getData()
  },[user?.email])

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleApprove = async (id) => {
    try{
        const res = await axiosSecure.patch(`/update-submission-status/${id}`, {
      status: "approved"
    });
        if (res.data.matchedCount > 0) {
      // Approved successful → remove from UI
      setSubmissions(prevTasks => prevTasks.filter(task => task._id !== id));
    }
    console.log(res.data);
    }catch(error){
        console.log(error);
    }
  };

  const handleReject = async(id) => {
     try{
        const res = await axiosSecure.delete(`/submission-reject/${id}`);
        console.log(res.data);
    }catch(error){
        console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Task Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Worker Name</th>
              <th className="py-2 px-4 text-left">Task Title</th>
              <th className="py-2 px-4 text-left">Payable Amount</th>
              <th className="py-2 px-4 text-left">View</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((sub) => (
              <tr key={sub._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{sub.worker_name}</td>
                <td className="py-2 px-4">{sub.task_title}</td>
                <td className="py-2 px-4">{sub.payable_amount} ৳</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleView(sub)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View Submission
                  </button>
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleApprove(sub._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(sub._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for submission details */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
            <Dialog.Title className="text-lg font-semibold mb-2">Submission Details</Dialog.Title>
            <p><strong>Worker Name:</strong> {selectedSubmission?.worker_name}</p>
            <p><strong>Task Title:</strong> {selectedSubmission?.task_title}</p>
            {/* <p><strong>Workers Left:</strong> {selectedSubmission?.required_workers_left}</p> */}
            <p><strong>Amount:</strong> {selectedSubmission?.worker} ৳</p>
            <p><strong>Submission:</strong> {selectedSubmission?.submissoin_data}</p>

            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default TaskToReview;
