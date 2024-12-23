"use client";

import React from "react";

import EmailSignInForm from "@/components/auth/EmailSignInForm";
const OTPPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-800">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <EmailSignInForm />
      </div>
    </div>
  );
};

export default OTPPage;
