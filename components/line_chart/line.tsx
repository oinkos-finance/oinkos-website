import { Line } from "react-chartjs-2"
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
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

interface Props {
    data: ChartData<"line", number[], unknown>
}

export default function LineChart({ data }: Props) {

    const options = {}

    return (
        <Line options={options} data={data}/>
    )   
}