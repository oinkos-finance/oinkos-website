'use client'
import { formSchemaMyProfile, FormValues } from "@/schemas/formMyProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditarPerfil() {

    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchemaMyProfile),
        defaultValues: {
            name: "",
            email: "",
            balance: ""
        },
    });

    async function editInformation(){
        setIsSubmitSuccessful(true)
    }


    return (
        <div className="bg-white w-full min-h-screen flex flex-col gap-10 items-center py-20 px-8 rounded-xl">
                <h2 className="text-black text-start w-full text-3xl mb-10">Edite suas informações</h2>
                <form className="flex w-full flex-col items-center justify-center gap-6 md:gap-5" onSubmit={handleSubmit(editInformation)}>
                    <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 items-center justify-center">
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2 justify-start">
                            <label className="text-black text-start md:text-md text-lg pl-1">Nome:</label>
                            <input placeholder=" Nome da pessoa" className="bg-black/15 placeholder-black border text-sm p-2 rounded-3xl text-black focus:outline-none" {...register("name")} />
                            <label className="text-red-500 mb-3 text-md">{errors.name?.message}</label>
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                            <label className="text-black md:text-md text-lg pl-1">Email:</label>
                            <input placeholder=" email@gmail.com" className="bg-black/15 placeholder-black border text-sm p-2 rounded-3xl text-black focus:outline-none"  {...register("email")}/>
                            <label className="text-red-500 mb-3 text-md">{errors.email?.message}</label>
                        </div>
                    </div>
                    <div className="flex  w-full gap-6 md:gap-6 lg:gap-8 items-center justify-start ">
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2  ">
                            <label className="text-black text-start md:text-md text-lg pl-1">Saldo:</label>
                            <input placeholder="R$ 0,00" className="bg-black/15 border text-sm p-2 placeholder-black rounded-3xl text-black focus:outline-none" {...register("balance")} />
                            <label className="text-red-500 mb-3 text-md">{errors.balance?.message}</label>
                        </div>
                    </div>
                    {isSubmitSuccessful && <span className=" text-green-500 text-center text-md">Dados editados com sucesso!</span>}
                    <div className="flex flex-col md:flex-row gap-3 pt-10 md:pt-6 md:gap-6 lg:gap-8 w-full justify-center items-center">
                        <button type="submit" className="bg-[#53ABB3] hover:bg-[#4da5ad] text-white p-2 text-center rounded-2xl w-10/12 md:w-1/5">
                            Concluir
                        </button>
                        <Link href="/meu_perfil" className="bg-[#53ABB3] hover:bg-[#4da5ad] text-white p-2 rounded-2xl w-10/12 md:w-1/5 text-center">
                            Cancelar
                        </Link>
                    </div>
                </form>
        </div>
    );
}
