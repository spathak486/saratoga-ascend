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
}

async function queryOnce<T>(
  query: string,
  variables: Record<string, unknown> | undefined,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

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
    return fail('NETWORK_ERROR', 0, err instanceof Error ? err.message : 'Network error');
  }
}

function logQueryFailure(result: { error: { message: string; details?: unknown } }) {
  if (process.env.NODE_ENV !== 'development') return;
  const details = result.error.details ?? result.error.message;
  console.error('[GQL] Query errors:', typeof details === 'string' ? details : JSON.stringify(details, null, 2));
}

export const gql = {
  async query<T>(
    query: string,
    variables?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<ApiResult<T>> {
    let result = await queryOnce<T>(query, variables);
    if (result.error?.code === 'NETWORK_ERROR') {
      result = await queryOnce<T>(query, variables);
    }
    if (result.error && !options?.quiet) logQueryFailure(result);
    return result;
  },
};
