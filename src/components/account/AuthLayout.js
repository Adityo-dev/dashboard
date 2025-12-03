import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-[#191919] p-6">
        <Image
          src="/logos/logo.png"
          width={400}
          height={400}
          alt="logo"
          className="lg:max-w-[553px] max-h-[178px]"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6 bg-[#252525]">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
