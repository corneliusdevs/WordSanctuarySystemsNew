import Link from "next/link";
import { PiChurchLight } from "react-icons/pi";
import AdminDashboardHomeCard from "./AdminDashboardHomeCard";
import { LuNetwork } from "react-icons/lu";
import { CgMenuGridO } from "react-icons/cg";
import { MdGroups } from "react-icons/md";
import { FaArrowsToCircle } from "react-icons/fa6";

const DashboardViewComponent = () => {
  return (
    <div className="mt-4">
      <div className="w-full justify-center items-center flex">
        <span className="text-primarycol text-center text-2xl">
          All Profiles
        </span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href={"/dashboard/profiles/installations"}>
            <AdminDashboardHomeCard
              text="25"
              styles=""
              title={"INSTALLATIONS"}
              Icon={<PiChurchLight className="h-14 w-14 font-thin mt-5" />}
            />
          </Link>
          <Link href={"/dashboard/profiles/departments"}>
            <AdminDashboardHomeCard
              text="10"
              styles=""
              title={"DEPARTMENT"}
              Icon={<LuNetwork className="h-14 w-14 font-thin mt-5" />}
            />
          </Link>
          <Link href={"/dashboard/profiles/department-types"}>
            <AdminDashboardHomeCard
              text="15"
              styles={""}
              title={"DEPARTMENT TYPE"}
              Icon={<CgMenuGridO className="h-14 w-14 font-thin mt-5" />}
            />
          </Link>
          <Link href={"/dashboard/profiles/individuals"}>
            <AdminDashboardHomeCard
              text="25"
              styles=""
              title={"INDIVIDUALS"}
              Icon={<MdGroups className="h-14 w-14 font-thin mt-5" />}
            />
          </Link>
          <Link href={"/dashboard/profiles/centrals"}>
            <AdminDashboardHomeCard
              text="10"
              styles=""
              title={"CENTRALS"}
              Icon={<FaArrowsToCircle className="h-14 w-14 font-thin mt-5" />}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardViewComponent;
