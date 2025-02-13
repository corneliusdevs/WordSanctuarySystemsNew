// import { Link } from "lucide-react";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import DashboardNavbar from "./DashboardNavbar";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import KPIProgressCard from "./KPIProgressCard";
import Link from "next/link";

const KPIProgressCardHome = () => {
  const kpiData = [
    { label: "Improvement", percentage: 68, change: 5 },
    { label: "Operations", percentage: 28, change: -3 },
    { label: "People", percentage: 38, change: 1 },
    { label: "Finances", percentage: 45, change: -2 },
  ];

  const locations = ["Lagos", "Edo", "Benin"];

  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />

      <div className="mt-8">
        <Link href="/dashboard/home">
          <IoArrowBack className="h-8 w-8 mb-3"/>
        </Link>

        <div className="w-full justify-center items-center flex">
          <span className="text-primarycol text-center text-3xl mb-8 font-bold">
            KPI
          </span>
        </div>
      </div>

      <div className="flex justify-between px-8">
        
          <select className="w-28 px-2 py-2 border-2 h-12 rounded-xl shadow-2xl">
            <option value="" disabled>
              Select an access
            </option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        

        <button className="w-13 px-4 py-2 border-2 h-12 rounded-3xl shadow-2xl">
          This Month
        </button>
      </div>

      <div className="max-w-md px-8 mt-4 bg-white rounded-lg shadow-sm">
        {kpiData.map((kpi) => (
          <KPIProgressCard
            key={kpi.label}
            label={kpi.label}
            percentage={kpi.percentage}
            change={kpi.change}
          />
        ))}
      </div>
    </div>
  );
};

export default KPIProgressCardHome;
