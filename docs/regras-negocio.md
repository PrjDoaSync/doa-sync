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

**Proposta adotada:** somente entidades aprovadas podem criar campanhas (ver **RN53**).

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

**Proposta adotada:** a entidade vê apenas o nome do doador (ver **RN73**).

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

## 8. Regras Complementares

Regras levantadas ao cruzar as funcionalidades com o [mapeamento de entidades](entidades-envolvidas.md) e com o [levantamento de necessidades](Levantamento-de-necessidade.md). As mesmas regras também aparecem em [`funcionalidades.md`](funcionalidades.md).

> **Nomenclatura:** a entidade **PROJETO** do modelo de dados corresponde à **Campanha** nas funcionalidades.
>
> As regras marcadas com ⚠️ trazem uma **proposta padrão** para não travar o desenvolvimento, mas ainda devem ser confirmadas com o cliente.

### 8.1 Usuários e Cadastro

| ID | Regra | Origem |
|---|---|---|
| RN41 | Todo usuário é **Pessoa Física** ou **Pessoa Jurídica**, nunca as duas ao mesmo tempo. O **Doador** é cadastrado como Pessoa Física (CPF e data de nascimento) e a **Entidade** como Pessoa Jurídica (CNPJ e razão social). | Entidades (especialização total e disjunta), RF01, RF02 |
| RN42 | E-mail, CPF e CNPJ são **únicos** no sistema. Não é permitido criar duas contas com o mesmo valor. | RF01, RF02 |
| RN43 | CPF, CNPJ, e-mail e CEP devem ter **formato válido** no cadastro e na edição do perfil. | RF01, RF02, RF05 |
| RN44 | O doador deve ter no mínimo 18 anos, conforme a data de nascimento informada. ⚠️ | RF01 |
| RN45 | Todo usuário deve informar **pelo menos um telefone**. A entidade também deve informar **pelo menos um endereço**. Para o doador, o endereço é opcional. | Entidades (Telefone 1:N, Endereço 1:N), RN03 |
| RN46 | A entidade deve informar uma **pessoa responsável** (nome e CPF), que responde pela instituição na plataforma. | Entidades (relação RESPONSAVEL) |
| RN47 | A senha deve ter **no mínimo 8 caracteres**, com letras e números. | Levantamento ("segurança no acesso"), RN33 |
| RN48 | O link de recuperação de senha enviado por e-mail é de **uso único** e expira em **1 hora**. | RF04, RN05, Levantamento (dúvida 5) |
| RN49 | O usuário possui status **Ativo** ou **Inativo**. Usuários inativos não conseguem fazer login. | Entidades (USUARIO.status), RF26 |
| RN50 | O **Administrador** não se cadastra pela plataforma. Contas de administrador são criadas internamente pela equipe do projeto. | RF01, RF02 (não há cadastro público de administrador) |
| RN51 | Os registros não são excluídos fisicamente: usuários, entidades e campanhas são **desativados**. Assim, o histórico de doações é preservado. | RF10, RF15, RF21, RF22 |

### 8.2 Entidades

| ID | Regra | Origem |
|---|---|---|
| RN52 | A entidade passa pelos status **Pendente → Aprovada / Reprovada**, e o Administrador pode depois mudá-la para **Desativada**. Todo cadastro começa como *Pendente*. | RF09, RF10, RN07, RN08 |
| RN53 | Somente entidades **Aprovadas** aparecem publicamente, podem criar campanhas e podem receber doações. Esta regra resolve a RN11. | Levantamento: "as entidades deverão passar por um processo de aprovação antes de serem disponibilizadas" |
| RN54 | Ao reprovar uma entidade, o Administrador deve informar o **motivo**, que fica visível para a entidade. A entidade pode corrigir os dados e reenviar o cadastro, que volta a *Pendente*. ⚠️ | RF09, Levantamento (dúvida 3) |
| RN55 | Quando uma entidade é desativada, suas campanhas ativas são **encerradas automaticamente** e ela deixa de receber doações. O histórico continua disponível para consulta. Esta regra resolve a RN37. | RF10, RF15 |
| RN56 | O perfil público da entidade exibe: nome, descrição, CNPJ, cidade/UF, contato e campanhas ativas. Os dados da pessoa responsável **não** são exibidos. ⚠️ | RF08, RN09, Levantamento (dúvida 2) |

### 8.3 Campanhas

| ID | Regra | Origem |
|---|---|---|
| RN57 | A **meta** da campanha deve ser maior que zero. | RF11, RN12 |
| RN58 | A **data de encerramento** deve ser posterior à data de início, e a data de início não pode estar no passado. | RF11, RN14 |
| RN59 | A campanha possui os status **Agendada** (antes da data de início), **Ativa**, **Encerrada** e **Desativada** (pelo Administrador). Somente campanhas *Ativas* recebem doações. | RF12, RF13, RF15, RN13 |
| RN60 | Quando a data de encerramento é atingida, a campanha passa automaticamente para *Encerrada*. Esta regra resolve a RN38. | RF12, RF13 |
| RN61 | Atingir 100% da meta **não encerra** a campanha: ela continua recebendo doações até a data final ou até ser encerrada pela entidade. O progresso pode passar de 100%. Esta regra resolve a RN39. ⚠️ | RF14, RN16 |
| RN62 | A entidade só pode editar, encerrar e consultar as doações das **suas próprias** campanhas. | RF13, RF22, RN06 |
| RN63 | Campanhas *Encerradas* ou *Desativadas* não podem ser editadas nem reabertas. | RF13, RF15 |
| RN64 | Se a campanha já recebeu doações, a meta não pode ser reduzida para um valor abaixo do total já arrecadado. | RF11, RF14 |
| RN65 | Ao desativar uma campanha, o Administrador deve registrar o **motivo**. | RF15, RN17, Levantamento (dúvida 4) |

### 8.4 Doações

| ID | Regra | Origem |
|---|---|---|
| RN66 | Toda doação tem **exatamente um** destino: uma campanha **ou** uma entidade. Quando o destino é uma campanha, o valor também é contabilizado para a entidade dona da campanha. | RF16, RN19 |
| RN67 | O valor da doação deve ser **maior que zero**. Um valor mínimo maior que zero continua pendente na RN24. | RF16 |
| RN68 | Só é possível doar para uma **campanha Ativa** ou para uma **entidade Aprovada**. A entidade pode receber doação direta mesmo sem campanha ativa. Esta regra resolve a RN40. | RF16, RN53, RN59 |
| RN69 | A doação possui os status **Pendente** (aguardando pagamento), **Confirmada** e **Cancelada**. Somente doações **Confirmadas** entram no progresso da campanha, nos históricos e nos indicadores. | RF14, RF17, RF20 |
| RN70 | A doação registra a **forma de pagamento** (no MVP, apenas PIX) e pode ter uma **observação** opcional de até 500 caracteres. | Entidades (DOACAO), RF20, RN23 |
| RN71 | A confirmação da doação exibe: código da doação, data, valor, destino (campanha/entidade) e forma de pagamento. | RF18, RN21, Levantamento (dúvida 6) |
| RN72 | Na doação anônima, o vínculo com o doador é mantido internamente, para que ela apareça no histórico dele. Para a entidade e na exibição pública, porém, o doador aparece como **"Doador anônimo"**. | RF19, RF21, RN22, Levantamento (dúvida 7) |
| RN73 | Na doação não anônima, a entidade vê apenas o **nome** do doador. E-mail, telefone, CPF e endereço não são exibidos (LGPD). Esta regra resolve a RN29. ⚠️ | RF22, RN35 |
| RN74 | Doações **Confirmadas** não podem ser editadas nem excluídas. | RF17, RF21 |

### 8.5 Histórico, Indicadores e Administração

| ID | Regra | Origem |
|---|---|---|
| RN75 | Os históricos são exibidos do **mais recente para o mais antigo**. O histórico da entidade pode ser filtrado por campanha e por período (data inicial e data final). | RF21, RF22, RF23 |
| RN76 | Os valores arrecadados (por campanha, por período e no painel) consideram somente doações **Confirmadas**. | RF14, RF23, RF25, RN31 |
| RN77 | O Administrador não pode desativar a **própria conta**. | RF26, RN32 |

### 8.6 Fora do escopo do MVP

- **Agendamento:** a entidade AGENDAMENTO existe no modelo de dados, mas não possui funcionalidade associada no MVP (ver `routes-plan.md`). Suas regras serão definidas se o módulo for incluído em uma próxima etapa.
- **Outros métodos de pagamento:** além do PIX, dependem de validação com o cliente (Levantamento, dúvida 1).

---

## 9. Pontos Pendentes de Validação com o Cliente

Os seguintes pontos não estão completamente definidos nos requisitos atuais e devem ser discutidos com o cliente. Quando já existe uma **proposta adotada**, o desenvolvimento pode seguir com ela até a confirmação.

| ID | Regra/Ponto | Situação |
|---|---|---|
| RN11 | Entidade precisa estar aprovada para criar campanhas? | 🟡 Proposta adotada: sim (RN53) — confirmar |
| RN18 | Quais situações caracterizam violação das políticas? | ⚠️ Validar |
| RN24 | Existe valor mínimo para uma doação? | ⚠️ Validar (por ora, apenas > 0 — RN67) |
| RN25 | É possível cancelar/estornar uma doação? | ⚠️ Validar (doação confirmada não é editada/excluída — RN74) |
| RN29 | Quais dados de um doador não anônimo ficam visíveis para a entidade? | 🟡 Proposta adotada: apenas o nome (RN73) — confirmar |
| RN37 | O que acontece com campanhas de entidades desativadas? | 🟡 Proposta adotada: são encerradas automaticamente (RN55) — confirmar |
| RN38 | O que acontece com uma campanha quando sua data de encerramento é atingida? | 🟡 Proposta adotada: encerramento automático (RN60) — confirmar |
| RN39 | O que acontece com uma campanha que atinge 100% da meta antes do prazo? | 🟡 Proposta adotada: continua ativa (RN61) — confirmar |
| RN40 | Uma entidade pode receber doações diretamente sem possuir uma campanha ativa? | 🟡 Proposta adotada: sim, se aprovada (RN68) — confirmar |
| RN44 | Idade mínima de 18 anos para o doador? | 🟡 Proposta adotada — confirmar |
| RN54 | Reprovação com motivo e possibilidade de reenvio do cadastro? | 🟡 Proposta adotada — confirmar |
| RN56 | Quais dados aparecem no perfil público da entidade? | 🟡 Proposta adotada — confirmar |

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