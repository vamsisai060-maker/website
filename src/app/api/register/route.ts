import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

type ScriptResult = { ok?: boolean; code?: string; message?: string } | null;

/**
 * Apps Script answers every /exec request with a 302 to googleusercontent. The
 * first request after an idle period pays a cold start of up to ~55s, during
 * which Google intermittently resolves that redirect as a GET - which runs
 * doGet and returns the health check instead of a registration result - or
 * serves an HTML error page instead of JSON. Both are retried: the instance is
 * warm by then, and doPost is safe to replay because it answers a requestId it
 * has already handled with the original code rather than writing a second row.
 *
 * Anything carrying a `code` is a real result and is never retried, so a
 * duplicate is returned straight to the user.
 */
const HEALTH_MARKER = /registration backend is LIVE/i;
const MAX_ATTEMPTS = 3;
/** Cold starts are ~55s; the retry that follows one is ~4s. Don't stack them. */
const TIME_BUDGET_MS = 75_000;

function parseJson(text: string): ScriptResult {
  try {
    return JSON.parse(text) as ScriptResult;
  } catch {
    return null;
  }
}

async function callScript(webAppUrl: string, payload: string) {
  const deadline = Date.now() + TIME_BUDGET_MS;
  let last: ScriptResult = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload,
      });
      last = parseJson(await response.text());
    } catch (e) {
      console.error(`[register] attempt ${attempt} failed:`, e);
      last = null;
    }

    // A real answer: a code, or any message that isn't the health check.
    if (last && (last.code || !HEALTH_MARKER.test(last.message ?? ''))) {
      return last;
    }
    // Cold start, or a page where JSON was expected: the instance is warm now.
    if (Date.now() > deadline) break;
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
  const result = await callScript(webAppUrl, payload);

  if (!result) {
    return Response.json(
      {
        ok: false,
        message:
          'Registration is taking too long to respond. Please try again in a moment.',
      },
      { status: 504 }
    );
  }
  if (!result.ok || !result.code) {
    return Response.json(
      { ok: false, code: result.code, message: result.message ?? 'Submission failed' },
      { status: 200 }
    );
  }
  return Response.json(result);
}

/**
 * Warms the script. doGet writes nothing, so the register page calls this on
 * mount: by the time someone has filled in the form the instance is running and
 * their submission takes seconds rather than a minute.
 */
export async function GET() {
  const webAppUrl = process.env.GSHEET_WEB_APP_URL;
  if (!webAppUrl) {
    return Response.json(
      { ok: false, message: 'Registration backend is not configured.' },
      { status: 500 }
    );
  }

  const startedAt = Date.now();
  try {
    const response = await fetch(webAppUrl, { redirect: 'follow' });
    const body = parseJson(await response.text());
    return Response.json({
      ok: true,
      warm: Boolean(body?.ok),
      ms: Date.now() - startedAt,
      backend: body?.message ?? null,
    });
  } catch (e) {
    // A failed warm-up is not worth surfacing: the submit path retries anyway.
    console.error('[register] warm-up failed:', e);
    return Response.json({ ok: false, warm: false, ms: Date.now() - startedAt });
  }
}
