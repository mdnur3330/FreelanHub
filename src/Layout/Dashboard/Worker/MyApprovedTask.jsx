import React, { useContext, useEffect, useState } from "react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import useRoll from "../../../Hooqs/getRol";

const MyApprovedTask = () => {
    const [submissions, setSubmissions] = useState([])
  const [role] = useRoll();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getApprovedTask = async () => {
      try {
        const res = await axiosSecure("/task-to-review", {
          params: {
            email: user?.email,
            role: role?.role,
            status: "approved",
          },
        });
      
        setSubmissions(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    getApprovedTask();
  }, [user?.email, role?.role]);
 
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Approved Submissions</h2>
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-blue-50 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Task Title</th>
            <th className="px-4 py-2 text-left">Payable Amount</th>
            <th className="px-4 py-2 text-left">Buyer Name</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map((submission, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-200 hover:bg-blue-50 transition-all duration-200"
              >
                <td className="px-4 py-2">{submission.task_title}</td>
                <td className="px-4 py-2">৳ {submission.payable_amount}</td>
                <td className="px-4 py-2">{submission.buyer_name}</td>
                <td className="px-4 py-2">
                  <span className="text-green-600 font-medium capitalize">
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No approved submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyApprovedTask;
