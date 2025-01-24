import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardWelcomeComponent from "@/components/dashboard/DashboardWelcomeComponent";
import MembersHome from "@/components/dashboard/MembersHome";



export default function MembersDashboardPage (){
    return (
        <div>
            <DashboardNavbar />
            <DashboardWelcomeComponent username={""} title={""} />
            <MembersHome />
        </div>
    )
}