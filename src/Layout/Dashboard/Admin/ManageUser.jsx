import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    {
      _id: "1",
      display_name: "John Doe",
      user_email: "john@example.com",
      photo_url: "https://i.pravatar.cc/40",
      role: "Buyer",
      coin: 120
    },
    {
      _id: "2",
      display_name: "Alice Smith",
      user_email: "alice@example.com",
      photo_url: "https://i.pravatar.cc/41",
      role: "Worker",
      coin: 300
    }
  ]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Coin</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">
                  <img
                    src={user.photo_url}
                    alt={user.display_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{user.display_name}</td>
                <td className="px-4 py-2">{user.user_email}</td>
                <td className="px-4 py-2">
                  <select
                    defaultValue={user.role}
                    className="border px-2 py-1 rounded-md"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                </td>
                <td className="px-4 py-2">{user.coin}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="Remove User"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
