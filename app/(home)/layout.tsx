import Sidebar from "@/components/sidebar/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return(
        <section className="flex flex-col md:flex-row">
            <Sidebar/>
                {children}
        </section>

    )
}

