
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import axiosSecure from "../Hooqs/useAxiosSecure";

const Login = () => {
  const navigate = useNavigate();
  const { signIN, signInWithGoogle } = useContext(AuthContext);

  const handelLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIN(email, password);
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You're now logged in.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const handelGooglLogin = async () => {
    try {
      const result = await signInWithGoogle();
      navigate("/dashboard");
      const user = result.user;

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        roll: "Worker",
        coin: 10,
      };

      await axiosSecure(`/user-data`, userInfo);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image or Text Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-700 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to FreelanHub</h2>
          <p className="text-lg">Boost your productivity. Track tasks. Earn more.</p>
        </div>

        {/* Right Form Side */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to your account</h2>
          <form onSubmit={handelLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition duration-300 cursor-pointer"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center justify-between my-4">
            <hr className="w-1/4 border-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="w-1/4 border-gray-300" />
          </div>

          <button
            onClick={handelGooglLogin}
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-white border border-gray-300 hover:shadow-md transition text-gray-700 py-2 rounded-lg"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
