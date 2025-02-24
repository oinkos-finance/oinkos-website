"use server"

import { PeriodConstants } from "@/util/Constants";
import { findAll } from "./CommonTransactionsService";
import {
  Transaction,
  RecurringTransaction,
  UniqueTransaction,
} from "@/types/Transactions";

const colors = [
  "#7CA9AD",
  "#51ABB4",
  "#F29A7A",
  "#E4B45B",
  "#E4575B",
  "#91245B",
  "#A3C4BC",
  "#D6A2AD",
  "#F7D08A",
  "#FF9770",
  "#6A0572",
  "#A1C181",
  "#B8BEDD",
  "#FFD6E0",
  "#C9ADA7",
];

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[] | string;
}

interface TransactionsByWeek {
  week: Date;
  transactions: Transaction[]
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const oneDay = 24 * 60 * 60;
const oneMonth = 31 * 24 * 60 * 60;
const now = Math.floor(Date.now() / 1000);

const generateAgroupedTransactionsByWeek = (startingDate, endingDate, transactions) => {
  
  // processar em semanas
  const weeks: TransactionsByWeek[] = [];
  while (startingDate <= endingDate) {
    weeks.push({
      week: new Date(startingDate * 1000),
      transactions: []
    });
    startingDate += 7 * oneDay;
  }

  const sortedTransactions = sortTransactionsByStartingDate(transactions);

  // agrupa as transações pelas semanas
  sortedTransactions.forEach((transaction) => {
    let lastWeek = 0;
    const transactionDate = new Date(transaction.transactionDate);

    for (let i = lastWeek; i < weeks.length; i++) {
      const weekStart = new Date(weeks[i].week);
      const nextWeekStart = new Date(weeks[i + 1]?.week || endingDate * 1000); // Próxima semana ou endingDate

      if (transactionDate >= weekStart && transactionDate < nextWeekStart) {
        weeks[i].transactions.push(transaction)
        lastWeek = i;
        break;
      }
    }
  });

  return weeks
}

const sortTransactionsByStartingDate = (transactions) => transactions.sort(
  (a, b) => new Date(a.startingDate) - new Date(b.startingDate)
);

export const findAllByPeriod = async (period: number) => {

  let startingDate;
  let endingDate;
  const fixedEndingDate = now;
  let transactions = []

  if (period == PeriodConstants.ONE_WEEK) {
    endingDate = now;
    startingDate = now - 7 * oneDay;

    transactions = await findAll({
      onlyInclude: null,
      endingDate,
      startingDate,
    });  
  }

  if (period == PeriodConstants.ONE_MONTH) {

    endingDate = now;
    startingDate = now - oneMonth;

    // sempre começo do primeiro dia do mês
    const days = new Date(startingDate * 1000).getDate();
    startingDate -= (days - 1) * oneDay;

    transactions = await findAll({
      onlyInclude: null,
      endingDate,
      startingDate,
    });  
  }

  if (period == PeriodConstants.THREE_MONTHS) {

    endingDate = now;
  
    for(let i = 0; i<3; i++) {
      startingDate = endingDate - oneMonth;

      if(i == 2) {
        // sempre começo do primeiro dia do mês
        const days = new Date(startingDate * 1000).getDate();
        startingDate -= (days - 1) * oneDay;  
      }

      const data = await findAll({
        onlyInclude: null,
        endingDate,
        startingDate,
      });  

      transactions.push(...data)
      endingDate = startingDate
    }
  }
  
  return {
    transactions,
    startingDate,
    endingDate: fixedEndingDate,
  }
};

export const generateBarChartData = async (period: number): Promise<ChartData> => {

  const { transactions, startingDate, endingDate } = await findAllByPeriod(period)
  const weeks = generateAgroupedTransactionsByWeek(startingDate, endingDate, transactions)

  const weekLabels: string[] = []
  const recurringSumData: number[] = []
  const uniqueSumData: number[] = []

  weeks?.forEach(({ week, transactions }) => {

    weekLabels.push(week.toLocaleDateString())
    const recurringTransactions = transactions.filter(transaction => transaction.transactionType == "recurring")
    const uniqueTransactions = transactions.filter(transaction => transaction.transactionType == "unique")

    const recurringTransactionsSum = recurringTransactions
      .reduce(
      (acc, transaction: Transaction) => acc + transaction.value, 0
    )

    const uniqueTransactionsSum = uniqueTransactions
      .reduce(
      (acc, transaction: Transaction) => acc + transaction.value, 0
    )

    recurringSumData.push(recurringTransactionsSum)
    uniqueSumData.push(uniqueTransactionsSum)
  })

  const data: ChartData = {
    labels: weekLabels,
    datasets: [
      {
        label: "Gasto Fixo",
        data: recurringSumData,
        backgroundColor: colors[2],
      },
      {
        label: "Gasto Variável",
        data: uniqueSumData,
        backgroundColor: colors[3],
      }
    ]
  };

  return data;
};

export const generatePieChartData = async (period: number): Promise<ChartData> => {

  const { transactions } = await findAllByPeriod(period)
  const categories = new Map();

  transactions.forEach(({ category, value }) => {
    if (categories.has(category)) {
      const res = categories.get(category) + value;
      categories.set(category, res);
    } else categories.set(category, value);
  });

  const data: ChartData = {
    labels: Array.from(categories.keys()),
    datasets: [
      {
        label: "Categorias",
        data: Array.from(categories.values()),
        backgroundColor: colors.slice(0, categories.size),
      },
    ],
  };

  return data;
}; 

export const generateLineChartData = async (period: number): Promise<ChartData> => {

  const { transactions, startingDate, endingDate } = await findAllByPeriod(period)
  const weeks = generateAgroupedTransactionsByWeek(startingDate, endingDate, transactions)

  const weekLabels: string[] = []
  const totalSum: number[] = []

  weeks?.forEach(({ week, transactions }) => {

    weekLabels.push(week.toLocaleDateString())
   
    const sum = transactions
      .reduce(
      (acc, transaction: Transaction) => acc + transaction.value, 0
    )

    totalSum.push(sum)
  })

  const data: ChartData = {
    labels: weekLabels,
    datasets: [
      {
        label: "Gasto Total",
        data: totalSum,
        backgroundColor: colors[Math.floor(Math.random() * 6)],
      }
    ]
  };

  return data;
};
