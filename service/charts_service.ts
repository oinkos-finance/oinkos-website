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
  backgroundColor: string[];
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

let colors = [
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

  let datasets: Dataset[]
  const recurringTransactions = findAllRecurringTransactions();
  const uniqueTransaction = findAllUniqueTransactions();

  // meses = 12 semanas  
  // 1 mes = 4 semanas
  // 1 semana 
  let period = ["Janeiro", "Fevereiro", "Março"]
  //const recurringTransactions.map(())

  period.forEach((value, i) => {

    let recurringTransactionsSum = recurringTransactions
      //.filter((transaction: RecurringTransaction) => transaction.endDate < value)
      .reduce(
      (acc, transaction: RecurringTransaction) => acc + transaction.value, 0
    )

    let uniqueTransactionsSum = uniqueTransaction
      //.filter((transaction: RecurringTransaction) => transaction.endDate < value)
      .reduce(
      (acc, transaction: UniqueTransaction) => acc + transaction.value, 0
    )

    let data: Dataset = {
      label: value,
      data: [recurringTransactionsSum, uniqueTransactionsSum],
      backgroundColor: colors.slice(i, i*2+1)
    }

    datasets.push(data)
  })


  const data: ChartData = {
    labels: ["Gastos Fixos", "Gastos Variáveis"],
    datasets: datasets,
  };

  return data;
};

export const lineChartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Steps",
      data: [1, 21, 4, 51, 100],
      borderColor: "rgb(0, 100, 100)",
    },
    {
      label: "Steps1",
      data: [1, 11, 100, 50, 90],
      borderColor: "#443332",
    },
  ],
};

export const barChartData = {
  labels: ["a", "b", "c", "d", "e"],
  datasets: [
    {
      label: "Expenses",
      data: [120, 200, 1020, 400, 200],
      backgroundColor: ["red", "blue", "yellow", "green"],
      borderColor: "black",
      borderWidth: 2,
    },
    {
      label: "Expenses",
      data: [120, 200, 1020, 400, 200],
      backgroundColor: ["red", "blue", "yellow", "green"],
      borderColor: "black",
      borderWidth: 2,
    },
  ],
};

export const pieChartData = await generateDonutChartData();

console.log(pieChartData);
