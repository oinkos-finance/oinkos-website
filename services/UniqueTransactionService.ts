"use server";

import getCookies from "../server/cookies/getCookies";
import { FormValues } from "@/schemas/formSchemaCreateUniqueTransaction";
import { findAll } from "./CommonTransactionsService";
import { capitalizeFirstLetter } from "@/util/capitalizeString";

interface RequestBody {
  transactionType: "recurring" | "unique";
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard";
  category: string;
  transactionDate: string;
}

export const infiniteFindAll = async ({ pageParam = 0 }) => {
  // buscar po padrão a cada mês
  const oneMonth = 31 * 24 * 60 * 60;
  const now = Math.floor(Date.now() / 1000);

  const endingDate = now - pageParam * oneMonth;
  const startingDate = endingDate - oneMonth;

  // função que se repete em cada serviço
  const transactions = await findAll({
    onlyInclude: "unique",
    startingDate,
    endingDate,
  });

  const hasMore = transactions.length > 0;

  return {
    data: transactions,
    currentPage: pageParam,
    nextPage: hasMore ? pageParam + 1 : null,
  };
};

export const createNewUniqueTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();

    const body: RequestBody = {
      transactionType: "unique",
      title: data.title,
      value: Number(data.value.replace(",", ".")),
      paymentType: data.paymentType,
      category: capitalizeFirstLetter(data.category.toLowerCase()),
      transactionDate: new Date(data.transactionDate)
        .toISOString()
        .replace(".000Z", "Z"),
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
    console.error("Erro ao criar novo gasto variável:", err);
  }
};
