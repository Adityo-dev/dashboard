"use client";

import FromHeader from "@/components/account/FromHeader";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { apiPost } from "@/lib/api";

export default function TwoStepVerificationForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const [email] = useState(() => {
    return localStorage.getItem("signupEmail") || "";
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      setValue(`d${index + 1}`, value);
      if (index < 3) inputRefs.current[index + 1].focus();
    } else e.target.value = "";
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value)
      inputRefs.current[index - 1].focus();
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const otp = data.d1 + data.d2 + data.d3 + data.d4;
    if (otp.length < 4) {
      toast.error("All 4 digits are required");
      return;
    }
    if (!email) {
      toast.error("Email not found. Please signup again.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Verifying your email...");

    const result = await apiPost("/auth/verify-otp", { otp, email });

    if (!result.success) {
      toast.error(result.message || "Verification failed", { id: toastId });
      setLoading(false);
      return;
    }

    // Save token & user info
    const { token, user } = result.data;
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("user", JSON.stringify(user), { expires: 7 });

    toast.success(result.message || "Email verified successfully!", {
      id: toastId,
    });
    setLoading(false);
    router.push("/account/profile");
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please signup again.");
      return;
    }

    const toastId = toast.loading("Sending new OTP...");
    const result = await apiPost("/auth/resend-otp", { email });

    if (!result.success) {
      toast.error(result.message || "Failed to resend OTP", { id: toastId });
      return;
    }

    toast.success(result.message || "OTP resent successfully!", {
      id: toastId,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FromHeader
          title="Two-Step Verification"
          deception={`We sent a verification code to your email: ${
            email || "example@mail.com"
          }. Enter it below.`}
        />
        <div>
          <label className="font-semibold text-white block mb-4">
            Type your 4 digit security code
          </label>
          <div className="flex gap-3 justify-around">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                {...register(`d${index + 1}`, {
                  required: true,
                  maxLength: 1,
                  pattern: /^[0-9]$/,
                })}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                className="w-12 h-12 text-center text-2xl font-bold bg-transparent border border-[#FFFFFF] text-[#FFFFFF] rounded-md focus:outline-none focus:border-white"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {Object.values(errors).length > 0 && (
            <p className="text-red-500 text-xs mt-4">
              All 4 digits are required
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 hover:bg-gray-200 transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Now"}
        </button>
        <p className="flex justify-center items-center gap-2 text-[#AAAAAAAA] mt-2">
          Didn’t get the mail?{" "}
          <span
            onClick={handleResendOtp}
            className="text-sm font-semibold text-white cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>
      </form>
    </>
  );
}
