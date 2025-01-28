
import dynamic from 'next/dynamic'
 
const VerifyInviteComponentWrapperComponentWithNoSSR = dynamic(
  () => import('@/components/VerifyInviteComponentWrapper'),
  { ssr: false }
)

export default function VerifyInvitePage() {
    return (
      <div className="">
        <VerifyInviteComponentWrapperComponentWithNoSSR/>
      </div>
    );
  }
  
