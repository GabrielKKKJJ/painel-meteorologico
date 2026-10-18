import { describe, expect, test } from 'vitest';
import { login, buscarPerfil } from './authApi';

describe('authApi', () => {
  test('login com credenciais corretas devolve um token', async () => {
    const { token, usuario } = await login({ usuario: 'demo', senha: 'demo123' });
    expect(usuario).toBe('demo');
    expect(token.startsWith('simulado.')).toBe(true);
  });

  test('login com credenciais erradas rejeita', async () => {
    await expect(login({ usuario: 'demo', senha: 'errada' })).rejects.toThrow('Usuário ou senha inválidos');
  });

  test('buscarPerfil manda o token no header Authorization e recebe o perfil', async () => {
    const { token } = await login({ usuario: 'demo', senha: 'demo123' });
    const perfil = await buscarPerfil(token);
    expect(perfil.usuario).toBe('demo');
    expect(perfil.buscasFavoritas).toContain('Recife');
  });

  test('buscarPerfil sem token rejeita como não autenticado', async () => {
    await expect(buscarPerfil(null)).rejects.toThrow('Não autenticado (401)');
  });

  test('buscarPerfil com token malformado rejeita', async () => {
    await expect(buscarPerfil('token-qualquer')).rejects.toThrow('Não autenticado (401)');
  });
});
