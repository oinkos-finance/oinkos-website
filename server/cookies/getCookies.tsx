'use server'
import { cookies } from "next/headers"

export default async function getCookies() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    return token?.value
}