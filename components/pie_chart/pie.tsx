import { Pie } from "react-chartjs-2"
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   ChartData,
} from 'chart.js'

ChartJS.register(
   ArcElement,
   Tooltip,
   Legend,
)

interface Props {
   data: ChartData<"pie", number[], unknown>
}

export default function PieChart({ data }: Props) {

   const options = {
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
            pointStyle: "circle"
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false, 
    };
    

    return (
      <>
        { data ? (
          <Pie height={360} options={options} data={data}/>
        )
        : (
          "Carregando"
        )
        }
      </>
    )   
}