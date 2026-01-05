import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardChart = ({ projects, tasks }) => {
  const data = {
    labels: ["Projects", "Tasks"],
    datasets: [{
      label: '# of Items',
      data: [projects.length, tasks.length],
      backgroundColor: ['#f39ecdff','#7dd3fc '],
      borderColor: ['#f39ecdff','#7dd3fc '],
      borderWidth: 1,
    }]
  };

  return <div style={{maxWidth:'400px', margin:'auto'}}><Pie data={data} /></div>;
};

export default DashboardChart;
