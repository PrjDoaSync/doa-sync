# Planejamento das Rotas Backend — DoaSync

> Branch: `feat/rotas-api-v1` · Data: 07/10/2026
> Status: **planejamento das rotas do MVP (Sprint 1)** — contrato detalhado com JSON em [`rotas-api.md`](./rotas-api.md). Implementação ainda não iniciada.
> Itens marcados como **[DECISÃO]** dependem de validação humana (Grupo 1 / cliente / professor).

---

## 1. Contexto

O DoaSync conecta doadores a entidades assistenciais (foco inicial: APAE e Associação Amor Inclusivo).
Fontes analisadas para este planejamento:

| Fonte | Local | Uso neste plano |
|---|---|---|
| Requisitos RF01–RF26 / RNF01–RNF14 / PV01–PV10 | `PrjDoaSync/doa-sync` → `docs/requisitos.md` | Fonte principal das necessidades |
| Histórias do Sprint 1 (#137–#142) | Issues `doa-sync` | Critérios de aceite de Usuários, Entidades e Campanhas |
| Histórias da Equipe 4 (#53, #83–#135) | Issues `doa-sync` / `equipe-4-gestao-dashboard` | Rotas do Dashboard (prefixo `/api/v1`) |
| Módulo de Entidades (Next.js + Prisma) | branch `cadastro-entidades` do `doa-sync` | **Referência de contrato** (rotas, envelope, códigos HTTP) |
| Testes de API do QA (RestAssured) | `PrjDoaSync/quality` → `docs/backend/doasync-api-tests` | Contrato previsto do Dashboard |
| DER | `doa-sync/docs/er.jpeg` | Modelo de dados |
| API .NET legada (2025) | branch `dev-backend` do `doa-sync` | Referência histórica (não reaproveitada — ver §13) |
| Frontend Next.js | branches `dev-frontend` e `cadastro-entidades` | Consumidores (telas de login, cadastro, entidades) |

## 2. Arquitetura Identificada

* **Backend oficial:** `PrjDoaSync/doasync-backend` — Spring Boot 4.1.1, Java 17, Maven Wrapper, JPA, Spring Security, springdoc-openapi, H2 (dev/teste) e PostgreSQL (compose).
  Antes desta branch havia **apenas** `DoasyncApplication` e um teste `contextLoads` (que falhava, ver §13).
* A Equipe 4 já planeja "Consumir APIs do Spring Boot" (issues #30–#33, #44), confirmando este repositório como alvo.
* Não havia controllers, services, DTOs, tratamento de erros ou segurança configurados → as convenções foram **importadas do módulo de Entidades (Next.js)**, que é a implementação mais recente e completa do projeto, e das rotas das issues/QA.

Arquitetura adotada (camadas por módulo, sem camadas extras):

```text
com.doasync.backend
├── shared/      → envelope de resposta, paginação, exceções, handler global
├── security/    → configuração JWT, usuário autenticado
├── usuario/     → Usuario, PessoaFisica, PessoaJuridica, auth, perfil, doadores
├── entidade/    → Entidade assistencial
├── campanha/    → Campanhas de arrecadação
├── doacao/      → Doações
└── dashboard/   → Indicadores (KPIs)

Controller (HTTP + DTO) → Service (regras/orquestração) → Repository (JPA)
                            ↳ regras de estado nas próprias entidades de domínio
```

## 3. Padrões Encontrados nas Implementações Existentes

| Aspecto | Padrão existente | Origem | Adotado? |
|---|---|---|---|
| Prefixo | `/api/v1/...` | Issues #53, #85, #88, #91, #114 e testes do QA | ✅ |
| Recursos | Plural, português (`entidades`, `doadores`, `projetos`) | Next.js + issues | ✅ |
| Sucesso (item) | `{ "data": {...} }` ou `{ "message": "...", "data": {...} }` | Next.js `/api/entidades` | ✅ |
| Sucesso (lista) | `{ "data": [...], "meta": { total, page, limit, totalPages } }` | Next.js `GET /api/entidades` | ✅ |
| Paginação | `page` (1-based, padrão 1), `limit` (padrão 10, máx. 50), `busca` | Next.js `PAGINACAO` | ✅ |
| Erro de validação | `422` + `{ "erros": { "campo": "mensagem" } }` | Next.js | ✅ |
| Conflito (duplicidade) | `409` + `{ "erros": { "campo": "mensagem" } }` | Next.js | ✅ |
| Erro genérico | `{ "error": "mensagem" }` (401/403/404/500) | Next.js | ✅ |
| Recurso não visível | `404` (não revela existência de entidade não aprovada) | Next.js `GET /api/entidades/[id]` | ✅ (também em campanhas) |
| Mudança de estado | `PATCH /{recurso}/{id}/status` com `{ status, motivo }` | Next.js `/api/entidades/[id]/status` | ✅ (também em campanhas e usuários) |
| Atualização parcial | `PATCH` com campos opcionais | Next.js | ✅ |
| Perfis | `PESSOA_FISICA`, `PESSOA_JURIDICA`, `ENTIDADE`, `ADMIN` | Next.js `TIPO_USUARIO` | ✅ |
| Status de entidade | `PENDENTE`, `APROVADA`, `REPROVADA`, `INATIVA` | Next.js | ✅ |
| Senha | hash (bcrypt), mínimo 6 caracteres | Next.js + RNF06 | ✅ |
| Autenticação | Sessão JWT (NextAuth) com `id`, `tipo`, `entidadeId` no token | Next.js | ✅ adaptado para **Bearer JWT** stateless |

## 4. Recursos da API

| Recurso | Justificativa (requisito) |
|---|---|
| Autenticação | RF03, RF06 |
| Usuário (perfil próprio) | RF05 |
| Doadores (PF/PJ) | RF01 (cadastro); listagem analítica é da Equipe 4 (#88/#134) |
| Entidades | RF02, RF07, RF08, RF09, RF10 |
| Campanhas | RF11–RF15 |
| Doações | RF16–RF22 |
| Arrecadação da entidade | RF23 |
| Dashboard | RF24, RF25 |
| Usuários (admin) | RF26 |

Recursos do DER **sem endpoint neste ciclo**: `Telefone`/`Endereco` de usuário (tratados como campos do perfil), `Agendamento`, `Pedido`, `ItemPedido`, `Produto` — não constam nos RFs do MVP (ver §12 e §13).

## 5. Matriz de Rotas

| # | Recurso | Operação | Origem | Já existe? | Endpoint | Acesso |
|---|---|---|---|---|---|---|
| 1 | Auth | Login | RF03, #137 | Next.js (NextAuth) | `POST /api/v1/auth/login` | Público |
| 2 | Doador | Cadastro PF/PJ | RF01, #137 | Não | `POST /api/v1/doadores` | Público |
| 3 | Usuário | Ver próprio perfil | RF05, RF06 | Não | `GET /api/v1/usuarios/me` | Autenticado |
| 4 | Usuário | Editar próprio perfil | RF05 | Não | `PATCH /api/v1/usuarios/me` | Autenticado |
| 5 | Usuário | Histórico de doações | RF21 | Não | `GET /api/v1/usuarios/me/doacoes` | PF/PJ |
| 6 | Entidade | Listar / buscar | RF08, RF26 | Next.js | `GET /api/v1/entidades` | Público (admin filtra status) |
| 7 | Entidade | Cadastrar | RF02 | Next.js | `POST /api/v1/entidades` | Público |
| 8 | Entidade | Perfil | RF08 | Next.js | `GET /api/v1/entidades/{id}` | Público se aprovada; dono/admin sempre |
| 9 | Entidade | Editar | RF07 | Next.js | `PATCH /api/v1/entidades/{id}` | Dono ou ADMIN |
| 10 | Entidade | Aprovar/reprovar/desativar | RF09, RF10 | Next.js | `PATCH /api/v1/entidades/{id}/status` | ADMIN |
| 11 | Entidade | Doações recebidas | RF22 | Não | `GET /api/v1/entidades/{id}/doacoes` | Dono ou ADMIN |
| 12 | Entidade | Arrecadação por período | RF23 | Não | `GET /api/v1/entidades/{id}/arrecadacao` | Dono ou ADMIN |
| 13 | Campanha | Listar ativas / filtrar | RF12, RF14 | Não | `GET /api/v1/campanhas` | Público |
| 14 | Campanha | Detalhe + progresso | RF14 | Não | `GET /api/v1/campanhas/{id}` | Público (desativada: dono/admin) |
| 15 | Campanha | Criar | RF11 | Não | `POST /api/v1/campanhas` | ENTIDADE aprovada |
| 16 | Campanha | Editar | Grupo 2 ("Editar campanha") | Não | `PATCH /api/v1/campanhas/{id}` | Dono |
| 17 | Campanha | Encerrar / desativar | RF13, RF15 | Não | `PATCH /api/v1/campanhas/{id}/status` | Dono (encerrar) / ADMIN (desativar) |
| 18 | Doação | Realizar | RF16, RF17, RF18, RF19, RF20 | Não | `POST /api/v1/doacoes` | PF/PJ |
| 19 | Doação | Comprovante | RF18, Grupo 3 | Não | `GET /api/v1/doacoes/{id}` | Doador dono, entidade destino ou ADMIN |
| 20 | Dashboard | KPIs | RF24, RF25, #53, #114 | Contrato previsto (QA) | `GET /api/v1/dashboard/kpis` | ADMIN |
| 21 | Usuário | Listar (admin) | RF26 | Não | `GET /api/v1/usuarios` | ADMIN |
| 22 | Usuário | Ativar/desativar | RF26 | Não | `PATCH /api/v1/usuarios/{id}/status` | ADMIN |

**Logout (RF03):** com JWT stateless o logout é feito pelo cliente descartando o token; não há endpoint para não criar rota sem efeito. **[DECISÃO]** se for exigido logout no servidor (revogação), criar `POST /api/v1/auth/logout` com lista de bloqueio.

## 6. Contratos dos Endpoints

Convenções comuns (valem para todas as rotas abaixo):

* `Content-Type: application/json`; datas `yyyy-MM-dd`, instantes ISO-8601 UTC; valores monetários como número decimal (`150.00`).
* Autenticação: header `Authorization: Bearer <token>`.
* `401 { "error": "Não autenticado." }` — token ausente/inválido em rota protegida.
* `403 { "error": "Sem permissão." }` — perfil/propriedade não autorizados.
* `422 { "erros": { campo: mensagem } }` — validação; `409 { "erros": {...} }` — duplicidade.
* `500 { "error": "Erro interno no servidor." }` — sem detalhes internos.

### POST /api/v1/auth/login

**Objetivo:** autenticar e devolver o token e o perfil (para o front direcionar por perfil — #137).
**Atores:** todos. **Autenticação:** Não.
**Request:** `{ "email": "a@b.com", "senha": "123456" }`
**Response 200:**
```json
{ "data": { "token": "eyJ...", "tipoToken": "Bearer", "expiraEm": "2026-10-08T22:00:00Z",
  "usuario": { "id": "uuid", "nome": "...", "email": "...", "tipo": "ENTIDADE",
               "entidadeId": "uuid|null", "statusEntidade": "APROVADA|null" } } }
```
**HTTP:** `200` · `401` credenciais inválidas ou usuário `INATIVO` (mesma mensagem, não revela qual) · `422` campos ausentes.
**Regras:** e-mail normalizado (trim + minúsculas); usuário `INATIVO` não autentica (igual ao `authorize` do NextAuth).
**Referência:** `src/lib/auth.ts` (Next.js).

### POST /api/v1/doadores

**Objetivo:** cadastro de doador PF ou PJ (RF01).
**Atores:** visitante. **Autenticação:** Não.
**Request:**
```json
{ "tipo": "PESSOA_FISICA", "nome": "Maria", "email": "maria@x.com", "senha": "123456",
  "telefone": "(11) 99999-0000", "cpf": "123.456.789-09", "dataNascimento": "1990-05-10" }
```
PJ: `tipo: "PESSOA_JURIDICA"`, `cnpj`, `razaoSocial` no lugar de `cpf`/`dataNascimento`.
**Response 201:** `{ "message": "Cadastro realizado com sucesso.", "data": UsuarioResponse }` (sem senha).
**HTTP:** `201` · `409` e-mail/CPF/CNPJ já cadastrado · `422` validação.
**Validações:** nome, e-mail válido, senha ≥ 6; `tipo` ∈ {PESSOA_FISICA, PESSOA_JURIDICA}; CPF 11 dígitos não repetidos (PF); CNPJ 14 dígitos não repetidos + razão social (PJ).
**Referência:** `POST /api/entidades` (Next.js) — mesmo formato de erros e normalização.

### GET /api/v1/usuarios/me · PATCH /api/v1/usuarios/me

**Objetivo:** consultar/editar o próprio perfil (RF05).
**Atores:** qualquer autenticado. **Autenticação:** Sim.
**PATCH request (todos opcionais):** `{ "nome": "...", "telefone": "...", "senhaAtual": "...", "novaSenha": "..." }`
**Response 200:** `{ "data": UsuarioResponse }` / `{ "message": "Perfil atualizado com sucesso.", "data": ... }`
`UsuarioResponse = { id, nome, email, tipo, status, telefone, dataCadastro, cpf?, dataNascimento?, cnpj?, razaoSocial?, entidadeId?, statusEntidade? }`
**HTTP:** `200` · `401` · `422` (nome vazio; nova senha < 6; `senhaAtual` incorreta ou ausente ao trocar senha).
**Regras:** e-mail, tipo, CPF/CNPJ não são editáveis aqui (identidade). Dados institucionais da entidade são editados em `PATCH /entidades/{id}`.

### GET /api/v1/usuarios/me/doacoes

**Objetivo:** histórico de doações do doador (RF21). **Atores:** PESSOA_FISICA, PESSOA_JURIDICA.
**Query:** `page`, `limit`. **Response 200:** lista paginada de `DoacaoResponse` (mais recentes primeiro).
**HTTP:** `200` · `401` · `403` (perfil não doador).

### GET /api/v1/entidades

**Objetivo:** diretório público e painel do admin (RF08, RF26). **Autenticação:** opcional.
**Query:** `page`, `limit`, `busca` (razão social, nome fantasia, área de atuação), `status` (**somente admin**; demais sempre `APROVADA`).
**Response 200:** `{ "data": [EntidadeResponse], "meta": {...} }` (ordenado por cadastro desc).
**Referência:** `GET /api/entidades` (Next.js) — contrato mantido.

### POST /api/v1/entidades

**Objetivo:** cadastro de entidade (RF02); cria `Usuario` tipo `ENTIDADE` + `Entidade` `PENDENTE`.
**Autenticação:** Não. **Request:** idêntico ao Next.js (`nome, email, senha, cnpj, razaoSocial, nomeFantasia, descricao, areaAtuacao, site, emailContato, telefoneContato, whatsapp, logradouro, numero, complemento, bairro, cidade, uf, cep`).
**Response 201:** `{ "message": "Entidade cadastrada com sucesso. Aguardando aprovação.", "data": EntidadeResponse }`
**HTTP:** `201` · `409` e-mail/CNPJ duplicado · `422`.
**Validações:** obrigatórios iguais ao Next.js (nome, e-mail, senha ≥ 6, CNPJ válido, razão social, descrição, logradouro, número, bairro, cidade, UF, CEP); CNPJ/CEP normalizados com máscara; UF em maiúsculas.
**Diferença consciente:** `data` passa a ser a **entidade** (com `usuario` resumido) em vez do usuário com `entidade` aninhada — mantém o mesmo `EntidadeResponse` das demais rotas. `confirmarSenha` continua sendo validado só no front (como no Next.js).

### GET /api/v1/entidades/{id}

**Objetivo:** perfil público (RF08). **Autenticação:** opcional.
**HTTP:** `200` · `404` inexistente **ou** não aprovada para visitante/não dono.
**Referência:** Next.js `GET /api/entidades/[id]`.

### PATCH /api/v1/entidades/{id}

**Objetivo:** editar dados institucionais (RF07). **Atores:** dono da entidade ou ADMIN.
**Request:** campos opcionais do cadastro (exceto conta e CNPJ).
**HTTP:** `200` · `401` · `403` · `404` · `422` (campo obrigatório enviado vazio).
**Referência:** Next.js `PATCH /api/entidades/[id]`.

### PATCH /api/v1/entidades/{id}/status

**Objetivo:** aprovar/reprovar (RF09), desativar/reativar (RF10). **Atores:** ADMIN.
**Request:** `{ "status": "APROVADA|REPROVADA|INATIVA|PENDENTE", "motivo": "..." }`
**HTTP:** `200` (mensagem por status, iguais ao Next.js) · `401` · `403` · `404` · `422` (status inválido; motivo ausente em `REPROVADA`).
**Regras:** `APROVADA` grava `dataAprovacao` e `aprovadoPorId`; `REPROVADA` grava motivo e `aprovadoPorId`; demais limpam o motivo.
**Diferença consciente:** usuário anônimo recebe `401` (no Next.js recebia `403`), alinhado ao restante da API.

### GET /api/v1/entidades/{id}/doacoes

**Objetivo:** histórico de doações recebidas, filtrável por campanha (RF22). **Atores:** dono ou ADMIN.
**Query:** `campanhaId`, `page`, `limit`. **Response:** lista paginada de `DoacaoResponse`.
**Regras:** doações anônimas exibem `doador: null` também para a entidade **[DECISÃO]** (RF19 fala de "exibição pública"; adotamos a opção mais protetiva — LGPD/RNF09). ADMIN vê o doador.

### GET /api/v1/entidades/{id}/arrecadacao

**Objetivo:** total arrecadado por período (RF23). **Atores:** dono ou ADMIN.
**Query:** `inicio`, `fim` (`yyyy-MM-dd`, opcionais; ambos inclusivos).
**Response 200:** `{ "data": { "inicio", "fim", "totalArrecadado", "quantidadeDoacoes", "porCampanha": [{ "campanhaId", "titulo", "total", "quantidade" }] } }` (doações diretas aparecem com `campanhaId: null`).
**HTTP:** `200` · `401` · `403` · `404` · `422` (`inicio` > `fim` ou data inválida).

### GET /api/v1/campanhas

**Objetivo:** vitrine de campanhas ativas com progresso (RF12, RF14). **Autenticação:** opcional.
**Query:** `page`, `limit`, `busca` (título), `entidadeId`, `status` (`ATIVA` padrão; `ENCERRADA`/`DESATIVADA` só para ADMIN ou para o dono quando `entidadeId` é a própria entidade).
**Response:** lista paginada de `CampanhaResponse`:
```json
{ "id", "titulo", "descricao", "metaValor": 5000.00, "valorArrecadado": 1250.00,
  "percentualAtingido": 25.0, "dataInicio", "dataFim", "status": "ATIVA",
  "motivoDesativacao": null, "entidade": { "id", "razaoSocial", "nomeFantasia" }, "createdAt" }
```
**Regras:** "ativa" para o público = `status ATIVA` **e** hoje ∈ [`dataInicio`, `dataFim`] **e** entidade `APROVADA`.

### GET /api/v1/campanhas/{id}

**HTTP:** `200` · `404` (inexistente; `DESATIVADA` ou de entidade não aprovada para quem não é dono/ADMIN).

### POST /api/v1/campanhas

**Objetivo:** criar campanha (RF11). **Atores:** ENTIDADE com status `APROVADA`.
**Request:** `{ "titulo", "descricao", "metaValor", "dataInicio", "dataFim" }`
**Response 201:** `{ "message": "Campanha criada com sucesso.", "data": CampanhaResponse }`
**HTTP:** `201` · `401` · `403` (não é entidade, ou entidade não aprovada) · `422`.
**Validações:** título, descrição obrigatórios; `metaValor` > 0; datas obrigatórias; `dataFim` ≥ `dataInicio`; `dataFim` ≥ hoje.

### PATCH /api/v1/campanhas/{id}

**Objetivo:** editar campanha (escopo do Grupo 2). **Atores:** entidade dona.
**Request:** campos opcionais do POST. **HTTP:** `200` · `401` · `403` · `404` · `409` (campanha não está `ATIVA`) · `422`.

### PATCH /api/v1/campanhas/{id}/status

**Objetivo:** encerrar antes do prazo (RF13) ou desativar por violação (RF15).
**Request:** `{ "status": "ENCERRADA|DESATIVADA|ATIVA", "motivo": "..." }`
**Regras:**
* Dono: apenas `ENCERRADA`, e apenas a partir de `ATIVA`.
* ADMIN: `DESATIVADA` (motivo obrigatório), `ENCERRADA`, ou `ATIVA` (reativar uma `DESATIVADA`).
* Transição para o mesmo status ou a partir de `ENCERRADA` → `409`.
**HTTP:** `200` · `401` · `403` · `404` · `409` · `422`.
**Referência:** `PATCH /api/entidades/[id]/status` (Next.js).

### POST /api/v1/doacoes

**Objetivo:** realizar doação para campanha **ou** diretamente para entidade (RF16–RF20). **Atores:** PESSOA_FISICA, PESSOA_JURIDICA.
**Headers:** `Idempotency-Key` (opcional, recomendado — RNF11).
**Request:** `{ "campanhaId": "uuid|null", "entidadeId": "uuid|null", "valor": 50.00, "formaPagamento": "PIX", "anonima": false, "observacao": "..." }`
**Response 201:** `{ "message": "Doação registrada com sucesso.", "data": DoacaoResponse }` — é a confirmação do RF18.
`DoacaoResponse = { id, codigoComprovante, valor, formaPagamento, status, anonima, observacao, dataDoacao, campanha: {id,titulo}|null, entidade: {id,razaoSocial,nomeFantasia}, doador: {id,nome}|null }`
**HTTP:** `201` · `200` (repetição com o mesmo `Idempotency-Key` — devolve a doação original, sem duplicar) · `401` · `403` · `404` (campanha/entidade inexistente ou não visível) · `409` (campanha fora do período/encerrada/desativada) · `422` (valor ≤ 0, nenhum ou ambos destinos, forma de pagamento inválida).
**Regras:** com `campanhaId`, a entidade destino é a da campanha; destino deve estar `APROVADA`; `formaPagamento` ∈ {`PIX`} (PV01 pendente).
**[DECISÃO] Pagamento (PV01/PV07):** não há gateway definido. A doação é registrada com `status: CONFIRMADA` (pagamento simulado). Quando o gateway PIX for definido, o fluxo passa a `PENDENTE → CONFIRMADA` via webhook, sem mudar a rota.

### GET /api/v1/doacoes/{id}

**Objetivo:** consultar comprovante (RF18). **Atores:** doador dono, entidade destino, ADMIN.
**HTTP:** `200` · `401` · `404` (inexistente **ou** sem acesso — não revela existência).

### GET /api/v1/dashboard/kpis

**Objetivo:** indicadores gerais (RF24, RF25; issue #53/#114). **Atores:** ADMIN.
**Response 200:**
```json
{ "data": { "totalArrecadado": 125430.50, "doacoesMes": 87, "valorArrecadadoMes": 4200.00,
  "totalDoacoes": 900, "totalDoadores": 300, "totalEntidades": 12,
  "campanhasAtivas": 6, "usuariosAtivos": 320 } }
```
**HTTP:** `200` · `401` · `403`.
**Diferenças em relação ao mock do QA:** campos dentro de `data` (padrão da API); `projetosAtivos` → `campanhasAtivas` (o domínio do requisito é Campanha); `agendamentosPendentes` **não incluído** (módulo de Agendamento fora do MVP). **[DECISÃO]** confirmar com Equipe 4/QA.

### GET /api/v1/usuarios · PATCH /api/v1/usuarios/{id}/status

**Objetivo:** gestão de usuários pelo admin (RF26). **Atores:** ADMIN.
**GET query:** `page`, `limit`, `busca` (nome/e-mail), `tipo`, `status`.
**PATCH request:** `{ "status": "ATIVO|INATIVO" }` → `200 { message, data: UsuarioResponse }`.
**HTTP:** `200` · `401` · `403` · `404` · `409` (admin desativando a si mesmo) · `422`.

## 7. Autenticação e Autorização

* JWT HS256 assinado pelo backend (`spring-boot-starter-security-oauth2-resource-server` + `NimbusJwtEncoder`), validade 8h (configurável: `doasync.jwt.expiracao`).
* Claims: `sub` = id do usuário, `tipo`, `entidadeId`. Autoridade `ROLE_<tipo>`.
* Segredo em `doasync.jwt.segredo` (env `DOASYNC_JWT_SEGREDO` em produção; valor de dev só para local/teste).
* Sessão stateless, CSRF desabilitado (API sem cookies), CORS configurável (`doasync.cors.origens`, padrão `http://localhost:3000`).
* O token reflete o momento do login; usuários desativados são barrados nas rotas sensíveis porque os services sempre recarregam o usuário do banco.

| Rota | Pública | Autenticada |
|---|---|---|
| `POST /auth/login`, `POST /doadores`, `POST /entidades` | ✅ | |
| `GET /entidades`, `GET /entidades/{id}`, `GET /campanhas`, `GET /campanhas/{id}` | ✅ (visão ampliada se autenticado) | |
| `/usuarios/me`, `/usuarios/me/doacoes`, `/doacoes/**` | | Qualquer / PF-PJ (ownership no service) |
| `PATCH /entidades/{id}`, `/entidades/{id}/doacoes`, `/entidades/{id}/arrecadacao` | | Dono ou ADMIN |
| `POST/PATCH /campanhas/**` | | ENTIDADE dona / ADMIN (status) |
| `PATCH /entidades/{id}/status`, `/dashboard/**`, `GET /usuarios`, `PATCH /usuarios/{id}/status` | | ADMIN |
| `/swagger-ui/**`, `/v3/api-docs/**` | ✅ (documentação) | |

**Ownership:** um token válido **não** dá acesso a recursos de terceiros — doações, histórico e arrecadação são verificados contra o `sub`/`entidadeId` do token no service.

## 8. Regras de Negócio Relacionadas

1. Entidade nasce `PENDENTE`; só `APROVADA` aparece publicamente, cria campanhas e recebe doações (PV03 respondido pelo módulo Next.js: aprovação manual).
2. Reprovação exige motivo; desativação de campanha pelo admin exige motivo.
3. Campanha pública/ativa: `ATIVA` + dentro do período + entidade aprovada.
4. Encerrada é estado final; desativada pode ser reativada pelo admin.
5. Progresso = soma das doações `CONFIRMADA` da campanha / meta.
6. Doação anônima oculta o doador em toda exibição não administrativa.
7. Idempotência por (`doador`, `Idempotency-Key`).
8. Usuário `INATIVO` não autentica.
9. Admin não pode desativar a si mesmo.

## 9. Dependências entre Rotas

```text
POST /doadores ─┐
POST /entidades ┼─► POST /auth/login ─► token
                │
PATCH /entidades/{id}/status (ADMIN aprova) ─► POST /campanhas ─► POST /doacoes
                                                   │                  │
                                    GET /campanhas (progresso) ◄──────┤
                          GET /usuarios/me/doacoes, /entidades/{id}/doacoes,
                          /entidades/{id}/arrecadacao, /dashboard/kpis ◄──┘
```

## 10. Fluxos de Implementação (ordem TDD)

| Fluxo | Conteúdo | Testes |
|---|---|---|
| F0 | Base: config (Spring Cloud Config, H2/Postgres), envelope, handler de erros, segurança JWT | `contextLoads` verde |
| F1 | Cadastro de doador + login + `/usuarios/me` | `AuthFlowTest`, `UsuarioMeTest` |
| F2 | Entidades (cadastro, perfil, edição, status) | `EntidadeControllerTest` |
| F3 | Campanhas (criar, listar, detalhe, editar, status) | `CampanhaControllerTest` |
| F4 | Doações (realizar, idempotência, comprovante, históricos, arrecadação) | `DoacaoControllerTest` |
| F5 | Admin: KPIs + gestão de usuários | `DashboardControllerTest`, `UsuarioAdminTest` |

Todos os testes são de integração (`@SpringBootTest` + MockMvc + H2): HTTP → Controller → Service → Repository → Banco.

## 11. Rotas Existentes que Serão Reutilizadas

Não havia rotas no backend Spring. Foram **portados** (contrato preservado, com ajustes listados em §6) do módulo Next.js:
`GET/POST /api/entidades`, `GET/PATCH /api/entidades/[id]`, `PATCH /api/entidades/[id]/status` → sob `/api/v1`.
Do contrato previsto pelo QA/issue #53: `GET /api/v1/dashboard/kpis`.

## 12. Rotas Novas Necessárias

Implementadas nesta branch: itens 1–5 e 11–22 da matriz (§5).

Planejadas para a Equipe 4 (Sprint 3), **não implementadas** aqui por dependerem de decisões/módulos ainda inexistentes:

| Rota | Issue | Bloqueio |
|---|---|---|
| `GET /api/v1/dashboard/financeiro` | #53, #85 | "categorias" e "canais de entrada" não existem no modelo (só PIX) |
| `POST /api/v1/relatorios/exportar` | #53, #124 | PV06 (relatórios exportáveis) pendente |
| `GET /api/v1/dashboard/auditoria` | #53, #123 | Exige entidade AuditLog (TS-01-04) |
| `GET /api/v1/doadores`, `GET /api/v1/doadores/{id}/ficha` | #88, #134 | Nome divergente entre issues (`ficha` × `ficha-analitica`) |
| `GET /api/v1/projetos/desempenho`, `/projetos/{id}/extrato` | #91, #129 | Domínio "Projeto" × "Campanha" (ver §13) |
| Agendamentos / Pedidos / Produtos | #92, #94, #120 | Fora dos RFs do MVP |
| Recuperação de senha | RF04 | Depende de envio de e-mail (PV05) |

## 13. Problemas e Inconsistências Encontradas

| Severidade | Problema | Impacto | Causa provável | Recomendação |
|---|---|---|---|---|
| **CRÍTICO** | `main` do backend não sobe: `spring-cloud-starter-config` sem `spring.config.import` | `contextLoads` falha; CI vermelha; ninguém consegue rodar a API | Starter adicionado no Initializr sem config server | **Corrigido**: `spring.cloud.config.enabled=false` por padrão (reativável por env) |
| **CRÍTICO** | `.github/workflows/pipeline-backend.yaml` é um YAML inválido (só um trecho do step Trivy, sem `on`/`jobs`) e aponta `scan-ref: 'api'` (pasta inexistente) | Pipeline não executa | Colagem parcial do arquivo | Restaurar o workflow descrito em `docs/pipeline-ci-cd.md` — **não alterado** nesta branch (responsabilidade DevOps) |
| **ALTO** | Três stacks paralelas: .NET (`dev-backend`, 2025), Next.js API Routes (`cadastro-entidades`) e Spring (`doasync-backend`) | Duplicação de esforço e contratos divergentes | Turmas/equipes diferentes | Definir o Spring como backend único; o Next.js consome a API `/api/v1` |
| **ALTO** | "Projeto" (DER, README, Equipe 4) × "Campanha" (requisitos RF11–15, Grupo 2) | Rotas `/projetos` × `/campanhas` para o mesmo conceito | DER herdado da turma anterior | **[DECISÃO]** Adotado `campanhas` (requisito oficial); alinhar issues #91/#129 |
| **ALTO** | Dependência `spring-boot-starter-security-oauth2-authorization-server` sem uso | Autoconfiguração de servidor OAuth2 desnecessária; superfície extra | Initializr | **Substituída** por `oauth2-resource-server` (validação do JWT próprio) |
| **MÉDIO** | API .NET legada: senha em texto puro, `Console.WriteLine` da senha, CRUDs expondo entidades JPA, rotas sem padrão (`/auth`, `/projeto`, `api/[controller]`) | Não serve de referência | Projeto de aprendizagem anterior | Não reaproveitada; usado só como histórico do domínio |
| **MÉDIO** | Mock do QA retorna objetos "crus" e `projetosAtivos`/`agendamentosPendentes` | Testes de payload futuros quebrariam | Contrato fictício (o próprio relatório avisa) | Atualizar coleção Postman para `{ data: {...} }` e campos de §6 |
| **MÉDIO** | Sem ferramenta de migração (Flyway/Liquibase); schema gerado pelo Hibernate | Evolução de schema em produção arriscada | Projeto inicial | Adicionar Flyway antes do primeiro deploy |
| **MÉDIO** | `compose.yaml` com `postgres:latest` e credenciais genéricas | Builds não reprodutíveis | Initializr | Fixar versão (ex.: `postgres:17`) |
| **BAIXO** | Teste do QA `DashboardAuditoriaTest` usa caminho sem barra inicial (`api/v1/...`) | Funciona por acaso no RestAssured | Digitação | Padronizar `/api/v1/...` |
| **BAIXO** | Next.js `PATCH /entidades/[id]` retorna a entidade **antes** de atualizar o endereço | Front exibe endereço antigo após salvar | Ordem das operações | Corrigido no port Spring (retorna estado final) |
| **BAIXO** | Next.js `GET /entidades`: `limit` não validado (`parseInt` de texto → `NaN`) | Erro 500 com query inválida | Falta de validação | Port Spring normaliza `page`/`limit` |

## 14. Estratégia de Testes

* **TDD por fluxo** (§10): teste de integração escrito antes do código, cobrindo happy path e erros (401, 403, 404, 409, 422, regras de estado, duplicidade, idempotência, ownership).
* `@SpringBootTest` + `@AutoConfigureMockMvc` + H2 em memória (perfil `test`), banco limpo entre testes.
* Os testes RestAssured do QA (`quality`) podem rodar contra a API real com `-DbaseUrl=http://localhost:8080` — ver §13 (ajuste de envelope).

## 15. Checklist de Validação

- [x] Contexto, requisitos, issues e implementações existentes analisados
- [x] Padrões do módulo Next.js adotados (prefixo, envelope, erros, status)
- [x] Matriz de rotas com justificativa por requisito
- [x] Autenticação/autorização por rota e ownership definidos
- [ ] Testes de integração por fluxo (`./mvnw test`)
- [ ] Build (`./mvnw package`)
- [ ] OpenAPI disponível em `/swagger-ui.html` (springdoc)
- [ ] Integração com o frontend Next.js (o front atual chama as API Routes internas; ver §13 – ALTO)
- [ ] Decisões marcadas **[DECISÃO]** validadas com o cliente/equipes
