import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({
  data,
}: {
  data?: ChartData<"pie", number[], unknown>;
}) {
  return (
    <>
      {data?.datasets[0]?.data.length ? (
        <Pie
          height={360}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "left",
                labels: {
                  color: "black",
                  font: {
                    size: 16,
                  },
                  padding: 32,
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
          data={data}
        />
      ) : (
        "Carregando"
      )}
    </>
  );
}
