import Image from "next/image";
import React from "react";

function ProfileDetails({ user, onLogout }) {
  return (
    <div className="bg-[#252525] rounded-2xl shadow-lg p-8 w-full max-w-lg text-white">
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <Image
          src={user.avatarUrl}
          alt={user.username}
          width={200}
          height={200}
          className="w-24 h-24 rounded-full border-2 border-gray-600"
        />
      </div>

      {/* Username */}
      <h1 className="text-3xl font-bold text-center mb-2">{user.username}</h1>

      {/* Email & Role */}
      <p className="text-center text-gray-400 mb-4">{user.email}</p>
      <p className="text-center text-gray-400 mb-6">Role: {user.role}</p>

      {/* Other details */}
      <div className="space-y-3">
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>Name:</span>
          <span>{user.name || "N/A"}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>Membership:</span>
          <span>{user.memberShip}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>Status:</span>
          <span>{user.status}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>Trial Ends At:</span>
          <span>{new Date(user.trialEndsAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>Last Login:</span>
          <span>{new Date(user.lastLoginAt).toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>Timezone:</span>
          <span>{user.timezone}</span>
        </div>
        <div className="flex justify-between pb-2">
          <span>Language:</span>
          <span>{user.language}</span>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full bg-white text-black font-semibold py-3 hover:bg-gray-200 transition cursor-pointer disabled:opacity-50 mt-4"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProfileDetails;
