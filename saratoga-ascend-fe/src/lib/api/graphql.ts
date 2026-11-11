import 'server-only';
import { type ApiResult, ok, fail } from '@/lib/schemas/common';
import { graphqlUrl, strapiToken } from './config';

// GraphQL is for content reads — query exactly the fields you need,
// including nested relations, in a single request. Not for file
// uploads or custom REST-only endpoints (use client.ts for those).

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

interface QueryOptions {
  /** Skip the dev overlay log. Used for the draft probe that retries as published. */
  quiet?: boolean;
  /** Dev-only retry after the machine cannot verify the CMS certificate. */
  insecure?: boolean;
}

async function insecureCmsPost(body: string, headers: Record<string, string>): Promise<Response> {
  const { request } = await import(/* webpackIgnore: true */ 'node:https');
  const target = new URL(graphqlUrl);
  const payload = Buffer.from(body);

  return new Promise((resolve, reject) => {
    const req = request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || 443,
        path: `${target.pathname}${target.search}`,
        method: 'POST',
        headers: {
          ...headers,
          'Content-Length': payload.length,
        },
        rejectUnauthorized: false,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          resolve(new Response(Buffer.concat(chunks), { status: res.statusCode ?? 500 }));
        });
      },
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function cmsFetch(init: RequestInit, insecure: boolean): Promise<Response> {
  if (!insecure) return fetch(graphqlUrl, init);
  const headers = Object.fromEntries(new Headers(init.headers).entries());
  return insecureCmsPost(typeof init.body === 'string' ? init.body : '', headers);
}

async function queryOnce<T>(
  query: string,
  variables: Record<string, unknown> | undefined,
  insecure = false,
): Promise<ApiResult<T>> {
  try {
    const res = await cmsFetch(
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
        },
        body: JSON.stringify({ query, variables }),
        // Dev must not keep a Forbidden GraphQL body. Strapi returns HTTP 200
        // for that error, and Next would reuse it for the revalidate window.
        ...(process.env.NODE_ENV === 'development'
          ? { cache: 'no-store' as const }
          : { next: { revalidate: 60 } }),
      },
      insecure,
    );

    const raw = await res.text();
    let body: GraphQLResponse<T>;
    try {
      body = JSON.parse(raw) as GraphQLResponse<T>;
    } catch {
      return fail('NETWORK_ERROR', res.status, raw.slice(0, 180) || 'GraphQL response was not JSON');
    }

    // GraphQL returns HTTP 200 even on query errors — the errors
    // array is the only reliable failure signal.
    if (body.errors?.length) {
      return fail('UNKNOWN', res.status, body.errors[0].message, body.errors);
    }

    if (!res.ok || body.data === undefined) {
      return fail('UNKNOWN', res.status, `GraphQL request failed with status ${res.status}`);
    }

    return ok(body.data);
  } catch (err) {
    const cause =
      err instanceof Error && err.cause && typeof err.cause === 'object'
        ? (err.cause as { code?: string; message?: string })
        : undefined;
    const causeText = [cause?.code, cause?.message].filter(Boolean).join(' ');
    const message = err instanceof Error ? err.message : 'Network error';
    return fail('NETWORK_ERROR', 0, causeText ? `${message}: ${causeText}` : message);
  }
}

function logQueryFailure(result: { error: { message: string; details?: unknown } }) {
  if (process.env.NODE_ENV !== 'development') return;
  const details = result.error.details ?? result.error.message;
  const text = typeof details === 'string' ? details : JSON.stringify(details, null, 2);
  // Draft reads, the public CMS gateway, and a CMS the dev machine cannot
  // reach already fall back. These must not open the Next.js error overlay.
  const expectedMiss =
    text.includes('Forbidden access') ||
    text === 'Method Not Allowed' ||
    text === 'fetch failed' ||
    text === 'Network error';
  if (expectedMiss) {
    console.warn('[GQL]', text);
    return;
  }
  console.error('[GQL] Query errors:', text);
}

export const gql = {
  async query<T>(
    query: string,
    variables?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<ApiResult<T>> {
    let result = await queryOnce<T>(query, variables);
    if (
      process.env.NODE_ENV === 'development' &&
      result.error?.code === 'NETWORK_ERROR' &&
      /fetch failed|UNABLE_TO_GET_ISSUER_CERT_LOCALLY|certificate/i.test(result.error.message)
    ) {
      result = await queryOnce<T>(query, variables, true);
    } else if (result.error?.code === 'NETWORK_ERROR') {
      result = await queryOnce<T>(query, variables);
    }
    if (result.error && !options?.quiet) logQueryFailure(result);
    return result;
  },
};
