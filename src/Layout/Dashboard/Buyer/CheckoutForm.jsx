
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";
// import axiosSecure from "../../../Hooqs/useAxiosSecure";

// const CheckoutForm = ({ coins, price }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { user, refetchUser } = useContext(AuthContext);

//   const [loading, setLoading] = useState(false); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setLoading(true); 

//     try {
     
//       const { data } = await axiosSecure.post("/create-payment-intent", { price });
//       const clientSecret = data.clientSecret;

//       // Step 2: Confirm payment with card details
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             email: user?.email,
//           },
//         },
//       });

//       // Step 3: Handle result
//       if (result.error) {
//         console.error(result.error.message);
//         alert("❌ Payment Failed: " + result.error.message);
//       } else if (result.paymentIntent?.status === "succeeded") {
//         const paymentData = {
//           email: user.email,
//           coins,
//           price,
//           transactionId: result.paymentIntent.id,
//           date: new Date(),
//         };


//         await axiosSecure.post("/payment-success", paymentData);
//         await refetchUser();

//         alert("✅ Payment Successful! Coins Added.");
//       }
//     } catch (error) {
//       console.error("❌ Stripe Error:", error.message);
//       alert("Something went wrong during payment.");
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
//       <CardElement className="p-4 border rounded-md" />

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className={`w-full py-3 cursor-pointer rounded-lg text-white font-semibold text-lg transition flex justify-center items-center ${
//           loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-purple-600 hover:bg-purple-700"
//         }`}
//       >
//         {loading ? (
//           <>
//             <svg
//               className="animate-spin h-5 w-5 mr-2 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
//               />
//             </svg>
//             Loading...
//           </>
//         ) : (
//           "Pay"
//         )}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;


import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import { useNavigate } from "react-router";

const CheckoutForm = ({ coins, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, refetchUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", { price });
      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email,
          },
        },
      });

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
        navigate('/')
      }
    } catch (error) {
      console.error("❌ Stripe Error:", error.message);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 border">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Secure Coin Purchase</h2>

      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <p className="text-gray-800 font-medium">
          💰 <span className="text-purple-600 font-semibold">{coins}</span> Coins for <span className="text-purple-600 font-semibold">${price}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">Please enter your card details below to complete the payment.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 border rounded-lg p-4">
          <CardElement className="text-gray-800" />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              Processing...
            </div>
          ) : (
            `Pay $${price}`
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
