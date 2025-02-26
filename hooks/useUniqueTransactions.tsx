"use client"

import {
  FormValues,
  formSchemaCreateUniqueTransaction,
} from "@/schemas/formSchemaCreateUniqueTransaction";
import { createNewUniqueTransaction } from "@/services/UniqueTransactionService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Transaction } from "@/types/Transactions";

export const useUniqueTransactions = () => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const openModalAdd = () => setIsModalAddOpen(true);
  const closeModalAdd = () => setIsModalAddOpen(false);

  const openModalEdit = () => setIsModalEditOpen(true);
  const closeModalEdit = () => setIsModalEditOpen(false);

  const [initialData, setInitialData] = useState<Transaction | null>(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaCreateUniqueTransaction),
    defaultValues: {
      title: "",
      value: undefined,
      paymentType: undefined,
      category: "",
      transactionDate: undefined,
    },
  });

  const handleEdition = (data: any) => {
    setValue("title", data.title);
    setValue("value", data.value);
    setValue("category", data.category);
    setValue("paymentType", data.paymentType);
    setValue("transactionDate", data.transactionDate.toString().split("T")[0]);
    setIsModalEditOpen(true);
  };

  const handleEditionInitial = (data: Transaction) => {
    setValue("title", data.title);
    setValue("value", data.value);
    setValue("category", data.category);
    setValue("paymentType", data.paymentType);
    setValue("transactionDate", data.transactionDate.toString().split("T")[0]);
    setIsModalEditOpen(true);
    setInitialData(data)
  }

  useEffect(() => {
    console.log(initialData, 'atualizado');
  }, [initialData]);

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationKey: ["createUnique"],
    mutationFn: createNewUniqueTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["uniqueTransactions"] }),
  });

  return {
    handleEdition,
    isModalAddOpen,
    isModalEditOpen,
    isModalDeleteOpen,
    openModalAdd,
    openModalEdit,
    openModalDelete,
    closeModalAdd,
    closeModalEdit,
    closeModalDelete,
    createMutation,
    handleSubmit,
    reset,
    errors,
    register,
    initialData,
    handleEditionInitial
  };
};
