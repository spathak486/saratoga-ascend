import { NextResponse } from 'next/server';
import { strapiUrl, strapiToken } from '@/lib/api/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_INQUIRY_TYPES = [
  'Government / Contracting Opportunity',
  'Healthcare Services',
  'Workforce Solutions',
  'IT & Digital Solutions',
  'Contact Center Solutions',
  'Program & Administrative Support',
  'Partnership / Business Development',
  'Media / General Inquiry',
] as const;

const VALID_SOURCES = ['cta', 'need-help', 'contact'] as const;
type ValidSource = (typeof VALID_SOURCES)[number];

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const {
    firstName,
    lastName,
    name,    // legacy: CTA / NeedHelp forms send `name` instead of firstName
    email,
    organization,
    inquiryType,
    description,
    source,
  } = (body ?? {}) as {
    firstName?: unknown;
    lastName?: unknown;
    name?: unknown;
    email?: unknown;
    organization?: unknown;
    inquiryType?: unknown;
    description?: unknown;
    source?: unknown;
  };

  // Support legacy forms that still send `name` as a single field
  const resolvedFirstName =
    typeof firstName === 'string' && firstName.trim()
      ? firstName.trim()
      : typeof name === 'string' && name.trim()
      ? name.trim().split(' ')[0]
      : '';

  const resolvedLastName =
    typeof lastName === 'string' && lastName.trim()
      ? lastName.trim()
      : typeof name === 'string' && name.trim()
      ? name.trim().split(' ').slice(1).join(' ')
      : '';

  if (!resolvedFirstName) {
    return NextResponse.json({ error: 'First name is required.' }, { status: 400 });
  }
  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  const resolvedSource: ValidSource =
    typeof source === 'string' && (VALID_SOURCES as readonly string[]).includes(source)
      ? (source as ValidSource)
      : 'cta';

  const resolvedInquiryType =
    typeof inquiryType === 'string' &&
    (VALID_INQUIRY_TYPES as readonly string[]).includes(inquiryType)
      ? inquiryType
      : null;

  const payload = {
    data: {
      firstName: resolvedFirstName,
      lastName: resolvedLastName || null,
      email: email.trim().toLowerCase(),
      organization: typeof organization === 'string' && organization.trim() ? organization.trim() : null,
      inquiryType: resolvedInquiryType,
      description: typeof description === 'string' && description.trim() ? description.trim() : null,
      source: resolvedSource,
    },
  };

  try {
    const response = await fetch(`${strapiUrl}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 500);
      return NextResponse.json(
        { error: `CMS rejected the submission (${response.status}).` },
        { status: 502, headers: { 'x-cms-detail': detail } }
      );
    }

    const data = (await response.json()) as { data?: { id?: number; documentId?: string } } | null;
    return NextResponse.json({ id: data?.data?.id, documentId: data?.data?.documentId });
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the CMS. Please try again.' },
      { status: 500 }
    );
  }
}