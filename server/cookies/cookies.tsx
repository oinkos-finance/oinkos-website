'use server'
import { cookies } from "next/headers"


export default async function getCookies(token: string){
    
    const cookieStore = await cookies()
    cookieStore.set('token', token)

}