import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import Link from "next/link";
import { IoAdd, IoArrowBack } from "react-icons/io5";

const DepartmentTypeHome = () => {
  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />
      <div className="mt-10">
        <Link href="/dashboard/onboard">
          <IoArrowBack className="h-8 w-8" />
        </Link>
        <h1 className="text-3xl text-center font-bold text-[#3A2D4A] mt-5">
          Department Type
        </h1>
        <Link href="/dashboard/onboard/department/type/create-type">
          <h2 className="text-lg text-[#3A2D4A] ml-5 mt-10 font-bold">
            Create New Department Type
          </h2>
          <div className="flex items-center justify-center py-10">
            <div className="flex items-center justify-center h-14 w-20 rounded-3xl border-4 border-[#3A2D4A] ">
              <IoAdd className="h-12 w-12 text-[#3A2D4A] font-bold" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DepartmentTypeHome;
