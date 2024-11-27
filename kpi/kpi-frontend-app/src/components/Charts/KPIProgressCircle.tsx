import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface KPIProgressProps {
  score: number;
  label: string;
}

const KPIProgressCircle: React.FC<KPIProgressProps> = ({ score, label }) => {
  let progressColor = "#FF0000";
  if (score >= 80) {
    progressColor = "#4CAF50";
  } else if (score >= 60) {
    progressColor = "#FFEB3B";
  }

  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [progressColor, "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "80%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-40 h-40">
      <div className="absolute z-10 text-center">
        <h3 className="text-lg font-medium text-gray-700">{label}</h3>
        <h1 className="text-3xl font-bold">{score}</h1>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default KPIProgressCircle;
