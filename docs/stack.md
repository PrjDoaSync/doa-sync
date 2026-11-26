# Stack Tecnológica — DoaSync MVP

> **Issue #147 — Definição das Stacks**
> Semestre: 2026/2

---

## 1. Visão Geral

Este documento registra as tecnologias, frameworks, ferramentas e serviços escolhidos para o desenvolvimento do MVP do DoaSync, com as respectivas justificativas. As decisões aqui documentadas estão alinhadas com os requisitos não funcionais levantados (RNF-001 a RNF-030) e com os documentos [`arquitetura.md`](./arquitetura.md) e [`DESIGN-SYSTEM.md`](./frontend/DESIGN-SYSTEM.md).

> **Atualização — Task DOC-08 (#187):** revisão para alinhar este documento à implementação real. Frontend corrigido de **Next.js** para **React + Vite** (conforme `web/package.json`, branch `develop`, do repositório [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend)). Inclui esclarecimento sobre a **API Express × Spring Boot** no `doasync-backend` (decisão pendente com a Equipe 2) e atualização do diagrama em [`arquitetura.md`](./arquitetura.md).

---

## 2. Stack do Backend

> **Repositório:** [`doasync-backend`](https://github.com/PrjDoaSync/doasync-backend) (privado) · branch `develop`

O backend oficial do DoaSync é a API Spring Boot. O repositório contém também uma **API Express (Node.js)**, criada como API inicial da Sprint 1 (CAM-T04). Se ela será mantida, convivendo com o Spring Boot, ou descontinuada é uma decisão pendente com a Equipe 2 (ver [decisão pendente PV-Express](#6-decisões-pendentes)).

### 2.1 API Spring Boot (backend oficial)

| Camada | Tecnologia | Versão |
|---|---|---|
| Linguagem | Java | 17 (LTS) |
| Framework principal | Spring Boot | 4.1.1 |
| Build | Maven Wrapper (`./mvnw`) | — |
| Persistência | Spring Data JPA + Hibernate | (incluso no Spring Boot) |
| Segurança | Spring Security + JWT HS256 | (incluso no Spring Boot) |
| Documentação da API | springdoc-openapi (Swagger UI) | latest compatível |
| Banco de dados (dev/teste) | H2 in-memory | — |
| Banco de dados (prod/homol) | PostgreSQL | 16 |
| Containerização | Docker + Docker Compose | — |
| Servidor de aplicação | Tomcat embarcado (via Spring Boot) | — |
| Logs | SLF4J + Logback (incluso no Spring Boot) | — |

#### Justificativas

- **Java 17 (LTS):** versão com suporte de longo prazo, amplamente conhecida pela equipe e compatível com o ecossistema Spring.
- **Spring Boot 4.1.1:** framework maduro com convenções de configuração que reduzem o boilerplate. O ecossistema Spring (Security, Data JPA, Validation) cobre todos os requisitos não funcionais de segurança (RNF-001, RNF-003, RNF-004) e integridade (RNF-007, RNF-008) sem exigir integrações externas adicionais.
- **Maven Wrapper:** garante que todos os membros e o pipeline CI/CD usem a mesma versão do Maven sem instalação manual.
- **Spring Data JPA + Hibernate:** simplifica o acesso ao banco, suporta transações atômicas (RNF-008) e integridade referencial (RNF-007).
- **Spring Security + JWT HS256 stateless:** autenticação sem estado elimina a necessidade de armazenamento de sessão no servidor, facilita escalonamento e está alinhada com o RNF-002 (HTTPS) e RNF-003 (autorização no servidor).
- **springdoc-openapi:** gera automaticamente a documentação OpenAPI/Swagger UI a partir das anotações do código, atendendo ao RNF-018.
- **H2 in-memory:** banco de dados em memória utilizado no ambiente de desenvolvimento e nos testes automatizados, sem necessidade de instalar nada localmente.
- **PostgreSQL 16:** banco relacional robusto para homologação e produção, com suporte a transações ACID, extensões, e boa integração com o ecossistema Spring/JPA (RNF-007, RNF-008).
- **Docker + Docker Compose:** garante ambientes reproduzíveis e isolados para desenvolvimento, homologação e produção (RNF-025), facilitando o onboarding de novos membros e o deploy (RNF-026).

### 2.2 API Express (Node.js) — situação a definir

A API Express (`backend/package.json`, pacote `doasync-campanhas-backend`, Express ^4.21.2) é a **API executável inicial do módulo de Campanhas**, entregue pela Equipe 2 na Sprint 1 (task CAM-T04). Conferido em `backend/src/server.js` (branch `main`):

- expõe só `GET /api/v1/health`, `GET /api/v1/campanhas` e `GET /api/v1/campanhas/:id`, com os mesmos caminhos também na raiz (`/campanhas`);
- lê dados de **fixtures em memória** (`backend/src/data/fixtures.js`) e **não acessa banco**;
- roda na **porta 8080** (`PORT`), a mesma da API Spring Boot. As duas não sobem juntas sem mudar a porta de uma delas.

A relação com a API Spring Boot está pendente de alinhamento com a **Equipe 2**. Enquanto a decisão não for tomada, a API Spring Boot permanece como referência oficial para contratos, testes e integração com o frontend.

> **Decisão pendente PV-Express** — ver §6. O resultado desta decisão deve ser registrado nesta seção e refletido no diagrama de [`arquitetura.md`](./arquitetura.md).

---

## 3. Stack do Frontend

> **Repositório:** [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend) · branch `develop` · código em `web/`
> Versões conferidas em `web/package.json` (branch `develop`).

### 3.1 Frontend Web (implementado)

| Camada | Tecnologia | Versão (`web/package.json`) |
|---|---|---|
| Linguagem | JavaScript / JSX | — (Node.js 24 pedido pelo `web/README.md`; o CI usa Node.js 22) |
| Framework Web | React | ^19.3.1 |
| Bundler / dev server | Vite + `@vitejs/plugin-react` | ^8.3.4 / ^6.1.2 |
| Roteamento | React Router DOM | ^7.18.4 |
| HTTP client | Axios | ^1.20.0 |
| Estilização | CSS próprio (`index.css`) | — |
| Tipografia | Fonte Inter auto-hospedada (`web/public/fonts`, `InterVariable.woff2`, carregada por `src/styles/fonts.css`) | — |
| Lint | oxlint | ^1.88.0 |
| Testes | Vitest + React Testing Library + `@testing-library/user-event` | ^5.0.5 / ^16.3.3 / ^14.6.8 |
| Ambiente de testes (DOM) | jsdom | ^29.1.1 |
| Design e prototipagem | Figma | — |

> **Situação atual:** a vitrine pública (Home, Explorar e Detalhe da campanha) já consome a API Spring Boot pelo hook `useCampanhasPublicas`, desde o PR #143 do `doasync-frontend` (24/11/2026). A URL base vem de `VITE_API_URL`, com padrão `http://localhost:8080/api/v1` (`web/.env.example`, `src/services/config.js`). A área de gestão (doador, entidade e administrador) ainda usa dados do `DemoProvider` em memória.

> **Mobile:** o escopo mobile (mencionado em issues do projeto) não está implementado neste repositório. Não há `React Native` nem `Expo` no `web/package.json`.

### 3.2 Justificativas

- **React 19 + Vite:** React é familiar à equipe; Vite oferece servidor de desenvolvimento rápido (HMR instantâneo), build otimizado via Rollup e configuração mínima — adequado para o perfil do time e do projeto.
- **JavaScript/JSX (sem TypeScript):** a equipe optou por JS puro para reduzir a curva de entrada e agilizar as entregas do MVP. TypeScript pode ser adotado em fases posteriores.
- **React Router 7:** roteamento client-side declarativo, compatível com o modelo de SPA adotado.
- **Axios:** cliente HTTP com suporte a interceptores, cancelamento e tratamento de erros centralizado, utilizado pelos services que consumirão a API Spring Boot.
- **CSS próprio:** estilização via arquivo `index.css` escrito pela equipe. Tailwind CSS consta do Design System planejado mas não foi adicionado ao projeto.
- **Fonte Inter auto-hospedada:** a tipografia do Design System é servida pelo próprio front (`web/public/fonts`), sem depender de CDN externa.
- **oxlint:** linter de alta performance para JavaScript/React, substitui ESLint+Prettier no repositório frontend atual.
- **Vitest + React Testing Library + user-event + jsdom:** stack de testes unitários compatível com o ambiente Vite, sem necessidade de configuração adicional de servidor de testes. O `user-event` simula interações reais do usuário (digitação, cliques).
- **Figma:** ferramenta de design colaborativo para criação dos protótipos e do Design System visual, referenciada em [`DESIGN-SYSTEM.md`](./frontend/DESIGN-SYSTEM.md).

---

## 4. Banco de Dados

| Aspecto | Tecnologia |
|---|---|
| Banco de produção/homologação | PostgreSQL 16 |
| Banco de desenvolvimento/testes | H2 in-memory |
| Migração de schema | Flyway (configurado; migrações V1 a V6 em `db/migration`) |
| ORM | Hibernate (via Spring Data JPA) |

### Justificativas

- **PostgreSQL 16:** banco relacional open-source com suporte completo a ACID, restrições de integridade (chaves estrangeiras, unique constraints), tipos avançados e extensões. Atende os RNFs de integridade (RNF-007), consistência transacional (RNF-008) e backup (RNF-030).
- **H2 in-memory:** simplifica o ciclo de desenvolvimento local e testes automatizados, sem depender de infraestrutura externa. O Spring Boot alterna automaticamente entre H2 e PostgreSQL pelo perfil de ambiente.
- **Flyway:** ferramenta de migração de schema versionada. Garante que as estruturas do banco sejam reproduzíveis e rastreadas no controle de versão em todos os ambientes (RNF-025). Já está configurado no `doasync-backend` (`spring.flyway.locations=classpath:db/migration`), com as migrações V1 a V6. A V5 é uma migração em Java (`db/migration/V5__campanha_status_agendada.java`).

---

## 5. Ferramentas de Desenvolvimento

### 5.1 Controle de versão e colaboração

| Ferramenta | Uso |
|---|---|
| Git | Controle de versão local |
| GitHub | Hospedagem do repositório, Issues, Pull Requests e Projects |
| GitHub Actions | Pipeline CI/CD (build, lint, testes automáticos por PR) |

**Justificativa:** GitHub é a plataforma já adotada pelo projeto e centraliza gestão de issues (incluindo esta #147), code review e CI/CD em um único lugar, reduzindo o número de ferramentas externas. O fluxo de branches com PR obrigatório atende ao RNF-019.

### 5.2 Qualidade de código

| Ferramenta | Uso |
|---|---|
| oxlint | Lint do JavaScript/React no frontend (substitui ESLint+Prettier no repositório atual) |
| Checkstyle ou Spotless | Verificação de estilo Java (backend) |
| SonarLint (IDE) | Análise estática local durante o desenvolvimento |

**Justificativa:** oxlint é o linter adotado pelo time de frontend (`.oxlintrc.json` em `web/`), com desempenho superior ao ESLint para projetos JavaScript. No backend Java, a verificação de estilo é executada automaticamente no pipeline e bloqueia merge em caso de violação (RNF-020, RNF-024).

### 5.3 Testes

| Ferramenta | Uso |
|---|---|
| JUnit 5 + Mockito | Testes unitários e de integração no backend |
| `@SpringBootTest` + MockMvc + H2 | Testes de integração dos endpoints REST |
| Postman / Insomnia | Testes manuais e exploratórios de API (Grupo 5 — QA) |
| RestAssured | Testes automatizados de contrato de API (Grupo 5 — QA) |
| Vitest + React Testing Library + jsdom | Testes unitários de componentes React (executados via `npm test` no CI) |
| Cypress | Testes E2E no frontend (em estudo pelo Grupo 5) |

**Justificativa:** A cobertura em camadas (unitário → integração → API → E2E) atende aos RNFs de testabilidade (RNF-022, RNF-023) e garante que novas entregas não quebrem funcionalidades existentes (testes de regressão). O pipeline frontend (`frontend-qa.yml`) executa `npm ci → lint → test → build` automaticamente em push e PR.

### 5.4 Documentação

| Ferramenta | Uso |
|---|---|
| Markdown (`.md`) | Documentação técnica no repositório |
| springdoc-openapi / Swagger UI | Documentação interativa da API REST |
| Figma | Protótipos e Design System visual |

### 5.5 Ambiente e infraestrutura

| Ferramenta | Uso |
|---|---|
| Docker + Docker Compose | Containerização e orquestração local dos serviços |
| GitHub Actions | CI/CD: build, lint e testes por PR; deploy automático por merge |

**Justificativa:** Docker garante que todos os membros trabalhem com o mesmo ambiente, eliminando divergências de configuração local. GitHub Actions centraliza o pipeline sem necessidade de servidor CI externo (RNF-024, RNF-026).

---

## 6. Decisões Pendentes

| ID | Decisão | Impacto |
|---|---|---|
| **PV-Express** | **Papel da API Express no `doasync-backend`** (API inicial da Sprint 1, CAM-T04): manter em paralelo ao Spring Boot ou descontinuar — **a ser definido com a Equipe 2** | Determina se existe uma segunda camada de backend, se o frontend deve apontar para ela e se ela precisa ser documentada e testada pelo QA. Hoje as duas usam a porta 8080 |
| PV01 | Gateway de pagamento (PIX ou outro) | O fluxo de doação atual é simulado; a integração com pagamento real depende desta definição |
| PV-PG-version | Versão fixa do PostgreSQL no Docker Compose | Reproducibilidade do build em todos os ambientes |
| PV05 | Envio de e-mail (recuperação de senha, confirmação de doação) | Define o provider de e-mail (ex.: SendGrid, SES, SMTP próprio) |
| PV06 | Exportação de relatórios (CSV/Excel) | Pode exigir biblioteca adicional no backend (ex.: Apache POI para Excel) |
| PV-Mobile | Escopo e tecnologia da frente mobile | O MVP web está implementado; React Native/Expo foi planejado mas não iniciado neste repositório |

---

## 7. Checklist da Issue #147 / DOC-08

- [x] Definir stack do backend
- [x] Definir stack do frontend
- [x] Definir banco de dados
- [x] Definir ferramentas de desenvolvimento
- [x] Documentar as tecnologias escolhidas e suas justificativas
- [x] **DOC-08:** Corrigir frontend de Next.js para React + Vite (versões conferidas em `web/package.json`, branch `develop`)
- [x] **DOC-08:** Registrar situação da API Express vs Spring Boot (PV-Express, decisão com Equipe 2)
- [x] **DOC-08:** Atualizar diagrama em `arquitetura.md` para refletir componentes reais

---

## Referências

- [`arquitetura.md`](./arquitetura.md) — Arquitetura da aplicação (diagramas, camadas, fluxos, segurança)
- [`DESIGN-SYSTEM.md`](./frontend/DESIGN-SYSTEM.md) — Guia visual, tokens e componentes do frontend
- [`requisitos.md`](./requisitos.md) — Requisitos funcionais (RF) e não funcionais (RNF)
- [`contrato-api.md`](./backend/contrato-api.md) — Contrato detalhado dos endpoints REST
