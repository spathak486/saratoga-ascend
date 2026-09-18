import { NextResponse } from 'next/server';
import { strapiUrl, strapiToken } from '@/lib/api/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, source } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    source?: unknown;
  };

  if (typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${strapiUrl}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
      },
      body: JSON.stringify({
        data: {
          name: name.trim(),
          email: email.trim(),
          source: typeof source === 'string' ? source : 'cta',
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 500);
      return NextResponse.json(
        { error: `CMS rejected the submission (${response.status}).` },
        { status: 502, headers: { 'x-cms-detail': detail } }
      );
    }

    const data = (await response.json()) as { id?: number; documentId?: string } | null;
    return NextResponse.json({ id: data?.id, documentId: data?.documentId });
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the CMS. Please try again.' },
      { status: 500 }
    );
  }
}