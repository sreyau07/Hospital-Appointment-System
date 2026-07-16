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

function AdminCharts({ appointments }) {
  const pending = appointments.filter(
    (a) => a.status === "Pending"
  ).length;

  const approved = appointments.filter(
    (a) => a.status === "Approved"
  ).length;

  const completed = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  const rejected = appointments.filter(
    (a) => a.status === "Rejected"
  ).length;

  const data = {
    labels: ["Pending", "Approved", "Completed", "Rejected"],
    datasets: [
      {
        label: "Appointments",
        data: [pending, approved, completed, rejected],
        backgroundColor: [
          "#ffc107",
          "#198754",
          "#0d6efd",
          "#dc3545",
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="card shadow border-0 p-4">
      <h3 className="text-center mb-4">
        📊 Appointment Statistics
      </h3>

      <Bar data={data} options={options} />
    </div>
  );
}

export default AdminCharts;