"use client"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import OnboardIndividualComponent from "@/components/dashboard/IndividualOnboardingComponent";

export default function OnboardIndividualPage() {
  return (
    <div>
      <DashboardNavbar />
      <OnboardIndividualComponent titleText="Onboard an Individual"/>
    </div>
  );
}
