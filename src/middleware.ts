import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {forwardCookies, getCookiesHeader} from "@/lib/cookies";
import {authFetch} from "@/lib/actions";

export const middleware = async (request: NextRequest) => {
    // Get cookies from the request
    const cookies = await getCookiesHeader(request);
    const accessToken = cookies.find(cookie => cookie.name === 'access_token')?.value;
    const refreshToken = cookies.find(cookie => cookie.name === 'refresh_token')?.value;
    // Case 1: Both tokens missing -> Redirect to login
    if (!accessToken && !refreshToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }
    if (!accessToken && refreshToken) {
        try {
            const refreshResponse: Response = await authFetch();
            if (refreshResponse.ok) {
                await forwardCookies(refreshResponse);
            } else {
                const loginUrl = new URL('/login', request.url);
                loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
                return NextResponse.redirect(loginUrl);
            }
            if (request.nextUrl.pathname === '/dashboard/setting') {
                return NextResponse.redirect(new URL('/dashboard/setting/profile', request.url));
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }
    if (request.nextUrl.pathname === '/dashboard/setting') {
        return NextResponse.redirect(new URL('/dashboard/setting/profile', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
}