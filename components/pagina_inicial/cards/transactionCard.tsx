interface Props {
    category: string;
    date: string;
    value: number;
    skipped: boolean;
}

export default function TransactionCard({ category, date, value, skipped }: Props){
    return(
        <div className={`bg-white flex flex-col gap-1 rounded-xl border md:px-8 lg:px-12 xl:px-16 px-16 py-4 drop-shadow-lg transition-opacity ${skipped ? 'opacity-50' : 'opacity-100'}`}>
            <h1 className="text-black font-semibold">{ category }</h1>
            <h3 className="text-black">Vencimento: { date }</h3>
            <h3 className="text-black">R$ { value.toFixed(2) }</h3>
        </div>
    )
}