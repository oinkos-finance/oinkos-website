import { getCategories, paginatedFindAll } from "@/services/CommonTransactionsService";
import { PeriodConstants } from "@/util/Constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  queryName: string;
  onlyInclude: string | null;
}

export const useTransactionsPagination = ({queryName, onlyInclude}: Props) => {

    const [initialData, setInitialData] = useState(Date.now())
    const [period, setPeriod] = useState(PeriodConstants.ONE_MONTH);
    const [page, setPage] = useState(0);

    const incrementPage = () => {
      setPage(prev => prev + 1)
    }

    const decrementPage = () => {
      setPage(prev => prev - 1)
    }

    const { data } = useQuery({
      queryKey: [queryName, period, page, initialData],
      queryFn: () => paginatedFindAll({ period, page, initialData, onlyInclude})
    });
    
    const { data: categories } = useQuery({
      queryKey: ["getCategories"],
      queryFn: getCategories
    })

    return {
      transactions: data?.transactions,
      recurringTransactionsNumber: data?.recurringTransactionsNumber | 0,
      uniqueTransactionsNumber: data?.uniqueTransactionsNumber | 0,
      totalSum: data?.total,
      startingDate: data?.startingDate, 
      endingDate: data?.endingDate,
      period,
      setPeriod,
      incrementPage,
      decrementPage,
      page,
      setInitialData,
      initialData,
      categories
    }
}