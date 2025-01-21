"use client";
import { useEffect, useState } from "react";
import { LoginForm } from "./forms/LoginForm";
import { InputOTPForm } from "./forms/OTPForm";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { navigate } from "@/app/actions";

const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [hasEnteredEmail, setHasEnteredEmail] = useState<boolean>(false);

  const [otp, setOtp] = useState<string>("");
  const [hasEnteredOtp, setHasEnteredOtp] = useState<boolean>(false);

  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const [verificationSuccess, setVerificationSucess] = useState<boolean>(false);

  const [verificationErorr, setVerificationError] = useState<boolean>(false);

  const [tokenExpiredError, setTokenExpiredError] = useState<boolean>(false);
  console.log(otp, email);

  useEffect(() => {
    const authenticateEmail = async () => {
      if (hasEnteredEmail) {
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

        try {
          const authenticateEmailCredentials = await fetch(
            `${central_systems_base_api}/api/auth/access/request/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
              }),
            }
          );

          const responseData = await authenticateEmailCredentials.json();
          console.log("request Response:", responseData);

          if (!responseData?.success) {
            toast({
              title: "Invalid Credentials",
              description: (
                <div className="mt-2 w-full flex justify-center items-center">
                  <span className="text-red-500 mr-2">
                    <X />
                  </span>
                  <span>{responseData?.message}</span>
                </div>
              ),
            });

            setIsEmailVerified(false);
            setHasEnteredEmail(false);
            return;
          }

          if (responseData?.success) {
            toast({
              title: "Login credentials sent",
              description: (
                <div className="mt-2 w-full flex justify-center items-center rounded-md">
                  <span className="text-green-600 mr-2">
                    <Check />
                  </span>
                  <span>Check your email for your login credentials.</span>
                </div>
              ),
            });

            setIsEmailVerified(true);
            return;
          }
        } catch (err) {
          console.error("Error during verification:", err);

          toast({
            title: "Error",
            description: (
              <div className="mt-2 w-full flex justify-center items-center">
                <span className="text-red-500 mr-2">
                  <X />
                </span>
                <span>Cannot process request. Please try again later</span>
              </div>
            ),
          });
          setIsEmailVerified(false);
          setHasEnteredEmail(false);
          return;
        }
      }
    };

    authenticateEmail();
  }, [hasEnteredEmail]);

  useEffect(() => {
    const verifyCredentials = async () => {
      if (hasEnteredOtp && otp !== "") {
        toast({
          title: "",
          description: (
            <div className="mt-2 rounded-md w-full flex justify-center items-center">
              <span>Verifying credentials...</span>
            </div>
          ),
        });

        const central_systems_base_api =
          process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

        try {
          const authenticateLoginCredentials = await fetch(
            `${central_systems_base_api}/api/auth/access/request/login/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                otp,
              }),
            }
          );

          const responseData = await authenticateLoginCredentials.json();
          console.log("request Response:", responseData);

          if (responseData?.is_token_expired) {
            setTokenExpiredError(true);
            setVerificationSucess(false);
            setVerificationError(false);
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
          }

          if (responseData?.verified) {
            setVerificationSucess(true);
            setTokenExpiredError(false);
            toast({
              title: "Redirecting To Dashboard",
              description: (
                <div className="mt-2 w-full flex justify-center items-center rounded-md">
                  <span className="text-green-600 mr-2">
                    <Check />
                  </span>
                  <span>Authentication successful</span>
                </div>
              ),
            });

            navigate("/dashboard/members");
          } else {
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
            setVerificationError(true);
            setVerificationSucess(false);
          }
        } catch (err) {
          console.error("Error during verification:", err);
          toast({
            title: "Login Error",
            description: (
              <div className="mt-2 w-full flex justify-center items-center">
                <span className="text-red-500 mr-2">
                  <X />
                </span>
                <span>Please try again later</span>
              </div>
            ),
          });

          setVerificationSucess(false);
          setVerificationError(true);
        }

        setHasEnteredOtp(false);
      }
    };

    verifyCredentials();
  }, [hasEnteredOtp, otp]);

  return (
    <div className="flex flex-col h-[100vh]">
      {/* Top Section */}
      <div className="h-[40vh] relative">
        <img
          src="/assets/loginPage.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <img
            src="/assets/logo.svg"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>
      </div>
      {/* Bottom Section */}
      <div className="h-[60vh] flex justify-center items-center mt-1 py-0">
        <div className="flex flex-col w-[300px] md:w-[400px] bg-white px-4 py-[50px] ">
          <div className="text-primarycol text-2xl text-center w-full mb-2">
            {isEmailVerified ? "Enter OTP" : ""}
          </div>

          {!isEmailVerified ? (
            <div>
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

              <div className="flex justify-center items-center mt-2">
                <Button
                  className="underline"
                  variant={"ghost"}
                  onClick={() => {
                    setHasEnteredEmail(false);
                    setIsEmailVerified(false);
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
