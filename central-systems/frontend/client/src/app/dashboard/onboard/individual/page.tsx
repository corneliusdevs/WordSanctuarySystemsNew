
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import IndividualsHome from "@/components/dashboard/IndividualsHome";
import dynamic from 'next/dynamic'
 
const OnboardIndividualComponentWithNoSSR = dynamic(
  () => import('@/components/dashboard/IndividualOnboardingComponent'),
  { ssr: false }
)

export default function OnboardIndividualPage() {
  return (
    <div>
      {/* <DashboardNavbar />
      <OnboardIndividualComponentWithNoSSR titleText="Onboard an Individual"/> */}
      <IndividualsHome/>
    </div>
  );
}
