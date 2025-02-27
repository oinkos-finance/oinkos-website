"use client";

import React, { useEffect, useState } from "react";
import { FormValues } from "@/schemas/formSchemaCreateUniqueTransaction";
import { Pencil, Trash } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { useUniqueTransactions } from "@/hooks/useUniqueTransactions";
import getCookies from "@/server/cookies/getCookies";
import { useQueryClient } from "@tanstack/react-query";
import { PeriodConstants } from "@/util/Constants";
import { useTransactionsPagination } from "@/hooks/useTransactionsPagination";
import { Transaction, UniqueTransaction } from "@/types/Transactions";

interface ModalProps {
  children: React.ReactNode;
  onClose: VoidFunction;
  title: string;
}

interface FormProps {
  onSubmit: SubmitHandler<FormValues>;
  buttonText: string;
}

export default function SeusGastosVariaveis() {
  const [, setError] = useState<string | null>(null);
  const [, setIsSubmitSuccessful] = useState<boolean>(false);
  const [teste] = useState<Transaction | null>();
  const [id, setId] = useState<string>("");
  const queryClient = useQueryClient();
  const {
    handleEdition,
    openModalAdd,
    openModalDelete,
    isModalAddOpen,
    isModalDeleteOpen,
    isModalEditOpen,
    closeModalAdd,
    closeModalDelete,
    closeModalEdit,
    createMutation,
    errors,
    reset,
    register,
    handleSubmit,
    initialData,
    handleEditionInitial,
  } = useUniqueTransactions();

  const {
    transactions,
    setPeriod,
    incrementPage,
    decrementPage,
    startingDate,
    endingDate,
    categories,
    setInitialData,
  } = useTransactionsPagination<UniqueTransaction>({
    queryName: "uniqueTransactions",
    onlyInclude: "unique",
  });

  const Modal = ({ children, onClose, title }: ModalProps) => (
    <div className="fixed inset-0 rounded-lg bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[500px] relative">
        <div className="flex bg-variable_outgoing rounded-b-none rounded-lg lg p-3 justify-between items-center border-b pb-3">
          <h2 className="text-lg text-center w-full text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-900 text-3xl hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const Form = ({ onSubmit, buttonText }: FormProps) => (
    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="value"
        >
          Valor
        </label>
        <input
          id="value"
          {...register("value")}
          className="w-full p-2 border rounded-xl text-black focus:outline-none"
        />
        <label className="text-red-500 mb-3 text-md">
          {errors.value?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="title"
        >
          Título
        </label>
        <input
          id="description"
          {...register("title")}
          className="w-full p-2 border rounded-xl text-black focus:outline-none"
        />
        <label className="text-red-500 mb-3 text-md">
          {errors.title?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="format"
        >
          Formato
        </label>
        <select
          id="paymentType"
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
          {...register("paymentType")}
        >
          <option value="">Selecione um campo</option>
          <option value="directTransfer">Pix</option>
          <option value="cash">Dinheiro</option>
          <option value="creditCard">Crédito</option>
          <option value="debitCard">Débito</option>
        </select>
        <label className="text-red-500 mb-3 text-md">
          {errors.paymentType?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="category"
        >
          Categoria
        </label>
        <input
          type="text"
          list="categories"
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
          {...register("category")}
        />
        <datalist id="categories">
          {categories?.map((category: string, i: number) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </datalist>
        <label className="text-red-500 mb-3 text-md">
          {errors.category?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="data-gasto-fixo"
        >
          Selecione a data:
        </label>
        <input
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none"
          type="date"
          {...register("transactionDate")}
        ></input>
        <label className="text-red-500 mb-3 text-md">
          {errors.transactionDate?.message}
        </label>
      </div>

      <div className="w-full mt-2 flex justify-center">
        <button
          type="submit"
          className="bg-[#73B48C] text-black py-2 px-6 rounded-xl hover:bg-[#6dac85]"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );

  useEffect(() => {
    console.log(teste, "aqui");
  }, [teste]);

  async function editInformation(data: FormValues) {
    const formattedData = {
      ...data,
      transactionDate:
        new Date(data.transactionDate).toISOString().split("T")[0] +
        "T00:00:00Z",
    };

    setIsSubmitSuccessful(false);
    setError(null);

    if (!initialData) return;

    const updatedFields = Object.fromEntries(
      Object.entries(formattedData).filter(([key, value]) => {
        return value !== initialData[key as keyof Transaction];
      }),
    );

    if (Object.keys(updatedFields).length === 0) {
      console.log("Nenhuma alteração detectada.");
      return;
    }

    const token = await getCookies();
    const options = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFields),
    };

    console.log("Enviando para a API:", options.body);
    fetch(`https://api.oinkos.samnsc.com/transaction/${id}`, options)
      .then((res) =>
        res
          .json()
          .then((data) => ({ status: res.status, data }))
          .then(async (res) => {
            console.log(res, "teste");

            if (res.status === 400)
              setError(
                "Sintaxe de resposta mal formatada. Verifique se os dados estão corretos",
              );
            else if (res.status === 404) setError("Transação não encontrada.");
            else if (res.status === 422) setError("Valores inválidos.");
            else if (res.status === 500) setError("Erro interno no servidor.");
            else {
              setIsSubmitSuccessful(true);
              reset();
              console.log("sucesso!");
            }
          })
          .catch((err) => console.error(err)),
      )
      .finally(() =>
        queryClient.invalidateQueries({ queryKey: ["uniqueTransactions"] }),
      );
  }

  async function deleteTransaction(id: string) {
    const token = await getCookies();
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://api.oinkos.samnsc.com/transaction/${id}`, options)
      .then((res) =>
        res
          .json()
          .then((data) => ({ status: res.status, data }))
          .then(async (res) => {
            console.log(res, "teste");

            if (res.status === 404) setError("Transação não encontrada.");
            else if (res.status === 500) setError("Erro interno no servidor.");
            else {
              setIsSubmitSuccessful(true);
              reset();
              console.log("sucesso!");
            }
          })
          .catch((err) => console.error(err)),
      )
      .finally(() =>
        queryClient.invalidateQueries({ queryKey: ["uniqueTransactions"] }),
      );
  }

  return (
    <div className="min-h-screen bg-[#E5E7E5] md:pt-8 w-full overflow-hidden">
      <div className="mb-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4">
          <input
            type="date"
            onChange={({ target }) =>
              setInitialData(new Date(target?.value + "T10:00:00.000Z"))
            }
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
              onClick={(event: React.MouseEvent<HTMLSelectElement>) =>
                setPeriod(Number(event.currentTarget.value))
              }
            >
              <option value={PeriodConstants.ONE_MONTH}>Um mês</option>
              <option value={PeriodConstants.ONE_WEEK}>Uma semana</option>
              <option value={PeriodConstants.THREE_MONTHS}>Três meses</option>
            </select>

            <div className="flex items-center gap-10 mt-2 mb-2">
              <button
                onClick={decrementPage}
                className="bg-gray-50 border-2 border-solid border-slate-500 rounded-md px-2"
              >
                AVANÇAR
              </button>
              <button
                onClick={incrementPage}
                className=" bg-gray-50 border-2 border-solid border-slate-500 rounded-md px-2"
              >
                VOLTAR
              </button>
            </div>
            <div>
              De {new Date(startingDate)?.toLocaleDateString()} até{" "}
              {new Date(endingDate)?.toLocaleDateString()}
            </div>
          </div>
        </div>

        <h1 className="text-3xl text-black mb-6">Seus Gastos Variáveis</h1>
        <button
          onClick={openModalAdd}
          className="bg-[#B6C8C6] text-black text-lg px-6 py-2 rounded-xl hover:bg-[#a3b6b4]"
        >
          Adicionar
        </button>
      </div>
      {transactions && transactions.length > 0 ? (
        <div>
          <div className="overflow-x-auto bg-white rounded-xl mt-6">
            <table className="w-full border-collapse">
              <thead className="bg-variable_outgoing">
                <tr>
                  <th className="text-black text-md p-4">Valor</th>
                  <th className="text-black text-md p-4">Descrição</th>
                  <th className="text-black text-md p-4">Formato</th>
                  <th className="text-black text-md p-4">Categoria</th>
                  <th className="text-black text-md p-4">Data</th>
                  <th className="text-black text-md p-4"></th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map(
                  (transaction: UniqueTransaction, index: number) => (
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
                          {transaction.paymentType === "directTransfer"
                            ? "Pix"
                            : transaction.paymentType === "creditCard"
                              ? "Crédito"
                              : transaction.paymentType === "debitCard"
                                ? "Débito"
                                : "Dinheiro"}
                        </span>
                      </td>
                      <td className="text-gray-600 p-4">
                        {transaction.category}
                      </td>
                      <td className="text-gray-600 p-4">
                        {new Date(
                          transaction.transactionDate,
                        ).toLocaleDateString()}
                      </td>
                      <td className="text-gray-600 p-4 flex gap-2 items-center justify-center">
                        <div
                          onClick={() => {
                            openModalDelete();
                            setId(transaction.id);
                          }}
                          className="p-2 bg-[#D9D9D9] rounded-full cursor-pointer"
                        >
                          <Trash size={18} className=" text-black" />
                        </div>
                        <div
                          onClick={() => {
                            handleEditionInitial(transaction);
                            setId(transaction.id);
                          }}
                          className="p-2 bg-[#D9D9D9] rounded-full cursor-pointer"
                        >
                          <Pencil size={18} className=" text-black" />
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex bg-white rounded-lg items-center justify-center w-full h-screen">
          <h1 className="text-2xl text-black">
            Você ainda não possui nenhum gasto variável!
          </h1>
        </div>
      )}

      {/* Modal adicionar */}
      {isModalAddOpen && (
        <Modal title="Adicionar Novo Gasto" onClose={closeModalAdd}>
          <Form
            onSubmit={(data) => {
              createMutation.mutateAsync(data);
              reset();
              closeModalAdd();
            }}
            buttonText="Criar"
          />
        </Modal>
      )}

      {/* Modal editar */}
      {isModalEditOpen && (
        <Modal title="Editar Gasto" onClose={closeModalEdit}>
          <Form
            onSubmit={(data) => {
              editInformation(data);
              handleEdition(data);
              //reset();
              closeModalEdit();
            }}
            buttonText="Editar"
          />
        </Modal>
      )}

      {/* Modal delete */}
      {isModalDeleteOpen && (
        <Modal title="Excluir Gasto" onClose={closeModalDelete}>
          <p className="mt-2 text-gray-600 p-5">
            Deseja excluir esse gasto? Essa ação é irrevertível!
          </p>
          <div className="w-full mt-2 flex justify-center">
            <button
              className="bg-[#73B48C]/90 mb-5 text-black py-2 px-6 rounded-xl hover:bg-[#6dac85]/95 transition"
              onClick={() => {
                deleteTransaction(id);
                closeModalDelete();
              }}
            >
              Excluir
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
