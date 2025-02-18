
import dynamic from 'next/dynamic'
 
const OnboardIndividualComponentWithNoSSR = dynamic(
  () => import('@/components/dashboard/IndividualOnboardingComponent'),
  { ssr: false }
)

export default function OnboardIndividualPage() {
  return (
    <div>
      <OnboardIndividualComponentWithNoSSR titleText="Onboard an Individual"/>
    </div>
  );
}
