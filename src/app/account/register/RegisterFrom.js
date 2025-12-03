"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import Link from "next/link";
import DividerAndSocialButtons from "@/components/account/DividerAndSocialButtons";
import FromHeader from "@/components/account/FromHeader";

export default function RegisterFrom() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FromHeader
        title="Sign Up"
        subTitle={"Welcome to Back! 👋"}
        deception={"Please sign Up to your account and start the adventure"}
      />

      <div className="space-y-4">
        {/* Username */}
        <div>
          <label className="font-semibold text-[#FFFFFF]">Username</label>

          <div className="mt-2 flex items-center bg-[#0F0F0F] px-4 py-3 border border-[#222]">
            <LuUserRound className="text-[#FFFFFF] text-lg mr-3" />

            <input
              {...register("username", {
                required: "Username is required",
              })}
              type="text"
              placeholder="test@gmail.com"
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-semibold text-[#FFFFFF]">Email</label>

          <div className="mt-2 flex items-center bg-[#0F0F0F] px-4 py-3 border border-[#222]">
            <FiMail className="text-[#FFFFFF] text-lg mr-3" />

            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="test@gmail.com"
              className="w-full bg-transparent outline-none text-white"
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-semibold text-white">Password</label>

          <div className="mt-2 flex items-center bg-[#0F0F0F] px-4 py-3 border border-[#222]">
            <FiLock className="text-[#FFFFFF] text-lg mr-3" />

            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="**************"
              className="w-full bg-transparent outline-none text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#FFFFFF] text-lg cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center text-[#666666] text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("remember")}
                className="mr-2 accent-white"
              />
              Remember Me
            </label>

            <Link href={"/account/forgot-password"}>
              <button
                type="button"
                className="text-gray-300 text-sm hover:text-white cursor-pointer"
              >
                Forgot Password?
              </button>
            </Link>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-white text-[#0D0D0D] font-semibold py-3 hover:bg-gray-200 transition cursor-pointer"
        >
          Sign In
        </button>
      </div>

      {/* FOOTER LINKS */}
      <div className="text-center text-[#666666] text-sm font-semibold">
        New on our platform?{" "}
        <Link
          href={"/account/login"}
          className="text-white cursor-pointer ml-1"
        >
          Create an account
        </Link>
      </div>

      {/* Divider And SocialButtons */}
      <DividerAndSocialButtons />
    </form>
  );
}
