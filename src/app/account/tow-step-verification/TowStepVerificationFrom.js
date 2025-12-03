"use client";

import FromHeader from "@/components/account/FromHeader";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { useForm } from "react-hook-form";
import { useRef } from "react";

export default function TowStepVerificationFrom() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const inputRefs = useRef([]);

  const onSubmit = (data) => {
    const code = data.d1 + data.d2 + data.d3 + data.d4 + data.d5 + data.d6;

    console.log("6 DIGIT CODE:", code);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      setValue(`d${index + 1}`, value);

      // move to next
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FromHeader
        title="Two-Step Verification"
        deception="We sent a verification code to your mobile. Enter the code below."
      />

      <div>
        <label className="font-semibold text-white block mb-4">
          Type your 6 digit security code
        </label>

        {/* OTP BOXES */}
        <div className="flex gap-3 justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              {...register(`d${index + 1}`, {
                required: "Required",
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

        {/* ERROR */}
        {Object.values(errors).length > 0 && (
          <p className="text-red-500 text-xs mt-2">All 6 digits are required</p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-white text-black font-semibold py-3 hover:bg-gray-200 transition cursor-pointer"
      >
        Verify Now
      </button>

      {/* BACK TO LOGIN */}
      <p className="flex justify-center items-center gap-2 text-[#AAAAAAAA]">
        Didn’t get the mail?
        <Link
          href={"#"}
          className="text-sm font-semibold text-white cursor-pointer hover:underline"
        >
          Resend
        </Link>
      </p>
    </form>
  );
}
