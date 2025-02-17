import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import CentralsDetailsTable from "./CentralsDetailsTable";
import { centralsDetails } from "./mock-data/centrals";

const CentralsDetailsTableHome = () => {
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
      </div>
      <CentralsDetailsTable centralsDetails={centralsDetails} />
    </div>
  );
};

export default CentralsDetailsTableHome;
