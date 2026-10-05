import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

/**
 * Apps Script answers every /exec request with a 302 to googleusercontent.
 * When the script is cold (~20s start) Google intermittently resolves that as a
 * GET, which runs doGet and returns the health check instead of a registration
 * result. doGet writes nothing, and doPost replays nothing - it answers a
 * requestId it has already handled with the original code - so retrying cannot
 * create a second row. Anything carrying a `code` is a real result and is never
 * retried.
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
  const webAppUrl = process.env.GSHEET_WEB_APP_URL;
  if (!webAppUrl) {
    return Response.json(
      { ok: false, message: 'Registration backend is not configured.' },
      { status: 500 }
    );
  }
  console.error('[register] GSHEET_WEB_APP_URL present:', !!webAppUrl);

  const payload = await request.text();

  try {
    const result = await callScript(webAppUrl, payload);
    if (!result?.ok || !result.code) {
      return Response.json(
        { ok: false, code: result?.code, message: result?.message ?? 'Submission failed', debug: { hasUrl: true } },
        { status: 200 }
      );
    }
    return Response.json(result);
  } catch (err) {
    return Response.json(
      { ok: false, message: 'Submission failed. Please try again.', error: String(err) },
      { status: 502 }
    );
  }
}