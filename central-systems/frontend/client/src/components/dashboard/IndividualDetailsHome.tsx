import React from "react";
import DashboardNavbar from "./DashboardNavbar";
// import DashboardNavbar from './DashboardNavbar'
import Link from "next/link";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import { IoArrowBack } from "react-icons/io5";
import IndividualDetailsCard from "./IndividualDetailsCard";

const IndividualDetailsHome = () => {
  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />

      <div className="mt-8">
        <Link href="/dashboard/onboard/individual">
          <IoArrowBack className="h-8 w-8 mb-3" />
        </Link>
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-3xl mb-8 font-bold">
            Member
          </span>
        </div>
      </div>

      <IndividualDetailsCard/>

    </div>
  );
};

export default IndividualDetailsHome;
