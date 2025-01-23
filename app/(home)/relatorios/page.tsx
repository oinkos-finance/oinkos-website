"use client"

import BarChart from "@/components/bar_chart/bar";
import LineChart from "@/components/line_chart/line";
import { PieChart } from "@/components/pie_chart/pie";
import { pieChartData } from '@/service/charts_service'

export default function Relatorios(){
    return(
        <div className="w-full flex flex-col bg-white rounded-xl p-2">
            <section className="my-2">
                <h3 className="text-gray-900 text-xl ">Gastos por Categorias</h3>
                <div className="flex justify-end w-full max-h-[480px]">
                    <PieChart data={pieChartData} />
                </div>
            </section>

            <section className="my-2">
                <h3 className="text-gray-900 text-xl ">Saldo e Gastos</h3>
                <div className="w-full ">
                    <LineChart data={pieChartData} />
                </div>
            </section>

            <section className="my-2">
                <h3 className="text-gray-900 text-xl ">Gastos Fixos e Gastos Variáveis</h3>
                <div className="w-full">
                    <BarChart data={pieChartData} />
                </div>
            </section>
        </div>
    )
}