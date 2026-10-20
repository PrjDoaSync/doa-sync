# Levantamento e Organização das Funcionalidades

## Objetivo

Levantar e organizar as principais funcionalidades previstas para a plataforma DoaSync, agrupando-as por módulos e identificando quais perfis de usuário possuem acesso a cada funcionalidade.

Os perfis definidos nos requisitos funcionais são:

- **Doador**
- **Entidade**
- **Administrador**

## Módulos e Funcionalidades

### 1. Gestão de Usuários

Responsável pelo cadastro, autenticação e gerenciamento dos dados dos usuários.

| ID | Funcionalidade | Doador | Entidade | Administrador |
|---|---|:---:|:---:|:---:|
| RF01 | Cadastrar doador | ✅ | ❌ | ❌ |
| RF02 | Cadastrar entidade assistencial | ❌ | ✅ | ❌ |
| RF03 | Realizar login e logout | ✅ | ✅ | ✅ |
| RF04 | Recuperar senha por e-mail | ✅ | ✅ | ✅ |
| RF05 | Editar perfil | ✅ | ✅ | ❌ |
| RF06 | Controle de perfis de acesso | ✅ | ✅ | ✅ |

---

### 2. Gestão de Entidades

Responsável pelo cadastro, manutenção e disponibilização das informações das entidades assistenciais.

| ID | Funcionalidade | Doador | Entidade | Administrador |
|---|---|:---:|:---:|:---:|
| RF07 | Cadastrar e editar informações institucionais | ❌ | ✅ | ❌ |
| RF08 | Visualizar perfil público da entidade | ✅ | ✅ | ✅ |
| RF09 | Aprovar ou reprovar cadastro de entidade | ❌ | ❌ | ✅ |
| RF10 | Desativar entidade | ❌ | ❌ | ✅ |

---

### 3. Gestão de Campanhas

Responsável pela criação, divulgação, acompanhamento e gerenciamento das campanhas de arrecadação.

| ID | Funcionalidade | Doador | Entidade | Administrador |
|---|---|:---:|:---:|:---:|
| RF11 | Criar campanhas de arrecadação | ❌ | ✅ | ❌ |
| RF12 | Visualizar campanhas ativas | ✅ | ✅ | ✅ |
| RF13 | Encerrar campanha antecipadamente | ❌ | ✅ | ❌ |
| RF14 | Visualizar progresso de arrecadação | ✅ | ✅ | ✅ |
| RF15 | Desativar campanhas que violem políticas | ❌ | ❌ | ✅ |

---

### 4. Realização de Doações

Responsável pelo processo de realização e registro das doações realizadas na plataforma.

| ID | Funcionalidade | Doador | Entidade | Administrador |
|---|---|:---:|:---:|:---:|
| RF16 | Realizar doação para campanha ou entidade | ✅ | ❌ | ❌ |
| RF17 | Registrar informações da doação | Sistema | Sistema | Consulta |
| RF18 | Emitir confirmação de doação | ✅ | ❌ | ❌ |
| RF19 | Realizar doação anônima | ✅ | ❌ | ❌ |
| RF20 | Realizar pagamento digital (ex.: PIX) | ✅ | ❌ | ❌ |

> **Observação:** RF17 representa uma funcionalidade executada pelo sistema durante o processo de doação, registrando data, valor, doador e destino.

---

### 5. Acompanhamento e Histórico

Responsável pela consulta das doações realizadas e recebidas, além do acompanhamento dos valores arrecadados.

| ID | Funcionalidade | Doador | Entidade | Administrador |
|---|---|:---:|:---:|:---:|
| RF21 | Visualizar histórico de suas doações | ✅ | ❌ | ❌ |
| RF22 | Visualizar histórico de doações recebidas por campanha | ❌ | ✅ | ❌ |
| RF23 | Acompanhar valor total arrecadado por período | ❌ | ✅ | ❌ |

---

### 6. Painel Administrativo

Responsável pelo gerenciamento geral da plataforma e acompanhamento dos indicadores do sistema.

| ID | Funcionalidade | Doador | Entidade | Administrador |
|---|---|:---:|:---:|:---:|
| RF24 | Acessar painel administrativo | ❌ | ❌ | ✅ |
| RF25 | Visualizar indicadores gerais da plataforma | ❌ | ❌ | ✅ |
| RF26 | Gerenciar entidades, usuários e campanhas | ❌ | ❌ | ✅ |

## Resumo das Funcionalidades por Perfil

### Doador

O doador possui como principais funcionalidades:

- Cadastro e gerenciamento da conta;
- Login, logout e recuperação de senha;
- Visualização de entidades cadastradas;
- Visualização de campanhas ativas;
- Acompanhamento do progresso das campanhas;
- Realização de doações;
- Escolha pela realização de doação anônima;
- Pagamento digital;
- Recebimento da confirmação da doação;
- Consulta do histórico de doações.

### Entidade

A entidade possui como principais funcionalidades:

- Cadastro e gerenciamento das informações institucionais;
- Login, logout e recuperação de senha;
- Visualização do próprio perfil;
- Criação de campanhas;
- Edição das informações das campanhas;
- Encerramento antecipado de campanhas;
- Acompanhamento do progresso das campanhas;
- Consulta do histórico de doações recebidas;
- Acompanhamento do valor arrecadado por período.

### Administrador

O administrador possui como principais funcionalidades:

- Login, logout e recuperação de senha;
- Visualização de entidades cadastradas;
- Aprovação ou reprovação de entidades;
- Desativação de entidades;
- Visualização de campanhas;
- Desativação de campanhas que violem as políticas da plataforma;
- Acesso ao painel administrativo;
- Visualização dos indicadores gerais;
- Gerenciamento de entidades;
- Gerenciamento de usuários;
- Gerenciamento de campanhas.

## Mapa Inicial dos Módulos

```text
                         ┌─────────────────────┐
                         │      DoaSync         │
                         └──────────┬──────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼
 ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
 │ Gestão de       │       │ Gestão de       │       │ Gestão de       │
 │ Usuários        │       │ Entidades       │       │ Campanhas       │
 └────────┬────────┘       └────────┬────────┘       └────────┬────────┘
          │                         │                         │
          ▼                         ▼                         ▼
     Doador /                  Cadastro /                Criação /
     Entidade /                Aprovação /               Acompanhamento /
     Administrador             Perfil público            Encerramento
                                    │                         │
                                    └───────────┬─────────────┘
                                                │
                                                ▼
                                      ┌─────────────────┐
                                      │ Realização de   │
                                      │ Doações         │
                                      └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │ Acompanhamento  │
                                      │ e Histórico     │
                                      └─────────────────┘

                           ┌─────────────────────────┐
                           │ Painel Administrativo   │
                           │ Administrador            │
                           └─────────────────────────┘