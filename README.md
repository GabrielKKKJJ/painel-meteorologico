# Painel Meteorológico

Aplicação React — projeto final (Capstone) do curso de Desenvolvimento Web da Jala University. Consulta o clima atual de qualquer cidade via API pública, com tema claro/escuro, roteamento por SPA e um fluxo de autenticação por token.

**Em produção: <https://painel-meteorologico.vercel.app>**

Login de demonstração (rota `/perfil`, protegida): usuário `demo`, senha `demo123`.

Construído incrementalmente ao longo do curso: Semana 3 começou como uma tela única com busca de clima e alternador de tema; Semana 4 transformou isso numa SPA com React Router, tema global via `useContext`, hook personalizado `useFetch` e carregamento preguiçoso da página "Sobre"; Semana 6 acrescentou testes automatizados e o fluxo de autenticação, deixando a aplicação pronta pra produção.

## Como executar

```bash
npm install
npm run dev
```

Acesse o endereço mostrado no terminal (por padrão `http://localhost:5173`).

Para gerar o build de produção: `npm run build` (o resultado vai para `dist/`).

## Testes

```bash
npm install
npm test
```

20 testes (**Vitest**, não Jest — o enunciado cita Jest, mas este é um projeto Vite, e o Vitest é o test runner equivalente para projetos Vite: mesma API `describe`/`test`/`expect`, `vi.fn`/`vi.stubGlobal` no lugar de `jest.fn`/`jest.mock`; React Testing Library + jsdom são os mesmos dos dois). Cobertura: 3 componentes (`SearchBar`, `WeatherDisplay`, `ThemeSwitcher`), o hook `useFetch` (`fetch` mockado com `vi.stubGlobal`, cobrindo sucesso, erro HTTP e falha de rede) e `authApi` (login válido/inválido, `buscarPerfil` com e sem token).

## Autenticação (Semana 6)

Login simulado — o enunciado permite API "real ou simulada", e este app não tem backend de verdade. `src/services/authApi.js` simula uma API REST (latência incluída) e devolve um token no mesmo formato de um JWT. O fluxo completo:

1. **Login** (`/login`): usuário `demo`, senha `demo123` → `AuthProvider` guarda o token no `localStorage` e no `AuthContext`.
2. **Envio do token**: a página `/perfil` (protegida) usa `useFetchAutenticado`, que chama `buscarPerfil(token)`. Essa função monta um `Headers` de verdade (`Authorization: Bearer <token>`) e o "servidor" simulado lê o token **do header**, não de um parâmetro solto — é o mesmo formato que uma chamada `fetch(url, { headers })` real usaria.
3. **Logout**: limpa o token do `localStorage` e do contexto.

Arquivos: `src/services/authApi.js`, `src/context/AuthContext.js` + `AuthProvider.jsx`, `src/hooks/useAuth.js` + `useFetchAutenticado.js`, `src/pages/LoginPage.jsx` + `PerfilPage.jsx`.

## Rotas

| Caminho | Página | Observação |
|---|---|---|
| `/` | `HomePage` | Busca por cidade; ao enviar, navega para `/forecast/<cidade>` |
| `/forecast/:city` | `ForecastPage` | Rota dinâmica; lê a cidade com `useParams` e mostra o clima atual |
| `/about` | `AboutPage` | Carregada sob demanda com `React.lazy` + `Suspense` |
| `/login` | `LoginPage` | Login simulado (Semana 6) |
| `/perfil` | `PerfilPage` | Protegida — exige login; mostra dados buscados com o token |

As cinco ficam aninhadas em uma rota pai com o `AppLayout`, que mostra o cabeçalho (título, navegação e botão de tema) em todas as páginas e renderiza a página atual no `<Outlet />`.

```
<Route path="/" element={<AppLayout />}>
  <Route index element={<HomePage />} />
  <Route path="forecast/:city" element={<ForecastPage />} />
  <Route path="about" element={<AboutPage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="perfil" element={<PerfilPage />} />
</Route>
```

## Estrutura

- `src/main.jsx` — envolve a aplicação com `BrowserRouter`, `ThemeProvider` e `AuthProvider`.
- `src/App.jsx` — definição das rotas e do `Suspense` usado pela rota preguiçosa.
- `src/components/AppLayout.jsx` — layout compartilhado com navegação e `<Outlet />`.
- `src/context/ThemeContext.js` / `ThemeProvider.jsx` — tema claro/escuro global.
- `src/hooks/useFetch.js` — `useFetch(url)` retorna `{ data, isLoading, error }`; com `url` nula não faz requisição.
- `src/pages/` — `HomePage`, `ForecastPage`, `AboutPage`, `LoginPage`, `PerfilPage`.
- `src/components/` — `SearchBar`, `WeatherDisplay`, `ThemeSwitcher`.
- `src/services/weatherApi.js` — monta as URLs da API de clima e formata a resposta.
- `src/services/authApi.js` — login e busca de perfil simulados (Semana 6).
- `src/context/AuthContext.js` / `AuthProvider.jsx`, `src/hooks/useAuth.js` / `useFetchAutenticado.js` — estado de autenticação global.

## Deploy

**Publicado: <https://painel-meteorologico.vercel.app>**

```bash
npm run build
npx vercel --prod      # ou: npx netlify deploy --prod --dir=dist
```

O `vercel.json` na raiz faz o rewrite de SPA (todas as rotas caem em `index.html`), necessário pra `/login`, `/perfil`, `/about` e `/forecast/:city` funcionarem com acesso direto ou F5 — sem isso a Vercel devolve 404 pra qualquer rota que não seja `/`.

## API utilizada

[Open-Meteo](https://open-meteo.com/), gratuita e sem chave de API. A página de previsão faz duas chamadas com `useFetch`: primeiro a geocodificação da cidade e, quando ela retorna, a previsão com a latitude/longitude encontradas.
