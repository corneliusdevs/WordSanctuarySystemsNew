"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useEffect, useState } from "react";

import * as z from "zod";
import { CreateDepartmentForm } from "../forms/department/CreateDepartmentForm";
import { ValidateCreateDepartmetalProfileSchema } from "../forms/department/CreateDepartmentFormSchema";
import { Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAddDepartmentMemberStore } from "@/providers/AddDeptMemberProvider";
import { useAddMemberStore } from "@/providers/AddMembersStoreProvider";

export default function OnboardDepartmentComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof ValidateCreateDepartmetalProfileSchema
  > | null>(null);

  const {clearMembers:clearSelectedDeptMembers, setCurrentlySelectedDeptType,} = useAddDepartmentMemberStore( state => state)

  const {clearMembers: clearSelectedInstallationMembers, setCurrentlySelectedInstallation} = useAddMemberStore( state => state)

  useEffect(() => {
    if (formDetails && hasUserFilledForm) {
      const createDepartment = async () => {
        // save the form details in the database
        console.log("here are all the form data submitted", formDetails);

        // save form details in database
          let createDepartmentResponse;

          const central_systems_base_api =
            process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

          // let the user know that we are creating the profile
          toast({
            title: "Onboarding Department",
            description: (
              <div className="mt-2 rounded-md w-full flex justify-center items-center">
                <span>Department is being onboarded...</span>
              </div>
            ),
          });

          //  create department details in db
          await fetch(
            `${central_systems_base_api}/api/profiles/departments/create`,
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
              createDepartmentResponse = await response.json();

              console.log(
                "reponse from database create department",
                createDepartmentResponse
              );

              if (createDepartmentResponse?.success) {
                // alert user that upload to cloudinary suceeded for passport
                toast({
                  title: "Department onboarded",
                  description: (
                    <div className="mt-2 w-full flex justify-center items-center rounded-md">
                      <span className="text-green-600 mr-2">
                        <Check />
                      </span>
                      <span>{createDepartmentResponse.message}</span>
                    </div>
                  ),
                });

                // store the passport url in a state

                // upload the signature after that
              } else {
                toast({
                  title: "Could not Onboard Department",
                  description: (
                    <div className="mt-2 w-full flex justify-center items-center">
                      <span className="text-red-500 mr-2">
                        <X />
                      </span>
                      <span>{createDepartmentResponse.message}</span>
                    </div>
                  ),
                });
              }
            })
            .catch((createDepartmentError) => {
              console.log(
                "failed to create department profile in database ",
                createDepartmentError
              );

              toast({
                title: "Onboard Department Error",
                description: (
                  <div className="mt-2 w-full flex justify-center items-center">
                    <span className="text-red-500 mr-2">
                      <X />
                    </span>
                    <span>Could not Onboard department.</span>
                  </div>
                ),
              });
            })
            .finally(() => {
              //  clear the state
              setFormDetails(null);
              sethasUserFilledForm(false);
              clearSelectedDeptMembers()
              clearSelectedInstallationMembers()
              setCurrentlySelectedInstallation("")
              setCurrentlySelectedDeptType("")
            });
  
      };

      createDepartment();
    }
  }, [hasUserFilledForm, formDetails]);

  return (
    <div>
      <DashboardNavbar />

      <div className="mt-4">
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-2xl">
            Onboard a Department
          </span>
        </div>
      </div>

      <div className="px-2 mb-10 mt-4">
        <CreateDepartmentForm
          isMutatingDbResource={hasUserFilledForm}
          isMutatingDbResourceHandler={sethasUserFilledForm}
          updateDepartmentDetailsHandler={setFormDetails}
        />
      </div>
    </div>
  );
}
