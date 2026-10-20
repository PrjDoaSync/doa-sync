# Levantamento das Regras de Negócio

## Objetivo

Identificar as regras, condições e comportamentos que deverão ser considerados pelo sistema durante os principais processos da plataforma DoaSync.

As regras foram levantadas a partir dos requisitos funcionais definidos para a solução, considerando os processos de usuários, entidades, campanhas, doações, acompanhamento e administração.

> ⚠️ As regras marcadas como **VALIDAR COM O CLIENTE** representam comportamentos que podem ser necessários para o funcionamento da solução, mas que não estão completamente definidos nos requisitos atuais.

---

## 1. Regras de Usuários e Perfis

### RN01 — Perfis de acesso

O sistema deve possuir três perfis de acesso:

- **Doador**
- **Entidade**
- **Administrador**

Cada perfil deve possuir permissões específicas de acordo com suas responsabilidades dentro da plataforma.

**Origem:** RF06

---

### RN02 — Cadastro de Doador

O cadastro de um doador deve conter, no mínimo:

- Nome;
- E-mail;
- Senha;
- Dados de contato.

**Origem:** RF01

---

### RN03 — Cadastro de Entidade

O cadastro de uma entidade assistencial deve conter, no mínimo:

- Nome;
- CNPJ;
- Descrição;
- Endereço;
- Dados de contato.

**Origem:** RF02

---

### RN04 — Autenticação

Todos os perfis de usuário devem possuir mecanismos de login e logout.

**Origem:** RF03

---

### RN05 — Recuperação de senha

O sistema deve permitir a recuperação da senha por meio do e-mail cadastrado.

**Origem:** RF04

---

### RN06 — Controle de acesso

As funcionalidades disponíveis devem ser controladas de acordo com o perfil do usuário autenticado.

Por exemplo:

- Doadores podem realizar doações;
- Entidades podem criar campanhas;
- Administradores podem gerenciar usuários, entidades e campanhas.

**Origem:** RF06 e RNF08

---

## 2. Regras de Entidades Assistenciais

### RN07 — Aprovação de entidades

O cadastro de uma entidade deve passar por aprovação ou reprovação do Administrador.

**Origem:** RF09

---

### RN08 — Desativação de entidades

O Administrador deve poder desativar entidades cadastradas na plataforma.

**Origem:** RF10

---

### RN09 — Perfil público

Cada entidade cadastrada deve possuir uma página pública contendo suas informações institucionais.

**Origem:** RF08

---

### RN10 — Criação de campanhas por entidades

Entidades devem poder criar campanhas de arrecadação contendo:

- Título;
- Descrição;
- Meta de valor;
- Data de início;
- Data de encerramento.

**Origem:** RF11

---

### RN11 — Entidade aprovada pode criar campanhas

⚠️ **VALIDAR COM O CLIENTE**

Definir se uma entidade precisa estar previamente aprovada pelo Administrador para poder criar e publicar campanhas.

> Esta condição é uma consequência esperada do processo de aprovação de entidades, porém não está explicitamente definida nos requisitos atuais.

---

## 3. Regras de Campanhas

### RN12 — Informações obrigatórias da campanha

Toda campanha deve possuir:

- Título;
- Descrição;
- Meta de arrecadação;
- Data de início;
- Data de encerramento.

**Origem:** RF11

---

### RN13 — Exibição de campanhas ativas

Somente campanhas consideradas ativas devem ser apresentadas na página inicial como campanhas disponíveis para arrecadação.

**Origem:** RF12

---

### RN14 — Período da campanha

Cada campanha deve possuir uma data de início e uma data de encerramento.

**Origem:** RF11

---

### RN15 — Encerramento antecipado

A entidade responsável pela campanha deve poder encerrá-la antes da data de encerramento originalmente definida.

**Origem:** RF13

---

### RN16 — Acompanhamento da meta

O sistema deve apresentar o progresso da arrecadação de uma campanha comparando:

**Valor arrecadado × Meta definida**

**Origem:** RF14

---

### RN17 — Desativação administrativa

O Administrador deve poder desativar campanhas que violem as políticas da plataforma.

**Origem:** RF15

---

### RN18 — Critérios para violação de política

⚠️ **VALIDAR COM O CLIENTE**

Devem ser definidos pelo cliente quais comportamentos ou situações são considerados violações das políticas da plataforma e justificam a desativação de uma campanha.

---

## 4. Regras de Doação

### RN19 — Destino da doação

Uma doação deve estar vinculada:

- A uma campanha; ou
- Diretamente a uma entidade.

**Origem:** RF16

---

### RN20 — Registro da doação

Toda doação concluída deve possuir registro contendo:

- Data;
- Valor;
- Doador;
- Destino da doação.

**Origem:** RF17

---

### RN21 — Confirmação da doação

Após a conclusão do processo, o sistema deve emitir uma confirmação da doação para o doador.

**Origem:** RF18

---

### RN22 — Doação anônima

O doador deve poder optar por realizar uma doação de forma anônima.

Quando essa opção for utilizada, seus dados não devem ser exibidos publicamente.

**Origem:** RF19

---

### RN23 — Método de pagamento

O sistema deve disponibilizar pelo menos um método de pagamento digital.

O requisito apresenta o **PIX** como exemplo.

**Origem:** RF20

---

### RN24 — Doação mínima

⚠️ **VALIDAR COM O CLIENTE**

Definir se deverá existir um valor mínimo para realização de uma doação.

---

### RN25 — Cancelamento ou estorno de doação

⚠️ **VALIDAR COM O CLIENTE**

Definir se o doador poderá cancelar uma doação após o pagamento e quais serão as regras para estorno.

---

## 5. Regras de Histórico e Acompanhamento

### RN26 — Histórico do doador

O doador deve possuir acesso ao histórico das doações realizadas.

**Origem:** RF21

---

### RN27 — Histórico da entidade

A entidade deve poder consultar as doações recebidas, organizadas por campanha.

**Origem:** RF22

---

### RN28 — Acompanhamento por período

As entidades devem poder acompanhar o valor total arrecadado em determinado período.

**Origem:** RF23

---

### RN29 — Visibilidade de dados de doadores

⚠️ **VALIDAR COM O CLIENTE**

Definir quais informações do doador poderão ser visualizadas pela entidade quando uma doação não for anônima.

O requisito atual define apenas que, em doações anônimas, os dados do doador devem ser ocultados na exibição pública.

---

## 6. Regras Administrativas

### RN30 — Acesso ao painel administrativo

Somente usuários com perfil de **Administrador** devem possuir acesso ao painel administrativo.

**Origem:** RF24 e RF26

---

### RN31 — Indicadores administrativos

O painel administrativo deve apresentar, no mínimo:

- Número de entidades cadastradas;
- Número de doadores;
- Número de doações;
- Valor total arrecadado;
- Número de campanhas ativas;
- Número de usuários ativos.

**Origem:** RF25

---

### RN32 — Gerenciamento administrativo

O Administrador deve poder gerenciar:

- Entidades;
- Usuários;
- Campanhas.

**Origem:** RF26

---

## 7. Regras de Segurança e Integridade

### RN33 — Senhas

As senhas dos usuários não devem ser armazenadas em formato de texto puro, devendo ser armazenadas utilizando hash.

**Origem:** RNF06

---

### RN34 — Comunicação segura

A comunicação entre cliente e servidor deve utilizar HTTPS.

**Origem:** RNF07

---

### RN35 — Proteção de dados pessoais

Os dados pessoais dos usuários devem ser tratados de acordo com a LGPD.

**Origem:** RNF09

---

### RN36 — Prevenção de doações duplicadas

O sistema deve garantir que uma mesma doação não seja registrada de forma duplicada em decorrência de uma falha técnica.

**Origem:** RNF11

---

## 8. Pontos Pendentes de Validação com o Cliente

Os seguintes pontos não estão completamente definidos nos requisitos atuais e devem ser discutidos com o cliente:

| ID | Regra/Ponto | Situação |
|---|---|---|
| RN11 | Entidade precisa estar aprovada para criar campanhas? | ⚠️ Validar |
| RN18 | Quais situações caracterizam violação das políticas? | ⚠️ Validar |
| RN24 | Existe valor mínimo para uma doação? | ⚠️ Validar |
| RN25 | É possível cancelar/estornar uma doação? | ⚠️ Validar |
| RN29 | Quais dados de um doador não anônimo ficam visíveis para a entidade? | ⚠️ Validar |
| RN37 | O que acontece com campanhas de entidades desativadas? | ⚠️ Validar |
| RN38 | O que acontece com uma campanha quando sua data de encerramento é atingida? | ⚠️ Validar |
| RN39 | O que acontece com uma campanha que atinge 100% da meta antes do prazo? | ⚠️ Validar |
| RN40 | Uma entidade pode receber doações diretamente sem possuir uma campanha ativa? | ⚠️ Validar |

---

## Fluxo geral das principais regras

```text
USUÁRIO
   │
   ├── Doador
   │     │
   │     ├── Visualiza entidades
   │     ├── Visualiza campanhas
   │     ├── Realiza doação
   │     ├── Escolhe anonimato
   │     └── Consulta histórico
   │
   ├── Entidade
   │     │
   │     ├── Aguarda aprovação
   │     ├── Gerencia informações
   │     ├── Cria campanhas
   │     ├── Acompanha arrecadações
   │     └── Consulta doações
   │
   └── Administrador
         │
         ├── Aprova/Reprova entidades
         ├── Desativa entidades
         ├── Gerencia usuários
         ├── Gerencia campanhas
         └── Acompanha indicadores