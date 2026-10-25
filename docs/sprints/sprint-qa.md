# Sprint Plan — QA, Testes e CI/CD

> Stack: JUnit 5 · MockMvc · RestAssured · Vitest · React Testing Library · Cypress · GitHub Actions
> Responsabilidade: Grupo 5 — Qualidade de Software
> Referência: [`cenarios-testes-api.md`](../backend/cenarios-testes-api.md)

---

## Postura geral

Com 1 mês e zero código, o QA não pode esperar o produto pronto para testar. A estratégia é **shift-left** agressivo:

1. **Sprint 1–2:** escrever os testes de integração da API junto com (ou antes de) o backend — TDD.
2. **Sprint 2–3:** coleção Postman/RestAssured rodando contra a API real conforme os endpoints ficam prontos.
3. **Sprint 3–4:** testes E2E com Cypress nos fluxos principais; testes de componente no frontend.
4. **Sprint 4:** pipeline CI/CD verde e relatório final de qualidade.

---

## Sprint 1 — Setup de Qualidade + Testes da Base (27/10 – 02/11)

### Tarefas

| # | Tarefa | RNF | Estimativa |
|---|---|---|---|
| Q1.1 | Configurar `@SpringBootTest` + MockMvc + H2 no backend (perfil `test`) | RNF-022 | 0,5 dia |
| Q1.2 | Escrever testes de integração: `POST /auth/login` — happy path, credenciais inválidas, usuário inativo | RNF-022 | 0,5 dia |
| Q1.3 | Escrever testes de integração: `POST /doadores` — PF, PJ, e-mail duplicado, CPF/CNPJ inválido | RNF-022 | 0,5 dia |
| Q1.4 | Escrever testes de integração: `GET/PATCH /usuarios/me` — autenticado e não autenticado | RNF-022 | 0,5 dia |
| Q1.5 | Escrever testes de integração: `GET/POST /entidades` e `PATCH /entidades/{id}/status` | RNF-022 | 1 dia |
| Q1.6 | Criar coleção Postman com os endpoints da Sprint 1 (variável `{{baseUrl}}` configurável) | — | 0,5 dia |
| Q1.7 | Configurar ESLint + Prettier no frontend e verificar que `npm run lint` passa | RNF-020 | 0,5 dia |

**Entregáveis da Sprint 1:**
- Suíte de testes dos endpoints 1–10 passando no pipeline
- Coleção Postman com cenários de sucesso e erro para a Sprint 1

---

## Sprint 2 — Testes de Campanhas e Doações (03/11 – 09/11)

### Tarefas

| # | Tarefa | RNF | Estimativa |
|---|---|---|---|
| Q2.1 | Testes de integração: `GET/POST /campanhas` — criar, listar ativas, listar com filtros | RNF-022 | 0,5 dia |
| Q2.2 | Testes de integração: `PATCH /campanhas/{id}` e `PATCH /campanhas/{id}/status` — transições de estado | RNF-022 | 0,5 dia |
| Q2.3 | Testes de integração: `POST /doacoes` — para campanha, para entidade, anônima, idempotência | RNF-022, RNF-008 | 1 dia |
| Q2.4 | Testes de integração: `GET /doacoes/{id}` — acesso do doador, da entidade, do admin, de terceiro | RNF-022 | 0,5 dia |
| Q2.5 | Testes de integração: `GET /usuarios/me/doacoes` e `GET /entidades/{id}/doacoes` | RNF-022 | 0,5 dia |
| Q2.6 | Testes de integração: `GET /entidades/{id}/arrecadacao` — por período, valores corretos | RNF-022, RNF-023 | 0,5 dia |
| Q2.7 | Atualizar coleção Postman com endpoints da Sprint 2 | — | 0,5 dia |
| Q2.8 | Revisar cenários de segurança: token de outro usuário acessando recurso alheio → `403` | RNF-003 | 0,5 dia |

**Entregáveis da Sprint 2:**
- Suíte de testes dos endpoints 11–19 passando
- Cenário de idempotência de doação testado e documentado
- Revisão de segurança (ownership) coberta por testes

---

## Sprint 3 — Dashboard, Testes E2E e Pipeline (10/11 – 16/11)

### Tarefas

| # | Tarefa | RNF | Estimativa |
|---|---|---|---|
| Q3.1 | Testes de integração: `GET /dashboard/kpis`, `GET /usuarios`, `PATCH /usuarios/{id}/status` | RNF-022 | 0,5 dia |
| Q3.2 | Teste de integração E2E no backend: fluxo completo campanha → doação → KPI refletido | RNF-023 | 1 dia |
| Q3.3 | Configurar Cypress no frontend | RNF-022 | 0,5 dia |
| Q3.4 | Teste Cypress: fluxo de doação (login → campanha → doar → comprovante) | RNF-022 | 1 dia |
| Q3.5 | Teste Cypress: fluxo admin (login admin → aprovar entidade → ver KPI) | RNF-022 | 0,5 dia |
| Q3.6 | Configurar GitHub Actions: job de testes backend (`./mvnw test`) | RNF-024 | 0,5 dia |
| Q3.7 | Configurar GitHub Actions: job de lint + build frontend (`npm run lint && npm run build`) | RNF-024 | 0,5 dia |

**Entregáveis da Sprint 3:**
- Pipeline CI com 3 jobs: build-backend, test-backend, build-frontend
- 2 fluxos E2E com Cypress passando
- Teste de integração ponta a ponta do fluxo principal verde

---

## Sprint 4 — Estabilização, Relatório e Deploy (17/11 – 23/11)

### Tarefas

| # | Tarefa | RNF | Estimativa |
|---|---|---|---|
| Q4.1 | Executar todos os testes RestAssured contra a API de homologação | RNF-022 | 0,5 dia |
| Q4.2 | Executar testes Cypress contra o frontend de homologação | RNF-022 | 0,5 dia |
| Q4.3 | Revisar acessibilidade com Lighthouse nas telas: home, detalhe campanha, fluxo doação | RNF-012 | 0,5 dia |
| Q4.4 | Configurar proteção de branch no GitHub (bloquear push direto em `main`, exigir PR + aprovação) | RNF-019 | 0,5 dia |
| Q4.5 | Documentar todos os cenários de teste executados na Sprint 4 | RNF-021 | 0,5 dia |
| Q4.6 | Produzir relatório final de qualidade (cobertura, bugs encontrados/corrigidos, pendências) | RNF-021 | 1 dia |

**Entregáveis da Sprint 4:**
- Pipeline CI/CD 100% verde em `main`
- Relatório final de QA com cobertura e pendências
- Branch `main` protegida

---

## Mapa de cobertura por endpoint

| Endpoint | Integração (backend) | Postman/RestAssured | Cypress (E2E) |
|---|---|---|---|
| `POST /auth/login` | Sprint 1 | Sprint 1 | Sprint 3 |
| `POST /doadores` | Sprint 1 | Sprint 1 | — |
| `GET/PATCH /usuarios/me` | Sprint 1 | Sprint 1 | — |
| `GET/POST /entidades` | Sprint 1 | Sprint 1 | Sprint 3 |
| `PATCH /entidades/{id}/status` | Sprint 1 | Sprint 1 | Sprint 3 |
| `GET/POST /campanhas` | Sprint 2 | Sprint 2 | Sprint 3 |
| `POST /doacoes` | Sprint 2 | Sprint 2 | Sprint 3 |
| `GET /doacoes/{id}` | Sprint 2 | Sprint 2 | Sprint 3 |
| `GET /dashboard/kpis` | Sprint 3 | Sprint 3 | Sprint 3 |
| `GET/PATCH /usuarios` | Sprint 3 | Sprint 3 | — |

---

## Convenções obrigatórias

- Nenhum endpoint vai para `main` sem testes de integração verdes
- Testes precisam cobrir: happy path + pelo menos 2 casos de erro (validação e autorização)
- Contrato dos testes segue exatamente `rotas-api.md` — não testar comportamentos não especificados
- Relatório de bug abre Issue no GitHub com: reprodução, payload, resposta esperada vs. real
