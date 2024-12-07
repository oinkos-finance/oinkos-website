import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Cadastro() {
    return (
        <div className="flex bg-gradient-to-b from-[#ECFFEF] to-[#CCE2E4] items-center justify-center min-h-screen">
            <form className="w-11/12 md:w-1/2 lg:w-2/5 bg-[#A0C8C3] flex flex-col justify-center items-center rounded-lg gap-6">
                <div className="w-full flex flex-col justify-center items-center">
                    <span className="w-full p-6">
                        <ArrowLeft className="text-black hover:text-[#252558] cursor-pointer" />
                    </span>
                    <Image src="/LoginOinkos.png" alt="logo" width={250} height={250} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-11/12">
                    <input name="nome" placeholder="Nome" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg text-[#051A29]" />
                    <input name="cpf" placeholder="CPF" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg text-[#051A29]" />
                    <input type="date" name="data-nascimento" placeholder="Data de Nascimento" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg text-[#051A29]" />
                    <input name="telefone" placeholder="Telefone" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg text-[#051A29]" />
                    <input name="email" placeholder="E-mail" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg text-[#051A29]" />
                    <input type="password" name="senha" placeholder="Senha" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg text-[#051A29]" />
                    <textarea name="endereco" placeholder="Endereço" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg text-[#051A29] md:col-span-2" />
                </div>
                <div className="flex gap-1">
                    <span className="text-[#020202] text-md md:text-lg lg:text-xl">Já tem uma conta? </span>
                    <Link href="/login" className="text-[#20445f] text-md md:text-lg lg:text-xl font-bold underline decoration-[1.5px] hover:text-[#2b516e]">Faça login</Link>
                </div>
                <button type="submit" className="w-full bg-[#48A3A7] hover:bg-[#41999e] text-black p-5 text-3xl rounded-b-lg transition ease-in-out">Cadastrar</button>
            </form>
        </div>
    );
}
