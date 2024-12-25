"use client";

import { useState } from "react";
import VerifyInviteComponent from "./VerifyInviteComponent";
import OnboardIndividualComponent from "./dashboard/IndividualOnboardingComponent";

const VerifyInviteComponentWrapper = () => {
  const [isVerified, setIsverified] = useState<boolean>(false);
  return (
    <div>
      {!isVerified ? (
        <VerifyInviteComponent isVerifiedStateHandler={setIsverified} />
      ) : (
        <OnboardIndividualComponent titleText="Create your Profile" />
      )}
    </div>
  );
};

export default VerifyInviteComponentWrapper;
