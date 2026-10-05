import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

/**
 * Apps Script answers every /exec request with a 302 to googleusercontent.
 * When the script is cold (~20s start) Google intermittently resolves that as a
 * GET, which runs doGet and returns the health check instead of a registration
 * result. doGet writes nothing, so retrying is safe. Anything carrying a `code`
 * is a real result and is never retried.
 */
const HEALTH_MARKER = /registration backend is LIVE/i;

async function callScript(webAppUrl: string, payload: string) {
  let last: { ok?: boolean; code?: string; message?: string } | null = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload,
      });
      last = (await response.json().catch(() => null)) as
        | { ok?: boolean; code?: string; message?: string }
        | null;
      if (last?.code || !HEALTH_MARKER.test(last?.message ?? '')) {
        return last;
      }
    } catch (e) {
      console.error('[register] attempt failed:', e);
      // Cold-start timeouts land here; fall through and try again.
    }
  }
  return last;
}

export async function POST(request: NextRequest) {
  // Maintenance mode - block all registrations
  return Response.json(
    { ok: false, message: 'Registrations are temporarily stopped. We will be back at 7 PM today.' },
    { status: 503 }
  );
}