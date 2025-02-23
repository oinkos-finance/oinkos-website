"use client";

import { useRecurringTransactions } from "@/hooks/useRecurringTransactions";
import { RecurringTransaction } from "@/types/Transactions";
import { Pencil, Trash } from "lucide-react";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { FormValues } from "@/schemas/formSchemaCreateRecurringTransaction";

interface ModalProps {
  children: React.ReactNode;
  onClose: VoidFunction;
  title: string;
}

interface FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

export default function SeusGastosFixos() {
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
    transactions,
    hasNextPage,
    fetchNextPage,
    createMutation,
    editMutation,
    errors,
    register,
    reset,
    handleSubmit,
  } = useRecurringTransactions();

  const Modal = ({ children, onClose, title }: ModalProps) => (
    <div className="fixed inset-0 rounded-lg bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[500px] relative">
        <div className="flex bg-fixed_outgoing rounded-b-none rounded-lg lg p-3 justify-between items-center border-b pb-3">
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

  const Form = ({ onSubmit }: FormProps) => (
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
          htmlFor="description"
        >
          Título
        </label>
        <input
          id="title"
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
        <select
          id="category"
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
          {...register("category")}
        >
          <option value="">Selecione um campo</option>
          <option value="Academia">Academia</option>
          <option value="Aluguel">Aluguel</option>
          <option value="Roupas">Roupas</option>
          <option value="Farmácia">Farmácia</option>
          <option value="Mercado">Mercado</option>
          <option value="Outros">Outros</option>
        </select>
        <label className="text-red-500 mb-3 text-md">
          {errors.category?.message}
        </label>
      </div>
      <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="data-inicial-gasto-fixo"
            >
              Selecione a Data Inicial de Recorrência:
            </label>
            <input
              className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none"
              type="date"
              {...register("startingDate")}
            ></input>
            <label className="text-red-500 mb-3 text-md">
              {errors.startingDate?.message}
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="data-final-gasto-fixo"
            >
              Selecione a Data de Encerramento das Recorrências:
            </label>
            <input
              className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none"
              type="date"
              {...register("endingDate")}
            ></input>
            <label className="text-red-500 mb-3 text-md">
              {errors.endingDate?.message}
            </label>
          </div>
      <div className="w-full mt-2 flex justify-center">
        <button
          type="submit"
          className="bg-[#73B48C] text-black py-2 px-6 rounded-xl hover:bg-[#6dac85]"
        >
          {isModalAddOpen ? "Adicionar" : "Atualizar"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#E5E7E5] md:pt-8 w-full overflow-hidden">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl text-black mb-6">Seus Gastos Fixos</h1>
        <button
          onClick={openModalAdd}
          className="bg-[#B6C8C6] text-black px-6 py-2 rounded-xl hover:bg-[#a3b6b4]"
        >
          Adicionar
        </button>
      </div>

      {transactions && transactions.length > 0 ? (
        <div className="">
          <div className="overflow-x-auto bg-white rounded-xl mt-6">
            <table className="w-full border-collapse">
              <thead className="bg-fixed_outgoing">
                <tr>
                  <th className="text-black text-md p-4">Valor</th>
                  <th className="text-black text-md p-4">Descrição</th>
                  <th className="text-black text-md p-4">Formato</th>
                  <th className="text-black text-md p-4">Categoria</th>
                  <th className="text-black text-md p-4">Duração</th>
                  <th className="text-black text-md p-4"></th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map(
                  (transaction: RecurringTransaction, index) => (
                    <tr
                      key={index}
                      className="bg-white shadow-sm rounded-md hover:bg-[#D9D9D9]/25 border-b last:border-t-0 text-center"
                    >
                      <td className="text-gray-800 font-bold p-4">
                        {transaction.value}
                      </td>
                      <td className="text-gray-600 p-4 ">
                        {transaction.title}
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm">
                          {transaction.paymentType}
                        </span>
                      </td>
                      <td className="text-gray-600 p-4">
                        {transaction.category}
                      </td>
                      <td className="text-gray-600 p-4">
                        <span className="bg-[#D9D9D9] text-black py-1 px-3 rounded-full">
                          {"Mensal"}
                        </span>
                      </td>
                      <td className="text-gray-600 p-4 flex gap-2 items-center justify-center">
                        <div
                          className="p-2 bg-[#D9D9D9] rounded-full cursor-pointer"
                          onClick={openModalDelete}
                        >
                          <Trash size={18} className=" text-black" />
                        </div>
                        <div
                          className="p-2 bg-[#D9D9D9] rounded-full cursor-pointer"
                          onClick={() => handleEdition(transaction)}
                        >
                          <Pencil size={18} className=" text-black" />
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {hasNextPage && <button onClick={fetchNextPage}>ver mais</button>}
          </div>
        </div>
      ) : (
        <div className="flex bg-white rounded-lg items-center justify-center w-full h-screen">
          <h1 className="text-2xl text-black">
            Você ainda não possui nenhum gasto fixo!
          </h1>
        </div>
      )}

      {/* Modal adicionar */}
      {isModalAddOpen && (
        <Modal title="Adicionar Novo Gasto Fixo" onClose={closeModalAdd}>
          <Form
            onSubmit={(data) => {
              createMutation.mutateAsync(data);
              reset();
              closeModalAdd();
            }}
          />
        </Modal>
      )}

      {/* Modal editar */}
      {isModalEditOpen && (
        <Modal title="Editar Gasto Fixo" onClose={closeModalEdit}>
          <Form
            onSubmit={(data) => {
              editMutation.mutateAsync(data);
              closeModalEdit();
            }}
          />
        </Modal>
      )}

      {/* Modal delete */}
      {isModalDeleteOpen && (
        <Modal title="Excluir Gasto Fixo" onClose={closeModalDelete}>
          <p className="mt-2 text-gray-600 p-5">
            Deseja excluir esse gasto fixo? Essa ação é irrevertível!
          </p>
          <div className="w-full mt-2 flex justify-center">
            <button className="bg-[#73B48C]/90 mb-5 text-black py-2 px-6 rounded-xl hover:bg-[#6dac85]/95 transition">
              Excluir
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
