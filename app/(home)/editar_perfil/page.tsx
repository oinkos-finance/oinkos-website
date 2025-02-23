'use client'
import { formSchemaMyProfile, FormValues } from "@/schemas/formMyProfile";
import getCookies from "@/server/cookies/getCookies";
import getUser from "@/server/getUser/getUser";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type User = {
  username: string,
  id: string,
  salary: number,
  email: string,
}

export default function EditarPerfil() {
  const [error, setError] = useState<null | string>(null)
  const [user, setUser] = useState<User | undefined>(undefined) //foi usado essa exibição dos dados por o componente ser client
  const [initialData, setInitialData] = useState<User | undefined>(undefined);
  const [isSubmitSucessful, setIsSubmitSuccessful] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaMyProfile),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      salary: user?.salary,
    },
  });

  async function teste() {
    const data = await getUser()
    setUser(data)
    setInitialData(data)
    console.log(data)
  }

  useEffect(() => {
    teste()
  }, [])

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("salary", user.salary);
    }
  }, [user, setValue]);

  async function editInformation(data: FormValues) {
    setIsSubmitSuccessful(false)
    setError(null)

    if (!initialData)
      return

    const updatedFields = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        return value !== initialData[key as keyof User] && value !== '';
      })
    );

    if (Object.keys(updatedFields).length === 0) {
      console.log("Nenhuma alteração detectada.");
      return;
    }

    const token = await getCookies()
    const options = {
      method: 'PATCH',
      headers: {
        accept: 'application/json', 'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedFields),
    };

    console.log("Enviando para a API:", options.body);
    fetch('https://api.oinkos.samnsc.com/user', options)
      .then(res => res.json().then(data => ({ status: res.status, data }))
        .then(async res => {
          console.log(res, 'teste')

          if (res.status === 400)
            setError('Sintaxe de resposta mal formatada.')
          else if (res.status === 422)
            setError('Valores inválidos. Verifique se a senha tem no mínimo 8 caracteres e se sua confirmação está correta.')
          else if (res.status === 401)
            setError('Erro interno no servidor.')
          else {
            teste()
            setIsSubmitSuccessful(true)
            reset()
            console.log("sucesso!")
          }

        })
        .catch(err => console.error(err)))


  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col gap-10 items-center py-20 px-8 rounded-xl">
      <h2 className="text-black text-start w-full text-3xl mb-10">
        Edite suas informações
      </h2>
      <form
        className="flex w-full flex-col items-center justify-center gap-6 md:gap-5"
        onSubmit={handleSubmit(editInformation)}
      >
        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 items-center justify-center">
          <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2 justify-start">
            <label className="text-black text-start md:text-md text-lg pl-1">
              Nome:
            </label>
            <input
              defaultValue={user?.username}
              className="bg-black/15 placeholder-black border text-sm p-2 rounded-3xl text-black focus:outline-none"
              {...register("username")}
            />
            <label className="text-red-500 mb-3 text-md">
              {errors.username?.message}
            </label>
          </div>
          <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
            <label className="text-black md:text-md text-lg pl-1">Email:</label>
            <input
              defaultValue={user?.email}
              className="bg-black/15 placeholder-black border text-sm p-2 rounded-3xl text-black focus:outline-none"
              {...register("email")}
            />
            <label className="text-red-500 mb-3 text-md">
              {errors.email?.message}
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 justify-center">
          <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2  ">
            <label className="text-black text-start md:text-md text-lg pl-1">
              Salário:
            </label>
            <input
              defaultValue={user?.salary}
              className="bg-black/15 border text-sm p-2 placeholder-black rounded-3xl text-black focus:outline-none"
              {...register("salary")}
            />
            <label className="text-red-500 mb-3 text-md">
              {errors.salary?.message}
            </label>
          </div>
          <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2  ">
            <label className="text-black text-start md:text-md text-lg pl-1">
              Senha:
            </label>
            <input
              className="bg-black/15 border text-sm p-2 placeholder-black rounded-3xl text-black focus:outline-none"
              {...register("password")}
            />
          </div>
        </div>


        <div className="flex  w-full gap-6 md:gap-6 lg:gap-8 items-center justify-start ">
          <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2  ">
            <label className="text-black text-start md:text-md text-lg pl-1">
              Confirmar senha:
            </label>
            <input
              className="bg-black/15 border text-sm p-2 placeholder-black rounded-3xl text-black focus:outline-none"
              {...register("confirmPassword")}
            />
          </div>
        </div>
        {
          error && <label className="text-red-500 mb-3 text-md">
            {error}
          </label>
        }
        {
          isSubmitSucessful && <label className="text-green-700 mb-3 text-lg">
            Dados editados com sucesso!!
          </label>
        }
        <div className="flex flex-col md:flex-row gap-3 pt-10 md:pt-6 md:gap-6 lg:gap-8 w-full justify-center items-center">
          <button
            type="submit"
            className="bg-[#53ABB3] hover:bg-[#4da5ad] text-white p-2 text-center rounded-2xl w-10/12 md:w-1/5"
          >
            Concluir
          </button>
          <Link
            href="/meu_perfil"
            className="bg-[#53ABB3] hover:bg-[#4da5ad] text-white p-2 rounded-2xl w-10/12 md:w-1/5 text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
