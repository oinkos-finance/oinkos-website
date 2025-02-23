"use server"

import getCookies from "../server/cookies/getCookies";
import { FormValues } from "@/schemas/formSchemaCreateUniqueTransaction";

interface RequestBody {
  transactionType: "recurring" | "unique";
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard";
  category: string;
  transactionDate: string;
}

export const infiniteFindAll = async ({ pageParam = 0 }) => {
  try {
    const oneMonth = 31 * 24 * 60 * 60;
    const now = Math.floor(Date.now() / 1000);

    const endingDate = now - pageParam * oneMonth;
    const startingDate = endingDate - oneMonth;

    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `https://api.oinkos.samnsc.com/transaction?onlyInclude=unique&startingDate=${startingDate}&endingDate=${endingDate}`,
      options
    );

    const { transactions } = await response.json();
    const hasMore = transactions.length > 0;

    return {
      data: transactions,
      currentPage: pageParam,
      nextPage: hasMore ? pageParam + 1 : null, 
    };
  } catch (err) {
    console.error("Erro ao buscar lista de transações recorrentes:", err);
  }
};

export const createNewUniqueTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();
  
    const body: RequestBody = {
      transactionType: "unique",
      title: data.title,
      value: Number(data.value.replace(",", ".")),
      paymentType: data.paymentType,
      category: data.category,
      transactionDate: new Date(data.transactionDate).toISOString().replace(".000Z", "Z"),
    }

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

    console.log( response)

    return await response.json();

  } catch (err) {
    console.error("Erro ao criar novo gasto variável:", err);
  }
};