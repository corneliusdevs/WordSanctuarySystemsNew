import React from "react";
import { KPICardProps } from "../../types/general";
import CustomPieChart from "./charts/CustomPieChart";
import LoadingState from "../../helpers/LoadingState";
import ErrorState from "../../helpers/ErrorState";
import Link from "next/link";

const COLORS = {
  finance: "#4C168D", // green
  people: "#7035BA", // blue
  operation: "#88769F", // yellow
  improvement: "#442B62", // red
};

const KPICard: React.FC<KPICardProps> = ({
  data,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return (
      <article className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <LoadingState />
      </article>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <article className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <ErrorState message={error || "Failed to load KPI data"} />
      </article>
    );
  }

  return (
    <div className="">
      <div className="w-auto mt-20">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold text-purple-900 pl-5">
            KPI Overview
          </h2>
        </header>
        <article className=" flex ">
          {data.map((item, index) => (
            <div key={index} className="w-fit">
              <h3 className="text-lg font-semibold pl-5">{item.location}</h3>
              <CustomPieChart data={item} />
            </div>
          ))}
        </article>
      </div>

      <div className="grid grid-cols-3 gap-2 px-5">
        <div className="flex items-center">
          <span
            className="w-5 h-5 rounded-lg mr-2"
            style={{ backgroundColor: COLORS.finance }}
          ></span>
          <span className="text-sm">Finance </span>
        </div>
        <div className="flex items-center">
          <span
            className="w-5 h-5 rounded-lg mr-2"
            style={{ backgroundColor: COLORS.people }}
          ></span>
          <span className="text-sm">People </span>
        </div>
        <div className="flex items-center">
          <span
            className="w-5 h-5 rounded-lg mr-2"
            style={{ backgroundColor: COLORS.operation }}
          ></span>
          <span className="text-sm">Operation </span>
        </div>
        <div className="flex items-center">
          <span
            className="w-5 h-5 rounded-lg mr-2"
            style={{ backgroundColor: COLORS.improvement }}
          ></span>
          <span className="text-sm">Improvement </span>
        </div>
        <Link href='/dashboard/kpiprogress'>
        <button className="border w-20 h-10 ml-32 shadow-lg rounded-2xl">
          more
        </button>
        </Link>
      </div>
    </div>
  );
};

export default KPICard;
