"use client";

import DividerAndSocialButtons from "@/components/account/DividerAndSocialButtons";
import FromHeader from "@/components/account/FromHeader";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function ForgotPasswordFrom() {
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
        title="Forgot Password?"
        deception={
          "Lost your password? Please enter your email address. You will receive a link to create a new password via email."
        }
      />

      <div className="space-y-4">
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

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-white text-[#0D0D0D] font-semibold py-3 hover:bg-gray-200 transition cursor-pointer"
        >
          Send Reset Link
        </button>
      </div>

      <Link href={"/account/login"}>
        <button className="text-sm font-semibold text-white flex gap-2 items-center justify-center mx-auto cursor-pointer">
          <GoArrowLeft className="text-lg" /> Back To Login
        </button>
      </Link>

      {/* Divider And SocialButtons */}
      <DividerAndSocialButtons />
    </form>
  );
}
