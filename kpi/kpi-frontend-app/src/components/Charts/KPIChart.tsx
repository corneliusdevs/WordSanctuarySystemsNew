import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface KPIChartProps {
  title: string;
  data: number[];
}

const KPIChart = ({ title, data }: KPIChartProps) => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: title,
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full bg-white p-4 shadow-md rounded-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Line data={chartData} />
    </div>
  );
};

export default KPIChart;
