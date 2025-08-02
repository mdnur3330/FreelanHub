// import { useContext, useEffect, useState } from "react";
// import axiosSecure from "../../../Hooqs/useAxiosSecure";
// import { AuthContext } from "../../../providers/AuthProvider";

// const BuyerPaymentHistory = () => {
//   const { user } = useContext(AuthContext);
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     if (user?.email) {
//       axiosSecure.get(`/payment-history/${user.email}`).then((res) => {
//         setPayments(res.data);
//       });
//     }
//   }, [user]);

//   return (
//     <div className="p-4 bg-white rounded shadow-md overflow-x-auto">
//       <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Payment History</h2>
//       <table className="min-w-full divide-y divide-gray-200 text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 text-left">#</th>
//             <th className="px-4 py-2 text-left">Date</th>
//             <th className="px-4 py-2 text-left">Coins</th>
//             <th className="px-4 py-2 text-left">Amount</th>
//             <th className="px-4 py-2 text-left">Transaction ID</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {payments.map((payment, index) => (
//             <tr key={payment._id}>
//               <td className="px-4 py-2">{index + 1}</td>
//               <td className="px-4 py-2">{new Date(payment.date).toLocaleString()}</td>
//               <td className="px-4 py-2 text-blue-600 font-semibold">{payment.coins}</td>
//               <td className="px-4 py-2">${payment.price}</td>
//               <td className="px-4 py-2 text-xs break-all">{payment.transactionId}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {payments.length === 0 && (
//         <p className="text-center mt-4 text-gray-500">No payments found.</p>
//       )}
//     </div>
//   );
// };

// export default BuyerPaymentHistory;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const BuyerPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/payment-history/${user.email}`).then((res) => {
        setPayments(res.data);
      });
    }
  }, [user]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl overflow-x-auto border border-blue-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Payment History
      </h2>

      <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
        <thead className="uppercase bg-blue-50 rounded">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Coin</th>
            <th className="px-4 py-3">Transaction Id</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, idx) => (
            <tr key={idx} className="bg-white shadow-sm rounded-lg">
              <td className="px-4 py-3 text-gray-600">
                {new Date(payment.date).toLocaleDateString()}<br />
                <span className="text-xs text-gray-400">
                  {new Date(payment.date).toLocaleTimeString()}
                </span>
              </td>

              <td className="px-4 py-3 font-medium text-blue-600">
                {payment.coins} <br />
                <span className="text-xs text-gray-400">$ {payment.price}</span>
              </td>

              <td className="px-4 py-3 text-gray-600">{payment.transactionId}</td>

              <td className="px-4 py-3 text-blue-700 font-semibold">
                ${payment.price.toFixed(2)}
              </td>

              <td className="px-4 py-3">
          
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                    <FaCheckCircle className="text-blue-500" />
                    Success
                  </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <p className="text-center mt-6 text-gray-400">No payments found.</p>
      )}
    </div>
  );
};

export default BuyerPaymentHistory;
