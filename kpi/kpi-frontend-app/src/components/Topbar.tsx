"use client";

import { HiBell, HiMail } from "react-icons/hi";
import Image from "next/image";

interface TopbarProps {
  onDropdownToggle: () => void;
  isDropdownOpen: boolean;
}

const Topbar = ({ onDropdownToggle, isDropdownOpen }: TopbarProps) => {
  return (
    <div className="bg-white flex justify-between items-center p-4 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-semibold text-gray-800">KPI Dashboard</div>
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <HiBell />
        <HiMail />
        <div className="relative">
          <button
            onClick={onDropdownToggle}
            className="flex items-center space-x-2 text-gray-800"
          >
            <span>John Doe</span>

            <Image
              src="https://via.placeholder.com/40"
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
              <ul>
                <li className="px-4 py-2 text-sm hover:bg-gray-100">
                  <a href="#">Profile</a>
                </li>
                <li className="px-4 py-2 text-sm hover:bg-gray-100">
                  <a href="#">Settings</a>
                </li>
                <li className="px-4 py-2 text-sm hover:bg-gray-100">
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
