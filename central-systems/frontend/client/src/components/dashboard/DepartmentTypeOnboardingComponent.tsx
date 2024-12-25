"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useState } from "react";

import * as z from "zod";
import { DepartmentTypeForm } from "../forms/department/DepartmentTypeForm";
import { CreateDepartmentClassFormSchema } from "../forms/department/DepartmentTypeFormSchema";

export default function DepartmentTypeOnboardingComponent() {
  const [hasUserFilledForm, sethasUserFilledForm] = useState<boolean>(false);

  const [formDetails, setFormDetails] = useState<z.infer<
    typeof CreateDepartmentClassFormSchema
  > | null>(null);

  return (
    <div>
      <DashboardNavbar />

      <div className="mt-4">
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-2xl">
            Create a Department Type
          </span>
        </div>
      </div>

      <div className="px-2 mb-10 mt-4">
        <DepartmentTypeForm
          isMutatingDbResource={hasUserFilledForm}
          isMutatingDbResourceHandler={sethasUserFilledForm}
          updateDepartmentTypeDetailsHandler={setFormDetails}
        />
      </div>
    </div>
  );
}
