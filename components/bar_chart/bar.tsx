import { Bar } from "react-chartjs-2"

import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

interface Props {
    data: ChartData<"bar", number[], unknown>
}

export default function BarChart({ data }: Props) {

    const options = {}

    return (
        <Bar options={options} data={data}/>
    )   
}
