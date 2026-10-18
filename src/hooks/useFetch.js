import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // url null = ainda nao ha o que buscar (ex.: esperando outra requisicao)
    if (!url) return;

    let ativo = true;
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((resposta) => {
        if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
        return resposta.json();
      })
      .then((json) => {
        if (ativo) setData(json);
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
  }, [url]);

  return { data, isLoading, error };
}
