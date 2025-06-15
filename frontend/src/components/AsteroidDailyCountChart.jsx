import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AsteroidDailyCountChart = ({ asteroidData }) => {
  const chartData = {
    labels: asteroidData.map((data) => data.date),
    datasets: [
      {
        label: "Number of Asteroids",
        data: asteroidData.map((data) => data.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ccc",
        },
      },
      title: {
        display: true,
        text: "Asteroid Count Per Day",
        color: "#eee",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ccc",
        },
        grid: {
          color: "rgba(204, 204, 204, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#ccc",
          beginAtZero: true,
        },
        grid: {
          color: "rgba(204, 204, 204, 0.1)",
        },
      },
    },
  };

  return (
    <div
      className="bg-[#181929] border border-[#23244a] rounded-xl shadow p-4 mb-4"
      style={{ height: "400px" }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AsteroidDailyCountChart;
