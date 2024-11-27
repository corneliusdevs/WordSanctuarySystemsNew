"use client";

import { useState, useEffect } from "react";
import KPIScores from "./Charts/KPIScores";

interface ContentProps {
  selectedMenu: string;
}

const Content = ({ selectedMenu }: ContentProps) => {
 
  const [content, setContent] = useState<JSX.Element | string>("");

  useEffect(() => {
    switch (selectedMenu) {
      case "dashboard":
        setContent(<KPIScores />);  
        break;
      case "users":
        setContent("Users Manager content here");
        break;
      case "members":
        setContent("Members Manager content here");
        break;
      case "departments":
        setContent("Department Manager content here");
        break;
      case "appraisals":
        setContent("Appraisals content here");
        break;
      case "messaging":
        setContent("Messaging content here");
        break;
      case "settings":
        setContent("Settings content here");
        break;
      case "roles":
        setContent("Roles content here");
        break;
      case "permissions":
        setContent("Permissions content here");
        break;
      default:
        setContent("Select a menu item to view content");
    }
  }, [selectedMenu]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{content}</h2>
      <p className="text-gray-600">
        Details for the selected menu will be shown here.
      </p>
    </div>
  );
};

export default Content;
