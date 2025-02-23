"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { Transaction } from "@/types/Transactions";
import { RotateCcw } from "lucide-react";
import Link from "next/link";

export default function MinhasMovimentacoes() {
  const {
    transactions,
    hasNextPage,
    fetchNextPage,
    recurringTransactionsNumber,
    uniqueTransactionsNumber,
    isModalOpen,
    openModal,
    closeModal,
    setPeriod,
  } = useTransactions();

  return (
    <div className="min-h-screen bg-[#E5E7E5] md:pt-8 w-full overflow-hidden">
      <h1 className="text-2xl text-black mb-6">Suas Movimentações</h1>

      <div className="mb-4">
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
          <option value="7">Uma semana</option>
          <option value="31">Um mês</option>
        </select>
      </div>
      {transactions ? (
        <div>
          <div className="flex w-full justify-between lg:justify-start flex-col md:flex-row gap-4 lg:gap-12">
            <div className=" flex flex-col-reverse gap-4 md:flex-row bg-white text-black p-2 rounded-xl">
              <div className="flex  gap-2 flex-row p-2">
                <h3 className="text-6xl font-bold">
                  {recurringTransactionsNumber}
                </h3>
                <p className="mt-7 leading-4 md:mt-5 text-lg font-medium">
                  Gastos Fixos
                </p>
              </div>
              <h1 className="w-full text-end text-sm ">
                <Link
                  href="/seus_gastos_fixos"
                  className="w-full text-end text-sm text-[#625E5E] hover:text-[#3f3c3c] scale-105"
                >
                  ver todos
                </Link>
              </h1>
            </div>
            <div className=" flex flex-col-reverse gap-4 md:flex-row bg-white text-black p-2 rounded-xl">
              <div className="flex  gap-2 flex-row p-2">
                <h3 className="text-6xl font-bold">
                  {uniqueTransactionsNumber}
                </h3>
                <p className="mt-7 leading-4 md:mt-5 text-lg font-medium">
                  Gastos Variáveis
                </p>
              </div>
              <h1 className="w-full text-end text-sm ">
                <Link
                  href="/seus_gastos_variaveis"
                  className="w-full text-end text-sm text-[#625E5E] hover:text-[#3f3c3c] scale-105"
                >
                  ver todos
                </Link>
              </h1>
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl mt-6">
            <table className="w-full  border-collapse">
              {transactions.length > 0 && (
                <thead className="bg-[#53ABB3]/45">
                  <tr>
                    <th className="text-black text-md p-4">Valor</th>
                    <th className="text-black text-md p-4">Descrição</th>
                    <th className="text-black text-md p-4">Formato</th>
                    <th className="text-black text-md p-4">Gasto</th>
                    <th className="text-black text-md p-4">Categoria</th>
                    <th className="text-black text-md p-4"></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {transactions?.map((transaction: Transaction, index) => (
                  <tr
                    key={index}
                    className="bg-white shadow-sm rounded-md hover:bg-[#D9D9D9]/25 border-b last:border-b-0 text-center"
                  >
                    <td className="text-gray-800 font-bold p-4">
                      {transaction.value}
                    </td>
                    <td className="text-gray-600 p-4">{transaction.title}</td>
                    <td className="p-4">
                      <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm">
                        {transaction.paymentType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`py-1 px-3 rounded-full text-sm ${
                          transaction.transactionType === "recurring"
                            ? "bg-fixed_outgoing text-amber-800"
                            : "bg-variable_outgoing text-amber-800"
                        }`}
                      >
                        {transaction.transactionType}
                      </span>
                    </td>
                    <td className="text-gray-600 p-4">
                      {transaction.category}
                    </td>
                    <td className="text-gray-600 p-4">
                      {transaction.transactionType === "recurring" && (
                        <div
                          onClick={openModal}
                          className="flex items-center justify-center"
                        >
                          <RotateCcw
                            size={24}
                            className=" hover:scale-105 cursor-pointer"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {hasNextPage && <button onClick={fetchNextPage}>ver mais</button>}
          </div>
        </div>
      ) : (
        <div className="flex bg-white rounded-lg items-center justify-center w-full h-screen">
          <h1 className="text-2xl text-black">
            Você ainda não possui nenhuma movimentação!
          </h1>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 relative">
            <div className="flex bg-[#53ABB3]/45 p-4 justify-between items-center border-b pb-3">
              <h2 className="text-lg text-center w-full text-gray-900">
                Reverter gasto fixo
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-900 text-3xl hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <p className="mt-2 text-gray-600 p-5">
              Deseja reverter esse gasto fixo? Essa ação faz com que o gasto não
              seja exibido durante as movimentações desse mês.
            </p>
            <div className="mt-2 flex justify-center">
              <button className="bg-[#73B48C]/90 mb-5 text-black  py-1 px-6 rounded-xl hover:bg-[#6dac85]/95 transition">
                Reverter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
