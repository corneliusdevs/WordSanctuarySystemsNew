"use client";

import OTPForm from "@/components/auth/OTPForm";

const OTPPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#006AFF]">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h1>
        <OTPForm />
      </div>
    </div>
  );
};

export default OTPPage;
