import { generateBarChartData, generateLineChartData, generatePieChartData } from "@/services/ChartsService"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const useTransactionReport = () => {
  
  const [period, setPeriod] = useState(1)
  
  const { data: pieChartData } = useQuery({
    queryKey: ['getPieChartData', period],
    queryFn: () => generatePieChartData(period),
  })
  
  const { data: barChartData } = useQuery({
    queryKey: ['getBarChartData', period],
    queryFn: () => generateBarChartData(period),
  })
  
  const { data: lineChartData } = useQuery({
    queryKey: ['getLineChartData', period],
    queryFn: () => generateLineChartData(period),
  })

  return {
    period,
    setPeriod,
    pieChartData,
    lineChartData,
    barChartData,
  }
}
