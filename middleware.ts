import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Assuming token is stored in cookies
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/', '/users', '/roles', '/permissions', '/settings'];
  const publicRoutes = ['/login'];

  // Redirect to login if trying to access protected route without token
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if trying to access login page with token
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/users/:path*', '/roles/:path*', '/permissions', '/settings/:path*', '/login'],
};
