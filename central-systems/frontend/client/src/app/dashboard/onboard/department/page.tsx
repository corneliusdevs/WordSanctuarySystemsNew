"use client"

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function OnboardDepartmentPage() {
    return (
      <div>
        <DashboardNavbar />

        <div className="mt-4">
          <div className="w-full justify-center items-center flex">
            <span className="text-primarycol text-center text-2xl">Onboard a Department</span>
          </div>
        </div>
      </div>
    );
  }
  