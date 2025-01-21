"use client";

// import Memb from '@/components/Members';
import { Member } from "@/types/general";
import React from "react";
import { members } from "./mock-data/members";
import Members from "./MembersTable";
import MembersTable from "./MembersTable";

const MembersHome = () => {
  const handleView = (member: Member) => {
    console.log("Viewing member:", member);
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-[#3A2D4A] text-5xl text-center mb-10">Profile</h1>
      <MembersTable members={members} onView={handleView} />
    </div>
  );
};

export default MembersHome;
