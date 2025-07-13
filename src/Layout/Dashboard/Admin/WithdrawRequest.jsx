import React, { useEffect, useState } from "react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";

const WithdrawRequest = () => {
    const [withdrawData, setWithdrawData] = useState([])


    useEffect(()=>{
        const getData = async ()=>{
            try{
                const res = await axiosSecure('/withdraw')
            console.log(res.data);
            setWithdrawData(res.data)
            }catch(error){
                console.log(error);
            }
        }
       getData()
    },[])


  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Withdraw Requests</h2>

      <div className="overflow-x-auto">
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
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Payment Success
                  </button>
                </td>
              </tr>
            ))}
            {withdrawData?.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-400">
                  No pending requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequest;

