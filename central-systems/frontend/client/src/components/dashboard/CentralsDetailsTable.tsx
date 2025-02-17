"use client";
import { navigate } from "@/app/actions";
import { CentralsDeptDetails } from "@/types/general";
import React from "react";

interface CentralsDeptTableProps {
  centralsDetails: CentralsDeptDetails[];
  // onView: (member: Member) => void;
}

const handleView = (request) => {
  navigate(`/dashboard/onboard/centrals/centrals-details?id=${request.id}`);
};

const CentralsDetailsTable: React.FC<CentralsDeptTableProps> = ({
  centralsDetails,
}) => {
  return (
    <div className="px-6">
      <div className="mb-10">
        <h1 className="text-xl text-[#3A2D4A] ml-5 mt-5 font-bold">
          Department Type
        </h1>
        <p className="ml-5 text-gray-900">Department name</p>
      </div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Department Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Installation
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Members
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {centralsDetails.map((central, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {central.departmentName}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {central.installation}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {central.members}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => handleView(central)}
                  className="bg-[#3A2D4A] text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700 transition-colors duration-200"
                >
                  view
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CentralsDetailsTable;
