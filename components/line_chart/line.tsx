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
  ChartData,
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

interface Props {
  data: ChartData<"line", number[], unknown>;
}

export default function LineChart({ data }: Props) {
  const options = {
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
  };

  return (
    <>
      {data ? (
        <Line height={360} options={options} data={data} />
      ) : (
        "Carregando"
      )}
    </>
  );
}
