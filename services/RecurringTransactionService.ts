"use server";

import getCookies from "../server/cookies/getCookies";
import { FormValues } from "@/schemas/formSchemaCreateRecurringTransaction";
import { findAll } from "./CommonTransactionsService";
import { capitalizeFirstLetter } from "@/util/capitalizeString";

interface RequestBody {
  transactionType: "recurring" | "unique";
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard";
  category: string;
  startingDate: string;
  endingDate: string | null;
}

export const infiniteFindAll = async ({ pageParam = 0 }) => {
  // buscar po padrão a cada mês
  const oneMonth = 31 * 24 * 60 * 60;
  const now = Math.floor(Date.now() / 1000);

  const endingDate = now - pageParam * oneMonth;
  const startingDate = endingDate - oneMonth;

  // função que se repete em cada serviço
  const transactions = await findAll({
    onlyInclude: "recurring",
    startingDate,
    endingDate,
  });

  console.log(transactions)

  const hasMore = transactions.length > 0;

  return {
    data: transactions,
    currentPage: pageParam,
    nextPage: hasMore ? pageParam + 1 : null,
  };
};

export const createNewRecurringTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();

    const body: RequestBody = {
      transactionType: "recurring",
      title: data.title,
      value: Number(data.value.replace(",", ".")),
      paymentType: data.paymentType,
      category: capitalizeFirstLetter(data.category.toLowerCase()),
      startingDate: new Date(data.startingDate)
        .toISOString()
        .replace(".000Z", "Z"),
      endingDate: data.endingDate
        ? new Date(data.endingDate).toISOString().replace(".000Z", "Z")
        : null,
    };

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction",
      options
    );

    console.log(body)
    console.log(response)

    return await response.json();
  } catch (err) {
    console.error("Erro ao criar novo gasto recorrente:", err);
  }
};

export const editRecurringTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();

    const { title, category, paymentType } = data;

    const body: RequestBody = {
      title,
      category,
      paymentType,
    };

    const options = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction",
      options
    );

    console.log(response);

    return await response.json();
  } catch (err) {
    console.error("Erro ao editar gasto recorrente:", err);
  }
};

export const deleteRecurringTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();

    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction",
      options
    );

    console.log(response);

    return await response.json();
  } catch (err) {
    console.error("Erro ao deletar gasto recorrente:", err);
  }
};
