import { useCallback, useState } from 'react';
import { AuthContext } from './AuthContext';
import { login as loginApi } from '../services/authApi';

const CHAVE_TOKEN = 'painel-meteorologico:token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(CHAVE_TOKEN));

  const login = useCallback(async (usuario, senha) => {
    const { token: novoToken } = await loginApi({ usuario, senha });
    localStorage.setItem(CHAVE_TOKEN, novoToken);
    setToken(novoToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CHAVE_TOKEN);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, autenticado: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
