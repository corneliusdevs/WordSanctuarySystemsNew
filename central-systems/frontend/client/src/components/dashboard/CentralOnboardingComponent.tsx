"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useState } from "react";

import * as z from "zod";
import { CreateCentralProfileSchema } from "../forms/centrals/CreateCentralFormSchema";
import { CreateCentralForm } from "../forms/centrals/CreateCentralForm";

export default function CentralOnboardingComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateCentralProfileSchema
  > | null>(null);

  return (
    <div>
      <DashboardNavbar />

      <div className="mt-4">
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-2xl">
            Create a Central
          </span>
        </div>
      </div>

      <div className="px-2 mb-10 mt-4">
        <CreateCentralForm
          isMutatingDbResource={hasUserFilledForm}
          isMutatingDbResourceHandler={sethasUserFilledForm}
          updateCreateCentralDetailsHandler={setFormDetails}
        />
      </div>
    </div>
  );
}
