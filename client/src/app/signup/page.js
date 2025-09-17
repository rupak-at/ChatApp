"use client";

import axios from "axios";
import Image from "next/image";
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

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const password = watch("password");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", avatarFile);
    console.log("befoter try catch")
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/register`,
        formData
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      console.error("some error occure while sign up", error)
      const { message  } = error.response || "some error occurred"
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(message ?? "some error occurred");
        }
        if (error.response.status === 409) {
          toast.error(message ?? "some error occurred");
        }
        if (error.response.status === 500) {
          toast.error(message ?? "some error occurred");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
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
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Create your account
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div className="flex flex-col items-center">
                    <label htmlFor="avatar" className="relative cursor-pointer group">
                      <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-purple-500 flex items-center justify-center bg-gray-200 transition hover:opacity-90">
                        {previewUrl ? (
                          <Image
                            height={96}
                            width={96}
                            src={previewUrl}
                            alt="Avatar Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaImage className="text-gray-500 text-3xl" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setAvatarFile(file);
                          if (file) {
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
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

            {/* Avatar Upload with Preview */}

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
