"use client";

import { IndividualOnboardingForm } from "@/components/forms/individuals/IndividualOnboardingForm";
import { CreateIndividualProfileSchema } from "@/components/forms/individuals/IndividualOnboardingFormSchema";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

import * as z from "zod";

interface OnboardIndividualComponentProps {
  titleText: string;
}

export default function OnboardIndividualComponent({
  titleText,
}: OnboardIndividualComponentProps) {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  // const [signature_upload_url, setSignatureUploadUrl] = useState<string>("");

  // const [passport_upload_url, setPassportUploadUrl] = useState<string>("");

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateIndividualProfileSchema
  > | null>(null);

  useEffect(() => {
    if (formDetails) {
      const saveIndividualProfile = async () => {
        // create a new form
        const passportFormData = new FormData();
        const { passport, signature, name, surname } = formDetails;

        // append image details to form data
        passportFormData.append("file", passport);
        passportFormData.append(
          "imageName",
          `${name}_${surname}_passport_${Date.now()}`
        );
        passportFormData.append(
          "alternativeText",
          `passport_${name}_${surname}`
        );

        // signature image details
        const sigatureFormData = new FormData();

        // append image details to signature form data
        sigatureFormData.append("file", signature);
        sigatureFormData.append(
          "imageName",
          `${name}_${surname}_signature_${Date.now()}`
        );
        sigatureFormData.append(
          "alternativeText",
          `signature_${name}_${surname}`
        );

        // let the user know that we are creating the profile
        toast({
          title: "Creating profile",
          description: (
            <div className="mt-2 rounded-md w-full flex justify-center items-center">
              <span>Your profile is being created...</span>
            </div>
          ),
        });

        let uploadToCoudinaryRes;
        let createProfileResponse;
        let cloudinary_passport_url = "";
        let cloudinary_signature_url = "";

        // call the api end point to upload passport
         await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: passportFormData,
        })
          .then(async (response) => {
            // get the response of the upload
            uploadToCoudinaryRes = await response.json();

            console.log(
              "reponse from cloudinary passport upload ",
              uploadToCoudinaryRes
            );

            if (uploadToCoudinaryRes && uploadToCoudinaryRes?.secureUrl) {
              // alert user that upload to cloudinary suceeded for passport
              toast({
                title: "Upload success",
                description: (
                  <div className="mt-2 w-full flex justify-center items-center rounded-md">
                    <span className="text-green-600 mr-2">
                      <Check />
                    </span>
                    <span>Passport uploaded</span>
                  </div>
                ),
              });

              // store the passport url in a state
              cloudinary_passport_url = uploadToCoudinaryRes.secureUrl;
              // setPassportUploadUrl(uploadToCoudinaryRes.secureUrl);

              // upload the signature after that
            }
          })
          .catch((uploadError) => {
            console.log(
              "failed to upload passport to cloudinary ",
              uploadError
            );

            toast({
              title: "Upload Error",
              description: (
                <div className="mt-2 w-full flex justify-center items-center">
                  <span className="text-red-500 mr-2">
                    <X />
                  </span>
                  <span>Passport not uploaded</span>
                </div>
              ),
            });
          });

        // call the api end point to upload passport
       await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: sigatureFormData,
        })
          .then(async (response) => {
            // get the response of the upload
            uploadToCoudinaryRes = await response.json();

            console.log(
              "reponse from cloudinary signature upload ",
              uploadToCoudinaryRes
            );

            if (uploadToCoudinaryRes && uploadToCoudinaryRes?.secureUrl) {
              // alert user that upload to cloudinary suceeded for signature
              toast({
                title: "Upload success",
                description: (
                  <div className="mt-2 w-full flex justify-center items-center rounded-md">
                    <span className="text-green-600 mr-2">
                      <Check />
                    </span>
                    <span>Signature uploaded</span>
                  </div>
                ),
              });

              // store the signarure url in a state
              cloudinary_signature_url = uploadToCoudinaryRes.secureUrl;
              // setSignatureUploadUrl(uploadToCoudinaryRes.secureUrl);
            }
          })
          .catch((uploadError) => {
            console.log(
              "failed to upload signature to cloudinary ",
              uploadError
            );

            toast({
              title: "Upload Error",
              description: (
                <div className="mt-2 w-full flex justify-center items-center">
                  <span className="text-red-500 mr-2">
                    <X />
                  </span>
                  <span>Signature not uploaded</span>
                </div>
              ),
            });
          });

        // save the form details in the database
        console.log("here are all the form data submitted", formDetails);

        // save form details in database
        if (cloudinary_passport_url !== "" && cloudinary_signature_url !== "") {
          const central_systems_base_api =
            process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

          // modify the formDetails
          const newFormDetails = {
            ...formDetails,
            passport: cloudinary_passport_url,
            signature: cloudinary_signature_url,
          };

          console.log(formDetails, newFormDetails);

           await fetch(
            `${central_systems_base_api}/api/profiles/individuals/create`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...newFormDetails,
              }),
            }
          )
            .then(async (response) => {
              // get the response of the upload
              createProfileResponse = await response.json();

              console.log(
                "reponse from database create individual profile",
                createProfileResponse
              );
               
              if (createProfileResponse?.success) {
                // alert user that upload to cloudinary suceeded for passport
                toast({
                  title: "Create Profile Success",
                  description: (
                    <div className="mt-2 w-full flex justify-center items-center rounded-md">
                      <span className="text-green-600 mr-2">
                        <Check />
                      </span>
                      <span>{createProfileResponse.message}</span>
                    </div>
                  ),
                });

                // store the passport url in a state

                // upload the signature after that
              }else{
                toast({
                  title: "Create Profile Error",
                  description: (
                    <div className="mt-2 w-full flex justify-center items-center">
                      <span className="text-red-500 mr-2">
                        <X />
                      </span>
                      <span>{createProfileResponse.message}</span>
                    </div>
                  ),
                });
              }
            })
            .catch((createProfileError) => {
              console.log(
                "failed to create profile in database ",
                createProfileError
              );

              toast({
                title: "Create Profile Error",
                description: (
                  <div className="mt-2 w-full flex justify-center items-center">
                    <span className="text-red-500 mr-2">
                      <X />
                    </span>
                    <span>Could not create profile.</span>
                  </div>
                ),
              });
            });
        }
      };

      saveIndividualProfile();
    }
  }, [formDetails, hasUserFilledForm]);

  return (
    <div>
      <div className="mt-4">
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-2xl">
            {titleText}
          </span>
        </div>
      </div>

      <div className="px-2 mb-10">
        <IndividualOnboardingForm
          isMutatingDbResource={hasUserFilledForm}
          isMutatingDbResourceHandler={sethasUserFilledForm}
          updateIndividualDataHandler={setFormDetails}
        />
      </div>
    </div>
  );
}
