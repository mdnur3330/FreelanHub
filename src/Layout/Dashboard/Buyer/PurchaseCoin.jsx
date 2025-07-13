
import { useNavigate } from "react-router";
import { FaCoins } from "react-icons/fa";
import { motion } from "framer-motion";

const coinOptions = [
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
  { coins: 10, price: 1 },
];

const PurchaseCoin = () => {
  const navigate = useNavigate();

  const handlePurchase = (option) => {
    navigate(`/dashboard/purchase-coin/payment/${option.price}`, { state: option });
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Purchase Coins
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {coinOptions.map((option, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePurchase(option)}
            className="bg-white cursor-pointer p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border hover:border-blue-600 group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <FaCoins className="text-4xl text-yellow-400 group-hover:text-yellow-500 transition" />
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600">
                {option.coins} Coins
              </h3>
              <p className="text-lg text-gray-500">${option.price}</p>
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition font-medium cursor-pointer">
                Buy Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
