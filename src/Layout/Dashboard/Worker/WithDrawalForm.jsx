


import { useContext, useState } from "react";
import useRoll from "../../../Hooqs/getRol";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const WithdrawForm = () => {
  const [total, setTotal] = useState();
  const [role] = useRoll();
  const {userData, refetchUser} = useContext(AuthContext)

  const totalCoin = userData?.coin || 0;
  const today = new Date();
  const formatted = today.toISOString().split("T")[0];

  const handleWithdrawCoin = (value) => {
    const amount = parseInt(value);
    if (isNaN(amount)) setTotal(0);
    else setTotal(amount / 20);
  };

  const handleWithdraw = async (e) => {
    refetchUser()
    e.preventDefault();
    const form = e.target;

    const withdrawInfo = {
      workerName: userData?.user,
      workerEmail: userData?.email,
      withdrawalCoin: parseInt(form.withdrawalCoin.value),
      withdrawal_amount: total,
      payment_system: form.paymentSystem.value,
      status: "pending",
      formatted,
      accountNumber: form.accountNumber.value,
    };

    try {
      const res = await axiosSecure.post(`/withdraw/${userData?.email}`, withdrawInfo);

      if (res.data.post.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Withdraw Request Sent 🎉",
          text: "We will process your request soon!",
          confirmButtonColor: "[#1D3E3E]",
        });
        form.reset();
        setTotal(0);
        refetchUser()
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const isDisabled =
    !total || isNaN(total) || total * 20 < 200 || total * 20 > totalCoin;

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-br from-white via-indigo-50 to-white rounded-3xl shadow-xl border border-indigo-100 space-y-6 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-center">
        💸 Request Withdraw
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-indigo-50 px-4 py-3 rounded-lg shadow-inner">
        <p>
          💰 <span className="font-medium">Your Coins:</span> {totalCoin}
        </p>
        <p>
          💵 <span className="font-medium">Will Receive:</span> ${total || 0}
        </p>
      </div>

      <form onSubmit={handleWithdraw} className="space-y-5">
        {/* Coins input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coins to Withdraw
          </label>
          <input
            name="withdrawalCoin"
            type="number"
            min={200}
            max={totalCoin}
            defaultValue={200}
            onChange={(e) => handleWithdrawCoin(e.target.value)}
            placeholder="Minimum 200"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {/* Validation */}
          <div className="mt-1 text-sm">
            {totalCoin < 200 ? (
              <p className="text-red-500">
                ❌ Minimum 200 coins required. You have {totalCoin}.
              </p>
            ) : total && total * 20 > totalCoin ? (
              <p className="text-red-500">
                ❌ Can't withdraw more than available coins.
              </p>
            ) : total && total * 20 < 200 ? (
              <p className="text-red-500">❌ Minimum withdraw amount is 200 coins.</p>
            ) : (
              <p className="text-green-600">✅ You’re eligible to withdraw.</p>
            )}
          </div>
        </div>

        {/* Dollar output (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Withdraw Amount ($)
          </label>
          <input
            type="number"
            value={total || ""}
            name="coin"
            readOnly
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border rounded-lg shadow-inner cursor-not-allowed"
          />
        </div>

        {/* Payment System */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            name="paymentSystem"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Bank">Bank</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number
          </label>
          <input
            name="accountNumber"
            type="text"
            placeholder="Enter account number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-3 font-semibold rounded-xl text-white shadow-lg transition-all duration-300 ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#00C2C2] hover:bg-[#00C2C2] "
          }`}
        >
          🚀 Request Withdrawal
        </button>
      </form>
    </div>
  );
};

export default WithdrawForm;
