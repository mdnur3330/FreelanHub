import React from 'react';
import { useEffect } from 'react';
import axiosSecure from '../Hooqs/useAxiosSecure';
import { useState } from 'react';

const Home = () => {
    const [topWorkers, setTopWorkers] = useState([])
    useEffect(()=>{
        const getTopCoiner = async ()=>{
            try{
                const res = await axiosSecure('/top-workers')
                console.log(res.data);
                setTopWorkers(res.data)
            }catch(error){
                console.log(error);
            }
        }
        getTopCoiner()
    },[])
    return (
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-700">🏆 শীর্ষ ৬ কয়েনধারী ওয়ার্কার</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {topWorkers.map((worker, index) => (
                    <div key={worker._id} className="border shadow-lg rounded-xl p-5 hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold text-indigo-600">
                            #{index + 1} {worker.name || 'নাম নেই'}
                        </h3>
                        <p className="mt-2 text-gray-700">ইমেইল: {worker.email}</p>
                        <p className="mt-1 text-gray-800 font-bold">💰 কয়েন: {worker.coins}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;