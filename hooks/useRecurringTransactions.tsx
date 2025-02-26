import { useState } from "react";
import {
  createNewRecurringTransaction,
  getNextRecurringTransactions,
} from "@/services/RecurringTransactionService";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  formSchemaCreateRecurringTransaction,
  FormValues,
} from "@/schemas/formSchemaCreateRecurringTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RecurringTransaction } from "@/types/Transactions";
import { revertRecurringTransaction } from "@/services/UniqueTransactionService";

export const useRecurringTransactions = () => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [initialData, setInitialData] = useState< RecurringTransaction | null>(null)

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaCreateRecurringTransaction),
    defaultValues: {
      title: "",
      value: undefined,
      paymentType: undefined,
      category: "",
      startingDate: "",
      endingDate: "",
    },
  });

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const openModalAdd = () => {
    reset();
    setIsModalAddOpen(true);
  };
  const closeModalAdd = () => setIsModalAddOpen(false);

  const handleEdition = (data: FormValues) => {
    setValue("title", data.title);
    setValue("value", data.value);
    setValue("category", data.category);
    setValue("paymentType", data.paymentType);
    setValue("startingDate", data.startingDate.toString().split("T")[0]);
    if(data.endingDate)
      setValue("endingDate", data.endingDate.toString().split("T")[0]);
    setIsModalEditOpen(true);
  };

  const handleEditionInitial = (data: RecurringTransaction) => {
    setValue("title", data.title);
    setValue("value", data.value);
    setValue("category", data.category);
    setValue("paymentType", data.paymentType);
    setValue("startingDate", data.startingDate.toString().split("T")[0]);
    if(data.endingDate)
      setValue("endingDate", data.endingDate.toString().split("T")[0]);
    setIsModalEditOpen(true);
    setInitialData(data)
  };

  const closeModalEdit = () => setIsModalEditOpen(false);

  const createMutation = useMutation({
    mutationFn: createNewRecurringTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] }),
  });

  const revertMutation = useMutation({
    mutationFn: revertRecurringTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["allTransactions"] }),
  });

  const { data: nextRecurringTransactions } = useQuery({
    queryKey: ["getNextRecurring"],
    queryFn: getNextRecurringTransactions
  })
      
  return {
    isModalDeleteOpen,
    isModalAddOpen,
    isModalEditOpen,
    openModalDelete,
    closeModalDelete,
    openModalAdd,
    closeModalAdd,
    handleEdition,
    closeModalEdit,
    nextRecurringTransactions,
    createMutation,
    handleSubmit,
    setValue,
    reset,
    errors,
    register,
    initialData,
    handleEditionInitial,
    revertMutation
  };
};
