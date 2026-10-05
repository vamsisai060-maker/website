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
    } catch {
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

  const payload = await request.text();

  try {
    const result = await callScript(webAppUrl, payload);
    if (!result?.ok || !result.code) {
      return Response.json(
        { ok: false, code: result?.code, message: result?.message ?? 'Submission failed' },
        { status: 200 }
      );
    }
    return Response.json(result);
  } catch {
    return Response.json(
      { ok: false, message: 'Submission failed. Please try again.' },
      { status: 502 }
    );
  }
}