import React from "react";
import KPIProgressCircle from "./KPIProgressCircle";
import KPIChart from "./KPIChart";
import DateRangeSwitch from "./DateRangeSwitch";

const KPIScores = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* KPI Circles Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="flex flex-col items-center justify-center">
          <KPIProgressCircle score={85} label="People KPI" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <KPIProgressCircle score={72} label="Department KPI" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <KPIProgressCircle score={93} label="Installation KPI" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <KPIProgressCircle score={96} label="Highest KPI" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <KPIProgressCircle score={10} label="Lowest KPI" />
        </div>
      </div>

      {/* KPI Growth Section */}
      <div className="mt-8">
        <DateRangeSwitch />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <KPIChart
            title="People KPI Growth"
            data={[10, 20, 30, 40, 50, 60, 70]}
          />
          <KPIChart
            title="Department KPI Growth"
            data={[15, 25, 35, 45, 55, 65, 75]}
          />
        </div>
      </div>
    </div>
  );
};

export default KPIScores;
