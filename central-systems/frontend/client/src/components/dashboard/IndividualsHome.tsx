import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import IndividualsTable from "./IndividualsTable";
import { Member } from "@/types/general";
import { members } from "./mock-data/members";


const IndividualsHome = () => {
    const handleView = (member: Member) => {
        console.log("Viewing member:", member);
    }
  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />

      <div className="mt-8">
        <Link href="/dashboard/onboard">
          <IoArrowBack className="h-8 w-8 mb-3" />
        </Link>
        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-3xl mb-8 font-bold">
            Individuals
          </span>
        </div>
      </div>
      <IndividualsTable individuals={members}        
      />
    </div>
  );
};

export default IndividualsHome;
