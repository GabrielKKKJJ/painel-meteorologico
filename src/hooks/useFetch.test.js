import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useFetch } from './useFetch';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useFetch', () => {
  test('começa com isLoading true e data null quando há url', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); // nunca resolve, só pra checar o estado inicial
    const { result } = renderHook(() => useFetch('https://exemplo.com/api'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('não busca nada quando a url é null', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useFetch(null));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('preenche data e isLoading vira false quando a resposta é ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ cidade: 'Recife' }) }))
    );
    const { result } = renderHook(() => useFetch('https://exemplo.com/api'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual({ cidade: 'Recife' });
    expect(result.current.error).toBe(null);
  });

  test('preenche error quando a resposta HTTP não é ok', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false, status: 404 })));
    const { result } = renderHook(() => useFetch('https://exemplo.com/api'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Erro HTTP 404');
  });

  test('preenche error quando o fetch rejeita (ex.: rede fora do ar)', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Failed to fetch'))));
    const { result } = renderHook(() => useFetch('https://exemplo.com/api'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Failed to fetch');
  });
});
