"use client";

import { useState } from "react";
import { CreateInstallationForm } from "@/components/forms/installations/InstallationOnboardingForm";
import { CreateInstallationProfileSchema } from "@/components/forms/installations/InstallationOnBoardingFormSchema"; 
import { z } from "zod"; // Ensure zod is imported

export default function InstallationFormPage() {
  // State management
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [installationDetails, setInstallationDetails] = useState<
    z.infer<typeof CreateInstallationProfileSchema> | null
  >(null); // Replaced with `CreateInstallationProfileSchema`

  return (
    <div className="container mx-auto p-4">
      {/* Pass the required props */}
      <CreateInstallationForm
        isMutatingDbResourceHandler={setIsMutating}
        isMutatingDbResource={isMutating}
        updateInstallationDetailsHandler={setInstallationDetails}
      />
      {/* Optional: Debugging Display */}
      {installationDetails && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-bold">Submitted Installation Details</h2>
          <pre>{JSON.stringify(installationDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
