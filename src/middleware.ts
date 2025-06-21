"use server"
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = [
    '/dashboard',
    '/clients',
    '/projects',
    '/services',
    '/invoices',
    '/transactions',
    '/settings/account',
    '/settings/authentication',
    '/settings/billing',
    '/settings/invoices',
]

export async function middleware(req: NextRequest) {
    try {
        const pathName = await req.nextUrl.pathname

        const _cookies = await cookies()
        // console.log('sessionKey', sessionKey)



        // ============================= ADMIN  =============================
        if (pathName.startsWith('/admin') || pathName === '/auth/login/admin') {
            const url = `${process.env.NEXT_PUBLIC_BASE_API}/admin/auth/session`;
            const sessionKey = _cookies.get('ski')?.value;

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "x-ski": sessionKey!,
                    "Content-Type": "application/json",
                },
            });

            const { authAdmin, isValid } = await res.json();

            // Authorized
            if (pathName === '/auth/login/admin' && authAdmin && isValid) {
                return NextResponse.redirect(new URL(`/admin/dashboard`, req.nextUrl));
            }

            if (pathName === '/admin' && authAdmin && isValid) {
                return NextResponse.redirect(new URL(`/admin/dashboard`, req.nextUrl));
            }

            if (pathName === '/admin/settings' && authAdmin && isValid) {
                return NextResponse.redirect(new URL(`/admin/settings/account`, req.nextUrl));
            }

            // Unauthorized
            if (pathName.startsWith('/admin') && (!authAdmin || !isValid)) {
                return NextResponse.redirect(new URL(`/auth/login/admin`, req.nextUrl));
            }
        }
        // ============================= APP/USER  =============================
        else {
            // console.log('MW - App', pathName)
            const url = `${process.env.NEXT_PUBLIC_BASE_API}/app/auth/session`;
            const sessionKey = _cookies.get('session')?.value;

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "x-session": sessionKey!,
                    "Content-Type": "application/json",
                },
            });
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
        ...protectedRoutes
    ]
}