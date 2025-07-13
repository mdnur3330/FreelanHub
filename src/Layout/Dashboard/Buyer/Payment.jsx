import { useLocation } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; 

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK); 

const Payment = () => {
  const { state } = useLocation();

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          Pay ${state.price} for {state.coins} coins
        </h2>
        <CheckoutForm coins={state.coins} price={state.price} />
      </div>
    </Elements>
  );
};

export default Payment;
