import type { NextRequest } from "next/server";
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('token')?.value;
    
    if (!currentUser) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: [
        '/minhas_movimentacoes/:path*',
        '/editar_perfil/:path*',
        '/meu_perfil/:path*',
        '/pagina_inicial/:path*',
        '/seus_gastos-fixos/:path*',
        '/seus_gastos-variaveis/:path*',
    ],
};