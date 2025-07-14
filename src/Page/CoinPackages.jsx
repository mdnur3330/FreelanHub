import React from "react";
import { FaCoins, FaShoppingCart, FaCheckCircle } from "react-icons/fa";

const coinPackages = [
  { coins: 200, price: 10 },
  { coins: 500, price: 25 },
  { coins: 1000, price: 45 },
  { coins: 2000, price: 80 },
];

const PricingSection = () => {
  return (
    <section className="bg-blue-50 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">💰 Coin Packages</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Buy coins easily to get started with your tasks. Choose a package that suits your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {coinPackages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-center border"
            >
              <FaCoins className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {pkg.coins} Coins
              </h3>
              <p className="text-lg text-blue-600 font-semibold mb-4">
                ${pkg.price}
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li className="flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Instant Purchase
                </li>
                <li className="flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Secure Transaction
                </li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition">
                <FaShoppingCart className="inline mr-2" />
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
