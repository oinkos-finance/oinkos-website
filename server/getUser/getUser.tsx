import { redirect } from "next/navigation";
import getCookies from "../cookies/getCookies";

type User = {
  username: 'string',
  id: string,
  salary: number,
  email: string,
}

export default async function getUser(): Promise<User | undefined> {
    try {
      const token = await getCookies()

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`
        }
      };

      const response = await fetch('https://api.oinkos.samnsc.com/user', options);

      if (response.status === 401)
        console.log("Usuário não autenticado")
      else if (response.status === 500)
        console.log("Erro no servidor")

      console.log(response.status)
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Erro ao buscar usuário:', err);
    }
  }