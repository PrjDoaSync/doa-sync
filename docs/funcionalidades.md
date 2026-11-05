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

---

## Regras de Negócio Complementares

O documento de referência das regras de negócio é o [`regras-negocio.md`](regras-negocio.md). Ele contém as regras RN01 a RN77 e a tabela de pendências. As regras abaixo (RN41 em diante) estão replicadas lá, na seção 8. Elas cobrem lacunas encontradas ao cruzar as funcionalidades com o [mapeamento de entidades](entidades-envolvidas.md) e com o [levantamento de necessidades](Levantamento-de-necessidade.md).

> **Nomenclatura:** a entidade **PROJETO** do modelo de dados corresponde à **Campanha** nas funcionalidades. Neste documento é usado o termo *Campanha*.
>
> As regras marcadas com ⚠️ trazem uma **proposta padrão** para não travar o desenvolvimento, mas ainda devem ser confirmadas com o cliente.

### 1. Usuários e Cadastro

| ID | Regra | Origem |
|---|---|---|
| RN41 | Todo usuário é **Pessoa Física** ou **Pessoa Jurídica**, nunca as duas ao mesmo tempo. O **Doador** é cadastrado como Pessoa Física (CPF e data de nascimento) e a **Entidade** como Pessoa Jurídica (CNPJ e razão social). | Entidades (especialização total e disjunta), RF01, RF02 |
| RN42 | E-mail, CPF e CNPJ são **únicos** no sistema. Não é permitido criar duas contas com o mesmo valor. | RF01, RF02 |
| RN43 | CPF, CNPJ, e-mail e CEP devem ter **formato válido** no cadastro e na edição do perfil. | RF01, RF02, RF05 |
| RN44 | O doador deve ter no mínimo 18 anos, conforme a data de nascimento informada. ⚠️ | RF01 |
| RN45 | Todo usuário deve informar **pelo menos um telefone**. A entidade também deve informar **pelo menos um endereço**. Para o doador, o endereço é opcional. | Entidades (Telefone 1:N, Endereço 1:N), RN03 |
| RN46 | A entidade deve informar uma **pessoa responsável** (nome e CPF), que responde pela instituição na plataforma. | Entidades (relação RESPONSAVEL) |
| RN47 | A senha deve ter **no mínimo 8 caracteres**, com letras e números. | Levantamento ("segurança no acesso") |
| RN48 | O link de recuperação de senha enviado por e-mail é de **uso único** e expira em **1 hora**. | RF04, Levantamento (dúvida 5) |
| RN49 | O usuário possui status **Ativo** ou **Inativo**. Usuários inativos não conseguem fazer login. | Entidades (USUARIO.status), RF26 |
| RN50 | O **Administrador** não se cadastra pela plataforma. Contas de administrador são criadas internamente pela equipe do projeto. | RF01, RF02 (não há cadastro público de administrador) |
| RN51 | Os registros não são excluídos fisicamente: usuários, entidades e campanhas são **desativados**. Assim, o histórico de doações é preservado. | RF10, RF15, RF21, RF22 |

### 2. Entidades

| ID | Regra | Origem |
|---|---|---|
| RN52 | A entidade passa pelos status **Pendente → Aprovada / Reprovada**, e o Administrador pode depois mudá-la para **Desativada**. Todo cadastro começa como *Pendente*. | RF09, RF10, Levantamento (decisões) |
| RN53 | Somente entidades **Aprovadas** aparecem publicamente, podem criar campanhas e podem receber doações. Esta regra resolve a RN11. | Levantamento: "as entidades deverão passar por um processo de aprovação antes de serem disponibilizadas" |
| RN54 | Ao reprovar uma entidade, o Administrador deve informar o **motivo**, que fica visível para a entidade. A entidade pode corrigir os dados e reenviar o cadastro, que volta a *Pendente*. ⚠️ | RF09, Levantamento (dúvida 3) |
| RN55 | Quando uma entidade é desativada, suas campanhas ativas são **encerradas automaticamente** e ela deixa de receber doações. O histórico continua disponível para consulta. Esta regra resolve a RN37. | RF10, RF15 |
| RN56 | O perfil público da entidade exibe: nome, descrição, CNPJ, cidade/UF, contato e campanhas ativas. Os dados da pessoa responsável **não** são exibidos. ⚠️ | RF08, Levantamento (dúvida 2) |

### 3. Campanhas

| ID | Regra | Origem |
|---|---|---|
| RN57 | A **meta** da campanha deve ser maior que zero. | RF11 |
| RN58 | A **data de encerramento** deve ser posterior à data de início, e a data de início não pode estar no passado. | RF11 |
| RN59 | A campanha possui os status **Agendada** (antes da data de início), **Ativa**, **Encerrada** e **Desativada** (pelo Administrador). Somente campanhas *Ativas* recebem doações. | RF12, RF13, RF15 |
| RN60 | Quando a data de encerramento é atingida, a campanha passa automaticamente para *Encerrada*. Esta regra resolve a RN38. | RF12, RF13 |
| RN61 | Atingir 100% da meta **não encerra** a campanha: ela continua recebendo doações até a data final ou até ser encerrada pela entidade. O progresso pode passar de 100%. Esta regra resolve a RN39. ⚠️ | RF14 |
| RN62 | A entidade só pode editar, encerrar e consultar as doações das **suas próprias** campanhas. | RF13, RF22, RN06 |
| RN63 | Campanhas *Encerradas* ou *Desativadas* não podem ser editadas nem reabertas. | RF13, RF15 |
| RN64 | Se a campanha já recebeu doações, a meta não pode ser reduzida para um valor abaixo do total já arrecadado. | RF11, RF14 |
| RN65 | Ao desativar uma campanha, o Administrador deve registrar o **motivo**. | RF15, Levantamento (dúvida 4) |

### 4. Doações

| ID | Regra | Origem |
|---|---|---|
| RN66 | Toda doação tem **exatamente um** destino: uma campanha **ou** uma entidade. Quando o destino é uma campanha, o valor também é contabilizado para a entidade dona da campanha. | RF16, RN19 |
| RN67 | O valor da doação deve ser **maior que zero**. Um valor mínimo maior que zero continua pendente na RN24. | RF16 |
| RN68 | Só é possível doar para uma **campanha Ativa** ou para uma **entidade Aprovada**. A entidade pode receber doação direta mesmo sem campanha ativa. Esta regra resolve a RN40. | RF16, RN53, RN59 |
| RN69 | A doação possui os status **Pendente** (aguardando pagamento), **Confirmada** e **Cancelada**. Somente doações **Confirmadas** entram no progresso da campanha, nos históricos e nos indicadores. | RF14, RF17, RF20 |
| RN70 | A doação registra a **forma de pagamento** (no MVP, apenas PIX) e pode ter uma **observação** opcional de até 500 caracteres. | Entidades (DOACAO), RF20 |
| RN71 | A confirmação da doação exibe: código da doação, data, valor, destino (campanha/entidade) e forma de pagamento. | RF18, Levantamento (dúvida 6) |
| RN72 | Na doação anônima, o vínculo com o doador é mantido internamente, para que ela apareça no histórico dele. Para a entidade e na exibição pública, porém, o doador aparece como **"Doador anônimo"**. | RF19, RF21, Levantamento (dúvida 7) |
| RN73 | Na doação não anônima, a entidade vê apenas o **nome** do doador. E-mail, telefone, CPF e endereço não são exibidos (LGPD). Esta regra resolve a RN29. ⚠️ | RF22, RN35 |
| RN74 | Doações **Confirmadas** não podem ser editadas nem excluídas. | RF17, RF21 |

### 5. Histórico, Indicadores e Administração

| ID | Regra | Origem |
|---|---|---|
| RN75 | Os históricos são exibidos do **mais recente para o mais antigo**. O histórico da entidade pode ser filtrado por campanha e por período (data inicial e data final). | RF21, RF22, RF23 |
| RN76 | Os valores arrecadados (por campanha, por período e no painel) consideram somente doações **Confirmadas**. | RF14, RF23, RF25 |
| RN77 | O Administrador não pode desativar a **própria conta**. | RF26 |

### Fora do escopo do MVP

- **Agendamento:** a entidade AGENDAMENTO existe no modelo de dados, mas não possui funcionalidade associada no MVP (ver `routes-plan.md`). Suas regras serão definidas se o módulo for incluído em uma próxima etapa.
- **Outros métodos de pagamento:** além do PIX, dependem de validação com o cliente (Levantamento, dúvida 1).

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