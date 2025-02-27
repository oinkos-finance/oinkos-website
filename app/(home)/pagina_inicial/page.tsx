"use client";

import Card from "@/components/pagina_inicial/cards/card";
import TransactionCard from "@/components/pagina_inicial/cards/transactionCard";
import PieChart from "@/components/pie_chart/pie";
import { useRecurringTransactions } from "@/hooks/useRecurringTransactions";
import { useTransactionReport } from "@/hooks/useTransactionReport";
import getUser from "@/server/getUser/getUser";
import { RecurringTransaction } from "@/types/Transactions";
import { useQuery } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

interface User {
  id: number;
  username: string;
  email: string;
  salary: number;
}

export default function PaginaInicial() {
  const { pieChartData, totalSum } = useTransactionReport();
  const { nextRecurringTransactions } = useRecurringTransactions();

  const value = useQuery<User>({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return (
    <div className="w-full flex flex-col gap-10 justify-center">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <Card text={"Salário"} value={value.data?.salary ?? 0} />
        <Card text={"Gasto Total"} value={totalSum} />
        <Card
          text={"Economia Mensal"}
          value={
            (value.data?.salary ?? 0) - (totalSum ?? 0) > 0
              ? (value.data?.salary ?? 0) - (totalSum ?? 0)
              : 0
          }
        />
      </div>

      <section className="w-full flex flex-col bg-white rounded-xl p-2 drop-shadow-lg">
        <h3 className="text-gray-900 text-xl font-bold ">
          Gastos por Categorias Nesse Mês
        </h3>
        <div className="flex justify-end w-full">
          <PieChart data={pieChartData ?? { datasets: [] }} />
        </div>
      </section>

      <div className="text-gray-900">
        <h3 className="text-xl font-bold">Próximos Pagamentos</h3>
        <div className="text-xl flex flex-col md:flex-row flex-wrap gap-[15px]">
          {nextRecurringTransactions?.map(
            (transaction: RecurringTransaction, key: number) => (
              <TransactionCard
                skipped={transaction.transactionStatus == "skipped"}
                key={key}
                category={transaction.category}
                date={new Date(
                  transaction.transactionDate,
                ).toLocaleDateString()}
                value={transaction.value}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
