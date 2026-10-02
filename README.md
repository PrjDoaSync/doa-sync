# DoaSync — Módulo de Entidades Assistenciais

Plataforma de gerenciamento de doações desenvolvida em parceria com o projeto de extensão **Amor Inclusivo**. Este módulo implementa o cadastro, a gestão e o perfil público de entidades assistenciais (ONGs), conforme os requisitos RF02, RF07, RF08, RF09 e RF10.

---

## Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Modelo de Dados](#modelo-de-dados)
- [Requisitos Implementados](#requisitos-implementados)
- [Como Executar](#como-executar)
- [Credenciais de Teste](#credenciais-de-teste)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [API Reference](#api-reference)
- [Design System](#design-system)

---

## Visão Geral

O DoaSync conecta doadores, entidades assistenciais e gestores de forma transparente. Este módulo cobre o ciclo completo de uma entidade na plataforma:

```
Entidade se cadastra → Admin analisa → Aprova ou Reprova → Entidade aparece no diretório público
                                            ↓
                                     Admin pode desativar a qualquer momento
```

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework Web | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| ORM | Prisma 7 |
| Banco de Dados | SQLite (desenvolvimento) |
| Autenticação | NextAuth.js v4 (JWT + Credentials) |
| Criptografia | bcryptjs |
| Ícones | Phosphor Icons |
| Tipografia | Inter (Google Fonts) |
| Validação de CEP | ViaCEP API |

---

## Estrutura de Pastas

```
doa-sync/
├── prisma/
│   ├── schema.prisma          # Modelo de dados (Prisma)
│   ├── seed.ts                # Dados iniciais para desenvolvimento
│   ├── migrations/            # Histórico de migrações
│   └── dev.db                 # Banco SQLite (gerado automaticamente)
│
├── prisma7.config.ts          # Configuração do Prisma 7 (datasource + seed)
│
├── src/
│   ├── app/                   # App Router do Next.js
│   │   ├── layout.tsx         # Layout raiz (SessionProvider)
│   │   ├── page.tsx           # Redirect por tipo de usuário
│   │   ├── globals.css        # Tokens do Design System + utilitários
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx       # Tela de login
│   │   │
│   │   ├── entidades/
│   │   │   ├── cadastro/
│   │   │   │   └── page.tsx   # Formulário público de cadastro (RF02)
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Perfil público da entidade (RF08)
│   │   │
│   │   ├── entidade/
│   │   │   └── perfil/
│   │   │       └── page.tsx   # Área privada: editar informações (RF07)
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx       # Redirect → /admin/entidades
│   │   │   └── entidades/
│   │   │       ├── page.tsx   # Painel de gestão (RF09, RF10)
│   │   │       └── [id]/
│   │   │           └── page.tsx # Detalhe da entidade no admin
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts  # Handler do NextAuth
│   │       └── entidades/
│   │           ├── route.ts      # GET (lista) + POST (cadastro)
│   │           └── [id]/
│   │               ├── route.ts  # GET (perfil) + PATCH (edição)
│   │               └── status/
│   │                   └── route.ts  # PATCH (aprovar/reprovar/desativar)
│   │
│   ├── components/
│   │   ├── index.ts           # Barril raiz (re-exporta tudo)
│   │   │
│   │   ├── ui/                # Componentes de interface genéricos
│   │   │   ├── index.ts
│   │   │   ├── StatusBadge.tsx   # Badge colorido de status da entidade
│   │   │   ├── FormField.tsx     # Campo de formulário (label + input + erro)
│   │   │   └── Alert.tsx         # Alerta/feedback in-page (error/success/warning/info)
│   │   │
│   │   ├── layout/            # Componentes estruturais de layout
│   │   │   ├── index.ts
│   │   │   ├── SessionProvider.tsx  # Wrapper do NextAuth para o client
│   │   │   ├── Sidebar.tsx          # Navegação lateral (admin / entidade)
│   │   │   └── AppLayout.tsx        # Layout com sidebar + área de conteúdo
│   │   │
│   │   └── entidades/         # Componentes específicos do domínio de entidades
│   │       ├── index.ts
│   │       ├── EntidadeForm.tsx          # Formulário de cadastro e edição
│   │       └── AdminEntidadeActions.tsx  # Menu de ações + modal de confirmação
│   │
│   ├── lib/
│   │   ├── prisma.ts          # Singleton do Prisma Client (driver adapter SQLite)
│   │   ├── auth.ts            # Configuração do NextAuth (authOptions)
│   │   ├── constants.ts       # Constantes: STATUS_ENTIDADE, TIPO_USUARIO, AREAS_ATUACAO, UFS
│   │   └── validations/
│   │       ├── index.ts
│   │       └── entidade.ts    # Funções de validação e formatação (CNPJ, CEP, telefone)
│   │
│   └── types/
│       ├── next-auth.d.ts     # Extensão de tipos do NextAuth (id, tipo, entidadeId)
│       └── entidade.ts        # Interfaces: EntidadeData, EntidadeFormData, PaginacaoMeta
│
├── docs/
│   ├── DESIGN-SYSTEM.md       # Manual de design do projeto
│   ├── er.jpeg                # Diagrama Entidade-Relacionamento
│   └── Grupo 5 - Escopo de Trabalho.md
│
├── tailwind.config.ts         # Tokens de cor, tipografia e espaçamento do Design System
├── .env                       # Variáveis de ambiente (não versionar)
└── package.json
```

---

## Modelo de Dados

Baseado no DER do projeto (`docs/er.jpeg`). A `Entidade` é uma especialização de `Usuario` (herança total e disjunta).

```
Usuario (base)
├── tipo: PESSOA_FISICA | PESSOA_JURIDICA | ENTIDADE | ADMIN
├── status: ATIVO | INATIVO
│
├── PessoaFisica  (1:1) — cpf, dataNascimento
├── PessoaJuridica (1:1) — cnpj, razaoSocial
│
└── Entidade (1:1)
    ├── cnpj, razaoSocial, nomeFantasia
    ├── descricao, areaAtuacao, site, logoUrl
    ├── statusAprovacao: PENDENTE | APROVADA | REPROVADA | INATIVA
    ├── motivoReprovacao (preenchido pelo admin em reprovações)
    ├── emailContato, telefoneContato, whatsapp
    └── EnderecoEntidade (1:1)
        └── logradouro, numero, complemento, bairro, cidade, uf, cep
```

---

## Requisitos Implementados

| Requisito | Descrição | Onde |
|---|---|---|
| **RF02** | Cadastro de entidades assistenciais | `POST /api/entidades` + `/entidades/cadastro` |
| **RF07** | Cadastro e edição das informações institucionais | `PATCH /api/entidades/[id]` + `/entidade/perfil` |
| **RF08** | Página pública de perfil da entidade | `GET /api/entidades/[id]` + `/entidades/[id]` |
| **RF09** | Aprovação ou reprovação pelo administrador | `PATCH /api/entidades/[id]/status` + `/admin/entidades` |
| **RF10** | Desativação de entidades pelo administrador | `PATCH /api/entidades/[id]/status` + `/admin/entidades` |

### Critérios de Aceitação

- [x] Permitir informar nome da entidade
- [x] Permitir informar CNPJ (com máscara e validação de formato)
- [x] Permitir informar descrição
- [x] Permitir informar endereço (com busca automática via CEP)
- [x] Permitir informar dados de contato (e-mail, telefone, WhatsApp, site)
- [x] Permitir edição das informações institucionais
- [x] Disponibilizar perfil público (acessível sem login para entidades aprovadas)
- [x] Permitir ao administrador aprovar ou reprovar entidades (reprovação exige motivo)
- [x] Permitir ao administrador desativar entidades

---

## Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm 9+

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz (ou verifique se já existe):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="doasync-secret-dev-2026"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Criar o banco de dados

```bash
npx prisma migrate dev --name init
```

### 4. Popular o banco com dados de teste

```bash
npx prisma db seed
```

O seed cria automaticamente:

| Usuário | Senha | Tipo | Status |
|---|---|---|---|
| `admin@doasync.com` | `admin123` | Admin | — |
| `contato@amorinclusivosp.org` | `entidade123` | Entidade | Aprovada |
| `ong@solidariedade.org.br` | `entidade123` | Entidade | Pendente |
| `contato@entidadereprovada.org` | `entidade123` | Entidade | Reprovada |

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## Credenciais de Teste

### Administrador

```
E-mail: admin@doasync.com
Senha:  admin123
```

Após o login, o admin é redirecionado para `/admin/entidades`.

### Entidade Aprovada

```
E-mail: contato@amorinclusivosp.org
Senha:  entidade123
```

Após o login, a entidade é redirecionada para `/entidade/perfil`.

### Entidade Pendente

```
E-mail: ong@solidariedade.org.br
Senha:  entidade123
```

### Entidade Reprovada

```
E-mail: contato@entidadereprovada.org
Senha:  entidade123
```

---

## Rotas da Aplicação

### Públicas (sem login)

| Rota | Descrição |
|---|---|
| `/login` | Tela de login |
| `/entidades/cadastro` | Formulário de cadastro de nova entidade |
| `/entidades/[id]` | Perfil público de entidade aprovada |

### Área da Entidade (requer login como ENTIDADE)

| Rota | Descrição |
|---|---|
| `/entidade/perfil` | Visualizar e editar informações institucionais |

### Área do Admin (requer login como ADMIN)

| Rota | Descrição |
|---|---|
| `/admin/entidades` | Lista todas as entidades com filtros e busca |
| `/admin/entidades?status=PENDENTE` | Filtra apenas entidades pendentes |
| `/admin/entidades/[id]` | Detalhe completo de uma entidade |

---

## API Reference

### Autenticação

Todas as rotas da API que exigem autenticação utilizam **cookies de sessão** gerenciados pelo NextAuth. Para testes via Postman/Insomnia, faça login em `/api/auth/callback/credentials` primeiro.

---

### `GET /api/entidades`

Lista entidades. Visitantes e usuários não-admin recebem apenas entidades com status `APROVADA`.

**Query params:**

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `page` | number | `1` | Página atual |
| `limit` | number | `10` | Itens por página (máx. 50) |
| `status` | string | `APROVADA` | Filtro de status (somente admin) |
| `busca` | string | — | Busca por nome ou área de atuação |

**Resposta `200`:**
```json
{
  "data": [ /* array de entidades */ ],
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### `POST /api/entidades`

Cadastra uma nova entidade. Não requer autenticação.

**Body (JSON):**
```json
{
  "nome": "João da Silva",
  "email": "joao@ong.org",
  "senha": "senha123",
  "confirmarSenha": "senha123",
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

**Resposta `201`:**
```json
{
  "message": "Entidade cadastrada com sucesso. Aguardando aprovação.",
  "data": { /* usuário criado sem a senha */ }
}
```

**Erros possíveis:**

| Código | Situação |
|---|---|
| `422` | Campos obrigatórios ausentes ou inválidos |
| `409` | E-mail ou CNPJ já cadastrado |
| `500` | Erro interno |

---

### `GET /api/entidades/[id]`

Retorna os dados de uma entidade.

- **Visitantes / não-admin:** retorna `404` para entidades não aprovadas.
- **Admin / dono:** retorna independentemente do status.

**Resposta `200`:**
```json
{
  "data": {
    "id": "...",
    "cnpj": "12.345.678/0001-90",
    "razaoSocial": "ONG Exemplo",
    "statusAprovacao": "APROVADA",
    "endereco": { ... },
    "usuario": { ... }
  }
}
```

---

### `PATCH /api/entidades/[id]`

Edita as informações institucionais de uma entidade. Requer autenticação como **dono da entidade** ou **admin**.

**Body (JSON)** — todos os campos são opcionais:
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
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "uf": "SP",
  "cep": "01310-100"
}
```

**Resposta `200`:**
```json
{
  "message": "Informações atualizadas com sucesso.",
  "data": { /* entidade atualizada */ }
}
```

**Erros possíveis:**

| Código | Situação |
|---|---|
| `401` | Não autenticado |
| `403` | Sem permissão (não é dono nem admin) |
| `404` | Entidade não encontrada |
| `422` | Campo obrigatório enviado como vazio |

---

### `PATCH /api/entidades/[id]/status`

Altera o status de uma entidade. **Exclusivo para admin.**

**Body (JSON):**
```json
{
  "status": "APROVADA",
  "motivo": ""
}
```

**Valores de `status`:**

| Valor | Descrição | Motivo obrigatório? |
|---|---|---|
| `APROVADA` | Aprova a entidade | Não |
| `REPROVADA` | Reprova a entidade | **Sim** |
| `INATIVA` | Desativa a entidade | Não |
| `PENDENTE` | Recoloca como pendente | Não |

**Resposta `200`:**
```json
{
  "message": "Entidade aprovada com sucesso.",
  "data": { /* entidade atualizada */ }
}
```

**Erros possíveis:**

| Código | Situação |
|---|---|
| `403` | Usuário não é admin |
| `404` | Entidade não encontrada |
| `422` | Status inválido ou motivo ausente na reprovação |

---

## Design System

O projeto segue o Design System documentado em `docs/DESIGN-SYSTEM.md`. Os principais tokens estão configurados em `tailwind.config.ts` e `src/app/globals.css`.

### Cores principais

| Token | HEX | Uso |
|---|---|---|
| `brand-primary` | `#2563EB` | Ações principais, botões |
| `page` | `#F8FAFC` | Fundo da aplicação |
| `surface` | `#FFFFFF` | Cards, modais, inputs |

### Classes utilitárias (globals.css)

```
.btn-primary    — botão azul principal
.btn-secondary  — botão cinza secundário
.btn-outline    — botão com borda
.btn-ghost      — botão sem fundo
.btn-destructive — botão vermelho (ações destrutivas)

.input          — campo de texto padrão
.input-error    — campo com estado de erro

.card           — container com sombra e borda arredondada

.badge-aprovada   — badge verde
.badge-pendente   — badge amarelo
.badge-reprovada  — badge vermelho
.badge-inativa    — badge cinza
```

### Acessibilidade

O projeto segue as diretrizes WCAG 2.2:
- Todos os botões de ícone possuem `aria-label`
- Campos obrigatórios têm `aria-required="true"`
- Mensagens de erro usam `role="alert"` e `aria-describedby`
- Foco visível em todos os elementos interativos (`focus:ring-2`)
- Cores de feedback nunca dependem apenas da cor — sempre acompanhadas de ícone ou texto

---

## Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento (http://localhost:3000)
npm run build      # Build de produção
npm run start      # Servidor de produção (requer build)
npm run lint       # ESLint

npx prisma migrate dev   # Aplica migrações pendentes
npx prisma db seed       # Popula o banco com dados de teste
npx prisma studio        # Interface visual do banco (http://localhost:5555)
```
