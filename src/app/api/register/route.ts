import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

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
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: payload,
    });
    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; code?: string; message?: string }
      | null;
    if (!response.ok || !result?.ok || !result?.code) {
      return Response.json(
        { ok: false, message: result?.message ?? 'Submission failed' },
        { status: response.ok ? 200 : 502 }
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