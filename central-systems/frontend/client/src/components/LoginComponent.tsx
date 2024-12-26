"use client";
import { useState } from "react";
import { LoginForm } from "./forms/LoginForm";
import { InputOTPForm } from "./forms/OTPForm";

const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");

  const [otp, setOtp] = useState<string>("");
  const [hasEnteredOtp, setHasEnteredOtp] = useState<boolean>(false);

  const [hasEnteredEmail, setHasEnteredEmail] = useState<boolean>(false);

  console.log(otp, email)

  return (
    <div className="bg-center" style={{ backgroundImage: "url('/assets/new4.jpg')"}}>
      <div
        className="flex justify-center items-center w-full h-[100vh] bg-gray-400/90 backdrop-blur-sm  px-5"
      >
        <div className="flex flex-col">
          <div className="width-[210px] md:w-[400px] bg-white px-4 py-[50px] pt-[30px] rounded-md shadow-xl border-[1px]">
            <div className="text-primarycol text-2xl text-center w-full mb-2">
              {!hasEnteredEmail ? "Word Sanctuary Systems" : "Enter OTP"}
            </div>

            {!hasEnteredEmail ? (
              <div>
                <div className="w-full text-center font-bold text-xl mb-4">
                  Welcome back!
                </div>
                <LoginForm
                  isMutatingDbResource={hasEnteredEmail}
                  isMutatingDbResourceHandler={setHasEnteredEmail}
                  updateEmailStateHandler={setEmail}
                />
              </div>
            ) : (
              <div className="w-full my-4">
                <InputOTPForm
                  isProcessingInput={hasEnteredOtp}
                  isProcessingInputHandler={setHasEnteredOtp}
                  updateOTPStateHandler={setOtp}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
