# Relatório de atividades --- Projeto de Extensão DoaSync

## 1. Contexto do projeto

O **DoaSync** é uma plataforma proposta para conectar doadores a
entidades assistenciais, inicialmente considerando a APAE e a Associação
Amor Inclusivo. O trabalho da equipe nesta fase está concentrado em
levantamento, planejamento e documentação.

**Orientação da equipe:** não desenvolver código para estas tarefas.
Registrar as contribuições nos próprios cards do GitHub Project;
arquivos Markdown também podem ser usados quando apropriado.

**Project:** `Equipe 1 — Produto, Usuários e Entidades`\
**Repositório:** `PrjDoaSync/doa-sync`

## 2. Tarefas trabalhadas

> Esta consolidação distingue conteúdos documentados ou preparados de
> estados finais confirmados. Quando não há confirmação visual do estado
> final, isso é indicado explicitamente.

### Issue #74 --- Criação do backlog inicial

**Objetivo:** transformar as necessidades e funcionalidades levantadas
em itens de trabalho organizados, criando a base inicial do backlog.

**Atividades trabalhadas:** - Organizar necessidades e funcionalidades
em itens de trabalho; - Considerar histórias de usuário iniciais; -
Definir critérios de aceitação básicos, quando aplicável; - Organizar
itens por prioridade; - Relacionar funcionalidades aos requisitos
funcionais.

**Estado:** discutida e usada como base para a criação/documentação de
cards. O estado final da Issue #74 não foi confirmado neste registro.

### Issue #81 --- Mapeamento dos principais fluxos de usuário

**Objetivo:** representar os principais caminhos que os usuários deverão
percorrer na plataforma.

**Perfis considerados:** Doador, Entidade e Administrador.

**Fluxos documentados:** 1. **Doador:** acesso, cadastro ou login,
visualização e seleção de campanha, escolha do valor, confirmação e
registro da doação. 2. **Entidade:** login, acesso ao painel, criação ou
atualização de campanhas e acompanhamento de doações e arrecadação. 3.
**Administrador:** login, acesso ao painel administrativo, gerenciamento
de usuários, entidades e campanhas e consulta de informações sobre
doações. 4. **Cadastro e Login:** verificação de cadastro, criação de
conta quando necessário, validação de informações e acesso ao sistema.

**Requisitos relacionados:** - RF01--RF06: cadastro, login e perfis de
usuário; - RF07--RF10: gestão de entidades; - RF11--RF15: criação e
gerenciamento de campanhas; - RF16--RF20: realização e registro de
doações; - RF21--RF23: acompanhamento e histórico de doações; -
RF24--RF26: painel e gerenciamento administrativo.

**Entregáveis documentados:** introdução, objetivo, descrições dos
fluxos, quatro diagramas anexados, relação com requisitos funcionais e
critérios de aceitação.

**Estado confirmado:** **Closed** e **Done**, conforme a captura de tela
compartilhada.

### Issue #140 --- Cadastro e acesso de usuários

**Objetivo:** definir e documentar a história de usuário relacionada ao
cadastro e acesso à plataforma.

**História de usuário:**

> Como usuário do DoaSync, quero criar uma conta e realizar login, para
> acessar a plataforma de acordo com meu perfil.

**Requisitos relacionados:** - RF01 --- Cadastro de doadores; - RF02 ---
Cadastro de entidades assistenciais; - RF03 --- Login e logout; - RF06
--- Diferenciação dos perfis de acesso.

**Critérios propostos para a futura funcionalidade:** - Permitir
cadastro de usuário, doador e entidade; - Permitir login e logout; -
Identificar o perfil do usuário; - Direcionar o usuário de acordo com
seu perfil; - Validar os dados informados no cadastro e login.

**Documentação preparada:** descrição, história de usuário, requisitos
relacionados, critérios de aceitação, prioridade alta, Sprint 1 e
comentário de conclusão para registrar a organização do item no backlog.

**Importante:** concluir o card de planejamento significa concluir a
documentação da história, não que o código de cadastro e login foi
implementado.

**Estado:** foi preparado o procedimento para comentar, fechar a Issue e
mover o item para Done; a confirmação visual do estado final não foi
fornecida neste registro.

### Issue #141 --- Cadastro e gerenciamento de entidades

**Objetivo:** documentar a história de usuário referente ao cadastro e
gerenciamento das informações das entidades assistenciais.

**História de usuário proposta:**

> Como entidade assistencial, quero cadastrar e gerenciar minhas
> informações institucionais, para apresentar minha organização aos
> doadores e participar da plataforma.

**Requisitos propostos:** RF02 (cadastro de entidades), RF07 (cadastro e
edição de informações institucionais), RF08 (perfil público), RF09
(aprovação ou reprovação pelo administrador) e RF10 (desativação de
entidades pelo administrador).

**Critérios propostos:** - Permitir cadastro e edição das informações; -
Registrar nome, CNPJ, descrição, endereço e contato; - Disponibilizar
perfil público; - Permitir ao administrador aprovar, reprovar ou
desativar entidades.

**Estado:** proposta de card para o backlog inicial. A criação e o
estado final não foram confirmados visualmente neste registro.

### Issue #142 --- Criação e gerenciamento de campanhas

**Objetivo:** definir e documentar a história de usuário referente à
criação e ao gerenciamento de campanhas de arrecadação.

**História de usuário:**

> Como entidade assistencial, quero criar e gerenciar campanhas de
> arrecadação, para divulgar minhas necessidades e receber contribuições
> dos doadores.

**Requisitos relacionados:** - RF11 --- Criação de campanhas; - RF12 ---
Exibição de campanhas ativas; - RF13 --- Encerramento antecipado de
campanhas; - RF14 --- Exibição do progresso de arrecadação; - RF15 ---
Desativação de campanhas pelo administrador.

**Critérios propostos para a futura funcionalidade:** - Permitir criação
de campanha; - Informar título e descrição; - Definir meta de
arrecadação e datas de início e encerramento; - Exibir campanhas
ativas; - Permitir encerramento antecipado; - Exibir o progresso da
arrecadação; - Permitir ao administrador desativar campanhas quando
necessário.

**Documentação preparada:** descrição, história de usuário, requisitos,
critérios de aceitação, prioridade alta, Sprint 1 e comentário de
conclusão para registrar a organização no backlog.

**Importante:** concluir a tarefa de documentação não comprova que a
funcionalidade de campanhas foi desenvolvida.

**Estado:** foi preparado o procedimento para comentar, fechar a Issue e
mover o card para Done; a confirmação visual do estado final não foi
fornecida neste registro.

### Issue #149 --- Definição dos entregáveis da primeira sprint

**Objetivo:** estabelecer quais funcionalidades e resultados deverão ser
entregues ao final da primeira sprint.

**Planejamento documentado/proposto:**

#### Objetivo da sprint

Organizar os entregáveis iniciais, as funcionalidades prioritárias e as
atividades necessárias. Nesta etapa, o foco é planejamento e
documentação, sem desenvolvimento de código.

#### Funcionalidades prioritárias consideradas

-   Gestão de usuários: cadastro, login e identificação de perfis;
-   Gestão de entidades: cadastro e organização das informações
    institucionais;
-   Gestão de campanhas: informações para criação e divulgação;
-   Mapeamento dos fluxos de usuário;
-   Levantamento das regras de negócio.

A ordem definitiva das prioridades deve ser validada pela equipe e pelo
responsável pelo projeto.

#### Entregáveis propostos

-   Objetivo e escopo da primeira sprint documentados;
-   Funcionalidades prioritárias identificadas;
-   Histórias de usuário iniciais organizadas;
-   Requisitos funcionais relacionados identificados;
-   Fluxos de usuário documentados;
-   Regras de negócio registradas;
-   Tarefas organizadas no GitHub Project;
-   Prioridades e responsáveis identificados;
-   Documentação disponível para consulta.

#### Tarefas necessárias

1.  Revisar o levantamento de requisitos;
2.  Identificar funcionalidades essenciais;
3.  Organizar histórias de usuário dos perfis Doador, Entidade e
    Administrador;
4.  Documentar os principais fluxos;
5.  Registrar regras de negócio;
6.  Relacionar tarefas aos requisitos;
7.  Organizar as atividades no GitHub Project;
8.  Registrar decisões, dúvidas e alterações nos cards.

**Estado confirmado na captura:** **Open**, com status **Todo**. Foi
elaborado um comentário Markdown para a Issue; os critérios foram
deixados desmarcados para serem assinalados após validação efetiva da
equipe.

## 3. Organização do backlog no GitHub Project

Os status utilizados no quadro são: - **Todo:** tarefa ainda não
iniciada; - **In Progress:** tarefa em andamento; - **Done:** tarefa
concluída e validada.

Labels usados ou propostos durante o trabalho: - `Funcionalidades`; -
`Alta Prioridade`; - `Sprint 1`; - `documentation`; - `ux-design`; -
`Planejamento`.

Os labels e status devem seguir a configuração efetivamente existente no
Project.

## 4. Princípio para registrar conclusões

Como a equipe está concentrada em documentação, fechar uma Issue de
planejamento significa concluir a documentação ou organização descrita
naquela Issue. **Não significa que a funcionalidade correspondente foi
implementada no sistema.**

Por isso: - Os critérios de aceitação da futura funcionalidade devem
permanecer desmarcados enquanto ela não for desenvolvida e validada; -
Os critérios relativos à documentação podem ser marcados quando o
trabalho documental estiver realmente concluído; - Os comentários finais
devem esclarecer o que foi documentado e o que ficará para uma etapa
posterior.

## 5. Próximas atividades previstas

-   Validar com a equipe o escopo e os entregáveis da primeira sprint;
-   Confirmar prioridades e responsáveis no GitHub Project;
-   Continuar o mapeamento das regras de negócio;
-   Revisar e organizar as histórias de usuário;
-   Documentar funcionalidades de doação, histórico e administração
    quando forem atribuídas;
-   Registrar decisões e alterações nos cards correspondentes.

Estas são atividades previstas, não uma confirmação de que já foram
concluídas.

## 6. Resumo das tarefas

  -----------------------------------------------------------------------
  Issue             Título            Conteúdo          Estado confirmado
                                      trabalhado        neste registro
  ----------------- ----------------- ----------------- -----------------
  #74               Criação do        Organização       Estado final não
                    backlog inicial   inicial do        confirmado
                                      backlog e         
                                      histórias de      
                                      usuário           

  #81               Mapeamento dos    Quatro fluxos,    Closed / Done
                    principais fluxos diagramas,        
                    de usuário        descrições e      
                                      relação com       
                                      RF01--RF26        

  #140              Cadastro e acesso História,         Estado final não
                    de usuários       RF01--RF03 e      confirmado
                                      RF06, critérios e visualmente
                                      documentação      

  #141              Cadastro e        Proposta de       Criação/estado
                    gerenciamento de  história, RF02 e  final não
                    entidades         RF07--RF10,       confirmado
                                      critérios         

  #142              Criação e         História,         Estado final não
                    gerenciamento de  RF11--RF15,       confirmado
                    campanhas         critérios e       visualmente
                                      documentação      

  #149              Definição dos     Objetivo,         Open / Todo na
                    entregáveis da    prioridades,      captura
                    primeira sprint   entregáveis e     
                                      tarefas           
                                      necessárias       
  -----------------------------------------------------------------------

## 7. Observação final

Este arquivo consolida as tarefas do DoaSync discutidas durante o
acompanhamento e diferencia conteúdos documentados, propostas e estados
confirmados por capturas de tela. Antes de utilizá-lo como relatório
oficial, confira o estado atual de cada Issue no GitHub e atualize a
tabela quando necessário.
