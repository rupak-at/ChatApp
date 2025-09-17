import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    return NextResponse.next();
    const token = request.cookies.get('accessToken')?.value;
    console.log(token)
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        // Clear invalid token
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('accessToken');
        return response;
    }
}

export const config = {
    matcher: '/kurakani/:path*'
}