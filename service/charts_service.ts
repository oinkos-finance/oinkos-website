interface RecurringTransaction {
  title: string;
  value: number;
  category: string;
  startDate: string;
  endDate: string;
}

interface UniqueTransaction {
  title: string;
  value: number;
  category: string;
  date: string;
}

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[] | string;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

type Transaction = RecurringTransaction | UniqueTransaction;

const transactions: Transaction[] = [
  { title: "", value: 100, category: "academia", startDate: "10/01/2025", endDate: "10/05/2025" },
  { title: "", value: 800, category: "aluguel", startDate: "10/01/2025", endDate: "10/05/2025" },
  { title: "", value: 100, category: "roupas", date: "10/01/2025" },
  { title: "", value: 110, category: "farmácia", date: "10/01/2025" },
  { title: "", value: 30, category: "outros", date: "10/01/2025" },
  { title: "", value: 500, category: "mercado", date: "10/01/2025" },
];

const findAllRecurringTransactions = (): RecurringTransaction[] => {
  return transactions.filter(
    (transaction): transaction is RecurringTransaction =>
      "startDate" in transaction && "endDate" in transaction
  );
};

const findAllUniqueTransactions = (): UniqueTransaction[] => {
  return transactions.filter(
    (transaction): transaction is UniqueTransaction => "date" in transaction
  );
}; 

const colors = [
  "#7CA9AD", "#51ABB4", "#F29A7A", "#E4B45B", "#E4575B", "#91245B",  
  "#A3C4BC", "#D6A2AD", "#F7D08A", "#FF9770", "#6A0572", "#A1C181",  
  "#B8BEDD", "#FFD6E0", "#C9ADA7"
];

const generateDonutChartData = async (): Promise<ChartData> => {
  // const data = await getTransactionsAccordingToPeriod(period)

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

const generateBarChartData = async (): Promise<ChartData> => {
  // const data = await getTransactionsAccordingToPeriod(period)

  const recurringTransactions = findAllRecurringTransactions();
  const uniqueTransaction = findAllUniqueTransactions();

  // 3 meses = 12 semanas  
  // 1 mes = 4 semanas
  // 1 semana 
  let period = ["Janeiro", "Fevereiro", "Março"]
  //const recurringTransactions.map(())

  const recurringSumData: number[] = []
  const uniqueSumData: number[] = []

  period.forEach(() => {

    const recurringTransactionsSum = recurringTransactions
      //.filter((transaction: RecurringTransaction) => transaction.endDate < value)
      .reduce(
      (acc, transaction: RecurringTransaction) => acc + transaction.value, 0
    )

    const uniqueTransactionsSum = uniqueTransaction
      //.filter((transaction: RecurringTransaction) => transaction.endDate < value)
      .reduce(
      (acc, transaction: UniqueTransaction) => acc + transaction.value, 0
    )

    recurringSumData.push(recurringTransactionsSum)
    uniqueSumData.push(uniqueTransactionsSum)
  })

  const data: ChartData = {
    labels: period,
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

const genereteLineChartData = async (): Promise<ChartData> => {
  // const data = await getTransactionsAccordingToPeriod(period)

  let period = ["Janeiro", "Fevereiro", "Março"]
  let saldo = 2000;

  const transactionsSumData: number[] = []
  const savingData: number[] = []

  period.forEach(() => {

    const transactionsSum = transactions
      //.filter((transaction: RecurringTransaction) => transaction.endDate < value)
      .reduce(
      (acc, transaction: Transaction) => acc + transaction.value, 0
    )

    const saving = saldo - transactionsSum
    transactionsSumData.push(transactionsSum)
    savingData.push(saving > 0 ? saving : 0)
  })

  const data: ChartData = {
    labels: period,
    datasets: [
      {
        label: "Gasto Total",
        data: transactionsSumData,
        backgroundColor: colors[5],
      },
      {
        label: "Economia",
        data: savingData,
        backgroundColor: colors[1],
      }
    ]
  };

  return data;
};

export const lineChartData = await genereteLineChartData();
export const barChartData = await generateBarChartData();
export const pieChartData = await generateDonutChartData();
