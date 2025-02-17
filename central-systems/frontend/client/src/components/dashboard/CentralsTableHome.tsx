import React from "react";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import DashboardNavbar from "./DashboardNavbar";
import Link from "next/link";
import { IoAdd, IoArrowBack } from "react-icons/io5";
import CentralsTable from "./CentralsTable";
import { centrals } from "./mock-data/centrals";

const CentralsTableHome = () => {
  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />
      <div className="mt-10">
        <Link href="/dashboard/onboard">
          <IoArrowBack className="h-8 w-8" />
        </Link>
        <h1 className="text-3xl text-center font-bold text-[#3A2D4A] mt-5">
          Central
        </h1>
        <Link href="/dashboard/onboard/installation/new-installation">
          <h2 className="text-xl text-[#3A2D4A] ml-5 mt-10 font-bold">
            Add Department
          </h2>
          <div className="flex items-center justify-center py-10">
            <div className="flex items-center justify-center h-14 w-20 rounded-3xl border-4 border-[#3A2D4A] ">
              <IoAdd className="h-12 w-12 text-[#3A2D4A] font-bold" />
            </div>
          </div>
        </Link>
      </div>

      <div>
        <h1 className="text-xl text-[#3A2D4A] ml-5 mt-5 font-bold mb-5">
          Department Types
        </h1>
        <CentralsTable centrals={centrals} />
      </div>
    </div>
  );
};

export default CentralsTableHome;
