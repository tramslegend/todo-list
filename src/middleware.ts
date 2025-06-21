"use server"
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


/**
 * 
 * @param {NextRequest} req 
 * @returns 
 */
export async function middleware(req: NextRequest) {
    try {
        const pathName = await req.nextUrl.pathname

        const _cookies = await cookies()
        const sessionKey = _cookies.get('ski')?.value;
        // console.log('sessionKey', sessionKey)

        const url = `${process.env.NEXT_PUBLIC_BASE_API}/auth/session`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "x-ski": sessionKey!,
                "Content-Type": "application/json",
            },
        });

        const { authAdmin, isValid } = await res.json();

        // Authorized
        if (pathName === '/auth/login' && authAdmin && isValid) {
            return NextResponse.redirect(new URL(`/admin/dashboard`, req.nextUrl));
        }

        if (pathName === '/admin' && authAdmin && isValid) {
            return NextResponse.redirect(new URL(`/admin/dashboard`, req.nextUrl));
        }

        if (pathName === '/admin/settings' && authAdmin && isValid) {
            return NextResponse.redirect(new URL(`/admin/settings/appearance`, req.nextUrl));
        }

        // Unauthorized
        if (pathName.startsWith('/admin') && (!authAdmin || !isValid)) {
            return NextResponse.redirect(new URL(`/auth/login`, req.nextUrl));
        }

    } catch (error: any) {
        // Redirect to `/` or non middleware page, so that don't try to fetch api again.
        if (error.message === 'fetch failed') return NextResponse.redirect(new URL(`/`, req.nextUrl));

        console.error('[Middleware Error]', error.message)
        return NextResponse.next();
    }
}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/auth/:path*',
        '/admin/:path*',
    ]
}