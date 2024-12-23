"use client"

import DashboardHomeComponent from "@/components/dashboard/DashboardHome";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import OnBoardHomeComponent from "@/components/dashboard/OnBoardHomeContent";


export default function OnBoardPage(){

    return (
        <main>
            <DashboardNavbar />
            <OnBoardHomeComponent />
        </main>
    )
}