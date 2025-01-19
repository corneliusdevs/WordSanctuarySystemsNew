"use client";
import DashboardHomeComponent from "@/components/dashboard/DashboardHome";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function DashboardHome() {
  return (
    <main className="bg-[#3A2D4A] h-screen pt-[55px] pb-[60px] pr-[70px] pl-[72px]">
      <div className="bg-white rounded-3xl p-[] shadow-2xl p-[30px]">
        <DashboardNavbar />
        <DashboardHomeComponent />
      </div>
    </main>
  );
}
