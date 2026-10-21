# Stack Tecnológica — DoaSync MVP

> **Issue #147 — Definição das Stacks**
> Semestre: 2026/2

---

## 1. Visão Geral

Este documento registra as tecnologias, frameworks, ferramentas e serviços escolhidos para o desenvolvimento do MVP do DoaSync, com as respectivas justificativas. As decisões aqui documentadas estão alinhadas com os requisitos não funcionais levantados (RNF-001 a RNF-030) e com os documentos [`arquitetura.md`](./arquitetura.md) e [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

---

## 2. Stack do Backend

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

### Justificativas

- **Java 17 (LTS):** versão com suporte de longo prazo, amplamente conhecida pela equipe e compatível com o ecossistema Spring.
- **Spring Boot 4.1.1:** framework maduro com convenções de configuração que reduzem o boilerplate. O ecossistema Spring (Security, Data JPA, Validation) cobre todos os requisitos não funcionais de segurança (RNF-001, RNF-003, RNF-004) e integridade (RNF-007, RNF-008) sem exigir integrações externas adicionais.
- **Maven Wrapper:** garante que todos os membros e o pipeline CI/CD usem a mesma versão do Maven sem instalação manual.
- **Spring Data JPA + Hibernate:** simplifica o acesso ao banco, suporta transações atômicas (RNF-008) e integridade referencial (RNF-007).
- **Spring Security + JWT HS256 stateless:** autenticação sem estado elimina a necessidade de armazenamento de sessão no servidor, facilita escalonamento e está alinhada com o RNF-002 (HTTPS) e RNF-003 (autorização no servidor).
- **springdoc-openapi:** gera automaticamente a documentação OpenAPI/Swagger UI a partir das anotações do código, atendendo ao RNF-018.
- **H2 in-memory:** banco de dados em memória utilizado no ambiente de desenvolvimento e nos testes automatizados, sem necessidade de instalar nada localmente.
- **PostgreSQL 16:** banco relacional robusto para homologação e produção, com suporte a transações ACID, extensões, e boa integração com o ecossistema Spring/JPA (RNF-007, RNF-008).
- **Docker + Docker Compose:** garante ambientes reproduzíveis e isolados para desenvolvimento, homologação e produção (RNF-025), facilitando o onboarding de novos membros e o deploy (RNF-026).

---

## 3. Stack do Frontend

| Camada | Tecnologia | Versão |
|---|---|---|
| Linguagem | TypeScript | 5.x |
| Framework Web | React | 19.x |
| Meta-framework Web | Next.js | 15.x (App Router) |
| Framework Mobile | React Native + Expo | latest stable |
| Estilização | Tailwind CSS | 4.x |
| Ícones | Phosphor Icons | latest |
| Tipografia | Inter (Google Fonts) | — |
| Design e prototipagem | Figma | — |

### Justificativas

- **TypeScript:** tipagem estática reduz erros em tempo de desenvolvimento e melhora a manutenibilidade em projetos com múltiplos colaboradores.
- **React + Next.js (App Router):** React é dominante no mercado e familiar à equipe; Next.js adiciona renderização híbrida (SSR/SSG), roteamento e otimizações de imagem nativos, melhorando desempenho e SEO das campanhas públicas.
- **React Native + Expo:** reutiliza a familiaridade com React para o desenvolvimento mobile, e o Expo acelera a configuração inicial e o build para iOS/Android sem necessidade de ferramentas nativas complexas.
- **Tailwind CSS:** sistema de utilitários de CSS que implementa diretamente os design tokens do projeto (espaçamento, cores, tipografia) sem CSS arbitrário, mantendo consistência visual entre os times (RNF-012, RNF-014). É a fonte de verdade de medidas do [Design System](./DESIGN-SYSTEM.md).
- **Phosphor Icons:** biblioteca de ícones com variantes consistentes e suporte nativo para React e React Native, evitando dependências paralelas para web e mobile.
- **Inter:** tipografia humanista de alta legibilidade, adequada para dashboards de dados e interfaces de doação (RNF-010, RNF-012).
- **Figma:** ferramenta de design colaborativo para criação dos protótipos e do Design System visual, referenciada em [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

---

## 4. Banco de Dados

| Aspecto | Tecnologia |
|---|---|
| Banco de produção/homologação | PostgreSQL 16 |
| Banco de desenvolvimento/testes | H2 in-memory |
| Migração de schema | Flyway *(a configurar antes do primeiro deploy em produção)* |
| ORM | Hibernate (via Spring Data JPA) |

### Justificativas

- **PostgreSQL 16:** banco relacional open-source com suporte completo a ACID, restrições de integridade (chaves estrangeiras, unique constraints), tipos avançados e extensões. Atende os RNFs de integridade (RNF-007), consistência transacional (RNF-008) e backup (RNF-030).
- **H2 in-memory:** simplifica o ciclo de desenvolvimento local e testes automatizados, sem depender de infraestrutura externa. O Spring Boot alterna automaticamente entre H2 e PostgreSQL pelo perfil de ambiente.
- **Flyway:** ferramenta de migração de schema versionada. Garante que as estruturas do banco sejam reproduzíveis e rastreadas no controle de versão em todos os ambientes (RNF-025). *(Configuração pendente — PV Flyway no [`arquitetura.md`](./arquitetura.md))*

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
| ESLint + Prettier | Lint e formatação do TypeScript/React (frontend) |
| Checkstyle ou Spotless | Verificação de estilo Java (backend) |
| SonarLint (IDE) | Análise estática local durante o desenvolvimento |

**Justificativa:** Ferramentas de lint garantem padrão de código uniforme entre equipes com níveis técnicos variados (RNF-020). A verificação é executada automaticamente no pipeline e bloqueia merge em caso de violação (RNF-024).

### 5.3 Testes

| Ferramenta | Uso |
|---|---|
| JUnit 5 + Mockito | Testes unitários e de integração no backend |
| `@SpringBootTest` + MockMvc + H2 | Testes de integração dos endpoints REST |
| Postman / Insomnia | Testes manuais e exploratórios de API (Grupo 5 — QA) |
| RestAssured | Testes automatizados de contrato de API (Grupo 5 — QA) |
| Cypress | Testes funcionais end-to-end no frontend (em estudo — Grupo 5) |
| Vitest + React Testing Library | Testes unitários de componentes React |

**Justificativa:** A cobertura em camadas (unitário → integração → API → E2E) atende aos RNFs de testabilidade (RNF-022, RNF-023) e garante que novas entregas não quebrem funcionalidades existentes (testes de regressão).

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
| PV01 | Gateway de pagamento (PIX ou outro) | O fluxo de doação atual é simulado; a integração com pagamento real depende desta definição |
| PV-Flyway | Configuração do Flyway para migração de schema | Necessário antes do primeiro deploy em produção com PostgreSQL |
| PV-PG-version | Versão fixa do PostgreSQL no Docker Compose | Reproducibilidade do build em todos os ambientes |
| PV05 | Envio de e-mail (recuperação de senha, confirmação de doação) | Define o provider de e-mail (ex.: SendGrid, SES, SMTP próprio) |
| PV06 | Exportação de relatórios (CSV/Excel) | Pode exigir biblioteca adicional no backend (ex.: Apache POI para Excel) |

---

## 7. Checklist da Issue #147

- [x] Definir stack do backend
- [x] Definir stack do frontend
- [x] Definir banco de dados
- [x] Definir ferramentas de desenvolvimento
- [x] Documentar as tecnologias escolhidas e suas justificativas

---

## Referências

- [`arquitetura.md`](./arquitetura.md) — Arquitetura da aplicação (diagramas, camadas, fluxos, segurança)
- [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) — Guia visual, tokens e componentes do frontend
- [`requisitos.md`](./requisitos.md) — Requisitos funcionais (RF) e não funcionais (RNF)
- [`rotas-api.md`](./rotas-api.md) — Contrato detalhado dos endpoints REST
