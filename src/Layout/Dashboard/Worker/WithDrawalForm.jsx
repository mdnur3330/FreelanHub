import { useState } from "react";
import useRoll from "../../../Hooqs/getRol";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import Swal from "sweetalert2";

const WithdrawForm = () => {
  const [total, setTotal] = useState();
  const [role] = useRoll();

  const handelWithdrawCoin = (value) => {
    const amount = parseInt(value);
    if (isNaN(amount)) {
      setTotal(0);
    } else {
      setTotal(amount / 20);
    }
  };
  const totalCoin = role?.coin;
  const today = new Date();
  const formatted = today.toISOString().split("T")[0];

  const handelWithdraw = async (e) => {
    console.log(role);
    if (!role) {
      return "loaging.....";
    }
    e.preventDefault();
    const withdrawInfo = {
      workerName: role?.user,
      workerEmail: role?.email,
      withdrawalCoin: e.target.withdrawalCoin.value,
      withdrawal_amount: total,
      payment_system: e.target.paymentSystem.value,
      status: "pending",
      formatted,
      accountNumber: e.target.accountNumber.value,
    };

    try {
      const res = await axiosSecure.post("/withdraw", withdrawInfo);
      console.log(res.data);
      if (res.data.acknowledged) {
        Swal.fire(`🎉 successfully submited`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl border space-y-5">
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        💸 Withdraw Coins
      </h2>

      <div className="text-gray-700 text-base space-y-1">
        <p>
          💰 <span className="font-semibold">Total Coins:</span> {totalCoin}{" "}
          coins
        </p>
        <p>
          💵 <span className="font-semibold">Withdrawable Amount:</span> $
          {total || 10}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handelWithdraw}>
        {/* Coin to Withdraw */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Coin to Withdraw
          </label>
          <input
            type="number"
            min={200}
            max={totalCoin}
            defaultValue={200}
            name="withdrawalCoin"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="e.g. 200"
            onChange={(e) => handelWithdrawCoin(e.target.value)}
          />

          {totalCoin < 199 ? (
            <p className="text-red-500 text-sm mt-1">
              You cannot withdraw below 200. Your current balance is {totalCoin}{" "}
              coins.
            </p>
          ) : total && total * 20 > totalCoin ? (
            <p className="text-red-500 text-sm mt-1">
              You cannot withdraw more than your current balance of {totalCoin}{" "}
              coins.
            </p>
          ) : total && total * 20 < 200 ? (
            <p className="text-red-500 text-sm mt-1">
              Minimum withdrawal amount is 200 coins.
            </p>
          ) : (
            <p className="text-green-600 text-sm mt-1">You’re good to go!</p>
          )}
        </div>

        {/* Withdraw Amount (readonly) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Withdraw Amount ($)
          </label>
          <input
            type="number"
            value={total}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border rounded-lg cursor-not-allowed"
          />
        </div>

        {/* Payment System */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Payment System
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            name="paymentSystem"
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
          <label className="block text-sm font-medium mb-1">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your account number"
          />
        </div>

        <button
          type="submit"
          disabled={
            !total || isNaN(total) || total * 20 < 200 || total * 20 > totalCoin
          }
          className={`w-full py-2 rounded-lg font-semibold transition duration-200 
    ${
      !total || isNaN(total) || total * 20 < 200 || total * 20 > totalCoin
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }`}
        >
          Request Withdrawal
        </button>
      </form>
    </div>
  );
};

export default WithdrawForm;
