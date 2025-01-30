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

    const options = {}

    return (
      <Pie options={options} data={data}/>
    )   
}