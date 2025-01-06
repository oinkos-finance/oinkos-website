import Card from "@/components/pagina_inicial/cards/card";

export default function PaginaInicial(){
    return(
        <div className="w-full flex flex-col gap-10 justify-center">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}