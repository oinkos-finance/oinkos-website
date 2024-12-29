import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex bg-gradient-to-b from-[#ECFFEF] to-[#CCE2E4] items-center justify-center min-h-screen">
            <form className="w-11/12 md:w-1/2 lg:w-2/5 bg-[#A0C8C3] flex flex-col justify-center gap-10 items-center rounded-lg">
                <div className="w-full flex flex-col pt-10 justify-center items-center">
                    
                    <Image src="/LoginOinkos.png" alt="logo" width={250} height={250} />
                </div>
                <div className="flex flex-col w-full items-center justify-center gap-4">
                    <input name="email" placeholder="e-mail" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg w-11/12 md:w-2/3 text-[#051A29] "></input>
                    <input type="password" name="email" placeholder="senha" className="bg-[#D9E9DC] p-3 rounded-lg drop-shadow-lg w-11/12 md:w-2/3 text-[#051A29]"></input>
                </div>
                <div className="flex gap-1 md:gap-2">
                    <span className="text-[#020202] text-md md:text-lg lg:text-xl">Não tem uma conta? </span>
                    <Link href="/cadastro" className="text-[#20445f] text-md md:text-lg lg:text-xl font-bold underline decoration-[1.5px] hover:text-[#2b516e]">Cadastre-se</Link>
                </div>
                <button type="submit" className="w-full bg-[#48A3A7] hover:bg-[#41999e] text-black p-5 text-3xl rounded-b-lg transition ease-in-out  ">Entrar</button>

            </form>
        </div>
    );
}