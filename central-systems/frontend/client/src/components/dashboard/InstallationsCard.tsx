
// import { navigate } from "@/app/actions";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation"; // Next.js router for navigation



interface Installation {
  country: string;
  details: {
    cities: {
      city: string;
      headOfInstallation: string;
      leadPastor: string;
      assistantPastor: string;
      departments: number;
      members: number;
    }[];
  };
}

interface InstallationSelectorProps {
  installations: Installation[];
}

const InstallationsCard: React.FC<InstallationSelectorProps> = ({ installations }) => {

  const router = useRouter(); // Next.js navigation

  const handleView = (country: string, city: string) => {
    if (city) {
      router.push(`/dashboard/onboard/installation/installation-details/${country}/${city}`);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md px-5">
      <form className="grid gap-4">
        {installations.map((installation) => (
          <div key={installation.country} className="relative">
            <label htmlFor={`country-select-${installation.country}`} className="sr-only">
              Select {installation.country}
            </label>
            <select
              id={`country-select-${installation.country}`}
              name={`country-${installation.country}`}
              className="w-full h-12 text-lg appearance-none rounded-xl border shadow-xl mt-5 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => handleView(installation.country, event.target.value)}
            >
              <option value="">Select a city in {installation.country}</option>
              {installation.details.cities.map((cityObj) => (
                <option key={cityObj.city} value={cityObj.city}>
                  {cityObj.city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 mt-2 flex items-center px-2 text-gray-700">
              <IoMdArrowDropdown className="h-8 w-12" />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default InstallationsCard;
