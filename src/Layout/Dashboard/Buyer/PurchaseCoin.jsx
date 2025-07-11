import React from 'react';
import { useNavigate } from 'react-router';

const coinOptions = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const navigate = useNavigate();

  const handleSelect = (coins, price) => {
    navigate(`/payment/${coins}/${price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">Purchase Coins</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {coinOptions.map(({ coins, price }) => (
          <div
            key={coins}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100"
            onClick={() => handleSelect(coins, price)}
          >
            <h3 className="text-2xl font-bold text-blue-600 text-center">{coins} Coins</h3>
            <p className="text-lg text-center mt-2 text-gray-700">= ${price}</p>
            <div className="mt-4 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
