import React, { useState, useEffect, useContext } from "react";
import { Dialog } from "@headlessui/react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import useRoll from "../../../Hooqs/getRol";
import Swal from "sweetalert2";

const TaskToReview = () => {
  const [role] = useRoll();
  const [submissions, setSubmissions] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosSecure('/task-to-review', {
          params: {
            email: user?.email,
            role: role?.role,
            status: 'pending'
          }
        });
        setSubmissions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user?.email, role?.role]);

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleApprove = async (id, name) => {
    try {
      const res = await axiosSecure.patch(`/update-submission-status/${id}`, { status: "approved", buyer: name });
   
      if (res.data.matchedCount > 0) {
        setSubmissions(prev => prev.filter(task => task._id !== id));
         Swal.fire(
                `Task Approved`,
                "Task has been approved!",
                "success"
              );
      }
    } catch (error) {
      console.log(error);
      Swal.fire(error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.delete(`/submission-reject/${id}`);
      setSubmissions(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Task Submissions</h2>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
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
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{sub.worker_name}</td>
                <td className="py-2 px-4">{sub.task_title}</td>
                <td className="py-2 px-4">{sub.payable_amount} ৳</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleView(sub)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    View Submission
                  </button>
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button onClick={() => handleApprove(sub._id, sub.buyer_name)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button>
                  <button onClick={() => handleReject(sub._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {submissions.map((sub) => (
          <div key={sub._id} className="bg-white border rounded-lg p-4 shadow space-y-2">
            <div className="text-gray-700 text-sm">
              <p><span className="font-semibold">Worker:</span> {sub.worker_name}</p>
              <p><span className="font-semibold">Task:</span> {sub.task_title}</p>
              <p><span className="font-semibold">Amount:</span> {sub.payable_amount} ৳</p>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => handleView(sub)} className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">View</button>
              <button onClick={() => handleApprove(sub._id)} className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600">Approve</button>
              <button onClick={() => handleReject(sub._id)} className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600">Reject</button>
            </div>
          </div>
        ))}
        {submissions.length === 0 && <p className="text-center text-gray-500">No pending submissions.</p>}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
            <Dialog.Title className="text-lg font-semibold mb-2">Submission Details</Dialog.Title>
            <p><strong>Worker Name:</strong> {selectedSubmission?.worker_name}</p>
            <p><strong>Task Title:</strong> {selectedSubmission?.task_title}</p>
            <p><strong>Amount:</strong> {selectedSubmission?.payable_amount} ৳</p>
            <p><strong>Submission:</strong> {selectedSubmission?.submissoin_data}</p>
            <div className="mt-4 text-right">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
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
