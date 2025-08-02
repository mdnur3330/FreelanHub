import React from 'react';
import { useLoaderData } from 'react-router';

export default function AllWorker() {
  const users = useLoaderData();

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 p-5 md:p-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
        👥 All Registered Workers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 space-y-4 border border-gray-100"
          >
            <div className="flex flex-col items-center">
              <img
                src={user.image || 'https://i.ibb.co/ZVPYp9p/avatar.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
              />
              <h3 className="text-xl font-semibold mt-3">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm font-medium text-blue-600">
                Role: <span className="capitalize">{user.role || 'user'}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
