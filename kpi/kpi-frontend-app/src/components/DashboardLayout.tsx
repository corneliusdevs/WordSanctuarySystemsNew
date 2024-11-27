"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Content from "@/components/Content";

const DashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex">
      <div className="w-1/7">
        <Sidebar onMenuSelect={handleMenuSelect} />
      </div>

      <div className="flex-1 bg-gray-100 w-4/7">
        <Topbar
          onDropdownToggle={handleDropdownToggle}
          isDropdownOpen={isDropdownOpen}
        />
        <Content selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default DashboardLayout;
