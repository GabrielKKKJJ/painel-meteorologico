import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { buscarPerfil } from '../services/authApi';

/**
 * Busca o perfil do usuário autenticado, enviando o token guardado no
 * AuthContext — é o "enviar o token nos cabeçalhos" do fluxo de autenticação,
 * só que contra a API simulada em vez de um header HTTP de verdade (não há
 * requisição de rede real aqui, mas a função recebe o token exatamente como
 * receberia no header Authorization de uma chamada real).
 */
export function useFetchAutenticado() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    let ativo = true;
    setIsLoading(true);
    setError(null);

    buscarPerfil(token)
      .then((perfil) => {
        if (ativo) setData(perfil);
      })
      .catch((erro) => {
        if (ativo) {
          setData(null);
          setError(erro.message);
        }
      })
      .finally(() => {
        if (ativo) setIsLoading(false);
      });

    return () => {
      ativo = false;
    };
  }, [token]);

  return { data, isLoading, error };
}
