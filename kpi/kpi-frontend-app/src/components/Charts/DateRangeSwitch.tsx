import React, { useState } from "react";

const DateRangeSwitch = () => {
  const [selectedRange, setSelectedRange] = useState<string>("Month");

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => handleRangeChange("Day")}
        className={`py-2 px-4 text-sm ${
          selectedRange === "Day" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Day
      </button>
      <button
        onClick={() => handleRangeChange("Week")}
        className={`py-2 px-4 text-sm ${
          selectedRange === "Week" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Week
      </button>
      <button
        onClick={() => handleRangeChange("Month")}
        className={`py-2 px-4 text-sm ${
          selectedRange === "Month" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Month
      </button>
      <button
        onClick={() => handleRangeChange("Year")}
        className={`py-2 px-4 text-sm ${
          selectedRange === "Year" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Year
      </button>
    </div>
  );
};

export default DateRangeSwitch;
