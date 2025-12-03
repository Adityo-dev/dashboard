"use client";

import DividerAndSocialButtons from "@/components/account/DividerAndSocialButtons";
import FromHeader from "@/components/account/FromHeader";
import CustomInput from "@/components/account/CustomInput";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
  };

  // --- dynamic Data ---
  const fields = [
    {
      id: 1,
      name: "email",
      label: "Email",
      icon: FiMail,
      type: "email",
      placeholder: "Enter your email",
      rules: { required: "Email is required" },
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FromHeader
        title="Forgot Password?"
        deception="Lost your password? Please enter your email address. You will receive a link to create a new password via email."
      />

      <div className="space-y-4">
        {fields.map((f) => (
          <CustomInput
            key={f.id}
            label={f.label}
            icon={f.icon}
            type={f.type}
            placeholder={f.placeholder}
            register={register}
            rules={f.rules}
            name={f.name}
            error={errors[f.name]?.message}
          />
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-[#0D0D0D] font-semibold py-3 hover:bg-gray-200 transition cursor-pointer"
        >
          Send Reset Link
        </button>
      </div>

      {/* Back To Login */}
      <Link href={"/account/login"}>
        <button
          type="button"
          className="text-sm font-semibold text-white flex gap-2 items-center justify-center mx-auto cursor-pointer"
        >
          <GoArrowLeft className="text-lg" /> Back To Login
        </button>
      </Link>

      {/* Social Login Buttons */}
      <DividerAndSocialButtons />
    </form>
  );
}
