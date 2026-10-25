# Sprint Plan — Frontend (Next.js / React)

> Stack: TypeScript · React 19 · Next.js 15 (App Router) · Tailwind CSS 4 · Phosphor Icons
> Repositório: `doa-sync` (branches `dev-frontend` / feature branches)
> Referência visual: [`DESIGN-SYSTEM.md`](../frontend/DESIGN-SYSTEM.md)

---

## Estratégia geral

O backend bloqueia o frontend em cada módulo. Para não travar, **use MSW (Mock Service Worker) ou `json-server`** para simular as respostas da API desde o dia 1 de cada sprint. Quando o backend entregar o endpoint real, basta apontar para a URL correta.

---

## Sprint 1 — Setup + Auth + Entidades (27/10 – 02/11)

**Objetivo:** App rodando com login funcional e listagem/cadastro de entidades.

### Tarefas

| # | Tarefa | RF | Estimativa |
|---|---|---|---|
| F1.1 | Setup Next.js 15 (App Router), TypeScript, Tailwind CSS 4, ESLint + Prettier | — | 0,5 dia |
| F1.2 | Configurar cliente HTTP (fetch nativo ou axios) com interceptor de token JWT | RNF-003 | 0,5 dia |
| F1.3 | Configurar MSW para mockar respostas da API durante o desenvolvimento | — | 0,5 dia |
| F1.4 | Implementar design tokens e componentes base do Design System (Button, Input, Card, Badge, Avatar) | RNF-012, RNF-014 | 1 dia |
| F1.5 | Tela de Login (`/login`) — formulário, integração com `POST /api/v1/auth/login`, redirect por tipo | RF-002 | 0,5 dia |
| F1.6 | Tela de Cadastro de Doador (`/cadastro`) — PF e PJ, validação | RF-001 | 1 dia |
| F1.7 | Context/hook de autenticação (`useAuth`), proteção de rotas, logout | RF-002, RF-003 | 0,5 dia |
| F1.8 | Tela de Perfil do usuário (`/perfil`) — visualizar e editar dados | RF-004 | 0,5 dia |
| F1.9 | Página pública de listagem de entidades (`/entidades`) — busca e paginação | RF-008 | 0,5 dia |
| F1.10 | Página pública de detalhe da entidade (`/entidades/[id]`) | RF-008 | 0,5 dia |
| F1.11 | Formulário de cadastro de entidade (`/entidades/nova`) | RF-006 | 0,5 dia |

**Entregáveis da Sprint 1:**
- App rodando em `localhost:3000`
- Fluxo de login/logout funcionando contra a API real (ou mock)
- Páginas públicas de entidades acessíveis

---

## Sprint 2 — Campanhas + Fluxo de Doação (03/11 – 09/11)

**Objetivo:** Vitrine de campanhas completa e fluxo de doação do doador.

### Tarefas

| # | Tarefa | RF | Estimativa |
|---|---|---|---|
| F2.1 | Página inicial com vitrine de campanhas ativas (`/`) — cards com progresso, busca | RF-014, RF-015 | 1 dia |
| F2.2 | Página de detalhe da campanha (`/campanhas/[id]`) — progresso, botão "Doar", compartilhar | RF-015, RF-019 | 0,5 dia |
| F2.3 | Formulário de doação (`/campanhas/[id]/doar`) — valor, PIX (simulado), opção anônima | RF-020, RF-021, RF-023 | 1 dia |
| F2.4 | Tela de confirmação de doação (comprovante) | RF-023, RF-025 | 0,5 dia |
| F2.5 | Painel do doador — histórico de doações (`/minha-conta/doacoes`) | RF-024 | 0,5 dia |
| F2.6 | Painel da entidade — criar campanha (`/painel/campanhas/nova`) | RF-010, RF-012 | 0,5 dia |
| F2.7 | Painel da entidade — editar campanha (`/painel/campanhas/[id]/editar`) | RF-011 | 0,5 dia |
| F2.8 | Painel da entidade — lista de campanhas com status e valor arrecadado (`/painel/campanhas`) | RF-026 | 0,5 dia |
| F2.9 | Painel da entidade — encerrar campanha (ação inline na lista) | RF-013 | 0,5 dia |

**Entregáveis da Sprint 2:**
- Visitante consegue ver campanhas e detalhe sem login
- Doador consegue fazer uma doação do início ao comprovante
- Gestor consegue criar, editar e encerrar campanhas

---

## Sprint 3 — Dashboard Admin + Gestão (10/11 – 16/11)

**Objetivo:** Painel administrativo completo e gestão de entidades/usuários.

### Tarefas

| # | Tarefa | RF | Estimativa |
|---|---|---|---|
| F3.1 | Layout do painel admin (`/admin`) — sidebar, breadcrumb, rotas protegidas | RF-005 | 0,5 dia |
| F3.2 | Dashboard de KPIs (`/admin/dashboard`) — cards com totais, doações do mês | RF-028 | 1 dia |
| F3.3 | Gestão de entidades (`/admin/entidades`) — listar, aprovar, reprovar, desativar | RF-009 | 1 dia |
| F3.4 | Gestão de usuários (`/admin/usuarios`) — listar, filtrar, ativar/desativar | RF-005 | 0,5 dia |
| F3.5 | Painel da entidade — doações recebidas por campanha (`/painel/doacoes`) | RF-027 | 0,5 dia |
| F3.6 | Painel da entidade — arrecadação por período com gráfico simples (`/painel/arrecadacao`) | RF-027 | 1 dia |
| F3.7 | Acessibilidade: revisão WCAG 2.1 AA nas telas principais com Lighthouse/axe | RNF-012 | 0,5 dia |
| F3.8 | Responsividade: ajustes mobile nas telas de campanha e doação | RNF-014 | 0,5 dia |

**Entregáveis da Sprint 3:**
- Admin consegue ver KPIs e gerenciar entidades e usuários
- Gestor consegue ver doações e arrecadação da própria entidade
- Score Lighthouse acessibilidade ≥ 85 nas telas principais

---

## Sprint 4 — Integração, Testes e Ajustes (17/11 – 23/11)

**Objetivo:** Remover mocks, integrar com a API real e fechar bugs.

### Tarefas

| # | Tarefa | Estimativa |
|---|---|---|
| F4.1 | Remover mocks MSW e apontar todas as chamadas para a API de homologação | 1 dia |
| F4.2 | Testes de componentes com Vitest + React Testing Library nos fluxos críticos (login, doação) | 1 dia |
| F4.3 | Tratar todos os estados de erro da API (401, 403, 404, 422, 409) com mensagens amigáveis | RNF-011 — 0,5 dia |
| F4.4 | Configurar `next/image` para otimização de imagens de campanhas | 0,5 dia |
| F4.5 | Build de produção (`npm run build`) sem erros TypeScript | 0,5 dia |
| F4.6 | Smoke test completo no ambiente de homologação | 0,5 dia |

**Entregáveis da Sprint 4:**
- Frontend integrado 100% com a API real
- Build de produção limpo
- Fluxo completo testado em homologação

---

## Convenções obrigatórias

- Nunca chamar o banco diretamente — sempre pela API (RNF-017)
- Usar os tokens do Design System (cores, espaçamento, tipografia) — sem valores hardcoded
- Toda página nova deve ter: título `<h1>`, landmarks HTML, contraste WCAG AA (RNF-012)
- Texto alternativo em todas as imagens de campanha (RNF-013)
- Branch por feature, PR com ao menos 1 aprovação (RNF-019)
