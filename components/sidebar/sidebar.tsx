import Link from "next/link";
import { Home, BarChart, User, LogOut, Folder, Phone } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
    return (
        <div className="bg-[#348c91] text-white w-72 min-h-screen flex flex-col justify-between py-6 px-4">
            <div className="flex flex-col gap-4">
                <Image src="/SidebarOinkos.png" alt="logo" width={250} height={250} />
                <Link href="/pagina_inicial" className="hover:bg-[#2c7a7e] text-xl py-2 px-4 rounded-md flex items-center gap-3">
                    <Home /> Página inicial
                </Link>
                <Link href="/transacoes" className="hover:bg-[#2c7a7e] text-xl py-2 px-4 rounded-md flex items-center gap-3">
                    <Folder /> Transações
                </Link>
                <Link href="/relatorios" className="hover:bg-[#2c7a7e] text-xl py-2 px-4 rounded-md flex items-center gap-3">
                    <BarChart /> Relatórios
                </Link>
                <Link href="/contatos" className="hover:bg-[#2c7a7e] text-xl py-2 px-4 rounded-md flex items-center gap-3">
                    <Phone /> Contatos
                </Link>
            </div>
            <div className="flex flex-col gap-4">
                <Link href="/visualizar_perfil" className="hover:bg-[#2c7a7e] text-xl py-2 px-4 rounded-md flex items-center gap-3">
                    <User /> Meu Perfil
                </Link>
                <Link href="/" className="hover:bg-[#FF4D4D]/80 py-2 px-4 text-lg rounded-md flex items-center gap-3">
                    <LogOut /> Logout
                </Link>
            </div>
        </div>
    );
}
