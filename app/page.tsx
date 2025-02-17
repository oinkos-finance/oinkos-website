"use client";

import { formSchemaLogin, FormValues } from "@/schemas/formLogin";
import setCookies from "@/server/cookies/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function teste(data: FormValues) {
    setError(null)
    const username = data.username
    const password = data.password

    const credentials = `${username}:${password}`;

    const encodedCredentials = btoa(credentials);

    const options = {
      method: 'POST',
      headers: { accept: 'application/json', authorization: `Basic ${encodedCredentials}` }
    };

    fetch('https://api.oinkos.samnsc.com/login', options)
      .then(res => res.json().then(data => ({ status: res.status, data }))
        .then(res => {

          if (res.status === 401) {
            setError('Credenciais inválidas. Por favor, verifique seu username e senha.')
          }
          else if(res.status === 500){
            setError('Interno interno no servidor. Tente novamente mais tarde')
          }
          else {
            setCookies(res.data.token),
            router.replace('/pagina_inicial')
          }
        }
        ))
        .catch(err => console.error(err))

  }

  return (
    <div className="flex bg-[#E5E7E5] items-center justify-center min-h-screen">
      <form
        className="w-11/12 sm:w-5/6 md:w-1/2 lg:w-[30%] bg-gradient-to-br from-[#7ca9ad] to-[#51abb4] flex flex-col justify-center gap-10 items-center rounded-lg"
        onSubmit={handleSubmit(teste)}
      >
        <div className="w-full flex flex-col pt-10 justify-center items-center">
          <Image src="/LoginOinkos.png" alt="logo" width={200} height={200} />
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-4">
          <input
            placeholder="e-mail"
            className="bg-[#FFFFFF] p-2 rounded-2xl drop-shadow-lg w-11/12 sm:w-4/6 md:w-2/3 text-[#051A29] focus:outline-none"
            {...register("username")}
          ></input>
          <label className="text-red-800 text-md">
            {errors.username?.message}
          </label>

          <input
            type="password"
            placeholder="senha"
            className="bg-[#FFFFFF] p-2 rounded-2xl drop-shadow-lg w-11/12 sm:w-4/6 md:w-2/3 text-[#051A29] focus:outline-none"
            {...register("password")}
          ></input>
          <label className="text-red-800 text-md">
            {errors.password?.message}
          </label>
        </div>

        {
          error && <span className=" text-red-800 text-center text-lg">
            {error}
          </span>
        }

        <div className="flex gap-1 md:gap-2">
          <span className="text-[#020202] text-md md:text-lg lg:text-lg">
            Não tem uma conta?{" "}
          </span>
          <Link
            href="/cadastro"
            className="text-[#051A29] text-md md:text-lg lg:text-lg font-bold underline decoration-[1.5px] hover:text-[#2b516e]"
          >
            Cadastre-se
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-black/35 hover:bg-black/30 text-white p-5 text-xl rounded-b-lg transition ease-in-out  "
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
