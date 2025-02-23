"use client"

import {
  FormValues,
  formSchemaCreateUniqueTransaction,
} from "@/schemas/formSchemaCreateUniqueTransaction";
import { infiniteFindAll } from "@/services/UniqueTransactionService";
import { createNewUniqueTransaction } from "@/services/UniqueTransactionService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

  return {
    isModalAddOpen,
    isModalEditOpen,
    isModalDeleteOpen,
    openModalAdd,
    openModalEdit,
    openModalDelete,
    closeModalAdd,
    closeModalEdit,
    closeModalDelete,
    data,
    fetchNextPage,
    hasNextPage,
    createMutation,
    handleSubmit,
    reset,
    errors,
    register,
  };
};
