import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Cadastro() {
    return (
        <div className="flex bg-[#E5E7E5] items-center justify-center min-h-screen">
            <form className="w-11/12 md:w-1/2 lg:w-2/5 bg-gradient-to-br from-[#7ca9ad] to-[#51abb4] flex flex-col justify-center items-center rounded-lg gap-6">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full p-6 flex">
                        <Link href="/" className="">
                            <ArrowLeft className="text-white hover:text-white/75 cursor-pointer" />
                        </Link>
                    </div>
                    <Image src="/LoginOinkos.png" alt="logo" width={250} height={250} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-11/12">
                    <input name="nome" placeholder="Nome" className="bg-white p-3 rounded-2xl drop-shadow-lg text-[#051A29]" />
                    <input name="cpf" placeholder="CPF" className="bg-white p-3 rounded-2xl drop-shadow-lg text-[#051A29]" />
                    <input type="date" name="data-nascimento" placeholder="Data de Nascimento" className="bg-white p-3 rounded-2xl drop-shadow-lg text-[#051A29]" />
                    <input name="telefone" placeholder="Telefone" className="bg-white p-3 rounded-2xl drop-shadow-lg text-[#051A29]" />
                    <input name="email" placeholder="E-mail" className="bg-white p-3 rounded-2xl drop-shadow-lg text-[#051A29]" />
                    <input type="password" name="senha" placeholder="Senha" className="bg-white p-3 rounded-2xl drop-shadow-lg text-[#051A29]" />
                    </div>
                <div className="flex gap-1">
                    <span className="text-[#020202] text-md md:text-lg lg:text-xl">Já tem uma conta? </span>
                    <Link href="/" className="text-[#051A29] text-md md:text-lg lg:text-xl font-bold underline decoration-[1.5px] hover:text-[#2b516e]">Faça login</Link>
                </div>
                <button type="submit" className="w-full bg-black/35 hover:bg-black/30 text-white p-5 text-3xl rounded-b-lg transition ease-in-out">Cadastrar</button>
            </form>
        </div>
    );
}
