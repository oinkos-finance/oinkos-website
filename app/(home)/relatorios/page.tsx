"use client";

import BarChart from "@/components/bar_chart/bar";
import LineChart from "@/components/line_chart/line";
import PieChart from "@/components/pie_chart/pie";
import { useTransactionReport } from "@/hooks/useTransactionReport";
import { useTransactionsPagination } from "@/hooks/useTransactionsPagination";
import { PeriodConstants } from "@/util/Constants";

export default function Relatorios() {
  
  
  const { 
    incrementPage, 
    decrementPage, 
    setInitialData, 
    initialData, 
    setPeriod, 
    pieChartData, 
    lineChartData, 
    barChartData, 
    startingDate, 
    endingDate 
  } = useTransactionReport();

  return (
    <div className="w-full min-h-screen  flex flex-col bg-white rounded-xl p-2">
      <div className="mb-4">
        <input 
          type="date" 
          onChange={({ target }) => setInitialData(target?.value + "T10:00:00.000Z")} 
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "  
        />
        <div className="mb-4 text-gray-700">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="format"
          >
            Período
          </label>
          <select
            id="paymentType"
            className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
            onClick={({ target }) => setPeriod(target.value)}
          >
            <option value={PeriodConstants.ONE_MONTH}>Um mês</option>
            <option value={PeriodConstants.ONE_WEEK}>Uma semana</option>
            <option value={PeriodConstants.THREE_MONTHS}>Três meses</option>
          </select>

          <div className="flex items-center gap-10">
            <button onClick={decrementPage}>AVANÇAR</button>
            <button onClick={incrementPage}>VOLTAR</button>
          </div>
          <div>De {startingDate?.toLocaleDateString()} até {endingDate?.toLocaleDateString()}</div>
        </div>
      </div>
      {pieChartData?.datasets[0].data.length ? (
        <>
          <section className="my-2">
            <h3 className="text-gray-900 text-xl ">Gastos por Categorias</h3>
            <div className="flex justify-end w-full max-h-[480px]">
              <PieChart data={pieChartData} />
            </div>
          </section>
          <section className="my-2">
            <h3 className="text-gray-900 text-xl ">Gasto Total</h3>
            <div className="w-full ">
              <LineChart data={lineChartData} />
            </div>
          </section>
          <section className="my-2">
            <h3 className="text-gray-900 text-xl ">
              Gastos Fixos e Gastos Variáveis
            </h3>
            <div className="w-full">
              <BarChart data={barChartData} />
            </div>
          </section>
        </>
      ) : (
        <h3 className="text-red-800 w-full">
          Você ainda não tem gastos no período mencionado!
        </h3>
      )}
    </div>
  );
}
