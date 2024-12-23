"use client"
import DashboardHomeComponent from "@/components/dashboard/DashboardHome";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";


export default function DashboardHome(){

    return (
        <main>
            <DashboardNavbar />
            <DashboardHomeComponent />
        </main>
    )
}