"use client";

// import { useState } from "react";
// Correct import for Heroicons v2
import {
  // Bars2Icon,
  Bars2Icon,
  UserIcon,

  UserGroupIcon,
   
  BuildingOffice2Icon,
  StarIcon,
  ChatBubbleLeftIcon,
 
  CogIcon,
  UserCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
// import { Bars2Icon } from "@heroicons/react/24/outline";
interface SidebarProps {
  onMenuSelect: (menu: string) => void;
}

const Sidebar = ({ onMenuSelect }: SidebarProps) => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`bg-blue-800 text-white h-screen transition-all duration-300 hidden md:flex flex-col justify-between`}
    >
      <div className="p-4">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <ul className="mt-8 space-y-4">
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("dashboard")}
          >
            <Bars2Icon className="h-5 w-5" />
            <a>Dashboard</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("users")}
          >
            <UserIcon className="h-5 w-5" />
            <a>Users Manager</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("members")}
          >
            <UserGroupIcon className="h-5 w-5" />
            <a>Members Manager</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("departments")}
          >
            <BuildingOffice2Icon className="h-5 w-5" />
            <a>Department Manager</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("appraisals")}
          >
            <StarIcon className="h-5 w-5" />
            <a>Appraisals</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("messaging")}
          >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <a>Messaging</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("settings")}
          >
            <CogIcon className="h-5 w-5" />
            <a>Settings</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("roles")}
          >
            <UserCircleIcon className="h-5 w-5" />
            <a>Roles</a>
          </li>
          <li
            className="hover:bg-blue-700 px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            onClick={() => onMenuSelect("permissions")}
          >
            <LockClosedIcon className="h-5 w-5" />
            <a>Permissions</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
