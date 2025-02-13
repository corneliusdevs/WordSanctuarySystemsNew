import React from "react";
import AdminDashboardHomeCard from "./AdminDashboardHomeCard";
// import { Link } from "lucide-react";
import { PiChurchLight } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { MdGroups } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import Link from "next/link";
import { FaArrowsToCircle } from "react-icons/fa6";






const AdminDashboardHomeContent = () => {
  return (
    <div className="pt-10 px-[40px] flex flex-col gap-10 align-middle mt-5">
      <Link href="/dashboard/onboard/installation">
      <AdminDashboardHomeCard
        text="25"
        styles=""
        title={"INSTALLATIONS"}
        // imageSrc=""
        Icon={<PiChurchLight className="h-14 w-14 font-thin mt-5" />}
      />
      </Link>
      <Link href="/dashboard/onboard/department">
      <AdminDashboardHomeCard
        text="10"
        styles=""
        title={"DEPARTMENT"}
        // imageSrc=""
        Icon={<LuNetwork className="h-14 w-14 font-thin mt-5" />}
      />
      </Link>
      <Link href="/dashboard/onboard/department/type">
      <AdminDashboardHomeCard
        text="15"
        styles={""}
        title={"DEPARTMENT TYPE"}
        // imageSrc=""
        Icon={<CgMenuGridO className="h-14 w-14 font-thin mt-5" />}
      />
      </Link>
      <Link href="/dashboard/onboard/individual">
      <AdminDashboardHomeCard
        text="25"
        styles=""
        title={"INDIVIDUALS"}
        // imageSrc=""
        Icon={<MdGroups className="h-14 w-14 font-thin mt-5" />}
      />
      </Link>
      <Link href="/dashboard/onboard/centrals">
<AdminDashboardHomeCard
        text="10"
        styles=""
        title={"CENTRALS"}
        // imageSrc=""
        Icon={<FaArrowsToCircle className="h-14 w-14 font-thin mt-5" />}
      />
      </Link>
    </div>
  );
};

export default AdminDashboardHomeContent;
