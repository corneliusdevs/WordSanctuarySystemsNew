import React from "react";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

type IndividualData = {
  name: string;
  installation: string;
  departments: string[];
  positions: string[];
  lifeClassTopic: string;
  lifeClassTeacher: string;
  signature?: string;
};

const IndividualDetailsCard: FC = () => {
  const individualData: IndividualData = {
    name: "Mr Samuel King",
    installation: "Lagos 3",
    departments: ["Choir and Evangelism"],
    positions: ["HOD (choir)", "Member (Evangelism)"],
    lifeClassTopic: "Topic 1",
    lifeClassTeacher: "Pastor Noah",
    signature: "signature-placeholder",
  };

  return (
    <main className="max-w-md mx-auto p-4 bg-white">
      <section className="">
        <div className="flex justify-between items-start mb-6">
          {/* Profile Header */}
          <div>
            <div className="space-y-1 mb-6">
              <h2 className="text-lg font-bold text-[#3A2D4A]">Name</h2>
              <p className="text-base text-gray-600">{individualData.name}</p>
            </div>

            {/* Installation */}
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#3A2D4A]">Installation</h2>
              <p className="text-base text-gray-600">
                {individualData.installation}
              </p>
            </div>
          </div>

          <div className="w-28 h-28 border border-black flex items-center justify-center">
            <Image
              src=""
              alt="Profile"
              width={58}
              height={58}
              className=""
            />
          </div>
        </div>

        {/* Department(s) */}
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-bold text-[#3A2D4A]">Department(s)</h2>
          <p className="text-base text-gray-600">
            {individualData.departments.join(", ")}
          </p>
        </div>

        {/* Position(s) */}
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-bold text-[#3A2D4A]">Position(s)</h2>
          <p className="text-base text-gray-600">
            {individualData.positions.join(", ")}
          </p>
        </div>

        {/* Life Class Topic */}
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-bold text-[#3A2D4A]">Life Class Topic</h2>
          <p className="text-base text-gray-600">
            {individualData.lifeClassTopic}
          </p>
        </div>

        {/* Life Class Teacher */}
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-bold text-[#3A2D4A]">
            Life Class Teacher
          </h2>
          <p className="text-base text-gray-600">
            {individualData.lifeClassTeacher}
          </p>
        </div>

        {/* Signature */}
        <div className="space-y-1 mb-6">
          <h2 className="text-lg font-bold text-[#3A2D4A]">Signature</h2>
          <div className="h-12 flex items-center">
            <span className="text-2xl font-signature text-gray-900">N</span>
          </div>
        </div>

        {/* Edit Button */}
        <Link href="/dashboard/onboard/individual/edit-individual">
        <button className="w-full py-2.5 px-4 bg-[#3A2D4A] text-white font-bold rounded-full transition-colors mb-10">
          Edit
        </button>
        </Link>
      </section>
    </main>
  );
};

export default IndividualDetailsCard;
