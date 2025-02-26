"use server";

import getCookies from "../server/cookies/getCookies";
import { FormValues } from "@/schemas/formSchemaCreateUniqueTransaction";
import { capitalizeFirstLetter } from "@/util/String";

interface RequestBody {
  transactionType: "recurring" | "unique";
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard";
  category: string;
  transactionDate: string;
}

export const createNewUniqueTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();

    const body: RequestBody = {
      transactionType: "unique",
      title: data.title,
      value: Number(data.value),
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
