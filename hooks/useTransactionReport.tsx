import { generateBarChartData, generateLineChartData, generatePieChartData } from "@/services/ChartsService"
import { useQuery } from "@tanstack/react-query"
import { useTransactionsPagination } from "./useTransactionsPagination"

export const useTransactionReport = () => {
    
  const { 
    transactions, 
    incrementPage, 
    decrementPage, 
    startingDate, 
    endingDate, 
    setPeriod, 
    period, 
    page, 
    initialData, 
    setInitialData, 
    totalSum,
  } = useTransactionsPagination({ queryName: "allTransactions", onlyInclude: null})

  const { data: pieChartData } = useQuery({
    queryKey: ['getPieChartData', period, initialData, page, transactions],
    queryFn: () => generatePieChartData(transactions),
  })
  
  const { data: barChartData } = useQuery({
    queryKey: ['getBarChartData', period, initialData, page, transactions, startingDate, endingDate],
    queryFn: () => generateBarChartData({ transactions, startingDate, endingDate }),
  })
  
  const { data: lineChartData } = useQuery({
    queryKey: ['getLineChartData', period, initialData, page, transactions, startingDate, endingDate],
    queryFn: () => generateLineChartData({ transactions, startingDate, endingDate }),
  }) 

  return {
    period,
    page,
    initialData,
    incrementPage,
    decrementPage,
    setInitialData,
    setPeriod,
    startingDate, 
    endingDate,
    pieChartData,
    lineChartData,
    barChartData,
    totalSum,
  }
}
