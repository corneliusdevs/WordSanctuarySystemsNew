"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useEffect, useState } from "react";

import * as z from "zod";
import { CreateInstallationProfileSchema } from "../forms/installations/InstallationOnBoardingFormSchema";
import { CreateInstallationForm } from "../forms/installations/InstallationOnboardingForm";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

export default function OnboardInstallationComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateInstallationProfileSchema
  > | null>(null);


  useEffect(() => {
    const createInstallation = async () => {
      // save the form details in the database
      console.log("here are all the form data submitted", formDetails);

      // save form details in database
      if (formDetails && hasUserFilledForm) {
        let createInstallationResponse;

        // let the user know that we are creating the profile
        toast({
          title: "Creating Installation",
          description: (
            <div className="mt-2 rounded-md w-full flex justify-center items-center">
              <span>Installation is being created...</span>
            </div>
          ),
        });


        const central_systems_base_api =
          process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

          // make the request
         await fetch(
          `${central_systems_base_api}/api/profiles/installations/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formDetails,
            }),
          }
        )
          .then(async (response) => {
            // get the response of the upload
            createInstallationResponse = await response.json();

            console.log(
              "reponse from database create installation",
              createInstallationResponse
            );

            if (createInstallationResponse?.success) {
              // alert user that create installation succeeded
              toast({
                title: "Installation created",
                description: (
                  <div className="mt-2 w-full flex justify-center items-center rounded-md">
                    <span className="text-green-600 mr-2">
                      <Check />
                    </span>
                    <span>{createInstallationResponse.message}</span>
                  </div>
                ),
              });

              // store the passport url in a state

              // upload the signature after that
            } else {
              toast({
                title: "Create Installation Error",
                description: (
                  <div className="mt-2 w-full flex justify-center items-center">
                    <span className="text-red-500 mr-2">
                      <X />
                    </span>
                    <span>{createInstallationResponse.message}</span>
                  </div>
                ),
              });
            }
          })
          .catch((createDepartmentTypeError) => {
            console.log(
              "failed to create department Type profile in database ",
              createDepartmentTypeError
            );

            toast({
              title: "Create Department Type Error",
              description: (
                <div className="mt-2 w-full flex justify-center items-center">
                  <span className="text-red-500 mr-2">
                    <X />
                  </span>
                  <span>Could not create Installation.</span>
                </div>
              ),
            });
          }).finally(()=>{
            sethasUserFilledForm(false)
            setFormDetails(null)
          });
      }
    };

    createInstallation();
  }, [hasUserFilledForm, formDetails]);


  return (
    <div>
      <DashboardNavbar />

      <div className="mt-4">
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-2xl">
            Onboard an Installation
          </span>
        </div>
      </div>

      <div className="px-2 mb-10 mt-4">
        <CreateInstallationForm
          isMutatingDbResource={hasUserFilledForm}
          isMutatingDbResourceHandler={sethasUserFilledForm}
          updateInstallationDetailsHandler={setFormDetails}
        />
      </div>
    </div>
  );
}
