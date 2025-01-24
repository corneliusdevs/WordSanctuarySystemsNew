"use client"

import { useState } from "react";
import { IndividualOnboardingForm } from "@/components/forms/individuals/IndividualOnboardingForm";

export default function IndividualForm() {
  // State management
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [individualData, setIndividualData] = useState<any>(null);

  return (
    <div className="">
      {/* Passing the required props */}
      <IndividualOnboardingForm
        isMutatingDbResourceHandler={setIsMutating}
        isMutatingDbResource={isMutating}
        updateIndividualDataHandler={setIndividualData}
      />
    </div>
  );
}

  