import Link from "next/link";
import DashboardItemCard from "./DashboardItemCard";

const OnBoardHomeComponent = () => {
  return (
    <div className="mt-4">
      <div className="w-full justify-center items-center flex">
        <span className="text-primarycol text-center text-2xl">Onboard</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-3">
          <Link href={"/dashboard/onboard/installation"}>
            <DashboardItemCard
              toptext="Installation"
              bottomText="25 Onboarded"
              styles=""
            />
          </Link>
          <Link href={"/dashboard/onboard/department"}>
            <DashboardItemCard
              toptext="Department"
              bottomText="10 Onboarded"
              styles=""
            />
          </Link>
          <Link href={"/dashboard/onboard/department/type"}>
            <DashboardItemCard
              toptext="Department Types"
              bottomText="10 Created"
              styles=""
            />
          </Link>
          <Link href={"/dashboard/onboard/individual"}>
            <DashboardItemCard
              toptext="Individual"
              bottomText="10 Onboarded"
              styles={""}
            />
          </Link>
          <Link href={"/dashboard/onboard/centrals"}>
            <DashboardItemCard
              toptext="Centrals"
              bottomText="10 Onboarded"
              styles={""}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnBoardHomeComponent;
