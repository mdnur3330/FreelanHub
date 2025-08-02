import { useNavigate } from "react-router";
import { FaCoins, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useRoll from "../Hooqs/getRol";
import Swal from "sweetalert2";
import Button from "../Component/SharedComponent/Button";

const coinOptions = [
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
  { coins: 10, price: 1 },
];

const CoinPurchase = () => {
  const navigate = useNavigate();
  const [role] = useRoll()

  const handlePurchase = (option) => {
    if(role?.role === "Buyer"){
      navigate(`/dashboard/purchase-coin/payment/${option.price}`, {
      state: option,
    });
    }else{
      Swal.fire(
        "You Need Buyer Account"
      )
    }

  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-15 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center  mb-4">
           Buy Coins & Boost Your Power
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
          Select a coin package that fits your goals. More coins mean more flexibility and earning potential!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coinOptions.map((option, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePurchase(option)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow-md border transition group"
            >
              <div className="flex flex-col items-center space-y-4 text-center">
                <FaCoins className="text-5xl text-yellow-400 group-hover:text-yellow-500 transition duration-200" />
                <h3 className="text-2xl font-bold">
                  {option.coins} Coins
                </h3>
                <p className="text-lg font-semibold">${option.price}</p>
                <Button className="flex items-center gap-2 mt-3 bg-[#04B2B2] hover:bg-[#04B2B2] text-white px-5 py-2 rounded-full transition" label="Buy Now"/>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoinPurchase;

