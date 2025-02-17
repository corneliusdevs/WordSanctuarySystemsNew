'use client'
import React from 'react'
import { Member } from '@/types/general';
import { navigate } from '@/app/actions';



interface IndividualsTableProps {
    individuals: Member[];
    // onView: (member: Member) => void;
  }

  const handleView = (request) => {
    navigate(`/dashboard/onboard/individual/individual-details?id=${request.id}`);
  };

const IndividualsTable: React.FC<IndividualsTableProps> = ({ individuals }) => {
  return (
    <div>
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Installment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Position
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {individuals.map((member, index) => (
            <tr 
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {member.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {member.installment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {member.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => handleView(member)}
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
  )
}

export default IndividualsTable