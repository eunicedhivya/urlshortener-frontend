import { Link } from "react-router-dom";
import { number_format } from "../helper/helper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 10,
      right: 25,
      top: 25,
      bottom: 0,
    },
    height: 500,
  },

  legend: {
    display: false,
  },
  tooltips: {
    titleMarginBottom: 10,
    titleFontColor: "#6e707e",
    titleFontSize: 14,
    backgroundColor: "rgb(255,255,255)",
    bodyFontColor: "#858796",
    borderColor: "#dddfeb",
    borderWidth: 1,
    xPadding: 15,
    yPadding: 15,
    displayColors: false,
    caretPadding: 10,
    callbacks: {
      label: function (tooltipItem, chart) {
        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || "";
        return datasetLabel + ": $" + number_format(tooltipItem.yLabel);
      },
    },
  },
};

function BarChart({ charttitle, datapoints, datalabel }) {
  console.log("dataLabels", datapoints);
  console.log("dataPoints", datalabel);
  const data = {
    labels: datalabel,
    datasets: [
      {
        label: charttitle,
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: datapoints,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default BarChart;
