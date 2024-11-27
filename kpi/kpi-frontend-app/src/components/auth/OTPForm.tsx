"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const OTPForm = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [countdown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP Submitted:", otpCode);
    toast.success("Authentication Successful");
    setTimeout(() => {
      router.push("/board/home");
    }, 4000);
  };

  const handleResendOTP = () => {
    setOtp(["", "", "", "", ""]);
    setCountdown(10);
    setIsResendEnabled(false);
    toast.success("OTP Resent, check your email");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex space-x-4 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            maxLength={1}
            className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:outline-none"
            // ref={(el) => (inputRefs.current[index] = el)} // No return value here
          />
        ))}
      </div>

      <div className="text-center">
        {countdown > 0 ? (
          <span className="text-sm text-gray-500">
            Resend OTP in {countdown}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResendOTP}
            className={`text-sm text-blue-600 ${
              isResendEnabled ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isResendEnabled}
          >
            Resend OTP
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default OTPForm;
