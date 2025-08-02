

import React, { useEffect, useState } from "react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import Swal from "sweetalert2";

const WithdrawRequest = () => {
  const [withdrawData, setWithdrawData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosSecure("/withdraw");
        setWithdrawData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handelApprovePayment = async (id, email, coin, amount) => {
    try {
      await axiosSecure.patch(`/withdraw-status/${id}`, {
        status: "approved",
        email,
        coin,
        amount,
      });
      Swal.fire(`🎉 Approved Payment Request`);
      setWithdrawData((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">
        Withdraw Requests
      </h2>

      {/* ✅ Table view (for medium and larger screens) */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Amount (Coins)</th>
              <th className="px-4 py-3 text-left">Payment Method</th>
              <th className="px-4 py-3 text-left">Account Number</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {withdrawData?.map((req) => (
              <tr key={req._id}>
                <td className="px-4 py-3 font-medium">{req.workerName}</td>
                <td className="px-4 py-3 text-gray-600">{req.workerEmail}</td>
                <td className="px-4 py-3">{req.withdrawalCoin}</td>
                <td className="px-4 py-3">{req.payment_system}</td>
                <td className="px-4 py-3">{req.account}</td>
                <td className="px-4 py-3 capitalize text-yellow-600 font-semibold">
                  {req.status}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      handelApprovePayment(
                        req._id,
                        req.workerEmail,
                        req.withdrawalCoin,
                        req.withdrawal_amount
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Payment Success
                  </button>
                </td>
              </tr>
            ))}
            {withdrawData?.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No pending requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Card view (for small screens) */}
      <div className="grid gap-4 md:hidden">
        {withdrawData?.length === 0 ? (
          <p className="text-center text-gray-400 py-4">
            No pending requests found.
          </p>
        ) : (
          withdrawData?.map((req) => (
            <div
              key={req._id}
              className="border rounded-lg shadow-md p-4 space-y-2"
            >
              <p>
                <span className="font-semibold">User:</span> {req.workerName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {req.workerEmail}
              </p>
              <p>
                <span className="font-semibold">Amount:</span>{" "}
                {req.withdrawalCoin} coins
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {req.payment_system}
              </p>
              <p>
                <span className="font-semibold">Account No:</span>{" "}
                {req.account}
              </p>
              <p className="capitalize font-semibold text-yellow-600">
                Status: {req.status}
              </p>
              <button
                onClick={() =>
                  handelApprovePayment(
                    req._id,
                    req.workerEmail,
                    req.withdrawalCoin,
                    req.withdrawal_amount
                  )
                }
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
              >
                Payment Success
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WithdrawRequest;
