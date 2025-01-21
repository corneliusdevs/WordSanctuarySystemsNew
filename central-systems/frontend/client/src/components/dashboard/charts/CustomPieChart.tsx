import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { KPIData } from "../../../types/general";

const COLORS = {
  finance: "#4C168D",
  people: "#7035BA",
  operation: "#88769F",
  improvement: "#442B62",
};

// Custom label renderer
// const renderCustomLabel = ({ percent }: { percent: number }) => {
//   return `${(percent * 100).toFixed(0)}%`;
// };

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) + 10; // Position the label closer
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="10px" // Reduce label font size
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart: React.FC<{ data: KPIData }> = ({ data }) => {
  const chartData = [
    { name: "Finance", value: data.finance },
    { name: "People", value: data.people },
    { name: "Operation", value: data.operation },
    { name: "Improvement", value: data.improvement },
  ];

  return (
    <div className="w-48 h-60">
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            cx="45%"
            cy="45%"
            labelLine={false}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={renderLabel} // Apply the custom label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
