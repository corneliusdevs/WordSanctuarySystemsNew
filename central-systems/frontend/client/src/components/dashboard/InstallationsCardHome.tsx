// import { Link } from ''
import React from "react";
import { IoArrowBack, IoAdd } from "react-icons/io5";
import DashboardNavbar from "./DashboardNavbar";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import Link from "next/link";
// import InstallationsCard from "./InstallationsCard";
import { installations } from "./mock-data/installations";
import InstallationsCard from "./InstallationsCard";


const handleCountryChange = (selectedCountry: string) => {
    console.log('Selected country:', selectedCountry);
  };


const InstallationsCardHome = () => {
  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />
      <div className="mt-10">
        <Link href="/dashboard/onboard">
          <IoArrowBack className="h-8 w-8" />
        </Link>
        <h1 className="text-3xl text-center font-bold text-[#3A2D4A] mt-5">
          Installations
        </h1>
        <Link href="/dashboard/onboard/installation/new-installation">
          <h2 className="text-xl text-[#3A2D4A] ml-5 mt-10 font-bold">
            New Installation
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
          Installations
        </h1>
        <InstallationsCard installations={installations}/>
      </div>
    </div>
  );
};

export default InstallationsCardHome;
