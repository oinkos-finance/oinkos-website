import Sidebar from "@/components/sidebar/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return(
        <section className="w-full bg-[#E5E7E5] flex px-6 py-4 items-center min-h-screen">
            <section className="w-full flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <Sidebar/>
                {children}
            </section>
        </section>
    )
}

