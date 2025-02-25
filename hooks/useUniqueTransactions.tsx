"use client"

import {
  FormValues,
  formSchemaCreateUniqueTransaction,
} from "@/schemas/formSchemaCreateUniqueTransaction";
import { getCategories } from "@/services/CommonTransactionsService";
import { infiniteFindAll } from "@/services/UniqueTransactionService";
import { createNewUniqueTransaction } from "@/services/UniqueTransactionService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const [, setIsSubmitSuccessful] = useState(false);
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
      value: "",
      paymentType: undefined,
      category: "",
      transactionDate: undefined,
    },
  });

  const handleEdition = (data) => {
    setValue("title", data.title);
    setValue("value", data.value.toString().replace(".", ","));
    setValue("category", data.category);
    setValue("paymentType", data.paymentType);
    setValue("transactionDate", data.transactionDate.split("T")[0]);
    setIsModalEditOpen(true);
  };

  const queryClient = useQueryClient()

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["uniqueTransactions"],
    queryFn: infiniteFindAll,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const createMutation = useMutation({
    mutationKey: ["21"],
    mutationFn: createNewUniqueTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["uniqueTransactions"] }),
  });

  let transactions = [] 
  data?.pages.forEach(({ data }) => data.forEach( t  => transactions.push(t)))
  
  const { data: categories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories
  })

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
    transactions,
    fetchNextPage,
    hasNextPage,
    createMutation,
    handleSubmit,
    reset,
    errors,
    register,
    categories
  };
};
