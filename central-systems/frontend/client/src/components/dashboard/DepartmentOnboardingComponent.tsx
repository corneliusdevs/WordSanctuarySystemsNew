"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useState } from "react";

import * as z from "zod";
import { CreateDepartmentForm } from "../forms/department/CreateDepartmentForm";
import { CreateDepartmetalProfileSchema } from "../forms/department/CreateDepartmentFormSchema";

export default function OnboardDepartmentComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateDepartmetalProfileSchema
  > | null>(null);

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
