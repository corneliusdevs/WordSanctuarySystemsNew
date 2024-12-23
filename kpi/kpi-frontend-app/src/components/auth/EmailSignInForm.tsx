"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
const EmailSignInForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // if (response.ok) {
      // } else {
      //   alert("Failed to send OTP. Please try again.");
      // }
      toast.success(
        "Great! An access code has being delivered to your email to grant access"
      );
      setTimeout(() => {
        router.push("/auth/otp");
      }, 4000);

      // toast("This is an informational message!", {
      //   icon: "ℹ️",
      //   style: {
      //     border: "1px solid #007bff",
      //     padding: "16px",
      //     color: "#007bff",
      //   },
      // });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Your email or Phone Number . . ."
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 text-white bg-blue-800 rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Sign In"}
      </button>
    </form>
  );
};

export default EmailSignInForm;
