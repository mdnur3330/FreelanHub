
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../Hooqs/useAxiosSecure";

const CheckoutForm = ({ coins, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, refetchUser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // 🛠️ Step 1: Get the real string from response
    const { data } = await axiosSecure.post("/create-payment-intent", { price });
    const clientSecret = data.clientSecret; // ✅ extract only the string

    // 🛠️ Step 2: Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user?.email,
        },
      },
    });

    // 🛠️ Step 3: Check result
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
      await refetchUser()
      alert("✅ Payment Successful! Coins Added.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <CardElement className="p-4 border rounded-md" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
