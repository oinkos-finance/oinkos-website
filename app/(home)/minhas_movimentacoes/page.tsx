import { Pencil } from "lucide-react";

export default function MinhasMovimentacoes() {
    return (
        <div className="w-full min-h-screen flex flex-col gap-8 items-center py-10  md:px-8 rounded-xl">
            <h2 className="text-black text-center md:text-start w-full text-3xl">Suas Movimentações</h2>
            <div className="flex flex-col md:flex-row w-full justify-end items-center gap-6 md:gap-5">
                <button className="bg-[#8ADF8F] hover:bg-[#86da8b] text-white p-2 text-center rounded-2xl w-9/12 md:w-1/4">Recebimento</button>
                <button className="bg-[#EE9F9F] hover:bg-[#e09191] text-white p-2 text-center rounded-2xl w-9/12 md:w-1/4">Pagamento</button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-xs text-white  bg-[#53ABB3]">
                        <tr>
                            <th scope="col" className="px-6 py-3">Valor</th>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Descrição</th>
                            <th scope="col" className="px-6 py-3">Pago a</th>
                            <th scope="col" className="px-6 py-3">Categoria</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white hover:bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">R$ 140,00</th>
                            <td className="px-6 py-4">22/01/2025</td>
                            <td className="px-6 py-4">Compra de um vestido</td>
                            <td className="px-6 py-4">Loja X</td>
                            <td className="px-6 py-4">Gasto variável</td>
                            <td className="px-6 py-4">
                                <Pencil />
                            </td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">R$ 140,00</th>
                            <td className="px-6 py-4">22/01/2025</td>
                            <td className="px-6 py-4">Compra de uma blusa</td>
                            <td className="px-6 py-4">Loja X</td>
                            <td className="px-6 py-4">Gasto variável</td>
                            <td className="px-6 py-4">
                                <Pencil />
                            </td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">R$ 140,00</th>
                            <td className="px-6 py-4">22/01/2025</td>
                            <td className="px-6 py-4">Compra de um vestido</td>
                            <td className="px-6 py-4">Loja X</td>
                            <td className="px-6 py-4">Gasto variável</td>
                            <td className="px-6 py-4">
                                <Pencil />
                            </td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">R$ 140,00</th>
                            <td className="px-6 py-4">22/01/2025</td>
                            <td className="px-6 py-4">Compra de um vestido</td>
                            <td className="px-6 py-4">Loja X</td>
                            <td className="px-6 py-4">Gasto variável</td>
                            <td className="px-6 py-4">
                                <Pencil />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
