import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get('accessToken')?.value

  // If no token and accessing a protected route
  if (!token && request.nextUrl.pathname.startsWith('/kurakani')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If there is a token, check if it is valid
  if (token) {
    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Otherwise, continue
  return NextResponse.next()
}

export const config = {
  matcher: ['/kurakani/:path*'] // Only apply middleware to /kurakani routes
}
