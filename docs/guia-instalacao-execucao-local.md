# Guia de Instalação e Execução Local (Front + Back)

> **DOC-11 — Issue #190** · Equipe de Documentação · Semestre 2026/2

Este guia leva uma pessoa que nunca viu o projeto a subir o **back-end (API Spring Boot)** e o **front-end (React + Vite)** na própria máquina, usando só as instruções abaixo.

O guia descreve o código **vigente** da branch `develop` dos repositórios `doasync-backend` e `doasync-frontend`, conforme a stack oficial em [`stack.md`](./stack.md). A branch `dev-backend` (.NET, semestre anterior) **não** faz parte do projeto atual e não é usada aqui.

## 1. Visão geral

| Parte | Repositório | Pasta do projeto | Tecnologia | Porta local |
|---|---|---|---|---|
| API (back-end) | [`doasync-backend`](https://github.com/PrjDoaSync/doasync-backend) | `backend/` | Java 17, Spring Boot 4.1.1, Maven Wrapper, Flyway, H2 ou PostgreSQL 16 | 8080 |
| Web (front-end) | [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend) | `web/` | React 19, Vite 8, JavaScript/JSX, Axios, Vitest | 5173 |

Dois pontos que evitam confusão:

- No `doasync-backend`, a pasta `backend/` contém **duas aplicações**: a API Spring Boot (oficial, `pom.xml`) e uma API Node/Express anterior (`package.json`, `src/server.js`). A situação da Express está em decisão (PV-Express, ver [`stack.md`](./stack.md)). **Use a Spring Boot**. As duas usam a porta 8080 e não devem rodar juntas.
- **Hoje o front não consome a API.** As telas usam dados de demonstração em memória. O guia sobe os dois lados para que a integração possa ser feita, mas você não verá dados da API na tela do front (ver seção 6).

## 2. Pré-requisitos

| Ferramenta | Versão | Obrigatória para | Como verificar |
|---|---|---|---|
| Git | recente | clonar | `git --version` |
| JDK | **17** (Temurin ou equivalente) | back-end | `java -version` |
| Node.js | **22** (testado) ou 24 (indicada no README do front) | front-end | `node --version` |
| npm | acompanha o Node.js | front-end | `npm --version` |
| Docker + Docker Compose | recente | só o caminho B (seção 4.3) | `docker --version` e `docker compose version` |
| PostgreSQL | 16 | só o caminho C (seção 4.4) | `psql --version` |

Não é preciso instalar o Maven: o **Maven Wrapper** (`mvnw`) baixa a versão correta (3.9.16) na primeira execução. Isso exige internet e leva alguns minutos.

O `doasync-backend` é um repositório **privado**: peça ao líder do grupo para ser adicionado à organização `PrjDoaSync` antes de clonar.

## 3. Obter o código

A branch de trabalho de ambos os repositórios é a `develop`.

```bash
git clone --branch develop https://github.com/PrjDoaSync/doasync-backend.git
git clone --branch develop https://github.com/PrjDoaSync/doasync-frontend.git
```

Estrutura que importa:

```text
doasync-backend/
└── backend/              ← projeto Spring Boot (pom.xml, mvnw, compose.yaml, Dockerfile)
    └── src/main/resources/   application*.properties e db/migration (Flyway)

doasync-frontend/
└── web/                  ← aplicação React + Vite (package.json, .env.example)
```

Para atualizar depois: `git pull` dentro de cada repositório.

## 4. Back-end (API Spring Boot)

Todos os comandos desta seção são executados dentro de `doasync-backend/backend/`.

### 4.1 Perfis do Spring

O comportamento muda conforme os **perfis** ativos:

| Perfil | Banco | Uso | Observações |
|---|---|---|---|
| `dev` | H2 **em memória** (apagado ao parar) | Desenvolvimento no dia a dia | Liga o servidor HTTP, o Swagger e cria um administrador de desenvolvimento. Segredo JWT de desenvolvimento embutido. |
| `consulta` | — | Complemento | Liga o servidor HTTP em `127.0.0.1:8080` e libera CORS para `http://localhost:5173` e `http://127.0.0.1:5173`. |
| `local` | H2 em **arquivo** (`backend/data/`, ignorado pelo Git) | Dados persistentes locais sem PostgreSQL | **Sozinho não abre HTTP.** Combine com `consulta` (`local,consulta`). Não cria administrador. |
| `postgres` | PostgreSQL via variáveis `DB_URL`, `DB_USER`, `DB_PASSWORD` | Usar um PostgreSQL próprio | Não define segredo JWT: é preciso informar `DOASYNC_JWT_SEGREDO`. Combine com `consulta` para HTTP local. |
| `prod` | PostgreSQL | Homologação, produção e Docker Compose | Exige `DOASYNC_JWT_SEGREDO` e, se não houver administrador no banco, `ADMIN_EMAIL` e `ADMIN_PASSWORD`. |
| `test` | H2 | Testes automatizados | Usado pelo Maven. Não ative à mão. |

O comando `./mvnw spring-boot:run` ativa `dev,consulta` por padrão (definido no `pom.xml`). O banco é criado e versionado pelas migrations do **Flyway** (`db/migration`, V1 a V4), aplicadas automaticamente ao subir.

### 4.2 Caminho A — Início rápido com H2 (recomendado)

Não precisa de banco nem de Docker.

**Linux/macOS (Bash):**

```bash
cd doasync-backend/backend
chmod +x mvnw            # só na primeira vez
./mvnw spring-boot:run
```

**Windows (PowerShell):**

```powershell
cd doasync-backend\backend
.\mvnw.cmd spring-boot:run
```

A primeira execução baixa o Maven e as dependências e leva alguns minutos. A API está pronta quando o log terminar de iniciar a aplicação Spring e as URLs abaixo responderem. Para parar, use `Ctrl+C`.

| O quê | URL |
|---|---|
| Swagger UI (documentação interativa) | http://localhost:8080/swagger-ui.html |
| Especificação OpenAPI (JSON) | http://localhost:8080/v3/api-docs |
| Listagem de campanhas | http://localhost:8080/api/v1/campanhas |

Resultado esperado em `/api/v1/campanhas` com o banco recém-criado (ainda sem campanhas):

```json
{"data":[],"meta":{"total":0,"page":1,"limit":10,"totalPages":0}}
```

**Login do administrador de desenvolvimento.** O perfil `dev` cria um administrador na inicialização. Os valores padrão estão em `src/main/resources/application-dev.properties` (chaves `doasync.admin.email` e `doasync.admin.senha`) e valem **somente** para uso local. Para usar valores seus, defina as variáveis antes de subir a API:

```bash
# Bash
export ADMIN_EMAIL="seu-email@exemplo.local"
export ADMIN_PASSWORD="<sua senha, com 8+ caracteres, letras e números>"
```

```powershell
# PowerShell
$env:ADMIN_EMAIL = "seu-email@exemplo.local"
$env:ADMIN_PASSWORD = "<sua senha, com 8+ caracteres, letras e números>"
```

Teste do login (devolve um token JWT em `data.token`):

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"SEU_EMAIL","senha":"SUA_SENHA"}'
```

No PowerShell, use `curl.exe` (e não `curl`, que é um apelido de outro comando) e escape as aspas do JSON, ou use o botão **Try it out** do Swagger.

Para dados que sobrevivem a reinicializações, troque o perfil: `./mvnw spring-boot:run -Dspring-boot.run.profiles=local,consulta` (no PowerShell, coloque o argumento entre aspas: `"-Dspring-boot.run.profiles=local,consulta"`). Nesse perfil nenhum administrador é criado, a menos que você defina `ADMIN_EMAIL` e `ADMIN_PASSWORD`.

### 4.3 Caminho B — Docker Compose (PostgreSQL 16 + API)

Sobe o PostgreSQL 16 e a API (perfil `prod`) em contêineres. Exige Docker em execução.

```bash
cd doasync-backend/backend
docker compose up --build
```

- API em http://localhost:8080 e PostgreSQL em `localhost:5432`.
- O `compose.yaml` já traz **valores padrão apenas para uso local**. Para trocá-los, crie um arquivo `.env` **ao lado do `compose.yaml`** (o `.env` é ignorado pelo Git) com as variáveis da tabela da seção 4.5, por exemplo `POSTGRES_PASSWORD`, `DOASYNC_JWT_SEGREDO`, `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
- Para parar: `Ctrl+C`. Para parar e apagar o volume do banco: `docker compose down -v`.

> ⚠️ **Não validado.** O caminho B não foi executado na validação deste guia (ver seção 9). Os comandos seguem o `compose.yaml` do repositório. A primeira pessoa que executá-lo deve registrar o resultado na issue #190.

### 4.4 Caminho C — API local com um PostgreSQL próprio

1. Tenha um PostgreSQL 16 em execução e crie um banco e um usuário vazios para o projeto.
2. Defina as variáveis (valores de exemplo, troque pelos seus):

```bash
# Bash
export DB_URL="jdbc:postgresql://localhost:5432/SEU_BANCO"
export DB_USER="SEU_USUARIO"
export DB_PASSWORD="SUA_SENHA"
export DOASYNC_JWT_SEGREDO="<texto aleatório com 32 caracteres ou mais>"
```

```powershell
# PowerShell
$env:DB_URL = "jdbc:postgresql://localhost:5432/SEU_BANCO"
$env:DB_USER = "SEU_USUARIO"
$env:DB_PASSWORD = "SUA_SENHA"
$env:DOASYNC_JWT_SEGREDO = "<texto aleatório com 32 caracteres ou mais>"
```

3. Suba a API: `./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres,consulta` (PowerShell: `.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=postgres,consulta"`).

O Flyway cria as tabelas no primeiro start. Sem `DOASYNC_JWT_SEGREDO` com pelo menos 32 bytes, a aplicação **não inicia**.

> ⚠️ **Não validado**, pelo mesmo motivo do caminho B.

### 4.5 Variáveis de ambiente do back-end

O back-end **não tem `.env.example`**: as variáveis são lidas dos arquivos `application*.properties` e do `compose.yaml`. Resumo:

| Variável | Para que serve | Padrão | Obrigatória quando |
|---|---|---|---|
| `DB_URL` | URL JDBC do PostgreSQL | `jdbc:postgresql://localhost:5432/doasync` (só no `prod`) | perfil `postgres` |
| `DB_USER` | Usuário do banco | `doasync` (só no `prod`) | perfil `postgres` |
| `DB_PASSWORD` | Senha do banco | vazio | perfis `postgres` e `prod` |
| `DOASYNC_JWT_SEGREDO` | Segredo de assinatura do JWT (HS256), **mínimo 32 bytes** | só existe padrão de desenvolvimento em `dev` e `local` | perfis `postgres` e `prod` |
| `DOASYNC_JWT_EXPIRACAO` | Validade do token | `PT8H` (8 horas) | nunca |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Administrador inicial (senha com 8+ caracteres, letras e números) | padrão de desenvolvimento só no `dev` | perfil `prod`, se o banco não tiver administrador |
| `ADMIN_NOME` | Nome do administrador inicial | `Administrador DoaSync` | nunca |
| `SWAGGER_ENABLED` | Liga/desliga o Swagger | `true` | nunca (perfil `prod`) |
| `PORT` | Porta HTTP | `8080` | nunca. **Não tem efeito com o perfil `consulta`**, que fixa 8080 em `127.0.0.1` |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL no Compose | valor local do `compose.yaml` | nunca (só para trocar o padrão) |

Origens liberadas no CORS: propriedade `campanhas.cors.origins` (padrão `http://localhost:5173,http://127.0.0.1:5173`).

### 4.6 Testes do back-end

```bash
cd doasync-backend/backend/contract-tests
npm ci --ignore-scripts --no-audit --no-fund
cd ..
./mvnw -B verify            # Windows: .\mvnw.cmd -B verify
```

Executa os testes JUnit (persistência, migrations, segurança JWT, contrato com o front da Equipe 4). Sem configuração extra, o teste de contrato usa H2 em memória. Se as variáveis `TEST_POSTGRES_URL`, `TEST_POSTGRES_USER` e `TEST_POSTGRES_PASSWORD` estiverem definidas (como no CI), ele usa um schema isolado em um PostgreSQL. A validação deste guia rodou sem elas.

## 5. Front-end (React + Vite)

Todos os comandos desta seção são executados dentro de `doasync-frontend/web/`.

```bash
cd doasync-frontend/web
npm ci
npm run dev
```

Use `npm ci` (e não `npm install`) para instalar exatamente as versões do `package-lock.json`. O Vite imprime a URL local, normalmente **http://localhost:5173**.

| Rota | O que abre |
|---|---|
| `/` | Home pública e campanhas em destaque |
| `/explorar` | Campanhas com busca, filtros e paginação |
| `/campanhas/:id` | Detalhe da campanha |
| `/doar/:id` | Fluxo de doação em etapas (demonstração) |
| `/login` | Login (indisponível: integração pendente) |
| `/dashboard` | Painel de gestão da entidade |

A lista completa de rotas está no `web/README.md` do repositório do front.

### 5.1 Variáveis de ambiente do front-end

O front tem um arquivo de exemplo, o `web/.env.example`:

```text
VITE_API_URL=http://localhost:8080/api
```

| Variável | Para que serve | Observação |
|---|---|---|
| `VITE_API_URL` | URL base do cliente HTTP (Axios) | Se não for definida, o código usa o mesmo valor do exemplo. **Hoje nenhuma tela chama a API**, então a variável não muda o que você vê. |

Para sobrescrever, copie o exemplo para **`.env.local`** (e não para `.env`):

```bash
cp .env.example .env.local          # Bash
```

```powershell
Copy-Item .env.example .env.local   # PowerShell
```

> 🔒 O repositório do front **não ignora o arquivo `.env`** no `.gitignore` (só os arquivos terminados em `.local`). Por isso, use sempre `.env.local`. Nunca coloque segredos em variáveis `VITE_*`: elas vão para o código enviado ao navegador.

### 5.2 Comandos do front-end

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run lint` | Análise estática com oxlint (hoje exibe 1 aviso, sem erros) |
| `npm test` | Testes (Vitest + React Testing Library), execução única |
| `npm run build` | Gera o pacote de produção em `dist/` |
| `npm run preview` | Serve o pacote gerado pelo build |

## 6. Executar tudo junto e o que esperar

Abra dois terminais:

| Terminal | Comandos | Resultado |
|---|---|---|
| 1 — API | `cd doasync-backend/backend` e `./mvnw spring-boot:run` | http://localhost:8080/swagger-ui.html |
| 2 — Front | `cd doasync-frontend/web` e `npm run dev` | http://localhost:5173 |

**Dados de demonstração × ambiente integrado** (importante para quem valida o projeto):

| Item | Situação atual |
|---|---|
| Telas do front | Carregam dados fictícios de um `DemoProvider` em memória. Alterações somem ao recarregar a página. Login, e-mail de recuperação, upload de imagens e pagamento **não são reais**. |
| Integração front ↔ API | **Pendente.** Existe o cliente Axios e a variável `VITE_API_URL`, mas nenhuma página os usa. Os endereços dos services são hipóteses, ainda não conferidas com o contrato da API. |
| Rotas da API disponíveis hoje | `POST /api/v1/auth/login`, `GET /api/v1/campanhas` e `GET /api/v1/campanhas/{id}` (a listagem também responde em `/api/campanhas`). Os demais endpoints de [`rotas-api.md`](./backend/rotas-api.md) ainda não estão no código verificado. |
| Banco no caminho A | H2 em memória, **vazio**: a listagem de campanhas volta sem itens e tudo é apagado ao parar a API. |
| CORS | A API aceita requisições do navegador apenas de `localhost:5173` e `127.0.0.1:5173`. Outra origem (por exemplo a porta 3000) recebe `403`. |

## 7. Solução de problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| `java` ou `mvnw` não reconhecido, ou erro de versão de classe | JDK ausente ou diferente de 17 | Instale o JDK 17 e confira `java -version` e `JAVA_HOME` |
| `Permission denied` ao rodar `./mvnw` (Linux/macOS) | Arquivo sem permissão de execução | `chmod +x mvnw` |
| Porta 8080 em uso ao subir a API | Outra API (inclusive a Express antiga) ou outro programa | Encerre o processo. Windows: `netstat -ano \| findstr :8080`; Linux/macOS: `lsof -i :8080` |
| `401` no login com o perfil `local` | Esse perfil não cria administrador | Defina `ADMIN_EMAIL` e `ADMIN_PASSWORD` antes de subir, ou use o perfil `dev` |
| `422` no login | Corpo sem `email` ou `senha` | Envie os dois campos no JSON |
| API com perfil `postgres` ou `prod` não inicia | `DOASYNC_JWT_SEGREDO` ausente ou com menos de 32 bytes | Defina um segredo com 32 caracteres ou mais |
| API com perfil `prod` não inicia sem administrador | Faltam `ADMIN_EMAIL` e `ADMIN_PASSWORD` | Defina as duas variáveis |
| Erro de conexão com o banco (perfil `postgres`) | PostgreSQL parado, `DB_URL` ou credenciais incorretas | Confira o serviço e as variáveis da seção 4.4 |
| `Cannot connect to the Docker daemon` ou erro em `dockerDesktopLinuxEngine` | Docker não está em execução | Inicie o Docker Desktop (ou o serviço do Docker) e repita |
| Navegador bloqueia chamadas à API (erro de CORS) | Front rodando em outra porta (o Vite usa a próxima livre se a 5173 estiver ocupada) | Libere a porta 5173 ou inclua a origem em `campanhas.cors.origins` |
| Front mostra dados que não vêm da API | É o esperado: usa dados de demonstração | Ver seção 6 |
| `npm ci` falha ou testes quebram | Versão antiga do Node.js ou `npm install` no lugar de `npm ci` | Use Node.js 22 ou 24 e `npm ci` |

## 8. Segurança e segredos

- Nenhum valor real de segredo pertence a este documento nem ao repositório. Os exemplos usam espaços reservados (`SEU_...`, `<...>`).
- Os valores padrão que existem nos arquivos `application-dev.properties`, `application-local.properties` e `compose.yaml` servem **só** para a sua máquina. Nunca os reutilize em homologação ou produção.
- Em homologação e produção, informe `DOASYNC_JWT_SEGREDO`, `DB_PASSWORD`, `ADMIN_PASSWORD` por variáveis de ambiente ou cofre de segredos, nunca por arquivo versionado.
- No back-end, o `.env` está no `.gitignore`. No front, use `.env.local` (seção 5.1).

## 9. Validação deste guia

Os comandos foram executados em uma máquina **Windows com PowerShell**, partindo dos repositórios recém-clonados, nestes commits da `develop`:

| Repositório | Commit | Ambiente usado |
|---|---|---|
| `doasync-backend` | `01148f7` | JDK 17.0 (Temurin), Maven Wrapper 3.9.16 |
| `doasync-frontend` | `1798a6a` | Node.js 22.19, npm 10.9 |

| Verificação | Resultado |
|---|---|
| `./mvnw package` do back-end | Concluiu com sucesso |
| `./mvnw spring-boot:run` (perfis `dev,consulta`) | API subiu. Swagger e `/v3/api-docs` responderam 200. `/api/v1/campanhas` respondeu 200 com lista vazia. Login do administrador de desenvolvimento retornou token. CORS: origem `localhost:5173` aceita, `localhost:3000` recusada (403) |
| `./mvnw spring-boot:run` (perfis `local,consulta`) | API subiu, criou `backend/data/`, listagem 200, login do administrador não existe (401) |
| `./mvnw -B verify` (com `contract-tests`) | 121 testes, 0 falhas, BUILD SUCCESS |
| `npm ci`, `npm run lint`, `npm test`, `npm run build` do front | Instalou, lint sem erros (1 aviso), 263 testes aprovados, build gerado |
| `npm run dev` | Servidor respondeu 200 em `/` e `/dashboard` |

**Não validado** (registre aqui quando alguém executar):

- Caminho B (Docker Compose) e caminho C (PostgreSQL próprio): o Docker não estava em execução e não havia PostgreSQL na máquina de validação.
- Linux e macOS: apenas os comandos de Bash foram escritos, não executados.
- Node.js 24, versão citada pelo README do front.
- Critério da issue "testado por um integrante que não participou do desenvolvimento": **pendente**. Peça a alguém de fora da equipe de documentação que siga o guia do zero e anote problemas no PR.

## 10. Relação com outras documentações

- Este guia cobre a **instalação e execução do projeto inteiro**. O guia de **uso e a API do módulo de Campanhas** (criar, editar, publicar, encerrar, buscar, compartilhar) pertence à issue #171 (CAM-T20), da Equipe 2, e não é duplicado aqui.
- Testes e pipelines: [`backend/pipeline-ci-cd.md`](./backend/pipeline-ci-cd.md) e [`frontend/frontend-testes-unitarios.md`](./frontend/frontend-testes-unitarios.md).
- Contrato da API: [`backend/rotas-api.md`](./backend/rotas-api.md). Stack e decisões pendentes: [`stack.md`](./stack.md) e [`arquitetura.md`](./arquitetura.md).

## 11. Manutenção

Atualize este guia quando mudar: um perfil ou variável do Spring, a porta ou origem do CORS, o Node ou JDK exigidos, o contrato do `.env.example`, ou quando o front passar a consumir a API (seção 6). Confira os valores nos arquivos `application*.properties`, `compose.yaml`, `package.json` e `.env.example` antes de editar.
