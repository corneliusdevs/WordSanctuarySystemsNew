"use strict"
import React from "react";
import { mockData } from "./charts/mockData/KPIData";
import CustomPieChart from "./charts/CustomPieChart";
import { departmentKPI } from "./mock-data/departments";

interface DepartmentCardProps {
  department: string;
  numberOfMembers: number;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  numberOfMembers,
}) => {
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
        </article>
      </div>

      <div>
        <CustomPieChart data={departmentKPI}/>
      </div>
    </div>
  );
};

export default DepartmentCard;
