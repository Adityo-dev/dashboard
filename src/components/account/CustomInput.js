"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function CustomInput({
  label,
  icon: Icon,
  type = "text",
  register,
  name,
  error,
  placeholder,
  rules,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div>
      <label className="font-semibold text-[#FFFFFF]">{label}</label>

      <div className="mt-2 flex items-center bg-[#0F0F0F] px-4 py-3 border border-[#222]">
        {Icon && <Icon className="text-[#FFFFFF] text-lg mr-3" />}

        <input
          {...register(name, rules)}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-white"
        />

        {/* Password Toggle Button */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-white text-lg ml-2 cursor-pointer"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
