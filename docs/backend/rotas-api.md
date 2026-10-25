# Contrato da API — DoaSync (`/api/v1`)

> Documento de contrato das rotas backend necessárias para o MVP (Sprint 1).
> Planejamento, justificativas e problemas encontrados: [`routes-plan.md`](./routes-plan.md).
> Os exemplos usam dados fictícios. Itens marcados **[DECISÃO]** ainda dependem de validação com cliente/equipes.

## Sumário

| # | Método | Rota | Acesso | Requisito |
|---|---|---|---|---|
| 1 | POST | [`/api/v1/auth/login`](#1-post-apiv1authlogin) | Público | RF03, RF06 |
| 2 | POST | [`/api/v1/doadores`](#2-post-apiv1doadores) | Público | RF01 |
| 3 | GET | [`/api/v1/usuarios/me`](#3-get-apiv1usuariosme) | Autenticado | RF05 |
| 4 | PATCH | [`/api/v1/usuarios/me`](#4-patch-apiv1usuariosme) | Autenticado | RF05 |
| 5 | GET | [`/api/v1/usuarios/me/doacoes`](#5-get-apiv1usuariosmedoacoes) | Doador (PF/PJ) | RF21 |
| 6 | GET | [`/api/v1/entidades`](#6-get-apiv1entidades) | Público | RF08, RF26 |
| 7 | POST | [`/api/v1/entidades`](#7-post-apiv1entidades) | Público | RF02 |
| 8 | GET | [`/api/v1/entidades/{id}`](#8-get-apiv1entidadesid) | Público* | RF08 |
| 9 | PATCH | [`/api/v1/entidades/{id}`](#9-patch-apiv1entidadesid) | Dono ou ADMIN | RF07 |
| 10 | PATCH | [`/api/v1/entidades/{id}/status`](#10-patch-apiv1entidadesidstatus) | ADMIN | RF09, RF10 |
| 11 | GET | [`/api/v1/entidades/{id}/doacoes`](#11-get-apiv1entidadesiddoacoes) | Dono ou ADMIN | RF22 |
| 12 | GET | [`/api/v1/entidades/{id}/arrecadacao`](#12-get-apiv1entidadesidarrecadacao) | Dono ou ADMIN | RF23 |
| 13 | GET | [`/api/v1/campanhas`](#13-get-apiv1campanhas) | Público | RF12, RF14 |
| 14 | GET | [`/api/v1/campanhas/{id}`](#14-get-apiv1campanhasid) | Público* | RF14 |
| 15 | POST | [`/api/v1/campanhas`](#15-post-apiv1campanhas) | ENTIDADE aprovada | RF11 |
| 16 | PATCH | [`/api/v1/campanhas/{id}`](#16-patch-apiv1campanhasid) | Entidade dona | Grupo 2 |
| 17 | PATCH | [`/api/v1/campanhas/{id}/status`](#17-patch-apiv1campanhasidstatus) | Dono / ADMIN | RF13, RF15 |
| 18 | POST | [`/api/v1/doacoes`](#18-post-apiv1doacoes) | Doador (PF/PJ) | RF16–RF20, RNF11 |
| 19 | GET | [`/api/v1/doacoes/{id}`](#19-get-apiv1doacoesid) | Doador, entidade destino ou ADMIN | RF18 |
| 20 | GET | [`/api/v1/dashboard/kpis`](#20-get-apiv1dashboardkpis) | ADMIN | RF24, RF25 |
| 21 | GET | [`/api/v1/usuarios`](#21-get-apiv1usuarios) | ADMIN | RF26 |
| 22 | PATCH | [`/api/v1/usuarios/{id}/status`](#22-patch-apiv1usuariosidstatus) | ADMIN | RF26 |

\* Recursos não aprovados/desativados só são visíveis para o dono e o ADMIN.

---

## Convenções gerais

Seguem o padrão já usado no módulo de Entidades (Next.js, branch `cadastro-entidades`).

### Autenticação

```http
Authorization: Bearer <token devolvido no login>
```

Perfis (`tipo`): `PESSOA_FISICA`, `PESSOA_JURIDICA`, `ENTIDADE`, `ADMIN`.
Logout é feito pelo cliente descartando o token. **[DECISÃO]** criar `POST /auth/logout` se for exigida revogação no servidor.

### Formatos

* Datas: `"yyyy-MM-dd"` · Instantes: ISO-8601 UTC (`"2026-10-07T21:30:00Z"`) · Valores: número decimal (`150.00`).
* IDs: UUID.

### Envelope de sucesso

```json
{ "message": "Mensagem opcional de feedback.", "data": { } }
```

Listas paginadas (`page` começa em 1; `limit` padrão 10, máximo 50):

```json
{
  "data": [ ],
  "meta": { "total": 23, "page": 1, "limit": 10, "totalPages": 3 }
}
```

### Erros

| Status | Corpo | Quando |
|---|---|---|
| `400` | `{ "error": "Corpo da requisição inválido." }` | JSON malformado |
| `401` | `{ "error": "Não autenticado." }` | Token ausente, inválido, expirado ou usuário inativo |
| `403` | `{ "error": "Sem permissão." }` | Perfil ou propriedade não autorizados |
| `404` | `{ "error": "Entidade não encontrada." }` | Recurso inexistente **ou** não visível ao usuário |
| `409` | `{ "erros": { "email": "E-mail já cadastrado." } }` ou `{ "error": "..." }` | Duplicidade ou estado inválido |
| `422` | `{ "erros": { "campo": "mensagem" } }` | Validação de campos |
| `500` | `{ "error": "Erro interno no servidor." }` | Falha inesperada |

---

## Autenticação e usuários

### 1. `POST /api/v1/auth/login`

Autentica e devolve o token + perfil, para o front direcionar o usuário conforme o tipo.

**Acesso:** público

**Request**
```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

**Response `200`**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI...",
    "tipoToken": "Bearer",
    "expiraEm": "2026-10-08T05:30:00Z",
    "usuario": {
      "id": "3f1c2a9e-1b7d-4c55-9a3e-2d1f0b6a7c10",
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "tipo": "PESSOA_FISICA",
      "entidadeId": null,
      "statusEntidade": null
    }
  }
}
```

Para uma entidade, `entidadeId` e `statusEntidade` (`PENDENTE`, `APROVADA`, `REPROVADA`, `INATIVA`) vêm preenchidos.

**Erros**
```json
// 401 — senha errada, e-mail inexistente ou usuário INATIVO (mesma mensagem)
{ "error": "E-mail ou senha inválidos." }

// 422
{ "erros": { "email": "E-mail é obrigatório.", "senha": "Senha é obrigatória." } }
```

---

### 2. `POST /api/v1/doadores`

Cadastro de doador pessoa física ou jurídica.

**Acesso:** público

**Request — Pessoa Física**
```json
{
  "tipo": "PESSOA_FISICA",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456",
  "telefone": "(11) 99999-0000",
  "cpf": "123.456.789-09",
  "dataNascimento": "1990-05-10"
}
```

**Request — Pessoa Jurídica**
```json
{
  "tipo": "PESSOA_JURIDICA",
  "nome": "Empresa X",
  "email": "rh@empresa.com",
  "senha": "123456",
  "telefone": "(11) 3333-4444",
  "cnpj": "11.222.333/0001-81",
  "razaoSocial": "Empresa X LTDA"
}
```

**Response `201`**
```json
{
  "message": "Cadastro realizado com sucesso.",
  "data": {
    "id": "3f1c2a9e-1b7d-4c55-9a3e-2d1f0b6a7c10",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "tipo": "PESSOA_FISICA",
    "status": "ATIVO",
    "telefone": "(11) 99999-0000",
    "dataCadastro": "2026-10-07T21:30:00Z",
    "cpf": "123.456.789-09",
    "dataNascimento": "1990-05-10",
    "cnpj": null,
    "razaoSocial": null,
    "entidadeId": null,
    "statusEntidade": null
  }
}
```

**Regras:** e-mail normalizado (minúsculas, sem espaços); CPF/CNPJ aceitos com ou sem máscara e gravados com máscara; senha com hash.

**Erros**
```json
// 422
{
  "erros": {
    "tipo": "Tipo deve ser PESSOA_FISICA ou PESSOA_JURIDICA.",
    "nome": "Nome é obrigatório.",
    "email": "E-mail inválido.",
    "senha": "Senha deve ter ao menos 6 caracteres.",
    "cpf": "CPF inválido.",
    "cnpj": "CNPJ é obrigatório.",
    "razaoSocial": "Razão Social é obrigatória."
  }
}

// 409
{ "erros": { "email": "E-mail já cadastrado.", "cpf": "CPF já cadastrado." } }
```

---

### 3. `GET /api/v1/usuarios/me`

Perfil do usuário autenticado.

**Acesso:** autenticado (qualquer perfil)

**Response `200`** — mesmo objeto `data` do cadastro de doador:
```json
{
  "data": {
    "id": "3f1c2a9e-1b7d-4c55-9a3e-2d1f0b6a7c10",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "tipo": "PESSOA_FISICA",
    "status": "ATIVO",
    "telefone": "(11) 99999-0000",
    "dataCadastro": "2026-10-07T21:30:00Z",
    "cpf": "123.456.789-09",
    "dataNascimento": "1990-05-10",
    "cnpj": null,
    "razaoSocial": null,
    "entidadeId": null,
    "statusEntidade": null
  }
}
```

**Erros:** `401`.

---

### 4. `PATCH /api/v1/usuarios/me`

Edição do próprio perfil. Todos os campos são opcionais; campo ausente não é alterado.
E-mail, tipo, CPF e CNPJ não são editáveis. Dados institucionais de entidade são editados na rota 9.

**Acesso:** autenticado

**Request**
```json
{
  "nome": "Maria S.",
  "telefone": "(11) 1111-2222",
  "senhaAtual": "123456",
  "novaSenha": "nova123"
}
```

**Response `200`**
```json
{
  "message": "Perfil atualizado com sucesso.",
  "data": { "id": "3f1c2a9e-...", "nome": "Maria S.", "telefone": "(11) 1111-2222", "...": "demais campos do perfil" }
}
```

**Erros**
```json
// 422
{ "erros": { "nome": "Nome não pode ser vazio." } }
{ "erros": { "novaSenha": "Senha deve ter ao menos 6 caracteres." } }
{ "erros": { "senhaAtual": "Senha atual incorreta." } }
```

---

### 5. `GET /api/v1/usuarios/me/doacoes`

Histórico de doações do doador autenticado, mais recentes primeiro.

**Acesso:** `PESSOA_FISICA` ou `PESSOA_JURIDICA`

**Query:** `page`, `limit`

**Response `200`**
```json
{
  "data": [
    {
      "id": "8d0e6c1a-2f4b-4b8e-9c77-5a3b2c1d0e9f",
      "codigoComprovante": "DS-7F3A9C21B0E4",
      "valor": 250.50,
      "formaPagamento": "PIX",
      "status": "CONFIRMADA",
      "anonima": false,
      "observacao": "Força!",
      "dataDoacao": "2026-10-07T21:45:00Z",
      "campanha": { "id": "b2a1c3d4-...", "titulo": "Cadeiras de rodas" },
      "entidade": { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "nomeFantasia": "Amor Inclusivo" },
      "doador": { "id": "3f1c2a9e-...", "nome": "Maria Silva" }
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

**Erros:** `401`; `403 { "error": "Sem permissão." }` (perfil não doador).

---

## Entidades

> Contrato portado de `/api/entidades` do módulo Next.js, mantendo campos, mensagens e status.

### Objeto `Entidade`

```json
{
  "id": "a1b2c3d4-5e6f-4a7b-8c9d-0e1f2a3b4c5d",
  "cnpj": "11.222.333/0001-81",
  "razaoSocial": "Associação Amor Inclusivo",
  "nomeFantasia": "Amor Inclusivo",
  "descricao": "Apoio a pessoas com deficiência e suas famílias.",
  "areaAtuacao": "Assistência Social",
  "site": "https://amorinclusivo.org",
  "logoUrl": null,
  "statusAprovacao": "APROVADA",
  "motivoReprovacao": null,
  "dataAprovacao": "2026-10-07T22:00:00Z",
  "emailContato": "contato@amorinclusivo.org",
  "telefoneContato": "(11) 98765-4321",
  "whatsapp": "(11) 98765-4321",
  "endereco": {
    "logradouro": "Rua das Flores",
    "numero": "100",
    "complemento": "Sala 1",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "01310-100"
  },
  "usuario": {
    "id": "c9d8e7f6-...",
    "nome": "Responsável",
    "email": "ong@amorinclusivo.org",
    "status": "ATIVO",
    "dataCadastro": "2026-10-07T21:00:00Z"
  },
  "createdAt": "2026-10-07T21:00:00Z",
  "updatedAt": "2026-10-07T22:00:00Z"
}
```

`usuario` (conta do responsável) só é devolvido ao **dono** e ao **ADMIN**; para os demais vem `null` (LGPD). Diferença consciente em relação ao Next.js.

---

### 6. `GET /api/v1/entidades`

Diretório público de entidades e painel do admin.

**Acesso:** público (token opcional)

**Query**

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `page` | number | `1` | Página |
| `limit` | number | `10` | Itens por página (máx. 50) |
| `busca` | string | — | Razão social, nome fantasia ou área de atuação |
| `status` | string | `APROVADA` | **Somente ADMIN**; para os demais é sempre `APROVADA` |

**Response `200`**
```json
{
  "data": [ { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "statusAprovacao": "APROVADA", "...": "objeto Entidade" } ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

**Erros:** `422 { "erros": { "status": "Status inválido. Use: PENDENTE, APROVADA, REPROVADA, INATIVA" } }` (admin).

---

### 7. `POST /api/v1/entidades`

Cadastro de entidade assistencial. Cria a conta (`tipo: ENTIDADE`) e a entidade com status `PENDENTE`.

**Acesso:** público

**Request**
```json
{
  "nome": "João da Silva",
  "email": "joao@ong.org",
  "senha": "senha123",
  "cnpj": "12.345.678/0001-90",
  "razaoSocial": "ONG Exemplo",
  "nomeFantasia": "Exemplo ONG",
  "descricao": "Descrição da organização...",
  "areaAtuacao": "Assistência Social",
  "site": "https://exemplo.org",
  "emailContato": "contato@exemplo.org",
  "telefoneContato": "(11) 98765-4321",
  "whatsapp": "(11) 98765-4321",
  "logradouro": "Rua das Flores",
  "numero": "100",
  "complemento": "Sala 1",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "uf": "SP",
  "cep": "01310-100"
}
```

Obrigatórios: `nome, email, senha (≥ 6), cnpj, razaoSocial, descricao, logradouro, numero, bairro, cidade, uf, cep`.
`confirmarSenha` continua sendo validado somente no front (como no Next.js).

**Response `201`**
```json
{
  "message": "Entidade cadastrada com sucesso. Aguardando aprovação.",
  "data": { "id": "a1b2c3d4-...", "statusAprovacao": "PENDENTE", "...": "objeto Entidade (com usuario)" }
}
```

**Erros**
```json
// 422
{
  "erros": {
    "nome": "Nome é obrigatório.",
    "email": "E-mail é obrigatório.",
    "senha": "Senha deve ter ao menos 6 caracteres.",
    "cnpj": "CNPJ inválido.",
    "razaoSocial": "Razão Social é obrigatória.",
    "descricao": "Descrição é obrigatória.",
    "logradouro": "Logradouro é obrigatório.",
    "numero": "Número é obrigatório.",
    "bairro": "Bairro é obrigatório.",
    "cidade": "Cidade é obrigatória.",
    "uf": "UF é obrigatória.",
    "cep": "CEP é obrigatório."
  }
}

// 409
{ "erros": { "email": "E-mail já cadastrado.", "cnpj": "CNPJ já cadastrado." } }
```

---

### 8. `GET /api/v1/entidades/{id}`

Perfil público da entidade.

**Acesso:** público para entidades `APROVADA`; dono e ADMIN veem em qualquer status.

**Response `200`**
```json
{ "data": { "id": "a1b2c3d4-...", "...": "objeto Entidade" } }
```

**Erros:** `404 { "error": "Entidade não encontrada." }` — inexistente, ID malformado ou não aprovada para quem não é dono/ADMIN.

---

### 9. `PATCH /api/v1/entidades/{id}`

Edição das informações institucionais. Todos os campos são opcionais.
Obrigatório enviado vazio → `422`; opcional enviado vazio (`""`) → limpa o campo.

**Acesso:** dono da entidade ou ADMIN

**Request**
```json
{
  "razaoSocial": "Novo Nome",
  "nomeFantasia": "Nome Fantasia",
  "descricao": "Nova descrição...",
  "areaAtuacao": "Educação",
  "site": "https://novo-site.org",
  "emailContato": "novo@email.org",
  "telefoneContato": "(11) 11111-2222",
  "whatsapp": "(11) 11111-2222",
  "logradouro": "Av. Paulista",
  "numero": "1000",
  "complemento": "",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "uf": "SP",
  "cep": "01310-100"
}
```

**Response `200`** — devolve o estado **final** (inclusive endereço):
```json
{
  "message": "Informações atualizadas com sucesso.",
  "data": { "id": "a1b2c3d4-...", "razaoSocial": "Novo Nome", "...": "objeto Entidade" }
}
```

**Erros**
```json
// 401
{ "error": "Não autenticado." }
// 403
{ "error": "Sem permissão." }
// 404
{ "error": "Entidade não encontrada." }
// 422
{ "erros": { "razaoSocial": "Razão Social não pode ser vazia.", "descricao": "Descrição não pode ser vazia." } }
```

---

### 10. `PATCH /api/v1/entidades/{id}/status`

Aprovar, reprovar, desativar ou recolocar como pendente.

**Acesso:** ADMIN

**Request**
```json
{
  "status": "REPROVADA",
  "motivo": "CNPJ irregular"
}
```

| `status` | Mensagem de resposta | `motivo` obrigatório? |
|---|---|---|
| `APROVADA` | `Entidade aprovada com sucesso.` | Não |
| `REPROVADA` | `Entidade reprovada.` | **Sim** |
| `INATIVA` | `Entidade desativada.` | Não |
| `PENDENTE` | `Entidade recolocada como pendente.` | Não |

**Response `200`**
```json
{
  "message": "Entidade reprovada.",
  "data": {
    "id": "a1b2c3d4-...",
    "statusAprovacao": "REPROVADA",
    "motivoReprovacao": "CNPJ irregular",
    "...": "objeto Entidade"
  }
}
```

**Regras:** `APROVADA` registra `dataAprovacao`; `APROVADA`/`REPROVADA` registram o admin responsável; os demais status limpam `motivoReprovacao`.

**Erros**
```json
// 401 (anônimo) · 403 (não admin) · 404
// 422
{ "erros": { "status": "Status inválido. Use: PENDENTE, APROVADA, REPROVADA, INATIVA" } }
{ "erros": { "motivo": "Motivo de reprovação é obrigatório." } }
```

---

### 11. `GET /api/v1/entidades/{id}/doacoes`

Doações recebidas pela entidade, opcionalmente filtradas por campanha.

**Acesso:** dono da entidade ou ADMIN

**Query:** `campanhaId` (opcional), `page`, `limit`

**Response `200`**
```json
{
  "data": [
    {
      "id": "8d0e6c1a-...",
      "codigoComprovante": "DS-7F3A9C21B0E4",
      "valor": 10.00,
      "formaPagamento": "PIX",
      "status": "CONFIRMADA",
      "anonima": true,
      "observacao": null,
      "dataDoacao": "2026-10-07T21:45:00Z",
      "campanha": { "id": "b2a1c3d4-...", "titulo": "Cadeiras de rodas" },
      "entidade": { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "nomeFantasia": "Amor Inclusivo" },
      "doador": null
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

**Regras:** doação anônima → `doador: null` para a entidade; ADMIN vê o doador. **[DECISÃO]** RF19 fala em "exibição pública"; adotada a opção mais protetiva (LGPD).

**Erros:** `401` · `403` · `404`.

---

### 12. `GET /api/v1/entidades/{id}/arrecadacao`

Total arrecadado pela entidade em um período, por campanha.

**Acesso:** dono da entidade ou ADMIN

**Query**

| Parâmetro | Formato | Padrão | Descrição |
|---|---|---|---|
| `inicio` | `yyyy-MM-dd` | sem limite | Data inicial (inclusiva) |
| `fim` | `yyyy-MM-dd` | hoje | Data final (inclusiva) |

**Response `200`**
```json
{
  "data": {
    "inicio": "2026-10-01",
    "fim": "2026-10-31",
    "totalArrecadado": 175.00,
    "quantidadeDoacoes": 3,
    "porCampanha": [
      { "campanhaId": "b2a1c3d4-...", "titulo": "Cadeiras de rodas", "total": 150.00, "quantidade": 2 },
      { "campanhaId": null, "titulo": null, "total": 25.00, "quantidade": 1 }
    ]
  }
}
```

`campanhaId: null` agrupa as doações feitas diretamente à entidade. Somente doações `CONFIRMADA` entram no cálculo.

**Erros**
```json
// 422
{ "erros": { "fim": "A data final deve ser igual ou posterior à inicial." } }
{ "erros": { "inicio": "Valor inválido." } }
```
`401` · `403` · `404`.

---

## Campanhas

### Objeto `Campanha`

```json
{
  "id": "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c6d",
  "titulo": "Cadeiras de rodas",
  "descricao": "Compra de 5 cadeiras de rodas para os assistidos.",
  "metaValor": 1000.00,
  "valorArrecadado": 250.00,
  "percentualAtingido": 25.00,
  "dataInicio": "2026-10-06",
  "dataFim": "2026-11-06",
  "status": "ATIVA",
  "recebendoDoacoes": true,
  "motivoDesativacao": null,
  "entidade": { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "nomeFantasia": "Amor Inclusivo" },
  "createdAt": "2026-10-07T22:10:00Z",
  "updatedAt": "2026-10-07T22:10:00Z"
}
```

* `status`: `ATIVA` · `ENCERRADA` (pela entidade, estado final) · `DESATIVADA` (pelo admin, reversível).
* `recebendoDoacoes`: `true` quando `ATIVA`, hoje dentro de [`dataInicio`, `dataFim`] e entidade `APROVADA` — usado para exibir o botão "Doar".
* `valorArrecadado` / `percentualAtingido`: soma das doações `CONFIRMADA` (RF14).

---

### 13. `GET /api/v1/campanhas`

Vitrine de campanhas ativas com progresso (página inicial).

**Acesso:** público (token opcional)

**Query**

| Parâmetro | Descrição |
|---|---|
| `page`, `limit` | Paginação |
| `busca` | Trecho do título |
| `entidadeId` | Campanhas de uma entidade |
| `status` | `ATIVA`, `ENCERRADA` ou `DESATIVADA` — **somente ADMIN ou a entidade dona** (com o próprio `entidadeId`). Para os demais, o filtro é ignorado e só aparecem campanhas recebendo doações |

**Response `200`**
```json
{
  "data": [ { "id": "b2a1c3d4-...", "titulo": "Cadeiras de rodas", "percentualAtingido": 25.00, "...": "objeto Campanha" } ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

---

### 14. `GET /api/v1/campanhas/{id}`

Detalhe da campanha com progresso.

**Acesso:** público; campanhas `DESATIVADA` ou de entidade não aprovada só para dono/ADMIN.

**Response `200`**
```json
{ "data": { "id": "b2a1c3d4-...", "...": "objeto Campanha" } }
```

**Erros:** `404 { "error": "Campanha não encontrada." }`.

---

### 15. `POST /api/v1/campanhas`

Cria campanha de arrecadação para a entidade do usuário autenticado.

**Acesso:** `ENTIDADE` com status `APROVADA`

**Request**
```json
{
  "titulo": "Natal Solidário",
  "descricao": "Arrecadação para a ceia de Natal dos assistidos.",
  "metaValor": 5000.00,
  "dataInicio": "2026-11-01",
  "dataFim": "2026-12-20"
}
```

**Response `201`**
```json
{
  "message": "Campanha criada com sucesso.",
  "data": {
    "id": "b2a1c3d4-...",
    "titulo": "Natal Solidário",
    "metaValor": 5000.00,
    "valorArrecadado": 0,
    "percentualAtingido": 0.00,
    "status": "ATIVA",
    "...": "objeto Campanha"
  }
}
```

**Erros**
```json
// 401
{ "error": "Não autenticado." }
// 403
{ "error": "Somente entidades podem criar campanhas." }
{ "error": "Somente entidades aprovadas podem criar campanhas." }
// 422
{
  "erros": {
    "titulo": "Título é obrigatório.",
    "descricao": "Descrição é obrigatória.",
    "metaValor": "Meta deve ser maior que zero.",
    "dataInicio": "Data de início é obrigatória.",
    "dataFim": "Data de encerramento é obrigatória."
  }
}
{ "erros": { "dataFim": "Data de encerramento deve ser igual ou posterior à data de início." } }
{ "erros": { "dataFim": "Data de encerramento não pode estar no passado." } }
```

---

### 16. `PATCH /api/v1/campanhas/{id}`

Edita campanha `ATIVA`. Campos opcionais.

**Acesso:** entidade dona

**Request**
```json
{
  "titulo": "Cadeiras novas",
  "descricao": "Texto atualizado.",
  "metaValor": 3000.00,
  "dataInicio": "2026-10-06",
  "dataFim": "2026-12-31"
}
```

**Response `200`**
```json
{
  "message": "Campanha atualizada com sucesso.",
  "data": { "id": "b2a1c3d4-...", "titulo": "Cadeiras novas", "metaValor": 3000.00, "...": "objeto Campanha" }
}
```

**Erros**
```json
// 403
{ "error": "Sem permissão." }
// 409
{ "error": "Somente campanhas ativas podem ser editadas." }
// 422
{ "erros": { "titulo": "Título não pode ser vazio." } }
```
`401` · `404`.

---

### 17. `PATCH /api/v1/campanhas/{id}/status`

Encerrar antes do prazo (RF13) ou desativar/reativar por violação de políticas (RF15).

**Acesso:** entidade dona (somente `ENCERRADA`) ou ADMIN

**Request**
```json
{
  "status": "DESATIVADA",
  "motivo": "Conteúdo impróprio"
}
```

| Quem | Transição permitida | Mensagem |
|---|---|---|
| Dono | `ATIVA → ENCERRADA` | `Campanha encerrada.` |
| ADMIN | `ATIVA/DESATIVADA → ENCERRADA` | `Campanha encerrada.` |
| ADMIN | `ATIVA → DESATIVADA` (motivo obrigatório) | `Campanha desativada.` |
| ADMIN | `DESATIVADA → ATIVA` | `Campanha reativada.` |

**Response `200`**
```json
{
  "message": "Campanha desativada.",
  "data": { "id": "b2a1c3d4-...", "status": "DESATIVADA", "motivoDesativacao": "Conteúdo impróprio", "...": "objeto Campanha" }
}
```

**Erros**
```json
// 403 — dono pedindo DESATIVADA/ATIVA, ou usuário sem relação com a campanha
{ "error": "Sem permissão." }
// 409
{ "error": "Campanha encerrada não pode ser alterada." }
{ "error": "A campanha já está com este status." }
{ "error": "Campanha desativada pelo administrador." }
// 422
{ "erros": { "status": "Status inválido. Use: ATIVA, ENCERRADA, DESATIVADA" } }
{ "erros": { "motivo": "Motivo da desativação é obrigatório." } }
```

---

## Doações

### Objeto `Doacao`

```json
{
  "id": "8d0e6c1a-2f4b-4b8e-9c77-5a3b2c1d0e9f",
  "codigoComprovante": "DS-7F3A9C21B0E4",
  "valor": 250.50,
  "formaPagamento": "PIX",
  "status": "CONFIRMADA",
  "anonima": false,
  "observacao": "Força!",
  "dataDoacao": "2026-10-07T21:45:00Z",
  "campanha": { "id": "b2a1c3d4-...", "titulo": "Cadeiras de rodas" },
  "entidade": { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "nomeFantasia": "Amor Inclusivo" },
  "doador": { "id": "3f1c2a9e-...", "nome": "Maria Silva" }
}
```

* `campanha` é `null` em doação direta à entidade.
* `doador` é `null` quando `anonima: true`, exceto para o próprio doador e para o ADMIN.

---

### 18. `POST /api/v1/doacoes`

Realiza doação para uma campanha **ou** diretamente para uma entidade. A resposta é a confirmação da doação (RF18).

**Acesso:** `PESSOA_FISICA` ou `PESSOA_JURIDICA`

**Headers**
```http
Authorization: Bearer <token>
Idempotency-Key: 6b1f0c1e-pedido-123   (opcional, recomendado)
```

**Request — para campanha**
```json
{
  "campanhaId": "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c6d",
  "valor": 250.50,
  "formaPagamento": "PIX",
  "anonima": false,
  "observacao": "Força!"
}
```

**Request — direto para entidade**
```json
{
  "entidadeId": "a1b2c3d4-5e6f-4a7b-8c9d-0e1f2a3b4c5d",
  "valor": 30.00,
  "formaPagamento": "PIX",
  "anonima": true
}
```

**Response `201`**
```json
{
  "message": "Doação registrada com sucesso.",
  "data": { "id": "8d0e6c1a-...", "codigoComprovante": "DS-7F3A9C21B0E4", "status": "CONFIRMADA", "...": "objeto Doacao" }
}
```

**Response `200`** — repetição com o mesmo `Idempotency-Key` (não duplica, RNF11):
```json
{
  "message": "Doação já registrada.",
  "data": { "id": "8d0e6c1a-...", "...": "a doação original" }
}
```

**Regras**
* Informar **exatamente um** destino: `campanhaId` ou `entidadeId`.
* Com campanha, a entidade destino é a dona da campanha; a campanha precisa estar recebendo doações.
* Entidade destino precisa estar `APROVADA`.
* `formaPagamento`: apenas `PIX` (RF20). **[DECISÃO PV01]** outros meios.
* **[DECISÃO PV01/PV07]** sem gateway definido, a doação é registrada como `CONFIRMADA` (pagamento simulado). Com gateway PIX, passará a nascer `PENDENTE` e será confirmada via webhook, sem mudar esta rota.

**Erros**
```json
// 401
{ "error": "Não autenticado." }
// 403 — entidade ou admin tentando doar
{ "error": "Somente doadores podem realizar doações." }
// 404 — campanha/entidade inexistente, desativada ou não aprovada
{ "error": "Campanha não encontrada." }
{ "error": "Entidade não encontrada." }
// 409 — campanha encerrada, fora do período ou de entidade inativa
{ "error": "Esta campanha não está recebendo doações." }
// 422
{ "erros": { "valor": "Valor deve ser maior que zero.", "formaPagamento": "Forma de pagamento é obrigatória." } }
{ "erros": { "destino": "Informe a campanha ou a entidade." } }
{ "erros": { "destino": "Informe apenas a campanha ou a entidade." } }
{ "erros": { "formaPagamento": "Valor inválido. Use: PIX" } }
```

---

### 19. `GET /api/v1/doacoes/{id}`

Comprovante de uma doação.

**Acesso:** doador que fez a doação, entidade destino ou ADMIN

**Response `200`**
```json
{ "data": { "id": "8d0e6c1a-...", "codigoComprovante": "DS-7F3A9C21B0E4", "...": "objeto Doacao" } }
```

**Erros:** `401`; `404 { "error": "Doação não encontrada." }` — também para quem não tem acesso (não revela a existência).

---

## Painel administrativo

### 20. `GET /api/v1/dashboard/kpis`

Indicadores gerais da plataforma (RF24/RF25, issues #53 e #114).

**Acesso:** ADMIN

**Response `200`**
```json
{
  "data": {
    "totalArrecadado": 125430.50,
    "valorArrecadadoMes": 4200.00,
    "doacoesMes": 87,
    "totalDoacoes": 900,
    "totalDoadores": 300,
    "totalEntidades": 12,
    "campanhasAtivas": 6,
    "usuariosAtivos": 320
  }
}
```

| Campo | Cálculo |
|---|---|
| `totalArrecadado` | Soma de todas as doações `CONFIRMADA` |
| `valorArrecadadoMes` / `doacoesMes` | Doações `CONFIRMADA` desde o dia 1º do mês corrente |
| `totalDoacoes` | Quantidade de doações `CONFIRMADA` |
| `totalDoadores` | Doadores distintos com ao menos uma doação confirmada |
| `totalEntidades` | Entidades `APROVADA` |
| `campanhasAtivas` | Campanhas recebendo doações hoje |
| `usuariosAtivos` | Usuários com status `ATIVO` |

**Diferenças em relação ao mock do QA (`quality/docs/backend`):** os campos ficam dentro de `data`; `projetosAtivos` passa a ser `campanhasAtivas`; `agendamentosPendentes` não existe no MVP (sem módulo de Agendamento). **[DECISÃO]** confirmar com a Equipe 4 e o QA.

**Erros:** `401` · `403`.

---

### 21. `GET /api/v1/usuarios`

Lista usuários para a gestão administrativa.

**Acesso:** ADMIN

**Query:** `busca` (nome ou e-mail), `tipo` (`PESSOA_FISICA`, `PESSOA_JURIDICA`, `ENTIDADE`, `ADMIN`), `status` (`ATIVO`, `INATIVO`), `page`, `limit`

**Response `200`**
```json
{
  "data": [
    {
      "id": "3f1c2a9e-...",
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "tipo": "PESSOA_FISICA",
      "status": "ATIVO",
      "telefone": "(11) 99999-0000",
      "dataCadastro": "2026-10-07T21:30:00Z",
      "cpf": "123.456.789-09",
      "dataNascimento": "1990-05-10",
      "cnpj": null,
      "razaoSocial": null,
      "entidadeId": null,
      "statusEntidade": null
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

**Erros:** `401` · `403` · `422 { "erros": { "tipo": "Valor inválido. Use: PESSOA_FISICA, PESSOA_JURIDICA, ENTIDADE, ADMIN" } }`.

---

### 22. `PATCH /api/v1/usuarios/{id}/status`

Ativa ou desativa uma conta. Usuário `INATIVO` não faz login e perde o acesso mesmo com token ainda válido.

**Acesso:** ADMIN

**Request**
```json
{ "status": "INATIVO" }
```

**Response `200`**
```json
{
  "message": "Usuário desativado.",
  "data": { "id": "3f1c2a9e-...", "status": "INATIVO", "...": "demais campos do usuário" }
}
```
(`"Usuário ativado."` quando `status: "ATIVO"`.)

**Erros**
```json
// 404
{ "error": "Usuário não encontrado." }
// 409
{ "error": "O administrador não pode desativar a própria conta." }
// 422
{ "erros": { "status": "Status inválido. Use: ATIVO, INATIVO" } }
```
`401` · `403`.

---

## Rotas previstas fora do MVP (não documentadas em detalhe)

Dependem de decisões ou módulos ainda inexistentes — ver §12 do [`routes-plan.md`](./routes-plan.md):

| Rota | Origem | Bloqueio |
|---|---|---|
| `GET /api/v1/dashboard/financeiro` | #53, #85 | Categorias e canais não existem no modelo |
| `POST /api/v1/relatorios/exportar` | #53, #124 | PV06 pendente |
| `GET /api/v1/dashboard/auditoria` | #53, #123 | Exige entidade AuditLog |
| `GET /api/v1/doadores`, `GET /api/v1/doadores/{id}/ficha` | #88, #134 | Nome divergente nas issues |
| `/api/v1/projetos/...` | #91, #129 | "Projeto" × "Campanha" |
| Agendamentos, pedidos, produtos | #92, #94, #120 | Fora dos RFs do MVP |
| Recuperação de senha (RF04) | RF04 | Depende de envio de e-mail (PV05) |
