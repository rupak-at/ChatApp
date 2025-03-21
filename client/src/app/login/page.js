"use client";
import { loadUserInfo } from "@/lib/redux/features/loginInfoSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/login", data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { message, user } = response.data;
        dispatch(loadUserInfo(user));
        toast.success(message + " to " + user.username);
        router.push("/kurakani");
      }
    } catch (error) {
      const { message } = error.response.data;
      if (error.response) {
        if (error.response.status === 404) {
          toast.error(message);
        }

        if (error.response.status === 401) {
          toast.error(message);
        }
        if (error.response.status === 500) {
          toast.error(message);
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600  p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-gray-600 to-purple-700 p-6">
          <h2 className="text-3xl font-bold text-white text-center">
            KURAKANI
          </h2>
          <p className="text-blue-100 text-center mt-1">Welcome back</p>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Sign in to your account
          </h3>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email Input */}
            <div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-zinc-800"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>
              <div className="text-red-500 text-sm ml-1">
                {errors.email?.message}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-zinc-800"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              <div className="text-red-500 text-sm ml-1">
                {errors.password?.message}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-purple-700 hover:from-gray-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <FaArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Create Account Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href={"signup"}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {" "}
                  Create account
                </Link>
              </p>
            </div>
          </form>

          {/* Optional: Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.545, 10.239v3.821h5.445c-0.712, 2.315-2.647, 3.972-5.445, 3.972-3.332, 0-6.033-2.701-6.033-6.032s2.701-6.032, 6.033-6.032c1.498, 0, 2.866, 0.549, 3.921, 1.453l2.814-2.814C17.503, 2.988, 15.139, 2, 12.545, 2 7.021, 2, 2.543, 6.477, 2.543, 12s4.478, 10, 10.002, 10c8.396, 0, 10.249-7.85, 9.426-11.748l-9.426, 0.013z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
