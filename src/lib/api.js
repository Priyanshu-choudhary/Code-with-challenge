/**
 * Centralized API utility.
 * Every fetch in the app should use these helpers so auth headers,
 * base URL, and error handling are consistent.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

/**
 * Core wrapper around fetch. Throws on non-2xx responses.
 */
async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

  const res = await fetch(url, {
    method,
    headers: authHeaders(headers),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${method} ${path} → ${res.status}: ${text}`);
  }

  // Return null for 204 No Content
  if (res.status === 204) return null;

  return res.json();
}

export const api = {
  get:    (path, opts)       => request(path, { ...opts, method: 'GET' }),
  post:   (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put:    (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch:  (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts)       => request(path, { ...opts, method: 'DELETE' }),
};

export { BASE_URL, getToken, authHeaders };
