"use server";

import { PeriodConstants } from "@/util/Constants";
import getCookies from "../server/cookies/getCookies";
import { Transaction } from "@/types/Transactions";

interface PaginatedFindAllParams { 
  initialData: string | number | Date;
  period: number;
  page: number; 
  onlyInclude: string | null;
}

export interface PaginatedFindAllResponse {
  transactions: Transaction[];
  total: number;
  recurringTransactionsNumber: number;
  uniqueTransactionsNumber: number;
  startingDate: Date | string | number | null;
  endingDate: Date | string | number | null;
}

export const paginatedFindAll = async ({ initialData, period, page, onlyInclude }: PaginatedFindAllParams): Promise<PaginatedFindAllResponse> => {
  
  let fixedStartingDate: Date | string | number | null = null;
  let fixedEndingDate: Date | string | number | null = null
  let data

  if(period == PeriodConstants.ONE_MONTH) {
    const interval = 1
    const now = new Date(initialData)
    const totalMonths = now.getMonth() - interval * page;
    const newYear = now.getFullYear() + Math.floor(totalMonths / 12);
    const newMonth = (totalMonths % 12 + 12) % 12; 

    const ending = new Date(now);
    ending.setFullYear(newYear);
    ending.setMonth(newMonth);
    
    const starting = new Date(ending);
    starting.setMonth(starting.getMonth() - 1);

    data = await findAll({
      onlyInclude: onlyInclude,
      startingDate: Math.floor(Number(new Date(starting)) / 1000),
      endingDate: Math.floor(Number(new Date(ending)) / 1000),
    });

    fixedStartingDate = new Date(starting)
    fixedEndingDate = new Date(ending)
  }

  else if(period == PeriodConstants.THREE_MONTHS) {
    const interval = 3
    const now = new Date(initialData)
    const totalMonths = now.getMonth() - interval * page;
    const newYear = now.getFullYear() + Math.floor(totalMonths / 12);
    const newMonth = (totalMonths % 12 + 12) % 12; 

    const ending = new Date(now);
    ending.setFullYear(newYear);
    ending.setMonth(newMonth);
    
    const starting = new Date(ending);
    starting.setMonth(starting.getMonth() - interval);

    data = await findAll({
      onlyInclude: onlyInclude,
      startingDate: Math.floor(Number(new Date(starting)) / 1000),
      endingDate: Math.floor(Number(new Date(ending)) / 1000),
    });

    fixedStartingDate = new Date(starting)
    fixedEndingDate = new Date(ending)
  }

  // mais interessante usar o tempo em unix
  else if (period == PeriodConstants.ONE_WEEK) {

    const now = Math.floor(Number(new Date(initialData)) / 1000);
    const interval = 7 * 24 * 60 * 60;
    const endingDate = now - interval * page;
    const startingDate = endingDate - interval;

    data = await findAll({
      onlyInclude: onlyInclude,
      startingDate,
      endingDate,
    });

    fixedStartingDate = new Date(startingDate * 1000)
    fixedEndingDate = new Date(endingDate * 1000)
  }
  
  const recurringTransactionsNumber = data?.transactions.filter(transaction => transaction.transactionType == "recurring")?.length || 0
  const uniqueTransactionsNumber = data?.transactions?.length ? data?.transactions?.length - recurringTransactionsNumber : 0
  
  return {
    transactions: data?.transactions || [],
    total: data?.total || 0,
    recurringTransactionsNumber: recurringTransactionsNumber || 0,
    uniqueTransactionsNumber: uniqueTransactionsNumber || 0,
    startingDate: fixedStartingDate,
    endingDate: fixedEndingDate
  };
};

interface Params {
  onlyInclude: string | null;
  startingDate: string | number | null;
  endingDate: string | number | null;
}

interface ResponseFindAll {
  transactions: Transaction[];
  total: number;
}

export const findAll = async (params: Params): Promise<ResponseFindAll> => {
  try {
    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const url = new URL("https://api.oinkos.samnsc.com/transaction");

    if (params.onlyInclude)
      url.searchParams.append("onlyInclude", params.onlyInclude.toString());

    if (params.startingDate)
      url.searchParams.append("startingDate", params.startingDate.toString());

    if (params.endingDate)
      url.searchParams.append("endingDate", params.endingDate.toString());

    const response = await fetch(url.href, options);
    const { transactions, total } = await response.json();
    return { transactions, total };
    
  } catch (err) {
    console.error("Erro ao buscar lista de transações:", err);
    return { transactions: [], total: 0 }
  }
};

export const getCategories = async () => {
  try {
    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const url = new URL("https://api.oinkos.samnsc.com/category");
    const response = await fetch(url.href, options);
    const { categories } = await response.json();

    console.log(categories);

    return categories || null;
  } catch (err) {
    console.error("Erro ao buscar lista de transações:", err);
  }
};
