"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaEnvelope,
  FaImage,
  FaLock,
  FaUser,
} from "react-icons/fa6";

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [avatarFile, setAvatarFile] = useState(null); // State for the avatar file
  const password = watch("password");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", avatarFile); // Append the file

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formData
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      const { message } = error.response?.data;

      if (error.response) {
        if (error.response.status === 400) {
          toast.error(message);
        }
        if (error.response.status === 409) {
          toast.error(message);
        }
        if (error.response.status === 500) {
          toast.error(message);
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-purple-400 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-gray-600 to-purple-900 p-4">
          <h2 className="text-3xl font-bold text-white text-center">
            KURAKANI
          </h2>
          <p className="text-gray-200 text-center mt-1">
            Connect with friends and the world
          </p>
        </div>

        <div className="p-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Create your account
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Username Input */}
            <div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-zinc-800"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 2,
                      message: "Username must be at least 2 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Username must not exceed 50 characters",
                    },
                  })}
                />
              </div>
              <div className="text-red-500 text-sm ml-1 ">
                {errors.username?.message}
              </div>
            </div>

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
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <div className="text-red-500 text-sm ml-1">
                {errors.email?.message}
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="relative">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaImage className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-grow">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    onChange={(e) => {
                      setAvatarFile(e.target.files[0]);
                    }}
                  />
                </div>
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
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
              </div>
              <div className="text-red-500 text-sm ml-1">
                {errors.password?.message}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-zinc-800"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              <div className="text-red-500 text-sm ml-1">
                {errors.confirmPassword?.message}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-purple-700 hover:from-gray-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all"
            >
              <span>Join Kurakani</span>
              <FaArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href={"login"}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
