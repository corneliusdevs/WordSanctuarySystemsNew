import { navigate } from "@/app/actions";
import { CentralsTableDetails } from "@/types/general";
import React from "react";

interface CentralsTableProps {
  centrals: CentralsTableDetails[];
  // onView: (member: Member) => void;
}

const handleView = (request) => {
  navigate(`/dashboard/onboard/centrals/centrals-details-table?id=${request.id}`);
};

const CentralsTable: React.FC<CentralsTableProps> = ({ centrals }) => {
  return (
    <div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Department Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Number of Department
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {centrals.map((central, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {central.departmentType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {central.numberOfDepartments}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
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

export default CentralsTable;
