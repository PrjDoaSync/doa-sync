# Contrato Consolidado da API — DoaSync (`/api/v1`)

> **Task DOC-09 (#188) — Consolidação do contrato da API**
> Unifica [`rotas-api.md`](./rotas-api.md), [`../routes-plan.md`](../routes-plan.md) e os documentos `api-cam-*` do `doasync-backend`.
> Issues relacionadas: TS-001 (#145), CAM-T20 (#171).

---

## Como usar este documento

| Símbolo | Significado |
|---|---|
| ✅ **Implementada** | Rota existe no código do `doasync-backend`; comportamento conferido no Swagger ou nos testes |
| 🔧 **Planejada** | Contrato definido aqui; implementação pendente ou não verificada |
| ⚠️ **A confirmar** | Campo, mensagem ou regra com dúvida aberta — ver coluna de observações |
| 🚫 **Fora do MVP** | Rota planejada para sprints futuras; sem contrato detalhado aqui |

> **Verificação do status:** conferido no código do `doasync-backend` (branch `main`, 25/11/2026), controllers `AuthController`, `DoadorController`, `UsuarioMeController`, `DoacaoController`, `EntidadeCadastroController`, `EntidadeConsultaController`, `EntidadeEdicaoController`, `EntidadeStatusController`, `CampanhaController` (vitrine), `CampanhaEscritaController`, `DashboardController`, `UsuarioAdminController` e `UsuarioStatusController`. As 22 rotas do MVP estão implementadas. O contrato mantido pelo backend fica em `doasync-backend/docs/api-contract.md`; em caso de divergência, vale o código.

---

## Sumário de rotas

| # | Método | Rota | Perfil de acesso | Status | Requisito |
|---|---|---|---|---|---|
| 1 | POST | [`/api/v1/auth/login`](#1-post-apiv1authlogin) | Público | ✅ Implementada | RF03, RF06 |
| 2 | POST | [`/api/v1/doadores`](#2-post-apiv1doadores) | Público | ✅ Implementada | RF01 |
| 3 | GET | [`/api/v1/usuarios/me`](#3-get-apiv1usuariosme) | Autenticado | ✅ Implementada | RF05 |
| 4 | PATCH | [`/api/v1/usuarios/me`](#4-patch-apiv1usuariosme) | Autenticado | ✅ Implementada | RF05 |
| 5 | GET | [`/api/v1/usuarios/me/doacoes`](#5-get-apiv1usuariosmedoacoes) | Doador (PF/PJ) | ✅ Implementada | RF21 |
| 6 | GET | [`/api/v1/entidades`](#6-get-apiv1entidades) | Público | ✅ Implementada | RF08, RF26 |
| 7 | POST | [`/api/v1/entidades`](#7-post-apiv1entidades) | Público | ✅ Implementada | RF02 |
| 8 | GET | [`/api/v1/entidades/{id}`](#8-get-apiv1entidadesid) | Público* | ✅ Implementada | RF08 |
| 9 | PATCH | [`/api/v1/entidades/{id}`](#9-patch-apiv1entidadesid) | Dono ou ADMIN | ✅ Implementada | RF07 |
| 10 | PATCH | [`/api/v1/entidades/{id}/status`](#10-patch-apiv1entidadesidstatus) | ADMIN | ✅ Implementada | RF09, RF10 |
| 11 | GET | [`/api/v1/entidades/{id}/doacoes`](#11-get-apiv1entidadesiddoacoes) | Dono ou ADMIN | ✅ Implementada | RF22 |
| 12 | GET | [`/api/v1/entidades/{id}/arrecadacao`](#12-get-apiv1entidadesidarrecadacao) | Dono ou ADMIN | ✅ Implementada | RF23 |
| 13 | GET | [`/api/v1/campanhas`](#13-get-apiv1campanhas) | Público | ✅ Implementada | RF12, RF14 |
| 14 | GET | [`/api/v1/campanhas/{id}`](#14-get-apiv1campanhasid) | Público* | ✅ Implementada | RF14 |
| 15 | POST | [`/api/v1/campanhas`](#15-post-apiv1campanhas) | ENTIDADE aprovada | ✅ Implementada | RF11 |
| 16 | PATCH | [`/api/v1/campanhas/{id}`](#16-patch-apiv1campanhasid) | Entidade dona | ✅ Implementada | RF11 (Equipe 2) |
| 17 | PATCH | [`/api/v1/campanhas/{id}/status`](#17-patch-apiv1campanhasidstatus) | Dono / ADMIN | ✅ Implementada | RF13, RF15 |
| 18 | POST | [`/api/v1/doacoes`](#18-post-apiv1doacoes) | Doador (PF/PJ) | ✅ Implementada | RF16–RF20, RNF11 |
| 19 | GET | [`/api/v1/doacoes/{id}`](#19-get-apiv1doacoesid) | Doador / Entidade / ADMIN | ✅ Implementada | RF18 |
| 20 | GET | [`/api/v1/dashboard/kpis`](#20-get-apiv1dashboardkpis) | ADMIN | ✅ Implementada | RF24, RF25 |
| 21 | GET | [`/api/v1/usuarios`](#21-get-apiv1usuarios) | ADMIN | ✅ Implementada | RF26 |
| 22 | PATCH | [`/api/v1/usuarios/{id}/status`](#22-patch-apiv1usuariosidstatus) | ADMIN | ✅ Implementada | RF26 |

\* Recursos não aprovados/desativados só são visíveis para o dono e o ADMIN.

> **Status das rotas:** conferido no código do `doasync-backend` (`main`). Entidade (6–10): `EntidadeCadastroController`, `EntidadeConsultaController`, `EntidadeEdicaoController` e `EntidadeStatusController`. Auth e usuário (1–5): `AuthController`, `DoadorController`, `UsuarioMeController` e `DoacaoController`. Doações (11, 12, 18, 19): `DoacaoController`. Campanhas (13–17): `CampanhaController` e `CampanhaEscritaController`. Admin (20–22): `DashboardController`, `UsuarioAdminController` e `UsuarioStatusController`.

---

## Convenções gerais

### Autenticação

```http
Authorization: Bearer <token devolvido no login>
```

Perfis (`tipo`): `PESSOA_FISICA` · `PESSOA_JURIDICA` · `ENTIDADE` · `ADMIN`

Logout é feito pelo cliente descartando o token (JWT stateless). ⚠️ **[DECISÃO]** criar `POST /auth/logout` se for exigida revogação no servidor.

### Formatos

| Tipo | Formato |
|---|---|
| Datas | `yyyy-MM-dd` |
| Instantes | ISO-8601 UTC (`2026-10-07T21:30:00Z`) |
| Valores monetários | Número decimal (`150.00`) |
| IDs | UUID v4 |

### Envelope de resposta

**Item único:**
```json
{ "message": "Mensagem opcional.", "data": { } }
```

**Lista paginada** (`page` base 1; `limit` padrão 10, máximo 50):
```json
{
  "data": [ ],
  "meta": { "total": 23, "page": 1, "limit": 10, "totalPages": 3 }
}
```

### Erros padrão

| Status | Corpo | Quando |
|---|---|---|
| `400` | `{ "error": "Corpo da requisição inválido." }` | JSON malformado |
| `401` | `{ "error": "Não autenticado." }` | Token ausente, inválido, expirado ou usuário inativo |
| `403` | `{ "error": "Sem permissão." }` | Perfil ou propriedade não autorizados |
| `404` | `{ "error": "<Recurso> não encontrado." }` | Inexistente **ou** não visível ao usuário |
| `409` | `{ "erros": { "campo": "mensagem" } }` ou `{ "error": "..." }` | Duplicidade ou estado inválido |
| `422` | `{ "erros": { "campo": "mensagem" } }` | Validação de campos |
| `500` | `{ "error": "Erro interno no servidor." }` | Falha inesperada |

---

## Autenticação e usuários

---

### 1. `POST /api/v1/auth/login` ✅

Autentica e devolve o token + perfil do usuário.

**Perfil de acesso:** público

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
    "token": "eyJhbGciOiJIUzI1NiJ9...",
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

Para gestor de entidade, `entidadeId` e `statusEntidade` (`PENDENTE` · `APROVADA` · `REPROVADA` · `INATIVA`) vêm preenchidos.

**Erros**
```json
// 401 — senha errada, e-mail inexistente ou usuário INATIVO (mesma mensagem, não revela qual)
{ "error": "E-mail ou senha inválidos." }

// 422
{ "erros": { "email": "E-mail é obrigatório.", "senha": "Senha é obrigatória." } }
```

**Regras:** e-mail normalizado (trim + minúsculas) antes da verificação.

---

### 2. `POST /api/v1/doadores` ✅

Cadastro de doador pessoa física ou jurídica.

**Perfil de acesso:** público

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

**Regras:** e-mail normalizado; CPF/CNPJ aceitos com ou sem máscara, gravados com máscara; senha armazenada como hash (bcrypt).

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

⚠️ **A confirmar com Backend:** mensagem de CNPJ duplicado (CT-AUT-09).

---

### 3. `GET /api/v1/usuarios/me` ✅

Perfil do usuário autenticado.

**Perfil de acesso:** qualquer autenticado

**Response `200`**
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

**Erros:** `401`

---

### 4. `PATCH /api/v1/usuarios/me` ✅

Edição do próprio perfil. Todos os campos são opcionais; campo ausente não é alterado.
E-mail, tipo, CPF e CNPJ **não são editáveis**. Dados institucionais de entidade são editados na rota 9.

**Perfil de acesso:** qualquer autenticado

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
  "data": { "id": "3f1c2a9e-...", "nome": "Maria S.", "telefone": "(11) 1111-2222" }
}
```

**Erros**
```json
// 422
{ "erros": { "nome": "Nome não pode ser vazio." } }
{ "erros": { "novaSenha": "Senha deve ter ao menos 6 caracteres." } }
{ "erros": { "senhaAtual": "Senha atual incorreta." } }
```
`401`

---

### 5. `GET /api/v1/usuarios/me/doacoes` ✅

Histórico de doações do doador autenticado, mais recentes primeiro.

**Perfil de acesso:** `PESSOA_FISICA` ou `PESSOA_JURIDICA`

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

**Erros:** `401` · `403 { "error": "Sem permissão." }` (perfil não doador)

---

## Entidades

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

`usuario` (conta do responsável) só é devolvido ao **dono** e ao **ADMIN**; para os demais vem `null` (LGPD/RNF-006).

---

### 6. `GET /api/v1/entidades` ✅

Diretório público de entidades: lista somente as entidades `APROVADA`.

**Perfil de acesso:** público (token opcional)

**Query:** nenhuma. A rota não tem paginação, busca nem filtro de status (`EntidadeConsultaController.listar()`).

**Response `200`** (`ApiResposta<List<EntidadeResposta>>`, sem `meta`)
```json
{
  "data": [ { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "statusAprovacao": "APROVADA" } ]
}
```

---

### 7. `POST /api/v1/entidades` ✅

Cadastro de entidade assistencial. Cria a conta (`tipo: ENTIDADE`) e a entidade com `statusAprovacao: PENDENTE`.

**Perfil de acesso:** público

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

Campos **obrigatórios:** `nome`, `email`, `senha` (≥ 6), `cnpj`, `razaoSocial`, `descricao`, `logradouro`, `numero`, `bairro`, `cidade`, `uf`, `cep`.
`confirmarSenha` é validado somente no frontend.

**Response `201`**
```json
{
  "message": "Entidade cadastrada com sucesso. Aguardando aprovação.",
  "data": { "id": "a1b2c3d4-...", "statusAprovacao": "PENDENTE" }
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

### 8. `GET /api/v1/entidades/{id}` ✅

Perfil público da entidade.

**Perfil de acesso:** público para `APROVADA`; dono e ADMIN veem qualquer status.

**Response `200`**
```json
{ "data": { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo" } }
```

**Erros:** `404 { "error": "Entidade não encontrada." }` — inexistente, UUID malformado ou não aprovada para quem não é dono/ADMIN.

---

### 9. `PATCH /api/v1/entidades/{id}` ✅

Edição das informações institucionais. Todos os campos são opcionais; obrigatório enviado vazio → `422`; opcional enviado vazio (`""`) limpa o campo.

**Perfil de acesso:** dono da entidade ou ADMIN

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

**Response `200`** — devolve o estado **final** (inclusive endereço atualizado):
```json
{
  "message": "Informações atualizadas com sucesso.",
  "data": { "id": "a1b2c3d4-...", "razaoSocial": "Novo Nome" }
}
```

**Erros**
```json
{ "error": "Não autenticado." }         // 401
{ "error": "Sem permissão." }           // 403
{ "error": "Entidade não encontrada." } // 404
{ "erros": { "razaoSocial": "Razão Social não pode ser vazia.", "descricao": "Descrição não pode ser vazia." } } // 422
```

---

### 10. `PATCH /api/v1/entidades/{id}/status` ✅

Aprovar, reprovar, desativar ou recolocar como pendente.

**Perfil de acesso:** ADMIN

**Request**
```json
{
  "status": "REPROVADA",
  "motivo": "CNPJ irregular"
}
```

| `status` enviado | Mensagem da resposta | `motivo` obrigatório? |
|---|---|---|
| `APROVADA` | `Entidade aprovada com sucesso.` | Não |
| `REPROVADA` | `Entidade reprovada.` | **Sim** |
| `INATIVA` | `Entidade desativada.` | Não |
| `PENDENTE` | `Entidade recolocada como pendente.` | Não |

**Response `200`**
```json
{
  "message": "Entidade reprovada.",
  "data": { "id": "a1b2c3d4-...", "statusAprovacao": "REPROVADA", "motivoReprovacao": "CNPJ irregular" }
}
```

**Regras:**
- `APROVADA` grava `dataAprovacao` e `aprovadoPorId`; demais status limpam `motivoReprovacao`.
- `INATIVA` encerra automaticamente as campanhas `ATIVA` e `AGENDADA` da entidade (RN55).
- `motivo` aceita no máximo 1000 caracteres (`Motivo deve ter no máximo 1000 caracteres.`, 422).

**Erros**
```json
{ "error": "Não autenticado." }   // 401 (anônimo)
{ "error": "Sem permissão." }     // 403 (não admin)
{ "error": "Entidade não encontrada." } // 404
{ "erros": { "status": "Status inválido. Use: PENDENTE, APROVADA, REPROVADA, INATIVA" } } // 422
{ "erros": { "motivo": "Motivo de reprovação é obrigatório." } } // 422
```

---

### 11. `GET /api/v1/entidades/{id}/doacoes` ✅

Doações recebidas pela entidade, opcionalmente filtradas por campanha.

**Perfil de acesso:** dono da entidade ou ADMIN

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

**Regras:** doação anônima → `doador: null` para a entidade; ADMIN vê o doador. ⚠️ **[DECISÃO]** RF19 menciona "exibição pública"; adotada a opção mais protetiva (LGPD/RNF-006).

**Erros:** `401` · `403` · `404`

---

### 12. `GET /api/v1/entidades/{id}/arrecadacao` ✅

Total arrecadado pela entidade em um período, por campanha.

**Perfil de acesso:** dono da entidade ou ADMIN

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

`campanhaId: null` agrupa doações feitas diretamente à entidade. Somente doações `CONFIRMADA` entram no cálculo.

**Erros**
```json
{ "erros": { "fim": "A data final deve ser igual ou posterior à inicial." } } // 422
{ "erros": { "inicio": "Valor inválido." } } // 422
```
`401` · `403` · `404`

---

## Campanhas

### Objeto `Campanha`

```json
{
  "id": "b2a1c3d4-6e7f-4a8b-9c0d-1e2f3a4b5c6d",
  "titulo": "Cadeiras de rodas",
  "descricao": "Compra de 5 cadeiras de rodas para os assistidos.",
  "categoria": "Saúde",
  "metaValor": 1000.00,
  "valorArrecadado": 250.00,
  "percentualAtingido": 25.00,
  "dataInicio": "2026-10-06",
  "dataFim": "2026-11-06",
  "status": "ATIVA",
  "recebendoDoacoes": true,
  "imagemUrl": "https://cdn.exemplo.com/cadeiras.jpg",
  "motivoDesativacao": null,
  "entidade": { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "nomeFantasia": "Amor Inclusivo" },
  "createdAt": "2026-10-07T22:10:00Z",
  "updatedAt": "2026-10-07T22:10:00Z"
}
```

| Campo | Descrição |
|---|---|
| `status` | `RASCUNHO` · `AGENDADA` (início no futuro) · `ATIVA` · `ENCERRADA` (pela entidade — estado final) · `DESATIVADA` (pelo admin — reversível). Fonte: enum `StatusCampanha`. Ciclo: `RASCUNHO → AGENDADA → ATIVA → ENCERRADA \| DESATIVADA` (RN59) |
| `recebendoDoacoes` | `true` quando `ATIVA` + hoje ∈ [`dataInicio`, `dataFim`] + entidade `APROVADA` |
| `valorArrecadado` / `percentualAtingido` | Soma das doações `CONFIRMADA` |
| `categoria` | Texto livre, opcional, até 200 caracteres. Não há taxonomia nem filtro por categoria (fora do MVP) |
| `imagemUrl` | Link externo opcional, até 2.048 caracteres. Não há upload de imagem (RF-018 fora do MVP) |

**Status inicial na criação** (calculado no servidor): `rascunho: true` → `RASCUNHO`; `dataInicio` no futuro → `AGENDADA`; caso contrário → `ATIVA`. Não há rota de publicação separada: a campanha sai de `RASCUNHO` por `PATCH /campanhas/{id}/status` (rota 17) ou pela rotina diária que atualiza o status pelas datas (RN59, RN60).

---

### 13. `GET /api/v1/campanhas` ✅

Vitrine de campanhas ativas com progresso.

**Perfil de acesso:** público (token opcional)

**Query**

| Parâmetro | Descrição |
|---|---|
| `page`, `limit` | Paginação (padrão: `page=1`, `limit=10`, máx. 50) |
| `busca` | Termo buscado no **título** (sem diferenciar maiúsculas, até 200 caracteres; `%`, `_` e `!` são tratados como texto). Vem de `Paginacao` |
| `entidadeId` | Campanhas de uma entidade específica |
| `status` | `AGENDADA` · `ATIVA` · `ENCERRADA` · `DESATIVADA` — **somente ADMIN ou entidade dona com seu próprio `entidadeId`**; para os demais o filtro é ignorado e só aparecem campanhas `recebendoDoacoes: true`. `RASCUNHO` nunca aparece na vitrine |

**Response `200`**
```json
{
  "data": [
    {
      "id": "b2a1c3d4-...",
      "titulo": "Cadeiras de rodas",
      "metaValor": 1000.00,
      "valorArrecadado": 250.00,
      "percentualAtingido": 25.00,
      "status": "ATIVA",
      "recebendoDoacoes": true,
      "entidade": { "id": "a1b2c3d4-...", "razaoSocial": "Associação Amor Inclusivo", "nomeFantasia": "Amor Inclusivo" }
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 }
}
```

**Erros:** `422 { "erros": { "status": "Status inválido. Use: RASCUNHO, AGENDADA, ATIVA, ENCERRADA, DESATIVADA" } }` (ADMIN ou entidade dona com valor inválido; mensagem de `CampanhaVitrineService`) (CT-CAM-108)

---

### 14. `GET /api/v1/campanhas/{id}` ✅

Detalhe da campanha com progresso.

**Perfil de acesso:** público; `DESATIVADA` ou de entidade não aprovada → somente dono/ADMIN.

**Response `200`**
```json
{ "data": { "id": "b2a1c3d4-...", "titulo": "Cadeiras de rodas" } }
```

**Erros:** `404 { "error": "Campanha não encontrada." }`

---

### 15. `POST /api/v1/campanhas` ✅

Cria campanha de arrecadação para a entidade do usuário autenticado.

**Perfil de acesso:** `ENTIDADE` com `statusAprovacao: APROVADA`

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
    "status": "ATIVA"
  }
}
```

**Erros**
```json
{ "error": "Não autenticado." }                               // 401
{ "error": "Somente entidades podem criar campanhas." }       // 403
{ "error": "Somente entidades aprovadas podem criar campanhas." } // 403
{
  "erros": {
    "titulo": "Título é obrigatório.",
    "descricao": "Descrição é obrigatória.",
    "metaValor": "Meta deve ser maior que zero.",
    "dataInicio": "Data de início é obrigatória.",
    "dataFim": "Data de encerramento é obrigatória."
  }
}                                                             // 422
{ "erros": { "dataFim": "Data de encerramento deve ser igual ou posterior à data de início." } } // 422
{ "erros": { "dataFim": "Data de encerramento não pode estar no passado." } } // 422
```

---

### 16. `PATCH /api/v1/campanhas/{id}` ✅

Edita campanha `ATIVA`. Todos os campos são opcionais.

**Perfil de acesso:** entidade dona

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
  "data": { "id": "b2a1c3d4-...", "titulo": "Cadeiras novas", "metaValor": 3000.00 }
}
```

**Erros**
```json
{ "error": "Não autenticado." }                              // 401 ⚠️ a confirmar (CT-CAM-23)
{ "error": "Sem permissão." }                                // 403
{ "error": "Campanha não encontrada." }                      // 404 ⚠️ a confirmar (CT-CAM-27)
{ "error": "Somente campanhas ativas podem ser editadas." }  // 409
{ "erros": { "titulo": "Título não pode ser vazio." } }      // 422
```

⚠️ **A confirmar com Backend:** mensagens 422 de descrição vazia, meta inválida e datas inconsistentes (CT-CAM-31 a CT-CAM-33).

---

### 17. `PATCH /api/v1/campanhas/{id}/status` ✅

Encerrar antes do prazo (RF13) ou desativar/reativar por violação de políticas (RF15).

**Perfil de acesso:** entidade dona (somente `ENCERRADA`) ou ADMIN

**Request**
```json
{
  "status": "DESATIVADA",
  "motivo": "Conteúdo impróprio"
}
```

| Quem | Transição permitida | Mensagem de resposta |
|---|---|---|
| Dono | `ATIVA → ENCERRADA` | `Campanha encerrada.` |
| ADMIN | `ATIVA/DESATIVADA → ENCERRADA` | `Campanha encerrada.` |
| ADMIN | `ATIVA → DESATIVADA` (motivo obrigatório) | `Campanha desativada.` |
| ADMIN | `DESATIVADA → ATIVA` | `Campanha reativada.` |

O campo `status` aceita os 5 valores de `StatusCampanha` (`RASCUNHO`, `AGENDADA`, `ATIVA`, `ENCERRADA`, `DESATIVADA`), respeitando o ciclo `RASCUNHO → AGENDADA → ATIVA → ENCERRADA | DESATIVADA` (RN59). Transição fora do ciclo → `409`. `motivo` aceita no máximo 1000 caracteres.

**Response `200`**
```json
{
  "message": "Campanha desativada.",
  "data": { "id": "b2a1c3d4-...", "status": "DESATIVADA", "motivoDesativacao": "Conteúdo impróprio" }
}
```

**Erros**
```json
{ "error": "Sem permissão." }                                // 403
{ "error": "Campanha encerrada não pode ser alterada." }     // 409
{ "error": "A campanha já está com este status." }           // 409
{ "error": "Campanha desativada pelo administrador." }       // 409 ⚠️ a confirmar: qual transição (CT-CAM-26, CT-CAM-55)
{ "erros": { "status": "Status inválido." } } // 422
{ "erros": { "motivo": "Motivo da desativação é obrigatório." } } // 422
```
`401` · `404` ⚠️ a confirmar (CT-CAM-50, CT-CAM-62)

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

`campanha` é `null` em doação direta à entidade. `doador` é `null` quando `anonima: true`, exceto para o próprio doador e o ADMIN.

---

### 18. `POST /api/v1/doacoes` ✅

Realiza doação para uma campanha **ou** diretamente para uma entidade.

**Perfil de acesso:** `PESSOA_FISICA` ou `PESSOA_JURIDICA`

**Headers**
```http
Authorization: Bearer <token>
Idempotency-Key: 6b1f0c1e-pedido-123   (opcional, recomendado — RNF11)
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

**Response `201`** — nova doação:
```json
{
  "message": "Doação registrada com sucesso.",
  "data": { "id": "8d0e6c1a-...", "codigoComprovante": "DS-7F3A9C21B0E4", "status": "CONFIRMADA" }
}
```

**Response `200`** — repetição com o mesmo `Idempotency-Key`: devolve a doação já criada, sem duplicar (RNF11):
```json
{
  "message": "Doação recuperada com sucesso.",
  "data": { "id": "8d0e6c1a-...", "codigoComprovante": "DS-7F3A9C21B0E4", "status": "CONFIRMADA" }
}
```

**Regras:**
- Informar **exatamente um** destino: `campanhaId` ou `entidadeId`.
- Com `campanhaId`, a entidade destino é a dona da campanha; a campanha precisa estar `recebendoDoacoes: true`.
- Entidade destino precisa estar `APROVADA`.
- `formaPagamento`: somente `PIX` (RF20). ⚠️ **[DECISÃO PV01]** outros meios pendentes.
- Sem gateway definido: doação registrada como `CONFIRMADA` (pagamento simulado). Com gateway PIX futuro: fluxo `PENDENTE → CONFIRMADA` via webhook, sem mudar esta rota.

**Erros**
```json
{ "error": "Não autenticado." }                               // 401
{ "error": "Somente doadores podem realizar doações." }       // 403
{ "error": "Campanha não encontrada." }                       // 404
{ "error": "Entidade não encontrada." }                       // 404
{ "error": "Esta campanha não está recebendo doações." }      // 409
{ "erros": { "valor": "Valor deve ser maior que zero.", "formaPagamento": "Forma de pagamento é obrigatória." } } // 422
{ "erros": { "destino": "Informe a campanha ou a entidade." } } // 422
{ "erros": { "destino": "Informe apenas a campanha ou a entidade." } } // 422
{ "erros": { "formaPagamento": "Valor inválido. Use: PIX" } } // 422
```

---

### 19. `GET /api/v1/doacoes/{id}` ✅

Comprovante de uma doação.

**Perfil de acesso:** doador que realizou a doação, entidade destino ou ADMIN

**Response `200`**
```json
{ "data": { "id": "8d0e6c1a-...", "codigoComprovante": "DS-7F3A9C21B0E4" } }
```

**Erros:** `401` · `404 { "error": "Doação não encontrada." }` (também quando o usuário não tem acesso — não revela a existência)

---

## Painel administrativo

---

### 20. `GET /api/v1/dashboard/kpis` ✅

Indicadores gerais da plataforma.

**Perfil de acesso:** ADMIN

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
| `totalDoadores` | Doadores distintos com ≥ 1 doação confirmada |
| `totalEntidades` | Entidades `APROVADA` |
| `campanhasAtivas` | Campanhas `recebendoDoacoes: true` hoje |
| `usuariosAtivos` | Usuários com `status: ATIVO` |

> **Diferenças em relação ao mock do QA** (`quality/docs/backend`): campos dentro de `data`; `projetosAtivos` → `campanhasAtivas`; `agendamentosPendentes` não existe no MVP (módulo de Agendamento fora do escopo). ⚠️ **[DECISÃO]** confirmar com Equipe 4 e QA.

**Erros:** `401` · `403`

---

### 21. `GET /api/v1/usuarios` ✅

Lista usuários para gestão administrativa.

**Perfil de acesso:** ADMIN

**Query:** `busca` (nome ou e-mail), `tipo` (`PESSOA_FISICA` · `PESSOA_JURIDICA` · `ENTIDADE` · `ADMIN`), `status` (`ATIVO` · `INATIVO`), `page`, `limit`

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

**Erros:** `401` · `403` · `422 { "erros": { "tipo": "Valor inválido. Use: PESSOA_FISICA, PESSOA_JURIDICA, ENTIDADE, ADMIN" } }`

---

### 22. `PATCH /api/v1/usuarios/{id}/status` ✅

Ativa ou desativa uma conta. Usuário `INATIVO` não faz login e perde acesso mesmo com token ainda válido.

**Perfil de acesso:** ADMIN

**Request**
```json
{ "status": "INATIVO" }
```

**Response `200`**
```json
{
  "message": "Usuário desativado.",
  "data": { "id": "3f1c2a9e-...", "status": "INATIVO" }
}
```

(`"Usuário ativado."` quando `status: "ATIVO"`.)

**Erros**
```json
{ "error": "Usuário não encontrado." }                            // 404
{ "error": "O administrador não pode desativar a própria conta." } // 409
{ "erros": { "status": "Status inválido. Use: ATIVO, INATIVO" } } // 422
```
`401` · `403`

---

## Rotas fora do MVP 🚫

Dependem de decisões ou módulos ainda inexistentes — ver [`routes-plan.md`](../routes-plan.md) §12:

| Rota | Origem | Bloqueio |
|---|---|---|
| `GET /api/v1/dashboard/financeiro` | #53, #85 | Categorias e canais não existem no modelo |
| `POST /api/v1/relatorios/exportar` | #53, #124 | PV06 pendente |
| `GET /api/v1/dashboard/auditoria` | #53, #123 | Exige entidade `AuditLog` |
| `GET /api/v1/doadores`, `GET /api/v1/doadores/{id}/ficha` | #88, #134 | Nome divergente nas issues |
| `/api/v1/projetos/...` | #91, #129 | Domínio "Projeto" × "Campanha" |
| Agendamentos, pedidos, produtos | #92, #94, #120 | Fora dos RFs do MVP |
| `POST /api/v1/auth/logout` | RF03 | ⚠️ [DECISÃO] somente se for exigida revogação de token |
| Recuperação de senha | RF04 | Depende de e-mail (PV05) |

---

## Rotas legadas

| Rota | Controller | Observação |
|---|---|---|
| `GET /api/campanhas` | `CampanhaReadController` | Alias legado da consulta da Equipe 2, **sem `/v1`**. Só sobe com o perfil Spring `consulta` (`@Profile("consulta")`). Query: `page` (padrão 1), `limit` (padrão 10), `busca`, `entidadeId`. Somente leitura |
| `GET /api/campanhas/{id}` | `CampanhaReadController` | Mesmo alias e perfil |

Clientes novos devem usar `GET /api/v1/campanhas` e `GET /api/v1/campanhas/{id}` (rotas 13 e 14).

---

## Coleção Postman

| Coleção | Localização | Estado |
|---|---|---|
| **DoaSync Campanhas** (Backend) — **oficial** | `doasync-backend/docs/postman/DoaSync-Campanhas.postman_collection.json` | Coleção oficial do contrato, mantida com o código |
| **DoaSync API** (QA) — legado de mock | `quality/docs/backend/postman/doasync-api.postman_collection.json` | 4 requisições de mock; 3 delas são de rotas fora do MVP. Usar só como referência histórica |

> A coleção oficial é a do backend. Rotas deste contrato que ainda não estiverem nela devem ser acrescentadas lá, e não na coleção do QA.

---

## Dúvidas abertas com o Backend

As dúvidas completas estão em [`cenarios-testes-api.md`](./cenarios-testes-api.md). As mais críticas para fechar o contrato:

| # | Rota | Dúvida |
|---|---|---|
| 1 | `POST /doadores` | Mensagem de CNPJ duplicado (409) |
| 2 | `POST /campanhas` | ✅ Respondida (`StatusCampanha`): `rascunho: true` cria em `RASCUNHO`; sem rascunho, `AGENDADA` se `dataInicio` for futura, senão `ATIVA`. Não há rota de publicação; a mudança de status é pela rota 17. Ver [Objeto `Campanha`](#objeto-campanha) |
| 3 | `GET/POST /campanhas` | ✅ Respondida (`CriarCampanhaRequest`, `CampanhaResposta`): `imagemUrl` (link, até 2.048) e `categoria` (texto livre, até 200) já existem e são opcionais. Upload de imagem fica fora do MVP |
| 4 | `PATCH /campanhas/{id}/status` | Qual transição dispara "Campanha desativada pelo administrador." (409)? |
| 5 | `GET /api/v1/dashboard/kpis` | ✅ Respondida (`DashboardKpisResposta`): `totalArrecadado`, `valorArrecadadoMes`, `doacoesMes`, `totalDoacoes`, `totalDoadores`, `totalEntidades`, `campanhasAtivas`, `usuariosAtivos`. Ver rota 20 |
| 6 | Todas as rotas de campanha | ✅ Respondida: a numeração oficial é RF-001–RF-030 de [`requisitos.md`](../requisitos.md). A equivalência com RF01–RF26 está em [`funcionalidades.md`](../funcionalidades.md) |

---

## Histórico de fontes consolidadas

| Fonte | Contribuição para este documento |
|---|---|
| [`rotas-api.md`](./rotas-api.md) | Contrato detalhado das 22 rotas (request, response, erros, regras) |
| [`../routes-plan.md`](../routes-plan.md) | Status de implementação, decisões arquiteturais, problemas identificados |
| [`cenarios-testes-api.md`](./cenarios-testes-api.md) | 109 cenários de teste; dúvidas abertas com o Backend |
| [`relatorio-testes-api-doasync.md`](./relatorio-testes-api-doasync.md) | Coleção Postman existente (US-01 Dashboard, mock em nuvem) |
| `doasync-backend/docs/api-contract.md` (`main`, 21/11/2026) | Contrato consolidado mantido pelo backend; fonte dos status de campanha, idempotência e regras de entidade |
| Código do `doasync-backend` (`main`) | Conferência das 22 rotas, enums (`TipoUsuario`, `StatusDoacao`, `StatusEntidade`, `StatusCampanha`) e `DashboardKpisResposta` |
