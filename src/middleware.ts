import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 import { getToken } from "next-auth/jwt"
 //export { default } from "next-auth/middleware"
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Allow unauthenticated access to specific public routes
  if (
    !token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify'))
  ) {
    return NextResponse.next(); // Let the user proceed without redirecting
  }

  // Redirect authenticated users away from public routes
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Allow access by default for other cases
  return NextResponse.next();
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ]

}