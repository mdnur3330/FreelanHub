
// import React, { useEffect, useState } from 'react';
// import axiosSecure from '../Hooqs/useAxiosSecure';
// import { FaCoins } from 'react-icons/fa';

// const Home = () => {
//   const [topWorkers, setTopWorkers] = useState([]);

//   useEffect(() => {
//     const getTopCoiner = async () => {
//       try {
//         const res = await axiosSecure('/top-workers');
//         setTopWorkers(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getTopCoiner();
//   }, []);

//   return (
//     <section className="bg-gradient-to-b from-blue-50 to-white py-24 px-6">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-[#1D3E3E] mb-16">
//           Our Finest Talent Pool
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//           {topWorkers.map((worker, index) => (
//             <div
//               key={worker._id}
//               className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden p-6 group hover:shadow-2xl transition-all border border-[#d8eaea]"
//             >
//               {/* Decorative ring */}
//               <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#1D3E3E]/10 rounded-full blur-2xl z-0"></div>

//               {/* Rank */}
//               <div className="absolute top-4 left-4 z-10 text-xs font-bold bg-[#1D3E3E] text-white px-3 py-1 rounded-full shadow">
//                 #{index + 1}
//               </div>

//               {/* Profile image */}
//               <div className="relative z-10 flex justify-center mb-4">
//                 <img
//                   src={worker.image || 'https://i.ibb.co/DgFMpNv/profile-placeholder.jpg'}
//                   alt={worker.name}
//                   className="w-20 h-20 object-cover rounded-full border-4 border-[#1D3E3E] shadow-md"
//                 />
//               </div>

//               {/* Name & Email */}
//               <div className="text-center z-10">
//                 <h3 className="text-xl font-semibold text-[#1D3E3E]">{worker.name || 'Unnamed'}</h3>
//                 <p className="text-sm text-gray-500">{worker.email}</p>
//               </div>

//               {/* Coin section */}
//               <div className="mt-6 flex justify-between items-center text-[#1D3E3E]">
//                 <span className="flex items-center gap-2 font-medium">
//                   <FaCoins />
//                   Coins
//                 </span>
//                 <span className="font-bold text-lg">{worker.coin}</span>
//               </div>

//               {/* Hover overlay */}
//               <div className="absolute inset-0 rounded-3xl bg-[#1D3E3E]/5 opacity-0 group-hover:opacity-100 transition duration-300 z-0"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;



import React, { useEffect, useState } from 'react';
import axiosSecure from '../Hooqs/useAxiosSecure';
import { FaCoins } from 'react-icons/fa';

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
    <section className="bg-[#F5FDFC] py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0F3C3C] mb-10">
          Our Finest Talent Pool
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topWorkers.map((worker, index) => (
            <div
              key={worker._id}
              className="flex items-center gap-4 bg-white border border-[#DAF2F2] rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
            >
              {/* Profile Image */}
              <img
                src={worker.image || 'https://i.ibb.co/DgFMpNv/profile-placeholder.jpg'}
                alt={worker.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#00C4CC] shrink-0"
              />

              {/* Content */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F3C3C]">
                    {worker.name || 'Unnamed'}
                  </h3>
                  <p className="text-xs text-gray-500 truncate w-[180px]">{worker.email}</p>
                </div>

                <div className="flex items-center justify-between text-[#0F3C3C] text-xs mt-2">
                  <span className="flex items-center gap-1">
                    <FaCoins className="text-[#00C4CC]" />
                    Coins
                  </span>
                  <span className="font-bold text-sm ml-2">{worker.coin}</span>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="ml-auto text-xs font-semibold bg-[#00C4CC] text-white px-2 py-[2px] rounded shadow-sm">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
