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

export const gql = {
  async query<T>(query: string, variables?: Record<string, unknown>): Promise<ApiResult<T>> {
    try {
      const res = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
        },
        body: JSON.stringify({ query, variables }),
      });

      const body = (await res.json()) as GraphQLResponse<T>;

      // GraphQL returns HTTP 200 even on query errors — the errors
      // array is the only reliable failure signal.
      if (body.errors?.length) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[GQL] Query errors:', body.errors);
        }
        return fail('UNKNOWN', res.status, body.errors[0].message, body.errors);
      }

      if (!res.ok || body.data === undefined) {
        return fail('UNKNOWN', res.status, `GraphQL request failed with status ${res.status}`);
      }

      return ok(body.data);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[GQL] Query failed:', err);
      }
      return fail('NETWORK_ERROR', 0, err instanceof Error ? err.message : 'Network error');
    }
  },
};
