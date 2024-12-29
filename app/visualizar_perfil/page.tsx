import Link from "next/link";

export default function VisualizarPerfil() {
    return (
        <div className="bg-[#D9E9DC] min-h-screen flex flex-col gap-8 items-center py-16">
            <h1 className="text-black text-center text-3xl">Suas Informações</h1>
            <div className="flex w-3/4 flex-col items-center justify-center gap-6 md:gap-5">
                <div className="flex flex-col md:flex-row w-full gap-6 md:gap-16 items-center justify-center">
                    <div className="flex flex-col gap-1 w-full md:w-1/3 lg:w-1/4">
                        <label className="text-black text-start md:text-md lg:text-lg text-lg pl-1">Nome:</label>
                        <input name="nome" placeholder=" Nome da pessoa" className="bg-white text-sm p-2 rounded-3xl drop-shadow-lg text-[#051A29]" />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/3 lg:w-1/4">
                        <label className="text-black md:text-md lg:text-lg text-lg pl-1">Cpf:</label>
                        <input name="nome" placeholder=" 111.111.111-11" className="bg-white text-sm p-2 rounded-3xl drop-shadow-lg text-[#051A29]" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-6 md:gap-16 items-center justify-center">
                    <div className="flex flex-col gap-1 w-full md:w-1/3 lg:w-1/4">
                        <label className="text-black text-start md:text-md lg:text-lg text-lg pl-1">Telefone:</label>
                        <input name="nome" placeholder=" 11 91111-1111" className="bg-white text-sm p-2 rounded-3xl drop-shadow-lg text-[#051A29]" />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/3 lg:w-1/4">
                        <label className="text-black md:text-md lg:text-lg text-lg pl-1">Email:</label>
                        <input name="nome" placeholder=" email@gmail.com" className="bg-white text-sm p-2 rounded-3xl drop-shadow-lg text-[#051A29]" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-6 md:gap-16 items-center justify-center">
                    <div className="flex flex-col gap-1 w-full md:w-1/3 lg:w-1/4">
                        <label className="text-black text-start md:text-md lg:text-lg text-lg pl-1">Data de Nascimento:</label>
                        <input name="nome" placeholder=" xx/xx/xxxx" className="bg-white text-sm p-2 rounded-3xl drop-shadow-lg text-[#051A29]" />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/3 lg:w-1/4">
                        <label className="text-black md:text-md lg:text-lg text-lg pl-1">Senha:</label>
                        <input name="nome" placeholder=" ***********" className="bg-white text-sm p-2 rounded-3xl drop-shadow-lg text-[#051A29]" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3 pt-6 md:gap-16 w-10/12 md:w-1/2 lg:w-1/3">
                <Link href="/editar_perfil" className="bg-[#A0C8C3] text-black p-2 text-center rounded-2xl w-1/2">Editar Perfil</Link>
                <Link href="/pagina_inicial" className="bg-[#A0C8C3] text-black p-2 rounded-2xl w-1/2 text-center">Voltar</Link>
            </div>
        </div>
    );
}