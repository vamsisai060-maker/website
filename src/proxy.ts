import { NextRequest, NextResponse } from 'next/server';

import { MAINTENANCE_MODE } from '@/lib/maintenance';

/**
 * While maintenance mode is on, every page request is rewritten to the
 * /maintenance page, so no route can render while registrations are closed.
 *
 * Named `proxy` (Next 16 renamed the `middleware` file convention to `proxy`).
 * Next still accepts `middleware.ts` but logs a deprecation warning for it.
 *
 * The matcher deliberately lets /api/* through: /api/register answers with a
 * proper 503 JSON body of its own. Rewriting it here would hand the form HTML,
 * and `response.json()` in RegisterForm would throw and surface a generic
 * "Submission failed" instead of the real reason.
 */
export function proxy(request: NextRequest) {
  if (!MAINTENANCE_MODE) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  if (url.pathname === '/maintenance') {
    return NextResponse.next();
  }

  url.pathname = '/maintenance';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Every path except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - api/           (registration endpoint returns its own 503 JSON)
     * - favicon.ico
     * - icon.png
     */
    '/((?!_next/static|_next/image|api/|favicon.ico|icon.png).*)',
  ],
};
