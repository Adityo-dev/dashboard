"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const [user] = useState(() => {
    const data = Cookies.get("user");
    return data ? JSON.parse(data) : null;
  });

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/account/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
    }
  }, [user, router]);

  if (!user) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#191919] flex justify-center items-start py-10 px-4">
      <ProfileDetails user={user} onLogout={handleLogout} />
    </div>
  );
}
