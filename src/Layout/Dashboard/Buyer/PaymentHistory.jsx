import { useContext, useEffect, useState } from "react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

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
    <div className="p-4 bg-white rounded shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Payment History</h2>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Coins</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Transaction ID</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{new Date(payment.date).toLocaleString()}</td>
              <td className="px-4 py-2 text-blue-600 font-semibold">{payment.coins}</td>
              <td className="px-4 py-2">${payment.price}</td>
              <td className="px-4 py-2 text-xs break-all">{payment.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No payments found.</p>
      )}
    </div>
  );
};

export default BuyerPaymentHistory;
