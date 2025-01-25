"use client"

import { navigate } from '@/app/actions';
import { AccessRequest } from '@/types/general';
import React from 'react'



interface AccessRequestProps {
    requests: AccessRequest[];
    // onView: (request: AccessRequest) => void;
  }
  
  const handleView = (request) => {
    navigate(`/dashboard/request-details?id=${request.id}`);
  };


const AccessRequestTable: React.FC<AccessRequestProps> = ({ requests }) => {
  return (
    <div className="">
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
          {requests.map((request, index) => (
            <tr 
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.installment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => handleView(request)}
                  className="bg-[#3A2D4A] text-white px-4 py-1 rounded-md text-sm hover:bg-purple-700 transition-colors duration-200"
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

export default AccessRequestTable