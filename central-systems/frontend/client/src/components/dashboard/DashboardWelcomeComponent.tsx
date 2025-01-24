import React from "react";
import { FC } from "react";
import { UserData } from "../../types/general";

const DashboardWelcomeComponent: FC<UserData> = ({ username, title }) => {
  return (
    <div className="absolute top-2 left-4 right-4 bg-white rounded-3xl p-4 z-5 mt-[100px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="font-bold text-2xl">Welcome,</span>
          <span className="text-xl">{username}</span>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <span className="text-wrap font-semibold text-center text-sm leading-none">
              Central <br /> Dashboard
            </span>
            {/* <span className="font-medium text-wrap">Dashboard</span> */}
          </div>
          <button
            aria-label="Search"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcomeComponent;
