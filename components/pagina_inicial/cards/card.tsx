interface Props {
    text: string;
    value: number
}

export default function Card({ text, value }: Props){
    return(
        <div className="bg-white flex flex-col gap-1 rounded-xl border md:px-8 lg:px-12 xl:px-16 px-16 py-4 drop-shadow-lg">
            <h1 className="text-black font-semibold">{ text }</h1>
            <h1 className="text-black">R$ { value }</h1>
        </div>
    )
}