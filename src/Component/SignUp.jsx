


import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { getImg } from "../Hooqs/getImg";
import axiosSecure from "../Hooqs/useAxiosSecure";
import { useNavigate, Link } from "react-router";

const SignUp = () => {
  const { createUserByEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = data.image[0];
    const imageUrl = await getImg(imageFile);
    if (!imageUrl) {
      Swal.fire("Please upload a valid image.", "", "warning");
      return;
    }

    const { name, email, password, userType } = data;
    const coin = userType === "Buyer" ? 50 : 10;
    const user = {
      name,
      email,
      role: userType,
      coin,
      image: imageUrl,
      wallet: 100,
    };

    try {
      await createUserByEmail(email, password);
      await axiosSecure.post("/user-data", user);
      reset();
      navigate("/dashboard");
      Swal.fire(`🎉 Welcome ${name}`, "Your account has been created!", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Side */}
        <div className="bg-blue-700 text-white w-1/2 hidden md:flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Welcome to FreelanHub</h2>
          <p className="text-lg text-center">Boost your productivity. Track tasks. Earn more.</p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Create your account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                })}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* User Type */}
            <div>
              <select
                {...register("userType", { required: "User type is required" })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Role</option>
                <option value="Worker">Worker</option>
                <option value="Buyer">Buyer</option>
              </select>
              {errors.userType && <p className="text-sm text-red-500">{errors.userType.message}</p>}
            </div>

            {/* Image */}
            <div>
              <input
                type="file"
                {...register("image", { required: "Profile image is required" })}
                className="w-full py-2 cursor-pointer"
              />
              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  validate: {
                    hasUpper: (v) => /[A-Z]/.test(v) || "Must include uppercase letter",
                    hasLower: (v) => /[a-z]/.test(v) || "Must include lowercase letter",
                    hasSpecial: (v) =>
                      /[^a-zA-Z0-9]/.test(v) || "Must include special character",
                  },
                })}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 cursor-pointer rounded-lg text-white font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
