import React from "react";
import AdminDashboardHomeCard from "./AdminDashboardHomeCard";
// import { Link } from "lucide-react";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuMessageSquareDiff } from "react-icons/lu";
import DashboardItemCard from "./DashboardItemCard";
import { PiChurchLight } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { MdGroups } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import Link from "next/link";





const AdminDashboardHomeContent = () => {
  return (
    <div className="pt-10 px-[40px] flex flex-col gap-10 align-middle mt-5">
      <AdminDashboardHomeCard
        text="25"
        styles=""
        title={"INSTALLATIONS"}
        // imageSrc=""
        Icon={<PiChurchLight className="h-20 w-20 font-thin" />}
      />
      <Link href="/dashboard/admin-dashboard/departments">
      <AdminDashboardHomeCard
        text="10"
        styles=""
        title={"DEPARTMENT"}
        // imageSrc=""
        Icon={<LuNetwork className="h-20 w-20 font-thin" />}
      />
      </Link>
      <AdminDashboardHomeCard
        text="15"
        styles={""}
        title={"DEPARTMENT TYPE"}
        // imageSrc=""
        Icon={<CgMenuGridO className="h-20 w-20 font-thin" />}
      />

      <AdminDashboardHomeCard
        text="25"
        styles=""
        title={"INDIVIDUALS"}
        // imageSrc=""
        Icon={<MdGroups className="h-20 w-20 font-thin" />}
      />
    </div>
  );
};

export default AdminDashboardHomeContent;
