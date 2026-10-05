import { NextRequest, NextResponse } from 'next/server';

const MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  if (MAINTENANCE_MODE) {
    const url = request.nextUrl.clone();
    if (url.pathname !== '/maintenance') {
      url.pathname = '/maintenance';
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.png
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.png).*)',
  ],
};