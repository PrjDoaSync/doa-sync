# Identificação dos Perfis de Usuários e Personas

## Objetivo

Identificar os principais perfis que utilizarão o DoaSync e compreender, de forma inicial, suas responsabilidades, necessidades e objetivos dentro da plataforma.

De acordo com os requisitos funcionais, o sistema deverá diferenciar três perfis de acesso:

- Doador
- Entidade
- Administrador

---

## 1. Doador

### Descrição

Usuário que utiliza a plataforma para conhecer entidades e campanhas e realizar doações.

### Responsabilidades

- Manter seus dados cadastrais atualizados;
- Acessar a plataforma por meio de autenticação;
- Consultar entidades assistenciais cadastradas;
- Visualizar campanhas de arrecadação;
- Realizar doações;
- Escolher realizar uma doação de forma anônima;
- Utilizar os métodos de pagamento disponíveis;
- Consultar o histórico de suas doações.

### Necessidades

- Cadastro simples;
- Acesso seguro à plataforma;
- Facilidade para encontrar campanhas;
- Informações claras sobre entidades e campanhas;
- Processo simples para realizar doações;
- Confirmação após a realização da doação;
- Consulta das doações realizadas anteriormente;
- Possibilidade de preservar sua identidade em uma doação.

### Objetivos

- Encontrar entidades e campanhas para apoiar;
- Realizar doações de maneira simples e segura;
- Acompanhar suas contribuições;
- Ter transparência sobre suas doações.

**Requisitos relacionados:** RF01, RF03, RF04, RF05, RF08, RF12, RF14, RF16, RF18, RF19, RF20 e RF21. :contentReference[oaicite:1]{index=1} :contentReference[oaicite:2]{index=2} :contentReference[oaicite:3]{index=3}

---

## 2. Entidade Assistencial

### Descrição

Organização assistencial que utiliza o DoaSync para divulgar suas atividades e campanhas e receber doações.

### Responsabilidades

- Cadastrar e manter suas informações institucionais;
- Acompanhar o status de seu cadastro;
- Criar campanhas de arrecadação;
- Informar os dados e objetivos das campanhas;
- Acompanhar o progresso das arrecadações;
- Encerrar campanhas quando necessário;
- Consultar o histórico de doações recebidas;
- Acompanhar os valores arrecadados por período.

### Necessidades

- Divulgar informações institucionais;
- Apresentar suas campanhas aos doadores;
- Acompanhar os valores arrecadados;
- Consultar as doações recebidas;
- Gerenciar suas campanhas;
- Ter acesso às informações de suas arrecadações.

### Objetivos

- Divulgar suas necessidades de arrecadação;
- Atrair doadores;
- Acompanhar o desempenho das campanhas;
- Facilitar o recebimento de doações;
- Ter maior controle sobre os recursos arrecadados.

**Requisitos relacionados:** RF02, RF03, RF04, RF05, RF07, RF08, RF11, RF12, RF13, RF14, RF16, RF17, RF22 e RF23. :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}

---

## 3. Administrador

### Descrição

Usuário responsável pela administração e controle da plataforma, incluindo o gerenciamento de usuários, entidades e campanhas.

### Responsabilidades

- Acessar o painel administrativo;
- Gerenciar usuários;
- Gerenciar entidades;
- Aprovar ou reprovar cadastros de entidades;
- Desativar entidades;
- Gerenciar campanhas;
- Desativar campanhas que violem as políticas da plataforma;
- Acompanhar os indicadores gerais do sistema.

### Necessidades

- Ter visão geral da plataforma;
- Acessar indicadores de utilização;
- Controlar os cadastros das entidades;
- Gerenciar usuários;
- Monitorar campanhas;
- Identificar situações que necessitem de intervenção administrativa.

### Objetivos

- Garantir o funcionamento adequado da plataforma;
- Controlar os usuários e entidades cadastrados;
- Manter o ambiente organizado;
- Acompanhar os principais indicadores da plataforma;
- Intervir em entidades ou campanhas quando necessário.

**Requisitos relacionados:** RF03, RF06, RF09, RF10, RF15, RF24, RF25 e RF26. :contentReference[oaicite:6]{index=6} :contentReference[oaicite:7]{index=7} :contentReference[oaicite:8]{index=8}

---

# Personas Iniciais

> As personas abaixo são uma representação inicial baseada nas responsabilidades e necessidades definidas nos requisitos funcionais. O documento de requisitos não fornece dados demográficos ou características pessoais específicas, portanto essas informações não foram inventadas.

## Persona 01 — Doador

**Perfil:** Usuário interessado em apoiar entidades assistenciais por meio de doações.

**Principal objetivo:** Encontrar uma causa ou campanha e realizar uma doação de forma simples e segura.

**Principais necessidades:**
- Encontrar campanhas;
- Conhecer as entidades;
- Realizar doações;
- Escolher anonimato;
- Receber confirmação;
- Consultar seu histórico.

**Principal expectativa:** Ter um processo de doação simples, seguro e transparente.

---

## Persona 02 — Representante de Entidade

**Perfil:** Usuário responsável por representar uma entidade assistencial dentro da plataforma.

**Principal objetivo:** Divulgar campanhas e acompanhar as doações recebidas.

**Principais necessidades:**
- Gerenciar informações da entidade;
- Criar campanhas;
- Acompanhar arrecadações;
- Consultar doações recebidas;
- Encerrar campanhas.

**Principal expectativa:** Utilizar a plataforma como meio de divulgação e gerenciamento das arrecadações.

---

## Persona 03 — Administrador

**Perfil:** Usuário responsável pela gestão da plataforma DoaSync.

**Principal objetivo:** Administrar usuários, entidades e campanhas e acompanhar os indicadores da plataforma.

**Principais necessidades:**
- Gerenciar usuários;
- Aprovar entidades;
- Desativar entidades;
- Gerenciar campanhas;
- Acompanhar indicadores;
- Intervir em campanhas que violem as políticas.

**Principal expectativa:** Ter controle e visão geral sobre o funcionamento da plataforma.

---

# Matriz de Perfis e Principais Necessidades

| Necessidade / Atividade | Doador | Entidade | Administrador |
|---|:---:|:---:|:---:|
| Criar conta | ✅ | ✅ | — |
| Gerenciar próprio perfil | ✅ | ✅ | — |
| Visualizar entidades | ✅ | ✅ | ✅ |
| Visualizar campanhas | ✅ | ✅ | ✅ |
| Criar campanhas | ❌ | ✅ | ❌ |
| Gerenciar campanhas | ❌ | ✅ | ✅ |
| Realizar doações | ✅ | ❌ | ❌ |
| Consultar histórico de doações | ✅ | ❌ | ❌ |
| Consultar doações recebidas | ❌ | ✅ | ❌ |
| Acompanhar arrecadações | ❌ | ✅ | ✅ |
| Aprovar entidades | ❌ | ❌ | ✅ |
| Desativar entidades | ❌ | ❌ | ✅ |
| Desativar campanhas | ❌ | ❌ | ✅ |
| Gerenciar usuários | ❌ | ❌ | ✅ |
| Visualizar indicadores gerais | ❌ | ❌ | ✅ |

---

# Resumo dos Perfis

```text
                         DOASYNC
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
      DOADOR            ENTIDADE         ADMINISTRADOR
          │                 │                 │
          │                 │                 ├── Gerenciar usuários
          ├── Visualizar    ├── Gerenciar     ├── Gerenciar entidades
          │   campanhas     │   entidade      ├── Aprovar entidades
          ├── Realizar      ├── Criar         ├── Gerenciar campanhas
          │   doações       │   campanhas     ├── Desativar campanhas
          ├── Histórico     ├── Acompanhar    └── Indicadores
          └── Anonimato     │   arrecadações
                             └── Doações