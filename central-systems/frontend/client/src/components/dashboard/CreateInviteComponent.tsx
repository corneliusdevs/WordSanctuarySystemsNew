"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useEffect, useState } from "react";

import * as z from "zod";
import { CreateInviteForm } from "../forms/invites/CreateInviteForm";
import { CreateInvitationFormSchema } from "../forms/invites/CreateInviteFormSchema";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";


export default function CreateInviteComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [inviteRequestSuccess, setInviteRequestSuccess] =
    useState<boolean>(false);

  const [inviteRequestError, setInviteRequestError] = useState<boolean>(false);

  const [hasMadeRequest, setHasMadeRequest] = useState<boolean>(false);



  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateInvitationFormSchema
  > | null>(null);

  useEffect(() => {
    const sendInvitation = async () => {
      if (hasUserFilledForm && formDetails) {

        console.log(inviteRequestError)
        toast({
          title: "",
          description: (
            <div className="mt-2 rounded-md w-full flex justify-center items-center">
              <span>Processing...</span>
            </div>
          ),
        });

        const central_systems_base_api =
          process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

        try {
          const sendInviteRequest = await fetch(
            `${central_systems_base_api}/api/auth/invitations/request/submit`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formDetails.email,
                description: formDetails.description,
              }),
            }
          );

          const responseData = await sendInviteRequest.json();
          console.log("Verification Response:", responseData);


          if(responseData){

              // Set the invite request status or handle further based on response
              setInviteRequestSuccess(responseData?.success);
              
            }
          console.log("Invite success:", responseData);
        } catch (err) {
          console.error("Error during verification:", err);
          setInviteRequestError(true);
         
        }finally{
            setHasMadeRequest(true)
        }
        }
    };

    sendInvitation();
  }, [hasUserFilledForm, formDetails, hasMadeRequest, inviteRequestError]);

  useEffect(() => {
    if (hasUserFilledForm && hasMadeRequest) {
      if (inviteRequestSuccess) {
        toast({
          title: "Invitation success",
          description: (
            <div className="mt-2 w-full flex justify-center items-center rounded-md">
              <span className="text-green-600 mr-2">
                <Check />
              </span>
              <span>Invite sent</span>
            </div>
          ),
        });
      } else {
        toast({
          title: "Invitation failed",
          description: (
            <div className="mt-2 w-full flex justify-center items-center">
              <span className="text-red-500 mr-2">
                <X />
              </span>
              <span>Could not send invite</span>
            </div>
          ),
        });
      }

      sethasUserFilledForm(false);
      setFormDetails(null);
      setHasMadeRequest(false)
    }
  }, [inviteRequestSuccess, hasUserFilledForm, hasMadeRequest]);

  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />

      <div className="mt-8">
        
    <Link href='/dashboard/invitations'>
      <IoArrowBack className="h-8 w-16" />
      </Link>
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-3xl mb-8 font-bold">
            Invitation Form
          </span>
        </div>
      </div>

      <div className="px-5 mb-10 mt-4 ">
        <CreateInviteForm
          isMutatingDbResource={hasUserFilledForm}
          isMutatingDbResourceHandler={sethasUserFilledForm}
          updateInviteDeatilsHandler={setFormDetails}
          customSubmitButton={
            <Button
              type="submit"
              variant={"default"}
              className="bg-primarycol text-white w-full mt-2"
              onClick={() => {
                setFormDetails(null);
                sethasUserFilledForm(false);
                setInviteRequestError(false);
                setInviteRequestSuccess(false);
              }}
            >
              Submit
            </Button>
          }
        />
      </div>
    </div>
  );
}
