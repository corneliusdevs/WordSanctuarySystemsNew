"use client";

import React from "react";
// import { mockData } from "./charts/mockData/KPIData";
import CustomPieChart from "./charts/CustomPieChart";
import { departmentKPI } from "./mock-data/departments";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";

interface DepartmentCardProps {
  department: string;
  numberOfMembers: number;
}

const COLORS = {
  finance: "#4C168D", // green
  people: "#7035BA", // blue
  operation: "#88769F", // yellow
  improvement: "#442B62", // red
};

const DepartmentCard = ({
  department,
  numberOfMembers,
}: DepartmentCardProps) => {
  return (
    <div>
      <div>
        <article className="max-w-md mx-auto p-6 text-[#3A2D4A]">
          <dl className="space-y-4">
            <div>
              <dt className="text-xl font-bold mb-1">Department</dt>
              <dd className="text-base font-medium text-gray-700">
                {department}
              </dd>
            </div>

            <div>
              <dt className="text-xl font-bold mb-1">Number of Members</dt>
              <dd className="text-base font-medium text-gray-700">
                {numberOfMembers}
              </dd>
            </div>
          </dl>
        <h1 className="text-xl font-bold mt-5">KPI</h1>
        </article>
      </div>

      <div className="px-10 mb-10">
        <div className="pl-10">
          <CustomPieChart data={departmentKPI} />
        </div>

        <div className="grid grid-cols-3 gap-2 px">
          <div className="flex items-center">
            <span
              className="w-5 h-5 rounded-lg mr-2"
              style={{ backgroundColor: COLORS.finance }}
            ></span>
            <span className="text-sm">Finance </span>
          </div>
          <div className="flex items-center">
            <span
              className="w-5 h-5 rounded-lg mr-2"
              style={{ backgroundColor: COLORS.people }}
            ></span>
            <span className="text-sm">People </span>
          </div>
          <div className="flex items-center">
            <span
              className="w-5 h-5 rounded-lg mr-2"
              style={{ backgroundColor: COLORS.operation }}
            ></span>
            <span className="text-sm">Operation </span>
          </div>
          <div className="flex items-center">
            <span
              className="w-5 h-5 rounded-lg mr-2"
              style={{ backgroundColor: COLORS.improvement }}
            ></span>
            <span className="text-sm">Improvement </span>
          </div>
        </div>
        <Link href="/dashboard/">
          <button className="border-2 w-auto h-14 p-4 shadow-lg rounded-2xl flex justify-between gap-5 mt-10">
            Add Member <IoIosAdd className="h-6 w-8" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;
