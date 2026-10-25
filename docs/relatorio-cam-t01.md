# DoaSync — Relatório de Levantamento e Validação de Regras de Negócio

## CAM-T01 — Validar Regras e Necessidades das Campanhas

| Informação | Descrição |
|---|---|
| **Projeto** | DoaSync — Projeto de Extensão |
| **Equipe** | Grupo 2 — Campanhas |
| **Sprint** | Sprint 1 |
| **Issue** | [#152 — CAM-T01](https://github.com/PrjDoaSync/doa-sync/issues/152) |
| **Responsável** | GustavoSilveira1012 |
| **Data** | 08/10/2026 |
| **Prioridade** | Alta |
| **Status** | Levantamento inicial realizado — validação pendente |

---

## 1. Introdução

O **DoaSync** é um projeto de extensão universitária que tem como objetivo desenvolver uma plataforma digital para facilitar a arrecadação e o gerenciamento de doações destinadas a entidades assistenciais, inicialmente a **APAE** e a **Associação Amor Inclusivo**.

A plataforma busca conectar doadores às instituições, proporcionando maior organização, transparência e acessibilidade durante o processo de arrecadação.

A **Equipe 2 — Campanhas** é responsável pelo desenvolvimento do módulo de criação, divulgação, visualização e gerenciamento das campanhas de arrecadação.

Este relatório apresenta o levantamento inicial dos requisitos e das regras de negócio necessárias para o desenvolvimento do módulo, identificando também as decisões pendentes de validação com o professor orientador, as entidades parceiras e as equipes técnicas.

---

## 2. Objetivo da atividade

A atividade **CAM-T01** tem como objetivo levantar, analisar e documentar as necessidades e regras de negócio relacionadas ao módulo de Campanhas.

### 2.1 Objetivos específicos

- Identificar as informações necessárias para o cadastro de campanhas.
- Definir os diferentes estados de uma campanha.
- Estabelecer regras de criação, edição, publicação e encerramento.
- Identificar os perfis de usuários e suas permissões.
- Definir critérios para visualização pública das campanhas.
- Identificar dependências com os módulos de Doações, Gestão e Banco de Dados.
- Documentar dúvidas e decisões pendentes.
- Preparar os requisitos para validação com o professor e as entidades assistenciais.

---

## 3. Metodologia

O levantamento inicial foi realizado por meio da análise da documentação disponível no repositório oficial do projeto DoaSync.

Foram utilizados como base:

1. Documentação geral dos requisitos funcionais.
2. Contratos de API previstos para o sistema.
3. História de usuário de criação e gerenciamento de campanhas.
4. Planejamento das atividades da Equipe 2.
5. Escopo geral do projeto de extensão.
6. Referências dos protótipos de interface.

A análise permitiu identificar as funcionalidades essenciais, as regras já previstas e os pontos que necessitam de validação.

**Observação:** esta versão representa o levantamento documental inicial. As regras propostas ainda deverão ser confirmadas com o professor orientador e as entidades parceiras.

---

## 4. Levantamento das necessidades

### 4.1 Necessidades das entidades assistenciais

Considerando os objetivos gerais do DoaSync, foram identificadas as seguintes necessidades para o módulo de Campanhas:

- Permitir que entidades assistenciais cadastrem campanhas de arrecadação.
- Disponibilizar informações claras sobre os objetivos de cada campanha.
- Definir metas e períodos para arrecadação.
- Facilitar a divulgação das campanhas aos possíveis doadores.
- Permitir o acompanhamento do progresso das arrecadações.
- Possibilitar atualizações nas informações das campanhas.
- Permitir o encerramento de campanhas.
- Organizar as campanhas por entidade responsável.

### 4.2 Entidades envolvidas

| Entidade | Necessidades preliminares | Validação |
|---|---|---|
| APAE | Divulgação de campanhas, arrecadação e acompanhamento de resultados | Pendente |
| Associação Amor Inclusivo | Organização de campanhas, divulgação e captação de recursos | Pendente |

As necessidades apresentadas são preliminares e foram identificadas com base nos objetivos do projeto, não constituindo respostas formalmente obtidas das entidades.

---

## 5. Requisitos funcionais

Com base no documento `docs/requisitos.md`, foram identificados os seguintes requisitos relacionados ao módulo de Campanhas:

| Código | Funcionalidade | Prioridade |
|---|---|---|
| RF-010 | Criação de campanha | Alta |
| RF-011 | Edição de campanha | Alta |
| RF-012 | Publicação de campanha | Alta |
| RF-013 | Encerramento de campanha | Alta |
| RF-014 | Listagem de campanhas disponíveis | Alta |
| RF-015 | Página de detalhes da campanha | Alta |
| RF-016 | Busca de campanhas | Média |
| RF-017 | Filtros de campanhas | Baixa |
| RF-018 | Imagens da campanha | Média |
| RF-019 | Compartilhamento de campanha | Baixa |

Esses requisitos servirão como base para a definição do MVP e para o planejamento das próximas atividades de desenvolvimento.

---

## 6. Estrutura das informações de uma campanha

A estrutura inicial proposta para uma campanha considera os seguintes campos:

| Campo | Descrição | Regra proposta |
|---|---|---|
| ID | Identificador único da campanha | Gerado automaticamente |
| Título | Nome da campanha | Obrigatório |
| Descrição | Informações sobre o objetivo | Obrigatório |
| Entidade | Instituição responsável | Obrigatório |
| Meta financeira | Valor esperado de arrecadação | Maior que zero |
| Data de início | Início da campanha | Obrigatório |
| Data de encerramento | Término previsto | Obrigatório |
| Status | Situação atual da campanha | Controlado pelo sistema |
| Imagem | Identificação visual | Obrigatoriedade a confirmar |
| Valor arrecadado | Total das doações válidas | Calculado pelo sistema |

### 6.1 Validações propostas

- O título não poderá estar vazio.
- A descrição deverá informar o objetivo da campanha.
- A meta financeira deverá ser positiva.
- A data de encerramento não poderá ser anterior à data de início.
- A campanha deverá estar vinculada a uma entidade válida.
- Apenas usuários autorizados poderão gerenciar campanhas.
- As campanhas disponibilizadas publicamente deverão obedecer às regras de status e período.

Essas validações deverão ser revisadas com a equipe responsável pela API e com o professor.

---

## 7. Regras de negócio

### RN-CAM-01 — Criação de campanhas

O sistema deverá permitir que um gestor autorizado cadastre campanhas vinculadas à entidade assistencial pela qual é responsável.

**Critérios propostos:**

- O usuário deverá estar autenticado.
- O usuário deverá possuir permissão para criar campanhas.
- A entidade deverá estar autorizada a utilizar a plataforma.
- Os campos obrigatórios deverão estar preenchidos corretamente.

### RN-CAM-02 — Edição de campanhas

O sistema deverá permitir que o gestor altere informações de campanhas pertencentes à sua entidade.

**Critérios propostos:**

- Apenas usuários autorizados poderão realizar alterações.
- Os dados modificados deverão ser validados.
- As alterações deverão ser persistidas.
- As permissões de edição deverão considerar o status da campanha.

**Pendente:** definir se campanhas que já receberam doações poderão ter suas metas e datas alteradas.

### RN-CAM-03 — Publicação de campanhas

O sistema deverá permitir que campanhas sejam disponibilizadas publicamente após o cumprimento das condições necessárias.

**Critérios propostos:**

- A campanha deverá possuir informações válidas.
- A entidade responsável deverá estar autorizada.
- A campanha publicada deverá estar disponível para consulta pública quando elegível.

**Pendente:** definir se haverá aprovação administrativa antes da publicação.

### RN-CAM-04 — Encerramento de campanhas

O sistema deverá permitir o encerramento de campanhas de arrecadação.

**Critérios propostos:**

- Apenas usuários autorizados poderão solicitar o encerramento.
- Campanhas encerradas não deverão receber novas doações.
- O status deverá ser atualizado.
- As informações históricas deverão ser preservadas.

### RN-CAM-05 — Visualização pública

O sistema deverá disponibilizar uma listagem das campanhas elegíveis para receber doações.

Cada campanha deverá apresentar informações relevantes, como:

- Título.
- Descrição.
- Entidade beneficiada.
- Meta de arrecadação.
- Valor arrecadado.
- Período da campanha.
- Imagem, quando disponível.

### RN-CAM-06 — Permissões dos usuários

As funcionalidades deverão respeitar o perfil e as permissões de cada usuário.

| Perfil | Permissões propostas |
|---|---|
| Visitante | Visualizar campanhas públicas |
| Doador | Visualizar campanhas e acessar o fluxo de doação |
| Gestor da entidade | Criar e gerenciar campanhas da própria entidade |
| Administrador | Supervisionar e moderar campanhas |

As permissões deverão ser verificadas tanto no frontend quanto no backend, com a autorização efetiva sendo aplicada no servidor.

---

## 8. Ciclo de vida das campanhas

O ciclo de vida proposto inicialmente é:

**Rascunho → Publicada/Ativa → Encerrada**

Também deverá ser considerada a desativação administrativa.

### 8.1 Estados propostos

| Status | Descrição |
|---|---|
| Rascunho | Campanha cadastrada, ainda não publicada |
| Ativa | Campanha publicada e disponível conforme o período |
| Encerrada | Campanha finalizada, sem possibilidade de novas doações |
| Desativada | Campanha desativada por decisão administrativa |

### 8.2 Transições a validar

| Transição | Regra proposta |
|---|---|
| Rascunho → Ativa | Publicação após validação dos dados |
| Ativa → Encerrada | Permitida ao gestor responsável |
| Ativa → Desativada | Permitida ao administrador |
| Desativada → Ativa | Sujeita à autorização administrativa |
| Encerrada → Ativa | Inicialmente não permitida |
| Encerrada → Edição | Inicialmente não permitida |

### 8.3 Divergência identificada

Durante a análise dos documentos, foi identificada uma inconsistência:

- O documento `docs/requisitos.md` prevê que a campanha seja criada como **rascunho**.
- O contrato em `docs/rotas-api.md` prevê a criação diretamente com status **ATIVA**.

Essa divergência deverá ser resolvida antes da implementação definitiva das regras de publicação.

**Situação:** decisão pendente de alinhamento entre Produto, Campanhas e responsáveis pela API.

---

## 9. Integração com outras equipes

O módulo de Campanhas depende de funcionalidades desenvolvidas pelas demais equipes.

| Área | Integração necessária |
|---|---|
| Usuários e Entidades | Autenticação, permissões e identificação das entidades |
| Doações | Associação das doações às campanhas |
| Gestão e Dashboard | Indicadores, monitoramento e administração |
| Banco de Dados e APIs | Armazenamento, consultas e atualização das campanhas |
| Qualidade | Validação dos requisitos e testes funcionais |

### 9.1 Relação entre Projeto e Campanha

O modelo inicial do DoaSync contempla a entidade `Projeto`, associada às iniciativas de doação.

Entretanto, o módulo de Campanhas apresenta funcionalidades específicas de gerenciamento de arrecadação.

Será necessário definir se:

1. Uma campanha será representada pela estrutura `Projeto` existente.
2. Uma campanha terá uma entidade própria, relacionada a `Projeto`.
3. Os conceitos serão unificados em uma única estrutura.

**Decisão pendente:** validar a modelagem com a Equipe 4, a Equipe 5 e os responsáveis pelo banco de dados e pelas APIs.

A decisão deverá evitar duplicidade de informações e inconsistências entre os módulos.

---

## 10. Escopo inicial do MVP

Para a primeira entrega funcional, propõe-se priorizar:

- Cadastro de campanhas por gestores autorizados.
- Listagem pública das campanhas disponíveis.
- Página de detalhes da campanha.
- Exibição das informações da entidade responsável.
- Validação de campos obrigatórios.
- Integração básica entre frontend e API.
- Persistência dos dados.

Funcionalidades como busca avançada, filtros adicionais, compartilhamento e outras melhorias poderão ser distribuídas em sprints posteriores.

O escopo definitivo dependerá da capacidade da equipe e da validação do professor.

---

## 11. Questões pendentes

| ID | Questão | Responsável pela validação | Status |
|---|---|---|---|
| Q01 | Quais informações são obrigatórias em uma campanha? | Professor / Entidades | Pendente |
| Q02 | A campanha deverá ser criada como rascunho? | Produto / Campanhas / API | Pendente |
| Q03 | Campanhas precisam de aprovação administrativa? | Professor / Produto | Pendente |
| Q04 | Serão aceitas doações financeiras e de produtos? | Entidades / Produto | Pendente |
| Q05 | É permitido editar campanhas com doações registradas? | Professor / Entidades | Pendente |
| Q06 | Campanha e Projeto utilizarão a mesma estrutura de dados? | Equipes técnicas | Pendente |
| Q07 | O encerramento ocorrerá automaticamente ao término do período? | Professor / Entidades | Pendente |
| Q08 | Como será calculado o progresso da campanha? | Campanhas / Doações / Gestão | Pendente |

---

## 12. Registro de validação

As seguintes validações deverão ser realizadas:

| Participante | Data | Evidência | Situação |
|---|---|---|---|
| Professor orientador | A definir | A registrar | Pendente |
| Representante da APAE | A definir | A registrar | Pendente |
| Representante da Associação Amor Inclusivo | A definir | A registrar | Pendente |
| Equipe 4 — Gestão e Dashboard | A definir | A registrar | Pendente |
| Equipe 5 e responsáveis por Banco/API | A definir | A registrar | Pendente |

### Informações que deverão ser registradas

Para cada reunião ou contato de validação, deverão ser documentados:

- Nome do participante.
- Instituição ou equipe.
- Data do contato.
- Necessidades apresentadas.
- Dúvidas discutidas.
- Decisões tomadas.
- Pendências identificadas.
- Evidência de validação, como ata, comentário ou registro autorizado.

Até esta versão, não constam neste relatório evidências de validação formal com os participantes.

---

## 13. Resultados obtidos

Com o levantamento inicial, foi possível:

- Identificar os requisitos funcionais do módulo de Campanhas.
- Organizar os principais campos necessários para o cadastro.
- Propor regras de criação, edição, publicação e encerramento.
- Mapear os perfis e as permissões dos usuários.
- Identificar dependências entre os módulos do sistema.
- Identificar divergências na documentação existente.
- Propor um escopo inicial para o MVP.
- Elaborar uma lista de questões para validação com o professor e as entidades.

O documento estabelece uma base inicial para a continuidade do desenvolvimento técnico.

**Resultado atual:** levantamento documental elaborado, com validações externas ainda pendentes.

---

## 14. Próximas atividades

As próximas etapas previstas para a Equipe 2 são:

1. Apresentar as regras propostas ao professor orientador.
2. Validar as necessidades com as entidades parceiras.
3. Registrar as decisões e atualizar este relatório.
4. Alinhar o modelo de dados e os contratos de API.
5. Revisar os protótipos existentes.
6. Continuar o desenvolvimento do frontend de campanhas.
7. Integrar as interfaces aos serviços de backend.
8. Realizar testes e validar as funcionalidades implementadas.
9. Atualizar as tarefas no GitHub Projects.

As decisões aprovadas deverão ser encaminhadas para as atividades:

- [CAM-T02 — Alinhar modelo de dados e contrato da API de campanhas (#153)](https://github.com/PrjDoaSync/doa-sync/issues/153)
- [CAM-T03 — Revisar e reutilizar protótipos de campanhas (#154)](https://github.com/PrjDoaSync/doa-sync/issues/154)

---

## 15. Conclusão

O levantamento inicial das regras de negócio do módulo de Campanhas representa uma etapa importante para o desenvolvimento do DoaSync.

A análise dos requisitos permitiu identificar as principais funcionalidades, estruturar propostas de regras de negócio e compreender as dependências existentes entre os módulos.

A documentação produzida poderá auxiliar no desenvolvimento do frontend, na implementação das APIs, na modelagem dos dados e na realização dos testes.

Entretanto, a conclusão integral da atividade CAM-T01 depende da validação das regras propostas com o professor, as entidades assistenciais e as equipes envolvidas.

Após essas validações, o documento deverá ser atualizado para refletir as decisões aprovadas, contribuindo para que o módulo de Campanhas atenda às necessidades reais das instituições beneficiadas e aos objetivos sociais do projeto de extensão.

---

## 16. Referências

- [Repositório oficial DoaSync](https://github.com/PrjDoaSync/doa-sync)
- [Documentação de Requisitos](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/requisitos.md)
- [Contrato da API](https://github.com/PrjDoaSync/doa-sync/blob/main/docs/rotas-api.md)
- [GitHub Project — Equipe 2](https://github.com/orgs/PrjDoaSync/projects/6)
- [CAM-T01 — Issue #152](https://github.com/PrjDoaSync/doa-sync/issues/152)
- [CAM-T02 — Issue #153](https://github.com/PrjDoaSync/doa-sync/issues/153)
- [CAM-T03 — Issue #154](https://github.com/PrjDoaSync/doa-sync/issues/154)
- [História principal — Issue #139](https://github.com/PrjDoaSync/doa-sync/issues/139)

---

**Documento elaborado para a Sprint 1 da Equipe 2 — Campanhas do Projeto de Extensão DoaSync.**

**Situação da CAM-T01:** aguardando validação das regras propostas.
