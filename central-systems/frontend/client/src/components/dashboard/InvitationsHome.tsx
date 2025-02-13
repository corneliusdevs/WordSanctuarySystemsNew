"use client";
import React from "react";
import { IoAdd } from "react-icons/io5";
import DashboardNavbar from "./DashboardNavbar";
import DashboardWelcomeComponent from "./DashboardWelcomeComponent";
import InvitationsTable from "./InvitationsTable";
import { invitations } from "./mock-data/invitations";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

const InvitationsHome = () => {
  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />
      <div className="mt-10">
        <Link href="/dashboard/home">
          <IoArrowBack className="h-8 w-16" />
        </Link>
        <h1 className="text-4xl text-center font-bold text-[#3A2D4A]">
          Invitations
        </h1>
        <Link href="/dashboard/home/invitations/create-invite">
        <h2 className="text-xl text-[#3A2D4A] ml-5 mt-5 font-bold">
          New Invite
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
          Sent Invites
        </h1>
        <InvitationsTable invitations={invitations} />
      </div>
    </div>
  );
};

export default InvitationsHome;
