// API de autenticacao SIMULADA (o enunciado permite "real ou simulada").
// Sem backend de verdade pro Painel Meteorologico, entao simula a latencia e
// a validacao de credenciais de uma API REST real, devolvendo um token no
// mesmo formato que uma API de verdade devolveria.
const USUARIOS_VALIDOS = [{ usuario: 'demo', senha: 'demo123' }];

function tokenFalso(usuario) {
  // Nao e um JWT assinado de verdade (nao ha backend pra assinar) — so tem o
  // mesmo formato de 3 partes separadas por ponto, pra exercitar o fluxo de
  // armazenar/enviar token como se fosse um JWT real.
  const payload = btoa(JSON.stringify({ usuario, exp: Date.now() + 1000 * 60 * 60 }));
  return `simulado.${payload}.assinatura-fake`;
}

export function login({ usuario, senha }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const valido = USUARIOS_VALIDOS.some((u) => u.usuario === usuario && u.senha === senha);
      if (!valido) {
        reject(new Error('Usuário ou senha inválidos'));
        return;
      }
      resolve({ token: tokenFalso(usuario), usuario });
    }, 300); // latencia simulada, como uma requisicao de rede teria
  });
}

/**
 * "Servidor" simulado: recebe exatamente o que um endpoint real receberia —
 * um objeto Headers — e le o Authorization de la, nao um parametro solto.
 * E a parte que faz o "envio do token" ser de verdade pelo cabecalho, nao
 * so passar o token como argumento de funcao.
 */
function validarAuthorization(headers) {
  const auth = headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : null;
  if (!token || !token.startsWith('simulado.')) {
    throw new Error('Não autenticado (401)');
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now()) {
    throw new Error('Token expirado (401)');
  }
  return payload;
}

/** Busca o "perfil" do usuario autenticado, enviando o token no header Authorization. */
export function buscarPerfil(token) {
  const headers = new Headers({ Authorization: `Bearer ${token ?? ''}` });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const payload = validarAuthorization(headers);
        resolve({ usuario: payload.usuario, buscasFavoritas: ['Recife', 'Lisboa'] });
      } catch (erro) {
        reject(erro);
      }
    }, 200);
  });
}
