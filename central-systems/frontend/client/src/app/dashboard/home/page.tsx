"use client";
import DashboardHomeComponent from "@/components/dashboard/DashboardHome";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardWelcomeComponent from "@/components/dashboard/DashboardWelcomeComponent";
import KPICard from "@/components/dashboard/KPICard";
import { mockData, mockData2 } from "../mockData/KPIData";

export default function DashboardHome() {
  return (
    <main className="">
      <DashboardNavbar />
      <DashboardWelcomeComponent username={"Eluan"} title={""} />
      <div className="flex items-center justify-center w-auto bg-white">
        <KPICard data={[mockData, mockData2]} isLoading={false} error={null} />
      </div>
      <div className="bg-white p-[] shadow-2xl p-[30px]">
        <DashboardHomeComponent />
      </div>
    </main>
  );
}
