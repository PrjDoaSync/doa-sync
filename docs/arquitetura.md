# Arquitetura da Aplicação — DoaSync

> **Task 150 — Definição da Arquitetura da Aplicação**
> Responsável: Grupo 5 — Qualidade de Software
> Semestre: 2026/2
>
> **Atualização — Task DOC-08 (#187):** diagrama e tabelas corrigidos para refletir a implementação real. Frontend atualizado de React + Next.js para **React + Vite** (SPA); API Express no `doasync-backend` registrada como componente com situação a definir junto à Equipe 2.

---

## 1. Visão Geral

O DoaSync é uma plataforma web de arrecadação de doações que conecta doadores a entidades assistenciais (APAE e Associação Amor Inclusivo como foco inicial). A arquitetura segue o modelo **cliente-servidor desacoplado**, com front-end e back-end independentes que se comunicam exclusivamente via API REST.

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTES                             │
│                                                             │
│   ┌───────────────────────────────────────────────────┐     │
│   │  Web (React 19 + Vite 8)                          │     │
│   │  React Router 7 · Axios · CSS próprio             │     │
│   │  Integração com backend: pendente (DemoProvider)  │     │
│   └──────────────────────────┬────────────────────────┘     │
└─────────────────────────────-│──────────────────────────────┘
                               │  HTTPS / REST (JSON)
                               │  VITE_API_URL → :8080/api
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              BACK-END — doasync-backend (privado)           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Spring Boot 4.1.1  (backend oficial)            │   │
│  │  Java 17 · Maven · /api/v1                           │   │
│  │                                                      │   │
│  │  Spring Security (JWT HS256 · Stateless)             │   │
│  ├──────────┬──────────┬──────────┬──────────┬──────────┤   │
│  │ usuario  │ entidade │ campanha │  doacao  │dashboard │   │
│  │ /auth    │          │          │          │ /kpis    │   │
│  ├──────────┴──────────┴──────────┴──────────┴──────────┤   │
│  │           shared (envelope · erros · paginação)      │   │
│  └──────────────────────────┬───────────────────────────┘   │
│                             │  JPA / Hibernate               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Express (Node.js) — situação a definir          │   │
│  │  Papel: provisório · paralelo · ou descontinuado?    │   │
│  │  ⚠ Decisão pendente com Equipe 2 (PV-Express)       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────│───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       BANCO DE DADOS                        │
│                                                             │
│  PostgreSQL (produção / homologação)                        │
│  H2 in-memory (desenvolvimento e testes — Spring Boot)      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Camadas da Aplicação

### 2.1 Front-end

> Repositório: [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend) · branch `develop` · código em `web/`
> Versões conferidas em `web/package.json` (branch `develop`).

| Aspecto | Tecnologia | Versão |
|---|---|---|
| Linguagem | JavaScript / JSX | Node.js 24 requerido |
| Framework Web | React | ^19.3.1 |
| Bundler / dev server | Vite + `@vitejs/plugin-react` | ^8.3.4 / ^6.1.2 |
| Roteamento | React Router DOM | ^7.18.4 |
| HTTP client | Axios | ^1.20.0 |
| Estilização | CSS próprio (`index.css`) | — |
| Lint | oxlint | ^1.88.0 |
| Testes | Vitest + React Testing Library + jsdom | ^5.0.5 / ^16.3.3 / ^29.1.1 |
| Design e prototipagem | Figma | — |

O front-end **não acessa o banco diretamente**; todos os dados chegam via chamadas à API REST do back-end (RNF-017). A integração com a API Spring Boot (`VITE_API_URL=http://localhost:8080/api`) está declarada nos services Axios, mas ainda **não foi ativada** — o frontend opera com um `DemoProvider` em memória.

> **Nota:** TypeScript, Next.js (SSR/SSG), Tailwind CSS, React Native e Expo estavam no plano original mas **não estão no repositório atual** (branch `develop`). O escopo mobile permanece planejado, sem implementação neste repositório.

### 2.2 Back-end

| Aspecto | Tecnologia |
|---|---|
| Framework | Spring Boot 4.1.1 |
| Linguagem | Java 17 |
| Build | Maven Wrapper (`./mvnw`) |
| Persistência | Spring Data JPA + Hibernate |
| Segurança | Spring Security + JWT HS256 (stateless) |
| Documentação da API | springdoc-openapi (Swagger UI) |
| Banco (dev/teste) | H2 in-memory |
| Banco (prod/homol) | PostgreSQL |
| Containerização | Docker Compose |

#### Estrutura de pacotes

```
com.doasync.backend
├── shared/       → envelope de resposta, paginação, exceções, handler global de erros
├── security/     → configuração JWT, filtro de autenticação, usuário autenticado
├── usuario/      → Usuario, PessoaFisica, PessoaJuridica, autenticação, perfil
├── entidade/     → Entidade assistencial (cadastro, aprovação, desativação)
├── campanha/     → Campanhas de arrecadação (criar, publicar, encerrar)
├── doacao/       → Fluxo de doação (registrar, comprovante, histórico)
└── dashboard/    → Indicadores (KPIs) para o administrador
```

#### Padrão de camadas por módulo

```
Controller (HTTP · DTO · validação)
      │
      ▼
   Service (regras de negócio · orquestração)
      │
      ▼
 Repository (JPA · consultas ao banco)
      │
      ▼
 Entidade de domínio (regras de estado encapsuladas na própria entidade)
```

### 2.3 API Express (Node.js) — situação a definir

O repositório `doasync-backend` contém, além da API Spring Boot, uma **API Express (Node.js)**. A relação entre as duas está pendente de alinhamento com a **Equipe 2 (backend de campanhas)**:

| Hipótese | Descrição |
|---|---|
| **Provisória** | A API Express foi criada como ponte enquanto a API Spring Boot não estava funcional; será descontinuada quando o Spring Boot cobrir todos os endpoints necessários |
| **Paralela** | A API Express é responsável por um subconjunto específico de rotas (ex.: campanhas da Equipe 2) e convive com o Spring Boot |
| **Descontinuada** | A API Express não está mais em uso ativo e pode ser removida |

> **Decisão pendente PV-Express:** a Equipe 2 deve registrar a decisão nesta seção e em [`stack.md`](./stack.md) §6. Enquanto não há decisão, a API Spring Boot (`/api/v1`) é a referência oficial para contratos, testes do QA e integração com o frontend.

### 2.4 Banco de Dados

O modelo de dados central gira em torno das seguintes entidades:

| Entidade | Descrição |
|---|---|
| `Usuario` | Conta de acesso (PF, PJ, Entidade ou Admin) |
| `PessoaFisica` | Especialização com CPF e data de nascimento |
| `PessoaJuridica` | Especialização com CNPJ e razão social |
| `Entidade` | Organização assistencial beneficiada |
| `Campanha` | Iniciativa de arrecadação vinculada a uma entidade |
| `Doacao` | Registro de contribuição de um doador a uma campanha ou entidade |

Regras de integridade garantidas pelo banco (RNF-007):
- Toda `Doacao` referencia um `Usuario` doador e uma `Campanha` ou `Entidade` existentes.
- Toda `Campanha` referencia uma `Entidade` existente.
- Operações de registro de doação e atualização do valor arrecadado são **atômicas** (RNF-008).

---

## 3. API REST

### 3.1 Convenções

| Aspecto | Padrão adotado |
|---|---|
| Prefixo | `/api/v1` |
| Formato dos recursos | Plural em português (`entidades`, `campanhas`, `doacoes`) |
| IDs | UUID |
| Datas | `yyyy-MM-dd` |
| Instantes | ISO-8601 UTC (`2026-10-07T21:30:00Z`) |
| Valores monetários | Número decimal (`150.00`) |
| Resposta de sucesso (item) | `{ "message": "...", "data": { } }` |
| Resposta de sucesso (lista) | `{ "data": [...], "meta": { total, page, limit, totalPages } }` |
| Paginação | `page` (base 1, padrão 1) · `limit` (padrão 10, máximo 50) |
| Erro de validação | `422` + `{ "erros": { "campo": "mensagem" } }` |
| Erro de conflito | `409` + `{ "erros": { ... } }` |
| Erro genérico | `{ "error": "mensagem" }` (400 · 401 · 403 · 404 · 500) |
| Documentação | OpenAPI / Swagger UI em `/swagger-ui.html` |

### 3.2 Endpoints do MVP (Sprint 1)

| # | Método | Rota | Acesso |
|---|---|---|---|
| 1 | POST | `/api/v1/auth/login` | Público |
| 2 | POST | `/api/v1/doadores` | Público |
| 3 | GET | `/api/v1/usuarios/me` | Autenticado |
| 4 | PATCH | `/api/v1/usuarios/me` | Autenticado |
| 5 | GET | `/api/v1/usuarios/me/doacoes` | Doador (PF/PJ) |
| 6 | GET | `/api/v1/entidades` | Público |
| 7 | POST | `/api/v1/entidades` | Público |
| 8 | GET | `/api/v1/entidades/{id}` | Público (aprovadas) |
| 9 | PATCH | `/api/v1/entidades/{id}` | Dono ou Admin |
| 10 | PATCH | `/api/v1/entidades/{id}/status` | Admin |
| 11 | GET | `/api/v1/entidades/{id}/doacoes` | Dono ou Admin |
| 12 | GET | `/api/v1/entidades/{id}/arrecadacao` | Dono ou Admin |
| 13 | GET | `/api/v1/campanhas` | Público |
| 14 | GET | `/api/v1/campanhas/{id}` | Público |
| 15 | POST | `/api/v1/campanhas` | Entidade aprovada |
| 16 | PATCH | `/api/v1/campanhas/{id}` | Entidade dona |
| 17 | PATCH | `/api/v1/campanhas/{id}/status` | Dono / Admin |
| 18 | POST | `/api/v1/doacoes` | Doador (PF/PJ) |
| 19 | GET | `/api/v1/doacoes/{id}` | Doador · Entidade · Admin |
| 20 | GET | `/api/v1/dashboard/kpis` | Admin |
| 21 | GET | `/api/v1/usuarios` | Admin |
| 22 | PATCH | `/api/v1/usuarios/{id}/status` | Admin |

> Contrato completo com exemplos de request/response: [`rotas-api.md`](./rotas-api.md)

---

## 4. Segurança e Autenticação

### 4.1 Autenticação

- **Mecanismo:** JWT HS256, sessão stateless (sem cookies, sem CSRF).
- **Validade do token:** 8 horas (configurável via `doasync.jwt.expiracao`).
- **Claims do token:** `sub` (ID do usuário), `tipo`, `entidadeId`.
- **Segredo:** variável de ambiente `DOASYNC_JWT_SEGREDO` em produção.
- **Logout:** feito pelo cliente descartando o token. Sem endpoint de logout no servidor (JWT stateless).

### 4.2 Perfis de usuário

| Perfil | Descrição |
|---|---|
| `PESSOA_FISICA` | Doador pessoa física |
| `PESSOA_JURIDICA` | Doador pessoa jurídica |
| `ENTIDADE` | Gestor de entidade assistencial |
| `ADMIN` | Administrador da plataforma |

### 4.3 Regras de acesso

- Senhas armazenadas apenas como hash (bcrypt/Argon2) — RNF-001.
- Toda comunicação em produção via HTTPS — RNF-002.
- Permissões verificadas na API, nunca só no front-end — RNF-003.
- Usuário `INATIVO` não autentica e perde acesso mesmo com token válido.
- Ownership validado nos services: um token válido não dá acesso a recursos de terceiros.
- Admin não pode desativar a si mesmo.

---

## 5. Atores e Permissões

```
Visitante (não autenticado)
  └── Visualiza campanhas ativas e perfis públicos de entidades

Doador (PESSOA_FISICA / PESSOA_JURIDICA)
  ├── Tudo que o visitante pode
  ├── Realiza doações
  ├── Consulta histórico e comprovantes próprios
  └── Edita o próprio perfil

Gestor de Entidade (ENTIDADE)
  ├── Cria, edita, publica e encerra campanhas da própria entidade
  ├── Consulta doações recebidas e arrecadação da própria entidade
  └── Edita dados institucionais da própria entidade

Administrador (ADMIN)
  ├── Aprova, reprova e desativa entidades
  ├── Desativa e reativa campanhas
  ├── Ativa e desativa usuários
  ├── Consulta dashboard de KPIs (visão global)
  └── Visualiza doações de qualquer entidade
```

---

## 6. Fluxos Principais

### 6.1 Cadastro e acesso

```
Visitante → POST /doadores → Cria conta → POST /auth/login → Recebe token JWT
```

### 6.2 Fluxo de doação

```
Doador → GET /campanhas → Escolhe campanha → POST /doacoes
       → Doação registrada como CONFIRMADA → GET /doacoes/{id} (comprovante)
```

### 6.3 Ciclo de vida da campanha

```
Gestor → POST /campanhas (status: ATIVA)
       → PATCH /campanhas/{id} (editar)
       → PATCH /campanhas/{id}/status (ENCERRADA)
```

### 6.4 Aprovação de entidade

```
Entidade → POST /entidades (status: PENDENTE)
Admin   → PATCH /entidades/{id}/status (APROVADA / REPROVADA / INATIVA)
```

---

## 7. Ambientes

| Ambiente | Banco | Finalidade |
|---|---|---|
| Desenvolvimento local | H2 in-memory | Desenvolvimento e testes unitários/integração |
| Homologação | PostgreSQL | Validação com usuários e testes do QA |
| Produção | PostgreSQL | Uso real |

- Cada ambiente tem banco separado (RNF-025).
- Deploy automático via pipeline CI/CD (RNF-026).
- A branch principal é protegida: exige PR com ao menos uma aprovação (RNF-019).

---

## 8. Pipeline CI/CD

```
Pull Request aberto
      │
      ▼
  GitHub Actions
  ├── Lint (verificação de estilo — RNF-020)
  ├── Build (`./mvnw package`)
  └── Testes automatizados (`./mvnw test`)
      │
      ├── ✅ Aprovado → merge liberado
      └── ❌ Falhou → merge bloqueado (RNF-024)

Merge na branch de deploy
      │
      ▼
  Deploy automático (homologação ou produção — RNF-026)
```

---

## 9. Estratégia de Testes

Responsabilidade compartilhada entre os grupos de desenvolvimento e o **Grupo 5 (QA)**.

| Tipo de teste | Ferramenta | Escopo |
|---|---|---|
| Testes de integração da API | `@SpringBootTest` + MockMvc + H2 | Todos os endpoints do back-end |
| Testes de API (QA) | Postman / RestAssured | Contrato dos endpoints, happy path e erros |
| Testes funcionais | Cypress / Selenium | Fluxos completos no front-end |
| Testes de usabilidade | Manual com usuários reais | Fluxo de doação (RNF-010) |
| Testes de regressão | Executados a cada PR | Garantia de que entregas novas não quebram as anteriores |

Fluxo de implementação TDD por prioridade:

| Fluxo | Conteúdo |
|---|---|
| F0 | Base: configuração, envelope, handler de erros, segurança JWT |
| F1 | Cadastro de doador + login + `/usuarios/me` |
| F2 | Entidades (cadastro, perfil, edição, status) |
| F3 | Campanhas (criar, listar, detalhe, editar, status) |
| F4 | Doações (realizar, idempotência, comprovante, histórico, arrecadação) |
| F5 | Admin: KPIs + gestão de usuários |

---

## 10. Decisões Pendentes de Validação

| ID | Decisão | Impacto |
|---|---|---|
| PV01 | Gateway de pagamento PIX (ou outro meio) | Fluxo da doação passa de simulado para real |
| PV05 | Envio de e-mail para recuperação de senha | Habilitação da rota de recuperação de senha |
| PV06 | Exportação de relatórios (CSV/Excel) | Endpoint `POST /relatorios/exportar` |
| — | Flyway/Liquibase para migração de schema | Necessário antes do primeiro deploy em produção |
| — | Versão fixa do PostgreSQL no Docker Compose | Reproducibilidade do build |

---

## 11. Checklist de Arquitetura

- [x] Front-end e back-end desacoplados (RNF-017)
- [x] API REST com padrão único de rotas, códigos HTTP e envelope de resposta (RNF-016)
- [x] Autenticação stateless via JWT (RNF-002, RNF-003)
- [x] Senhas armazenadas como hash (RNF-001)
- [x] Permissões verificadas no servidor (RNF-003)
- [x] Validação de entradas na API (RNF-004)
- [x] Dados pessoais de doadores não expostos publicamente (RNF-006)
- [x] Integridade referencial garantida pelo banco (RNF-007)
- [x] Consistência transacional nas doações (RNF-008)
- [x] Paginação nas listagens (RNF-028)
- [x] Documentação OpenAPI de todos os endpoints (RNF-018)
- [x] Versionamento com branches e PR obrigatório (RNF-019)
- [x] Ambientes separados (dev, homologação, produção) (RNF-025)
- [x] CI/CD com build, lint e testes automáticos por PR (RNF-024)
- [x] Suporte a múltiplas entidades por configuração, sem mudança de código (RNF-027)
- [x] **DOC-08:** Diagrama e tabelas atualizados para a stack real (React + Vite, sem Next.js/Tailwind/Mobile)
- [x] **DOC-08:** API Express registrada como componente com decisão pendente (PV-Express, Equipe 2)
- [ ] Decisão sobre API Express registrada com Equipe 2 (PV-Express)
- [ ] Flyway/Liquibase para migração de schema
- [ ] Gateway de pagamento definido (PV01)
- [ ] Deploy automático configurado (RNF-026)
- [ ] Backup automático do banco de produção (RNF-030)
- [ ] Integração frontend ↔ API Spring Boot ativada (substituir DemoProvider)

---

## Referências

- [`requisitos.md`](./requisitos.md) — Requisitos funcionais (RF) e não funcionais (RNF)
- [`rotas-api.md`](./rotas-api.md) — Contrato detalhado dos endpoints com exemplos
- [`routes-plan.md`](./routes-plan.md) — Planejamento das rotas, decisões e problemas identificados
- [`DESIGN-SYSTEM.md`](./frontend/DESIGN-SYSTEM.md) — Guia visual e componentes do front-end
- [`DER.png`](./DER.png) — Diagrama entidade-relacionamento
