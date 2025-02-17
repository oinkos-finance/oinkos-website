
import getCookies from "@/server/cookies/getCookies";
import getUser from "@/server/getUser/getUser";
import Link from "next/link";

export default async function VisualizarPerfil() {


    const data = await getUser()
    console.log(data)


    return (
        <div className="bg-white w-full min-h-screen flex flex-col gap-10 items-center py-20 px-8 rounded-xl">
            <div className="flex flex-col sm:flex-row w-full justify-between">
                <h2 className="text-black text-start w-full text-3xl mb-10">Meu Perfil</h2>
                <div className="flex flex-col sm:flex-row md:w-full h-1/2 justify-end">
                    <Link href="/editar_perfil" className="bg-[#53ABB3] hover:bg-[#4da5ad] text-white p-2 text-center rounded-2xl w-[150px]">Editar</Link>
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-5">
                <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 items-center justify-center">
                    <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                        <label className="text-black text-start md:text-md text-lg pl-1">Nome:</label>
                        <input name="nome" value={data?.username} className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29] focus:outline-none" disabled />
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                        <label className="text-black md:text-md text-lg pl-1">Email:</label>
                        <input name="nome" value={data?.email} className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29] focus:outline-none" disabled />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 items-center justify-start ">
                    <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2 ">
                        <label className="text-black text-start md:text-md text-lg pl-1">Saldo:</label>
                        <input name="nome" value={data?.balance} className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29] focus:outline-none" disabled />
                    </div>
                </div>
            </div>
        </div>
    );
}
