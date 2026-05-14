/**
 * Unit tests: src/lib/api.js
 *
 * Tests the centralized API utility — auth headers, error handling, methods.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api, authHeaders, getToken } from '../lib/api';

describe('api utility', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('getToken returns null when not set', () => {
    expect(getToken()).toBeNull();
  });

  it('getToken returns stored token', () => {
    localStorage.setItem('token', 'my-jwt');
    expect(getToken()).toBe('my-jwt');
  });

  it('authHeaders includes Bearer token when set', () => {
    localStorage.setItem('token', 'abc123');
    const headers = authHeaders();
    expect(headers.Authorization).toBe('Bearer abc123');
  });

  it('authHeaders omits Authorization when no token', () => {
    const headers = authHeaders();
    expect(headers.Authorization).toBeUndefined();
  });

  it('api.get calls fetch with GET method', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: 'ok' }),
    });

    const result = await api.get('/test');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({ method: 'GET' })
    );
    expect(result).toEqual({ data: 'ok' });
  });

  it('api.post sends JSON body', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ created: true }),
    });

    await api.post('/items', { name: 'Widget' });

    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.method).toBe('POST');
    expect(opts.body).toBe(JSON.stringify({ name: 'Widget' }));
  });

  it('api.delete uses DELETE method', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => null,
    });

    await api.delete('/items/1');
    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.method).toBe('DELETE');
  });

  it('throws on non-2xx responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not found',
    });

    await expect(api.get('/missing')).rejects.toThrow('404');
  });

  it('throws on 500 server error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    });

    await expect(api.post('/crash', {})).rejects.toThrow('500');
  });

  it('returns null for 204 No Content', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => { throw new Error('no body'); },
    });

    const result = await api.delete('/items/1');
    expect(result).toBeNull();
  });
});
