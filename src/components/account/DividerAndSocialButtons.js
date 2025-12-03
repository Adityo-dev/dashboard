import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

export default function DividerAndSocialButtons() {
  return (
    <div>
      {/* DIVIDER */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-[#DBDADE]"></div>
        <span className="px-3 text-[#666666] text-sm">or</span>
        <div className="flex-1 h-px bg-[#DBDADE]"></div>
      </div>

      {/* SOCIAL BUTTONS */}
      <div className="flex justify-center gap-4">
        <button className="w-10 h-10 rounded-md bg-white flex items-center justify-center cursor-pointer">
          <FaFacebookF className="text-[#4267B2]" />
        </button>

        <button className="w-10 h-10 rounded-md bg-white flex items-center justify-center cursor-pointer">
          <FaTwitter className="text-[#1DA1F2]" />
        </button>

        <button className="w-10 h-10 rounded-md bg-white flex items-center justify-center cursor-pointer">
          <FaGoogle className="text-[#FF0033]" />
        </button>
      </div>
    </div>
  );
}
