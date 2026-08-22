import 'server-only';
import { type ApiResult, ok, fail } from '@/lib/schemas/common';
import { strapiUrl, strapiToken } from './config';

// REST is for mutations, uploads, and custom endpoints — content reads
// go through graphql.ts instead.

function authHeaders(): HeadersInit {
  return strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {};
}

function errorFromResponse<T>(status: number, body: unknown): ApiResult<T> {
  const strapiError =
    typeof body === 'object' && body !== null && 'error' in body
      ? (body as { error?: { message?: string; details?: unknown } }).error
      : undefined;

  return fail(
    status === 404 ? 'NOT_FOUND' : 'UNKNOWN',
    status,
    strapiError?.message ?? `Request failed with status ${status}`,
    strapiError?.details
  );
}

async function request<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${strapiUrl}/api${path}`, init);
    const body = await res.json().catch(() => null);

    if (!res.ok) return errorFromResponse(res.status, body);
    return ok(body as T);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[REST] ${init.method} ${path} failed:`, err);
    }
    return fail('NETWORK_ERROR', 0, err instanceof Error ? err.message : 'Network error');
  }
}

export const rest = {
  get<T>(path: string, params?: Record<string, string>) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return request<T>(`${path}${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    });
  },

  post<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body: unknown) {
    return request<T>(path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    });
  },

  delete(path: string) {
    return request<null>(path, { method: 'DELETE', headers: authHeaders() });
  },

  // No Content-Type here — fetch sets the multipart boundary itself.
  upload<T>(path: string, formData: FormData) {
    return request<T>(path, { method: 'POST', headers: authHeaders(), body: formData });
  },
};
