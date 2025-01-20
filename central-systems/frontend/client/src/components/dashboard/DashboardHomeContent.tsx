import Link from "next/link";
import DashboardItemCard from "./DashboardItemCard";
import { LuMessageSquareDiff } from "react-icons/lu";
import { IoMailOpenOutline } from "react-icons/io5";
import { Progress } from "@/components/ui/progress"





const DashboardHomeComponent = () => {
  return (
    <>
      <div className="pt-10 px-[20px] flex flex-col gap-10 align-middle">
        
          <Link href={"/dashboard/invitations"}>
            <DashboardItemCard
            toptext="25"
            bottomText=""
            styles=""
            title={"INVITATIONS"}
            // imageSrc="/central-systems/frontend/client/public/assets/Frame.png"
            Icon={<LuMessageSquareDiff className="h-20 w-20 font-thin" />} 
            progress={58}            />


          </Link>
          <DashboardItemCard
          toptext="10"
          bottomText="NEW REQUEST"
          styles=""
          title={"ACCESS REQUESTS"}
          // imageSrc=""
          Icon={<IoMailOpenOutline className="h-20 w-20 font-thin" />} progress={undefined}          />
          <DashboardItemCard
          toptext="25"
          bottomText="NEW REQUEST"
          styles={""}
          title={"INVITATIONS REQUEST"}
          // imageSrc="/../../../public/assets/Frame.png"
          Icon={<LuMessageSquareDiff className="h-20 w-20 font-thin" />} progress={undefined}          />
      
      </div>
    </>
  );
};

export default DashboardHomeComponent;
