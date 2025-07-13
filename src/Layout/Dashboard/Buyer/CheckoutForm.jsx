
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../Hooqs/useAxiosSecure";

const CheckoutForm = ({ coins, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, refetchUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true); 

    try {
     
      const { data } = await axiosSecure.post("/create-payment-intent", { price });
      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment with card details
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email,
          },
        },
      });

      // Step 3: Handle result
      if (result.error) {
        console.error(result.error.message);
        alert("❌ Payment Failed: " + result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        const paymentData = {
          email: user.email,
          coins,
          price,
          transactionId: result.paymentIntent.id,
          date: new Date(),
        };


        await axiosSecure.post("/payment-success", paymentData);
        await refetchUser();

        alert("✅ Payment Successful! Coins Added.");
      }
    } catch (error) {
      console.error("❌ Stripe Error:", error.message);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <CardElement className="p-4 border rounded-md" />

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition flex justify-center items-center ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
              />
            </svg>
            Loading...
          </>
        ) : (
          "Pay"
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
