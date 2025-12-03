"use client";

import { useForm } from "react-hook-form";
import CustomInput from "@/components/account/CustomInput";
import FromHeader from "@/components/account/FromHeader";
import Link from "next/link";
import DividerAndSocialButtons from "@/components/account/DividerAndSocialButtons";
import { FiMail, FiLock } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    const result = await apiPost("/auth/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      toast.error(result.message || "Something went wrong", { id: toastId });
      setLoading(false);
      return;
    }

    // Success
    localStorage.setItem("signupEmail", data.email);
    toast.success(result.message, { id: toastId });
    setLoading(false);
    router.push("/account/tow-step-verification");
  };

  const fields = [
    {
      id: 1,
      name: "username",
      label: "Username",
      icon: LuUserRound,
      type: "text",
      placeholder: "Enter your username",
      rules: { required: "Username is required" },
    },
    {
      id: 2,
      name: "email",
      label: "Email",
      icon: FiMail,
      type: "email",
      placeholder: "Enter your email",
      rules: { required: "Email is required" },
    },
    {
      id: 3,
      name: "password",
      label: "Password",
      icon: FiLock,
      type: "password",
      placeholder: "********",
      rules: {
        required: "Password is required",
        minLength: { value: 6, message: "At least 6 characters" },
      },
    },
  ];

  return (
    <>
      <FromHeader
        title="Sign Up"
        subTitle="Welcome Back! 👋"
        deception="Please sign up to your account and start the adventure"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          disabled={loading}
          className="w-full bg-white text-black py-3 mt-4 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="text-center text-[#666666] text-sm font-semibold">
          Already have an account?{" "}
          <Link href="/account/login" className="text-white ml-1">
            Login
          </Link>
        </div>
        <DividerAndSocialButtons />
      </form>
    </>
  );
}
