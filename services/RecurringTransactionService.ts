"use server";

import getCookies from "../server/cookies/getCookies";
import { FormValues } from "@/schemas/formSchemaCreateRecurringTransaction";
import { findAll } from "./CommonTransactionsService";
import { capitalizeFirstLetter } from "@/util/String";

interface RequestBody {
  transactionType: "recurring" | "unique";
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard";
  category: string;
  startingDate: string;
  endingDate: string | null;
}

export const createNewRecurringTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();

    const body: RequestBody = {
      transactionType: "recurring",
      title: data.title,
      value: Number(data.value),
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

export const getNextRecurringTransactions = async () => {
  try {
    
    const startingDate = Math.floor(Date.now() / 1000);
    const endingDate = startingDate + 7 * 24 * 60 * 60

    const { transactions } = await findAll({
      onlyInclude: "recurring",
      startingDate,
      endingDate,
    })
    
    return transactions || null;

  } catch (err) {
    console.error("Erro ao buscar lista de transações:", err);
  }
}