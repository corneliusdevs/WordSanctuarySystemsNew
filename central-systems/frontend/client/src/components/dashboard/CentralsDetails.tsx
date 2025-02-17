// import { CentralsDetails } from '@/types/general';
"use client";
import React from "react";
import CustomPieChart from "./charts/CustomPieChart";
import { departmentKPI } from "./mock-data/departments";

interface CentralsDetailsProps {
  deptName: string;
  installation: string;
  members: number;
  headOfDept: string;
  assistantHeadOfDept: string;
}

const COLORS = {
  finance: "#4C168D", // green
  people: "#7035BA", // blue
  operation: "#88769F", // yellow
  improvement: "#442B62", // red
};

const CentralsDetails: React.FC<CentralsDetailsProps> = ({
  deptName,
  installation,
  members,
  headOfDept,
  assistantHeadOfDept,
}) => {
  return (
    <div>
      <div>
        <article className="max-w-md mx-auto p-6 text-[#3A2D4A]">
          <dl className="space-y-4">
            <div>
              <dt className="text-xl font-bold mb-1">Department Name</dt>
              <dd className="text-base font-medium text-gray-700">
                {deptName}
              </dd>
            </div>

            <div>
              <dt className="text-xl font-bold mb-1">Installation</dt>
              <dd className="text-base font-medium text-gray-700">
                {installation}
              </dd>
            </div>
            <div>
              <dt className="text-xl font-bold mb-1">Members</dt>
              <dd className="text-base font-medium text-gray-700">{members}</dd>
            </div>
            <div>
              <dt className="text-xl font-bold mb-1">Head of Department</dt>
              <dd className="text-base font-medium text-gray-700">
                {headOfDept}
              </dd>
            </div>
            <div>
              <dt className="text-xl font-bold mb-1">
                Assistant Head of Department
              </dt>
              <dd className="text-base font-medium text-gray-700">
                {assistantHeadOfDept}
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="p-6 flex justify-between">
        <div>
          <h1 className="font-bold text-[#3A2D4A]"> KPI Summary</h1>
          <CustomPieChart data={departmentKPI} />
        </div>

        <div className="mt-14 gap-3 flex flex-col">
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
      </div>
    </div>
  );
};

export default CentralsDetails;
