import { authClient } from '@/lib/auth-client';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error('Please log in to continue');
    headers.Authorization = `Bearer ${data.token}`;
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Something went wrong');
  return json;
}