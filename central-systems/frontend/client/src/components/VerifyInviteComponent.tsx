"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LoginForm } from "./forms/LoginForm";
import { InputOTPForm } from "./forms/OTPForm";
import { extractAlphanumeric } from "@/utils";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

interface VerifyInviteComponentProps {
  isVerifiedStateHandler: Dispatch<SetStateAction<boolean>>;
}

const VerifyInviteComponent = ({
  isVerifiedStateHandler,
}: VerifyInviteComponentProps) => {
  const [email, setEmail] = useState<string>("");

  const [otp, setOtp] = useState<string>("");
  const [hasEnteredOtp, setHasEnteredOtp] = useState<boolean>(false);

  const [hasEnteredEmail, setHasEnteredEmail] = useState<boolean>(false);

  const [verificationSuccess, setVerificationSucess] = useState<boolean>(false);

  const [verificationErorr, setVerificationError] = useState<boolean>(false);

  const [tokenExpiredError, setTokenExpiredError] = useState<boolean>(false);

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Make sure we're running in the browser and not on the server
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");

      if (tokenFromUrl) {
        setToken(extractAlphanumeric(tokenFromUrl)); // Store the token in state
      }
    }
  }, []);

  useEffect(() => {
    const verifyInvitation = async () => {
      if (hasEnteredOtp && hasEnteredEmail) {
        toast({
          title: "",
          description: (
            <div className="mt-2 rounded-md w-full flex justify-center items-center">
              <span>Verifying...</span>
            </div>
          ),
        });

        const central_systems_base_api =
          process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

        console.log(token, central_systems_base_api);

        try {
          const getVerificationStatus = await fetch(
            `${central_systems_base_api}/api/auth/invitations/request/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email_of_invited: email,
                token,
                otp,
              }),
            }
          );

          const responseData = await getVerificationStatus.json();
          console.log("Verification Response:", responseData);

          if (responseData?.is_token_expired) {
            setTokenExpiredError(true);
          }

          if (!getVerificationStatus.ok) {
            // Handle non-2xx responses
            throw new Error("Verification failed");
          }

          // Set the verification status or handle further based on response
          setVerificationSucess(true);
        } catch (err) {
          console.error("Error during verification:", err);
          setVerificationSucess(false);
          setVerificationError(true);
        }
      }
    };

    verifyInvitation();
  }, [otp, hasEnteredOtp, hasEnteredEmail, email, token]);

  useEffect(() => {
    if (verificationSuccess && hasEnteredOtp) {
      toast({
        title: "",
        description: (
          <div className="mt-2 w-full flex justify-center items-center rounded-md">
            <span className="text-green-600 mr-2">
              <Check />
            </span>
            <span>Authentication successful</span>
          </div>
        ),
      });

      //   set the verification status of parent component  to true
      isVerifiedStateHandler(true);
    }

    if (tokenExpiredError) {
      toast({
        title: "Invalid Credentials",
        description: (
          <div className="mt-2 w-full flex justify-center items-center">
            <span className="text-red-500 mr-2">
              <X />
            </span>
            <span>Expired Token</span>
          </div>
        ),
      });
    } else if (verificationErorr) {
      toast({
        title: "Invalid Credentials",
        description: (
          <div className="mt-2 w-full flex justify-center items-center">
            <span className="text-red-500 mr-2">
              <X />
            </span>
            <span>Otp or Email invalid</span>
          </div>
        ),
      });
    }
  }, [verificationSuccess, verificationErorr]);

  return (
    <div
      className="bg-center"
      style={{ backgroundImage: "url('/assets/new4.jpg')" }}
    >
      <div className="flex justify-center items-center w-full h-[100vh] bg-gray-400/90 backdrop-blur-sm  px-5">
        <div className="flex flex-col">
          <div className="width-[210px] md:w-[400px] bg-white px-4 py-[50px] pt-[30px] rounded-md shadow-xl border-[1px]">
            <div className="text-primarycol text-2xl text-center w-full mb-2">
              {!hasEnteredEmail ? "Word Sanctuary Systems" : "Enter OTP"}
            </div>

            {!hasEnteredEmail ? (
              <div>
                <div className="w-full text-center font-bold text-xl mb-4">
                  Welcome!
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
                  customSubmitButton={
                    <Button
                      type="submit"
                      className="w-full bg-primarycol text-white mt-3"
                      onClick={() => {
                        setOtp("");
                        setVerificationError(false);
                        setVerificationSucess(false);
                        setTokenExpiredError(false);
                      }}
                    >
                      Submit
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyInviteComponent;
