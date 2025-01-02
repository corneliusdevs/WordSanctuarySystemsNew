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
          console.log("requetst Response:", responseData);

          if (!responseData?.success) {
            // inform the user of the login status
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

            // set is email verified to false
            setIsEmailVerified(false);
            setHasEnteredEmail(false);
            //  stop the execution
            return;
          }

          if (responseData?.success) {
            // inform the user of the login status
            toast({
              title: "Login credentails sent",
              description: (
                <div className="mt-2 w-full flex justify-center items-center rounded-md">
                  <span className="text-green-600 mr-2">
                    <Check />
                  </span>
                  <span>Check your email for your login credentails.</span>
                </div>
              ),
            });

            // update the state
            setIsEmailVerified(true);

            return;
          }

          // Set the verification status or handle further based on response
          // setVerificationSucess(true);
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
          // set is email verified to false
          setIsEmailVerified(false);
          setHasEnteredEmail(false);
          //  stop the execution
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
          console.log("requetst Response:", responseData);

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
            // Set the verification status or handle further based on response
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

            //  redirect to members dashboard
            navigate("/dashboard/members")
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
    <div
      className="bg-center"
      style={{ backgroundImage: "url('/assets/new4.jpg')" }}
    >
      <div className="flex justify-center items-center w-full h-[100vh] bg-gray-400/90 backdrop-blur-sm  px-5">
        <div className="flex flex-col">
          <div className="width-[210px] md:w-[400px] bg-white px-4 py-[50px] pt-[30px] rounded-md shadow-xl border-[1px]">
            <div className="text-primarycol text-2xl text-center w-full mb-2">
              {!isEmailVerified ? "Word Sanctuary Systems" : "Enter OTP"}
            </div>

            {!isEmailVerified ? (
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
    </div>
  );
};

export default LoginComponent;
