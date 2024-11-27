import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const peopleKpiData = {
  labels: ["Growth", "Retention", "Life Class", "Leadership"],
  datasets: [
    {
      label: "KPI for People",
      data: [80, 75, 70, 90],  
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

const PeopleKPIChart = () => {
  return (
    <div>
      <h3>Average KPI for People</h3>
      <Radar data={peopleKpiData} options={options} />
    </div>
  );
};

export default PeopleKPIChart;
