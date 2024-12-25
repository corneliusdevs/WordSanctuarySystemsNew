"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useState } from "react";

import * as z from "zod";
import { CreateInstallationProfileSchema } from "../forms/installations/InstallationOnBoardingFormSchema";
import { CreateInstallationForm } from "../forms/installations/InstallationOnboardingForm";

export default function OnboardInstallationComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateInstallationProfileSchema
  > | null>(null);

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
