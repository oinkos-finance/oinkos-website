import Link from "next/link";

export default function EditarPerfil() {
    return (
        <div className="bg-white w-full min-h-screen flex flex-col gap-10 items-center py-20 px-8 rounded-xl">
                <h2 className="text-black text-start w-full text-3xl mb-10">Edite suas informações</h2>
                <form className="flex w-full flex-col items-center justify-center gap-6 md:gap-5">
                    <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 items-center justify-center">
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                            <label className="text-black text-start md:text-md text-lg pl-1">Nome:</label>
                            <input name="nome" placeholder=" Nome da pessoa" className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29]" />
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                            <label className="text-black md:text-md text-lg pl-1">Cpf:</label>
                            <input name="cpf" placeholder=" 111.111.111-11" className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29]" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 items-center justify-center">
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                            <label className="text-black text-start md:text-md text-lg pl-1">Telefone:</label>
                            <input name="telefone" placeholder=" 11 91111-1111" className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29]" />
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                            <label className="text-black md:text-md text-lg pl-1">Email:</label>
                            <input name="email" placeholder=" email@gmail.com" className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29]" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 lg:gap-8 items-center justify-center">
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                            <label className="text-black text-start md:text-md text-lg pl-1">Data de Nascimento:</label>
                            <input name="dataNascimento" placeholder=" xx/xx/xxxx" className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29]" />
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-1/2 lg:w-1/2">
                            <label className="text-black md:text-md text-lg pl-1">Senha:</label>
                            <input name="senha" placeholder=" ***********" type="password" className="bg-white border text-sm p-2 rounded-3xl drop-shadow-md text-[#051A29]" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 pt-10 md:pt-6 md:gap-6 lg:gap-8 w-full justify-center items-center">
                        <button type="submit" className="bg-[#53ABB3] hover:bg-[#4da5ad] text-white p-2 text-center rounded-2xl w-10/12 md:w-1/5">
                            Concluir
                        </button>
                        <Link href="/visualizar_perfil" className="bg-[#53ABB3] hover:bg-[#4da5ad] text-white p-2 rounded-2xl w-10/12 md:w-1/5 text-center">
                            Cancelar
                        </Link>
                    </div>
                </form>
        </div>
    );
}
