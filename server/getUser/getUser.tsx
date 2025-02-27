import getCookies from "../cookies/getCookies";

interface User {
  id: number;
  username: string;
  email: string;
  salary: number;
}

export default async function getUser(): Promise<User> {
  const token = await getCookies();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch("https://api.oinkos.samnsc.com/user", options);

  if (response.status === 401) console.log("Usuário não autenticado");
  else if (response.status === 500) console.log("Erro no servidor");

  console.log(response.status);

  const data = await response.json();

  if (data == undefined) {
    throw new Error("Unable to fetch from database");
  }

  return data;
}
