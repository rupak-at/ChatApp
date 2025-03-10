"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEnvelope, FaImage, FaLock, FaUser } from "react-icons/fa6";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch, 
    formState: { errors },
  } = useForm();

  const password = watch('password')
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-4">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <h2 className="text-3xl font-bold text-white text-center">KURAKANI</h2>
        <p className="text-blue-100 text-center mt-1">Connect with friends and the world</p>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Create your account</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="username"
              className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-zinc-800"
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
            {errors.username && (
              <div className="text-red-500 text-sm mt-1 ml-1">
                {errors.username.message}
              </div>
            )}
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-zinc-800"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1 ml-1">{errors.email.message}</div>
            )}
          </div>

          {/* Avatar Upload */}
          <div className="relative">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaImage className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-600 mb-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="avatar"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  {...register("avatar")}
                />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-zinc-800"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1 ml-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-zinc-800"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1 ml-1">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            <span>Join Kurakani</span>
            <FaArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href={'login'} className="text-blue-600 hover:text-blue-800 font-medium">
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
