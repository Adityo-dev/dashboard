"use client";

import { useForm } from "react-hook-form";
import CustomInput from "@/components/account/CustomInput";
import FromHeader from "@/components/account/FromHeader";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";

export default function VerifyEmailForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    if (storedEmail) setValue("email", storedEmail);
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Sending verification mail...");

    const result = await apiPost("/auth/resend-otp", { email: data.email });

    if (!result.success) {
      toast.error(result.message || "Something went wrong", { id: toastId });
      setLoading(false);
      return;
    }

    toast.success(result.message, { id: toastId });
    setLoading(false);
    router.push("/account/tow-step-verification");
  };

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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FromHeader
          title="Verify your email"
          deception="Enter your email address to receive a verification code."
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 hover:bg-gray-200 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>
        </div>
        <Link
          href="/account/login"
          className="flex justify-center text-[#666666] font-semibold cursor-pointer"
        >
          Skip For Now
        </Link>
      </form>
    </>
  );
}
