import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ScriptResult = {
  ok?: boolean;
  code?: string;
  reason?: string;
  retryable?: boolean;
  message?: string;
} | null;

/**
 * Apps Script answers every /exec request with a 302 to googleusercontent. The
 * first request after an idle period pays a cold start of up to ~55s, during
 * which Google intermittently resolves that redirect as a GET - which runs
 * doGet and returns the health check instead of a registration result - or
 * serves an HTML error page instead of JSON. Both are retried once: the instance
 * is warm by then, and doPost is safe to replay because anyone already on the
 * sheet is answered with their existing code rather than a second row.
 *
 * Anything carrying a `code` is a real result and is never retried, so a
 * clash is returned straight to the user.
 */
const HEALTH_MARKER = /registration backend is LIVE/i;
const MAX_ATTEMPTS = 3;
/** Cold starts are ~55s; the retry that follows one is ~4s. Don't stack them. */
const TIME_BUDGET_MS = 90_000;

/**
 * When the script is busy with another team's registration it answers BUSY with
 * retryable:true. That is a queue, not a failure, so it is retried here where
 * nobody is looking at a spinner.
 */
const BUSY_WAIT_MS = 4_000;

function parseJson(text: string): ScriptResult {
  try {
    return JSON.parse(text) as ScriptResult;
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function callScript(webAppUrl: string, payload: string) {
  const deadline = Date.now() + TIME_BUDGET_MS;
  let last: ScriptResult = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload,
        cache: 'no-store',
        redirect: 'follow',
      });
      last = parseJson(await response.text());
    } catch (e) {
      console.error(`[register] attempt ${attempt} failed:`, e);
      last = null;
    }

    // A real answer: a code, or any message that isn't the health check.
    if (last && (last.code || !HEALTH_MARKER.test(last.message ?? ''))) {
      // Busy: the lock timed out, the row was never written. Wait it out.
      if (last.retryable && last.reason === 'BUSY' && Date.now() < deadline) {
        await sleep(BUSY_WAIT_MS);
        continue;
      }
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
          'Registration is taking too long to respond. Please press Register again in a moment.',
      },
      { status: 504 }
    );
  }
  if (!result.ok || !result.code) {
    return Response.json(
      { ok: false, code: result.code, reason: result.reason, message: result.message ?? 'Submission failed' },
      { status: 200 }
    );
  }
  return Response.json(result);
}

/**
 * Warms the script. doGet reads nothing and writes nothing, so the register
 * page calls this on mount: by the time someone has filled in the form the
 * instance is running and their submission takes seconds rather than a minute.
 *
 * It is fired once per browser tab (RegisterForm guards with sessionStorage)
 * because a cold start here still costs Google money and a full minute of
 * wall-clock, whether or not anyone is looking at the result.
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
    const response = await fetch(webAppUrl, { redirect: 'follow', cache: 'no-store' });
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