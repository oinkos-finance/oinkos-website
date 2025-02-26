import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  data: ChartData<"bar", number[], unknown>;
}

export default function BarChart({ data }: Props) {
  return (
    <>
      {data ? (
        <Bar
          height={360}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  color: "black",
                  font: {
                    size: 16,
                  },
                  padding: 20,
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
        <h3 className="text-black">Carregando</h3>
      )}
    </>
  );
}
