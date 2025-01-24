"use client";

import { useState } from "react";
import { CreateDepartmentForm } from "@/components/forms/department/CreateDepartmentForm";
import { ValidateCreateDepartmetalProfileSchema } from "@/components/forms/department/CreateDepartmentFormSchema"; // Correct the import path to where the schema is defined
import { z } from "zod"; // Ensure zod is imported

export default function DepartmentFormPage() {
  // State management
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [departmentDetails, setDepartmentDetails] = useState<
    z.infer<typeof ValidateCreateDepartmetalProfileSchema> | null
  >(null);

  return (
    <div className="container mx-auto p-4">
      {/* Pass the required props */}
      <CreateDepartmentForm
        isMutatingDbResourceHandler={setIsMutating}
        isMutatingDbResource={isMutating}
        updateDepartmentDetailsHandler={setDepartmentDetails}
      />
      {/* Optional: Debugging Display */}
      {departmentDetails && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-bold">Submitted Department Details</h2>
          <pre>{JSON.stringify(departmentDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
