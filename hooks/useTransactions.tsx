import { infiniteFindAll } from "@/services/CommonTransactionsService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useTransactions = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState(7);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["allTransactions", period],
    queryFn: ({ pageParam = 0, queryKey }) => {
      const [, period] = queryKey;
      return infiniteFindAll({ pageParam }, period);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  let transactions = [] 
  data?.pages.forEach(({ data }) => data.forEach( t  => transactions.push(t)))
  let recurringTransactionsNumber = transactions.filter(transaction => transaction.transactionType == "recurring").length
  let uniqueTransactionsNumber = transactions.length - recurringTransactionsNumber

  return {
    recurringTransactionsNumber,
    uniqueTransactionsNumber,
    transactions,
    fetchNextPage,
    hasNextPage,
    setPeriod,
    openModal,
    closeModal,
    isModalOpen
  };
};
