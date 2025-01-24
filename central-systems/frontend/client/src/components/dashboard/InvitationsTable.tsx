import { InvitationsTable } from "@/types/general";
import React from "react";

interface InvitationsTableProps {
  invitations: InvitationsTable[];
}

const InvitationsTable: React.FC<InvitationsTableProps> = ({ invitations }) => {
  return (
    <div className="">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Position
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {invitations.map((invitation, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {invitation.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {invitation.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {invitation.position}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-flex w-20 justify-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-[#3A2D4A]`}
                >
                  {invitation.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvitationsTable;
