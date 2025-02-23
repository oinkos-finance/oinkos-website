"use server"

import getCookies from "../server/cookies/getCookies";
import { FormValues } from "@/schemas/formSchemaCreateRecurringTransaction";

interface RequestBody {
  transactionType: "recurring" | "unique";
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard";
  category: string;
  startingDate: string;
  endingDate: string;
}

export const findAll = async () => {
  try {

    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`
      }
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction?onlyInclude=recurring&startingDate=1737587407&endingDate=1740265864",
      options
    );

    const { transactions } = await response.json()
    return transactions || null

  } catch (err) {
    console.error("Erro ao buscar lista de transações recorrentes:", err);
  }
};

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
      `https://api.oinkos.samnsc.com/transaction?onlyInclude=recurring&startingDate=${startingDate}&endingDate=${endingDate}`,
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

export const createNewRecurringTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();
  
    const body: RequestBody = {
      transactionType: "recurring",
      title: data.title,
      value: Number(data.value.replace(",", ".")),
      paymentType: data.paymentType,
      category: data.category,
      startingDate: new Date(data.startingDate).toISOString().replace(".000Z", "Z"),
      endingDate: data.endingDate ? new Date(data.endingDate).toISOString().replace(".000Z", "Z") : ""
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

    console.log(response)

    return await response.json();

  } catch (err) {
    console.error("Erro ao criar novo gasto recorrente:", err);
  }
};

export const editRecurringTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();

    const { title, category, paymentType } = data

    const body: RequestBody = {
     title, 
     category,
     paymentType
    }

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

    console.log(response)

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
      }
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction",
      options
    );

    console.log(response)

    return await response.json();

  } catch (err) {
    console.error("Erro ao deletar gasto recorrente:", err);
  }
};

