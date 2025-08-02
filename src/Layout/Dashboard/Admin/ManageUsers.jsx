



import React, { useEffect, useState } from "react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosSecure("/get-all-user");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/delete-user/${id}`);
      if (res.data?.deletedCount > 0) {
        await Swal.fire({
          icon: "success",
          title: "User deleted successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        Swal.fire("User not found or already deleted.");
      }
    } catch (error) {
      Swal.fire("Something went wrong while deleting.");
    }
  };

  const handleChangeRole = async (value, id) => {
    try {
      const res = await axiosSecure.put(`/update-role/${id}`, { value });
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Role Updated",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, role: value } : user
          )
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to update role",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {/* Table View for larger screens */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table-auto w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Photo</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Coin</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  <img
                    src={user?.image}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3 border-b font-medium">{user?.name}</td>
                <td className="p-3 border-b">{user?.email}</td>
                <td className="p-3 border-b">
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1"
                    value={user.role}
                    onChange={(e) => handleChangeRole(e.target.value, user._id)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                </td>
                <td className="p-3 border-b">{user.coin}</td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleRemove(user._id)}
                  >
                    Remove User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for mobile screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users?.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg shadow p-4 space-y-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={user?.image}
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Role: </span>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1 ml-2"
                  value={user.role}
                  onChange={(e) =>
                    handleChangeRole(e.target.value, user._id)
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Worker">Worker</option>
                </select>
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Coin:</span> {user.coin}
              </p>
            </div>
            <button
              className="w-full mt-2 bg-red-500 text-white py-1 rounded hover:bg-red-600"
              onClick={() => handleRemove(user._id)}
            >
              Remove User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
