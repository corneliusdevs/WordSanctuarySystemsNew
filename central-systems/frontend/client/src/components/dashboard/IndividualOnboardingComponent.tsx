"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { IndividualOnboardingForm } from "@/components/forms/individuals/IndividualOnboardingForm";
import { CreateIndividualProfileSchema } from "@/components/forms/individuals/IndividualOnboardingFormSchema";
import { useState } from "react";

import * as z from "zod";

interface OnboardIndividualComponentProps{
  titleText: string
}

export default function OnboardIndividualComponent({titleText}: OnboardIndividualComponentProps) {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateIndividualProfileSchema
  > | null>(null);

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
