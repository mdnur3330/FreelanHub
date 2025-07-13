import React, { useEffect, useState } from "react";
import axiosSecure from "../../../Hooqs/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fatchUser = async () => {
      try {
        const res = await axiosSecure("/get-all-user");
        setUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchUser();
  }, []);

  const handelRemove = async (id) => {
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
      console.log(res.data);
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

  
  return (
    <div className="p-4 md:p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
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
                <td className="p-3 border-b font-medium">
                  {user.display_name}
                </td>
                <td className="p-3 border-b">{user?.email}</td>
                <td className="p-3 border-b">
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                    defaultValue={user.role}
                  >
                    <option>Admin</option>
                    <option>Buyer</option>
                    <option>Worker</option>
                  </select>
                </td>
                <td className="p-3 border-b">{user.coin}</td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handelRemove(user._id)}
                  >
                    Remove User
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
