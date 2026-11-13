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

/** Mimecast sometimes returns `/graphql&X-MC-...` instead of `/graphql?X-MC-...`. */
function normalizeRedirectUrl(location: string | string[], base: URL): string {
  const raw = Array.isArray(location) ? location[0] : location;
  const next = new URL(raw, base);
  if (!next.search && next.pathname.includes('&')) {
    const amp = next.pathname.indexOf('&');
    next.search = `?${next.pathname.slice(amp + 1)}`;
    next.pathname = next.pathname.slice(0, amp);
  }
  return next.toString();
}

async function insecureCmsPost(
  body: string,
  headers: Record<string, string>,
  url = graphqlUrl,
  redirectsLeft = 5,
): Promise<Response> {
  const https = await import(/* webpackIgnore: true */ 'node:https');
  const http = await import(/* webpackIgnore: true */ 'node:http');
  const target = new URL(url);
  const payload = Buffer.from(body);
  const transport = target.protocol === 'http:' ? http : https;

  return new Promise((resolve, reject) => {
    const req = transport.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || (target.protocol === 'http:' ? 80 : 443),
        path: `${target.pathname}${target.search}`,
        method: 'POST',
        headers: {
          ...headers,
          'Content-Length': String(payload.length),
          Host: target.host,
        },
        rejectUnauthorized: false,
      },
      (res) => {
        const status = res.statusCode ?? 500;
        const location = res.headers.location ?? res.headers.Location;
        if (
          location &&
          redirectsLeft > 0 &&
          status >= 300 &&
          status < 400
        ) {
          res.resume();
          const nextUrl = normalizeRedirectUrl(location, target);
          resolve(insecureCmsPost(body, headers, nextUrl, redirectsLeft - 1));
          return;
        }

        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          resolve(new Response(Buffer.concat(chunks), { status }));
        });
      },
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function shouldBypassTls(): boolean {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0'
  );
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
    const useInsecure = insecure || shouldBypassTls();
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
      useInsecure,
    );

    const raw = await res.text();
    let body: GraphQLResponse<T>;
    try {
      body = JSON.parse(raw) as GraphQLResponse<T>;
    } catch {
      const preview = raw.trim().slice(0, 180);
      return fail(
        'NETWORK_ERROR',
        res.status,
        preview || `GraphQL response was not JSON (status ${res.status})`,
      );
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

function logQueryFailure(result: {
  error: { code?: string; message: string; details?: unknown };
}) {
  if (process.env.NODE_ENV !== 'development') return;
  const details = result.error.details ?? result.error.message;
  const text = typeof details === 'string' ? details : JSON.stringify(details, null, 2);
  // Draft reads, the public CMS gateway, TLS/proxy noise, and a CMS the
  // dev machine cannot reach already fall back. console.error would open
  // the Next.js overlay for these expected local misses.
  const expectedMiss =
    result.error.code === 'NETWORK_ERROR' ||
    text.includes('Forbidden access') ||
    text.includes('Method Not Allowed') ||
    text.includes('GraphQL response was not JSON') ||
    text.includes('fetch failed') ||
    text.includes('Network error') ||
    text.trimStart().startsWith('<');
  if (expectedMiss) {
    console.warn('[GQL]', result.error.message);
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
