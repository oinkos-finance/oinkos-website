'use client'
import Link from "next/link";
import { Home, BarChart, User, LogOut, Folder, X, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {

    const [navbar, setNavbar] = useState(false);
    const alternaIcone = () => setNavbar(!navbar)

    return (
        <section>
            <div className=" hidden bg-gradient-to-br from-[#7ca9ad] to-[#51abb4] text-white w-72 min-h-screen rounded-xl md:flex flex-col justify-between py-6 px-4">
                <div className="flex flex-col gap-4">
                    <Image src="/LoginOinkos.png" alt="logo" width={250} height={250} />
                    <Link href="/pagina_inicial" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3">
                        <Home /> Página inicial
                    </Link>
                    <Link href="/minhas_movimentacoes" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3">
                        <Folder /> Transações
                    </Link>
                    <Link href="/relatorios" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3">
                        <BarChart /> Relatórios
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <Link href="/meu_perfil" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3">
                        <User /> Meu Perfil
                    </Link>
                    <Link href="/" className="hover:bg-[#FF4D4D]/80 py-2 px-4 text-lg rounded-md flex items-center gap-3">
                        <LogOut /> Logout
                    </Link>
                </div>
            </div>

            {navbar && (
                <div className="fixed inset-0 bg-gradient-to-br from-[#7ca9ad] to-[#51abb4] z-50 flex flex-col p-4 gap-10">
                    <div className="flex justify-between ">
                        <Image src="/LoginOinkos.png" alt="logo" width={200} height={200} />
                        <X onClick={alternaIcone} className="w-8 h-8 cursor-pointer text-white" />
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <Link href="/pagina_inicial" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3 " onClick={alternaIcone}>
                            <Home  className="w-8 h-8"/> 
                            <span className="text-2xl"> Página inicial</span>
                        </Link>
                        <Link href="/minhas_movimentacoes" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3" onClick={alternaIcone}>
                            <Folder className="w-8 h-8"/>
                            <span className="text-2xl"> Transações</span>
                        </Link>
                        <Link href="/relatorios" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3" onClick={alternaIcone}>
                            <BarChart className="w-8 h-8"/> 
                            <span className="text-2xl"> Relatórios</span>
                        </Link>
                        <Link href="/meu_perfil" className="hover:bg-[#2c7a7e]/30 text-xl py-2 px-4 rounded-md flex items-center gap-3" onClick={alternaIcone}>
                            <User className="w-8 h-8"/> 
                            <span className="text-2xl"> Meu Perfil</span>
                        </Link>
                        <Link href="/" className="hover:bg-[#FF4D4D]/80 py-2 px-4 text-lg rounded-md flex items-center gap-3" onClick={alternaIcone}>
                            <LogOut className="w-8 h-8"/>
                            <span className="text-2xl"> Logout</span>
                        </Link>
                    </div>
                </div>
            )}

            <div className="md:hidden bg-[#51abb4] rounded-md p-1 ">
                <div className="flex gap-4">
                    <Menu
                        onClick={alternaIcone}
                        className="w-12 h-12 cursor-pointer"
                    />

                </div>
            </div>

        </section>
    );
}
