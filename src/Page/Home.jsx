
import React, { useEffect, useState } from 'react';
import axiosSecure from '../Hooqs/useAxiosSecure';
import { FaMedal, FaCoins } from 'react-icons/fa';

const Home = () => {
  const [topWorkers, setTopWorkers] = useState([]);

  useEffect(() => {
    const getTopCoiner = async () => {
      try {
        const res = await axiosSecure('/top-workers');
        setTopWorkers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTopCoiner();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-15 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10 flex justify-center items-center gap-2">
          <FaMedal className="text-yellow-500 text-3xl" />
          Top 6 Coin Holders (Workers)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topWorkers.map((worker, index) => (
            <div
              key={worker._id}
              className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition duration-300 relative"
            >
              {/* Ranking Badge */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                #{index + 1}
              </div>

              {/* Profile Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={worker.image || 'https://i.ibb.co/DgFMpNv/profile-placeholder.jpg'}
                  alt="worker"
                  className="w-14 h-14 rounded-full border-2 border-blue-500 shadow"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {worker.name || 'Unnamed'}
                  </h3>
                  <p className="text-sm text-gray-500">{worker.email}</p>
                </div>
              </div>

              {/* Coin Info */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-700 font-medium flex items-center gap-2">
                  <FaCoins className="text-yellow-500" />
                  Coins:
                </p>
                <span className="text-blue-600 font-bold text-lg">{worker.coin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
