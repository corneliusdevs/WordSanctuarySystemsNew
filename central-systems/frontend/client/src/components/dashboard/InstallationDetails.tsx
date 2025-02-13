
'use client'

import React from "react";
// import { useParams } from "react-router-dom";
import { useParams } from "next/navigation";
import { installations } from "../dashboard/mock-data/installations"; // Import mock data

const InstallationDetails: React.FC = () => {
    const params = useParams(); // Get route parameters
    const country = params?.country as string;
    const city = params?.city as string;
  
    console.log("URL Params:", { country, city });
  
    const installation = installations.find((inst) => inst.country === country);
  
    if (!installation) {
      return <p className="text-center text-red-500">Country details not found!</p>;
    }
    const cityDetails = installation.details.cities.find((c) => c.city === city);
  
    if (!cityDetails) {
      return <p className="text-center text-red-500">City details not found!</p>;
    }
  
  const { headOfInstallation, leadPastor, assistantPastor, departments, members } = cityDetails;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl text-center font-bold text-[#3A2D4A] mt-5">
        {city}, {country}
      </h1>
      <dl className="space-y-4 mt-4">
        <div>
          <dt className="text-xl font-bold mb-1">Head of Installation</dt>
          <dd className="text-base font-medium text-gray-700">{headOfInstallation}</dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Lead Pastor</dt>
          <dd className="text-base font-medium text-gray-700">{leadPastor}</dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Assistant Pastor</dt>
          <dd className="text-base font-medium text-gray-700">{assistantPastor}</dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Departments</dt>
          <dd className="text-base font-medium text-gray-700">{departments}</dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Members</dt>
          <dd className="text-base text-gray-900">{members}</dd>
        </div>
      </dl>
    </div>
  );
};

export default InstallationDetails;
