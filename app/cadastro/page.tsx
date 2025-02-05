'use client'
import { formSchemaRegister, FormValues } from "@/schemas/formRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Cadastro() {

    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchemaRegister),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
    });

    async function teste() {
        setIsSubmitSuccessful(true)
        reset()
    }

    return (
        <div className="flex bg-[#E5E7E5] items-center justify-center min-h-screen">
            <form className="w-11/12 md:w-1/2 lg:w-2/5 bg-gradient-to-br from-[#7ca9ad] to-[#51abb4] flex flex-col justify-center items-center rounded-lg gap-6" onSubmit={handleSubmit(teste)}>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full pl-2 pt-2 flex">
                        <Link href="/" className="">
                            <ArrowLeft className="text-white hover:text-white/75 cursor-pointer" />
                        </Link>
                    </div>
                    <Image src="/LoginOinkos.png" alt="logo" width={250} height={250} />
                </div>
                <div className="grid grid-cols-1 gap-2 md:gap-6 md:grid-cols-2 w-11/12">
                    <div className="flex flex-col  items-center w-full gap-1">
                        <input placeholder="Nome" className="bg-white w-11/12 sm:w-4/5 md:w-full p-2 rounded-2xl drop-shadow-lg text-[#051A29] focus:outline-none" {...register("name")} />
                        <label className="text-red-800 mb-3 text-md">{errors.name?.message}</label>
                    </div>
                    <div  className="flex flex-col items-center w-full gap-1">
                        <input placeholder="E-mail" className="bg-white w-11/12 sm:w-4/5 md:w-full p-2 rounded-2xl drop-shadow-lg text-[#051A29] focus:outline-none" {...register("email")} />
                        <label className="text-red-800 mb-3 text-md">{errors.email?.message}</label>
                    </div>
                    <div  className="flex flex-col  items-center w-full gap-1">
                        <input type="password" placeholder="Senha" className="bg-white w-11/12 sm:w-4/5 md:w-full p-2 rounded-2xl drop-shadow-lg text-[#051A29] focus:outline-none" {...register("password")} />
                        <label className="text-red-800 mb-3 text-md">{errors.password?.message}</label>
                    </div>
                    <div  className="flex flex-col  items-center w-full gap-1">
                        <input type="password" placeholder="Confirmar senha" className="bg-white w-11/12 sm:w-4/5 md:w-full p-2 rounded-2xl drop-shadow-lg text-[#051A29] focus:outline-none" {...register("confirm_password")} />
                        <label className="text-red-800 mb-3 text-md">{errors.confirm_password?.message}</label>
                    </div>
                </div>
                    {isSubmitSuccessful && <span className=" text-emerald-950 text-center text-md">Cadastro realizado com sucesso!</span>}
                <div className="flex gap-1">
                    <span className="text-[#020202] text-md md:text-lg lg:text-xl">Já tem uma conta? </span>
                    <Link href="/" className="text-[#051A29] text-md md:text-lg lg:text-xl font-bold underline decoration-[1.5px] hover:text-[#2b516e]">Faça login</Link>
                </div>
                <button type="submit" className="w-full bg-black/35 hover:bg-black/30 text-white p-5 text-xl rounded-b-lg transition ease-in-out">Cadastrar</button>
            </form>
        </div>
    );
}
