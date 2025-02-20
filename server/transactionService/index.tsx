import getCookies from "../cookies/getCookies";

interface Transaction {
  transactionType: string;
  title: string;
  value: number;
  paymentType: string;
  category: string;
}

interface UniqueTransaction extends Transaction {
  transactionDate: Date;
}

interface RecurringTransaction extends Transaction {
  startingDate: Date;
  endingDate: Date;
}

export const findAll = async () => {
  try {

    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        startingDate: "2025-02-17T03:00:00Z",
        endingDate: "2025-10-17T03:00:00Z",
      })
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction",
      options
    );

    console.log(response.status);
    return await response.json();

  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
  }
};

export const createNewRecurringTransaction = async (data) => {
  try {
    const token = await getCookies();
    const body = {
      transactionType: "recurring",
      title: data.description,
      value: Number(data.value.replace(",", ".")),
      paymentType: data.paymentType,
      category: data.category,
      startingDate: new Date(data.startingDate).toISOString().replace(".000Z", "Z")
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

    console.log(body);
    return await response.json();

  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
  }
};