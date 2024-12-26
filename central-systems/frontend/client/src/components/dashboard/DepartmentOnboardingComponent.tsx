"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useEffect, useState } from "react";

import * as z from "zod";
import { CreateDepartmentForm } from "../forms/department/CreateDepartmentForm";
import { CreateDepartmetalProfileSchema } from "../forms/department/CreateDepartmentFormSchema";
// import { Check, X } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { formData } from "zod-form-data";
// import { fetchRequestHelper } from "@/helpers/fetchHelpers";

export default function OnboardDepartmentComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateDepartmetalProfileSchema
  > | null>(null);

  useEffect(()=>{
    // get the form details
    // const getAlldetails = async ()=>{
    //   const result = await fetchRequestHelper({

    //   })
    // } 
    console.log(formDetails)
  })

  // useEffect(()=>{

  //   const createDepartmentType = async ()=>{
  //     // save the form details in the database
  //     console.log("here are all the form data submitted", formDetails);

  //     // save form details in database
  //     if (formDetails && hasUserFilledForm) {

  //       let createDepartmentTypeResponse

  //       const central_systems_base_api =
  //         process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;


  //       const saveDepartmentClassDetailsInDb = await fetch(
  //         `${central_systems_base_api}/api/profiles/departments/class/create`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             ...formData,
  //           }),
  //         }
  //       )
  //         .then(async (response) => {
  //           // get the response of the upload
  //           createDepartmentTypeResponse = await response.json();

  //           console.log(
  //             "reponse from database create department type",
  //             createDepartmentTypeResponse
  //           );
             
  //           if (createDepartmentTypeResponse?.success) {
  //             // alert user that upload to cloudinary suceeded for passport
  //             toast({
  //               title: "Create Department Type Success",
  //               description: (
  //                 <div className="mt-2 w-full flex justify-center items-center rounded-md">
  //                   <span className="text-green-600 mr-2">
  //                     <Check />
  //                   </span>
  //                   <span>{createDepartmentTypeResponse.message}</span>
  //                 </div>
  //               ),
  //             });

  //             // store the passport url in a state

  //             // upload the signature after that
  //           }else{
  //             toast({
  //               title: "Create Department Type Error",
  //               description: (
  //                 <div className="mt-2 w-full flex justify-center items-center">
  //                   <span className="text-red-500 mr-2">
  //                     <X />
  //                   </span>
  //                   <span>{createDepartmentTypeResponse.message}</span>
  //                 </div>
  //               ),
  //             });
  //           }
  //         })
  //         .catch((createDepartmentTypeError) => {
  //           console.log(
  //             "failed to create department Type profile in database ",
  //             createDepartmentTypeError
  //           );

  //           toast({
  //             title: "Create Department Type Error",
  //             description: (
  //               <div className="mt-2 w-full flex justify-center items-center">
  //                 <span className="text-red-500 mr-2">
  //                   <X />
  //                 </span>
  //                 <span>Could not create department type.</span>
  //               </div>
  //             ),
  //           });
  //         });
  //     }
  //   }

  //   createDepartmentType()
  // }, [hasUserFilledForm, formDetails])

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
