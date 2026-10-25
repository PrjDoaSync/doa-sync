# Sprint Plan — Backend (Java / Spring Boot)

> Stack: Java 17 · Spring Boot 4.1.1 · Maven · JPA · Spring Security · JWT
> Repositório: `doasync-backend`
> Referência de contrato: [`rotas-api.md`](../backend/rotas-api.md)

---

## Sprint 1 — Base + Auth + Entidades (27/10 – 02/11)

**Objetivo:** API no ar com autenticação funcional e CRUD de entidades. Isso desbloqueia o frontend e o QA.

### Tarefas

| # | Tarefa | RF/RNF | Estimativa |
|---|---|---|---|
| B1.1 | Setup do projeto: corrigir `contextLoads`, remover Spring Cloud Config, ajustar `application.yml` para H2 (dev) e PostgreSQL (prod) | — | 0,5 dia |
| B1.2 | Configurar Docker Compose com PostgreSQL fixo (`postgres:16`) e variáveis de ambiente | RNF-025 | 0,5 dia |
| B1.3 | Configurar Flyway e criar migration V1 com schema inicial (todas as tabelas) | RNF-007 | 1 dia |
| B1.4 | Implementar `shared/`: envelope de resposta, paginação, handler global de erros, exceções | RNF-016 | 0,5 dia |
| B1.5 | Implementar `security/`: configuração JWT HS256, filtro de autenticação, `UserDetailsService` | RNF-001, RNF-002, RNF-003 | 1 dia |
| B1.6 | `POST /api/v1/auth/login` — autenticar e devolver token + perfil | RF-002 | 0,5 dia |
| B1.7 | `POST /api/v1/doadores` — cadastro PF e PJ | RF-001 | 1 dia |
| B1.8 | `GET/PATCH /api/v1/usuarios/me` — perfil próprio | RF-004 | 0,5 dia |
| B1.9 | `GET/POST /api/v1/entidades` — listar e cadastrar | RF-006, RF-008 | 1 dia |
| B1.10 | `GET/PATCH /api/v1/entidades/{id}` — perfil e edição | RF-008, RF-009 | 0,5 dia |
| B1.11 | `PATCH /api/v1/entidades/{id}/status` — aprovação admin | RF-009 | 0,5 dia |
| B1.12 | Configurar springdoc-openapi (Swagger UI em `/swagger-ui.html`) | RNF-018 | 0,5 dia |

**Entregáveis da Sprint 1:**
- API rodando localmente com Docker Compose
- Endpoints 1–10 do contrato funcionando
- Swagger UI acessível
- Migrations V1 no Flyway

---

## Sprint 2 — Campanhas + Doações + Histórico (03/11 – 09/11)

**Objetivo:** Implementar o núcleo de negócio — campanhas e doações. Esse é o diferencial do produto.

### Tarefas

| # | Tarefa | RF/RNF | Estimativa |
|---|---|---|---|
| B2.1 | `GET /api/v1/campanhas` — listar campanhas públicas com paginação e filtros | RF-014, RF-016, RF-017 | 1 dia |
| B2.2 | `GET /api/v1/campanhas/{id}` — detalhe com progresso (`percentualAtingido`) | RF-015 | 0,5 dia |
| B2.3 | `POST /api/v1/campanhas` — criar campanha (ENTIDADE aprovada) | RF-010, RF-012 | 1 dia |
| B2.4 | `PATCH /api/v1/campanhas/{id}` — editar campanha ATIVA | RF-011 | 0,5 dia |
| B2.5 | `PATCH /api/v1/campanhas/{id}/status` — encerrar (dono) / desativar-reativar (admin) | RF-013 | 0,5 dia |
| B2.6 | `POST /api/v1/doacoes` — registrar doação (campanha ou direto, idempotência, pagamento simulado) | RF-020, RF-021, RF-022, RF-023, RNF-008 | 1,5 dia |
| B2.7 | `GET /api/v1/doacoes/{id}` — comprovante | RF-025 | 0,5 dia |
| B2.8 | `GET /api/v1/usuarios/me/doacoes` — histórico do doador | RF-024 | 0,5 dia |
| B2.9 | `GET /api/v1/entidades/{id}/doacoes` — doações recebidas pela entidade | RF-027 | 0,5 dia |
| B2.10 | `GET /api/v1/entidades/{id}/arrecadacao` — total por período e por campanha | RF-027 | 0,5 dia |
| B2.11 | Flyway migration V2: adicionar tabela `idempotency_keys` se necessário | RNF-008 | 0,5 dia |

**Entregáveis da Sprint 2:**
- Endpoints 11–19 do contrato funcionando
- Fluxo completo: entidade aprovada → cria campanha → doador doa → comprovante disponível

---

## Sprint 3 — Dashboard + Gestão Admin (10/11 – 16/11)

**Objetivo:** Fechar a API com o painel administrativo e testes de integração.

### Tarefas

| # | Tarefa | RF/RNF | Estimativa |
|---|---|---|---|
| B3.1 | `GET /api/v1/dashboard/kpis` — indicadores gerais (Admin) | RF-028 | 1 dia |
| B3.2 | `GET /api/v1/usuarios` — listar usuários com filtros (Admin) | RF-005 | 0,5 dia |
| B3.3 | `PATCH /api/v1/usuarios/{id}/status` — ativar/desativar usuário (Admin) | RF-005 | 0,5 dia |
| B3.4 | Testes de integração Fluxo F0–F2 (`@SpringBootTest` + MockMvc + H2) | RNF-022 | 1 dia |
| B3.5 | Testes de integração Fluxo F3–F5 (campanhas, doações, dashboard) | RNF-022, RNF-023 | 1 dia |
| B3.6 | Revisão de segurança: ownership checks, usuário INATIVO, admin não desativa a si mesmo | RNF-003 | 0,5 dia |
| B3.7 | Revisar e completar documentação Swagger de todos os endpoints | RNF-018 | 0,5 dia |

**Entregáveis da Sprint 3:**
- Endpoints 20–22 do contrato funcionando
- Suíte de testes de integração verde
- API completa documentada no Swagger

---

## Sprint 4 — Estabilização + Deploy (17/11 – 23/11)

**Objetivo:** Fechar bugs, preparar deploy e garantir que o pipeline CI/CD está verde.

### Tarefas

| # | Tarefa | RF/RNF | Estimativa |
|---|---|---|---|
| B4.1 | Corrigir todos os bugs reportados pelo QA e pelo frontend | — | 1,5 dia |
| B4.2 | Configurar pipeline GitHub Actions (build + lint + testes por PR) | RNF-024 | 0,5 dia |
| B4.3 | Configurar deploy automático para homologação (merge na branch de homologação) | RNF-026 | 1 dia |
| B4.4 | Testar migration Flyway em ambiente PostgreSQL real (não H2) | RNF-025 | 0,5 dia |
| B4.5 | Configurar variáveis de ambiente de produção (`DOASYNC_JWT_SEGREDO`, `DB_URL`, etc.) | RNF-002 | 0,5 dia |
| B4.6 | Smoke test pós-deploy: fluxo completo em homologação | — | 0,5 dia |

**Entregáveis da Sprint 4:**
- API deployada em homologação
- Pipeline CI/CD verde
- Zero bugs críticos abertos

---

## Convenções obrigatórias

- Toda rota nova segue o contrato de [`rotas-api.md`](../backend/rotas-api.md) — sem improvisar campos
- Branch por feature, PR obrigatório com ao menos 1 aprovação (RNF-019)
- Testes de integração na mesma PR da feature
- Senha nunca em texto puro, nunca em log (RNF-001, RNF-029)
