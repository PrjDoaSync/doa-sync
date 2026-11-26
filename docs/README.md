# Índice da Documentação — DoaSync

Ponto de entrada de toda a documentação do projeto. O `doa-sync` **centraliza** a documentação de todas as equipes: cada assunto tem um documento canônico aqui. Os repositórios de código mantêm a documentação técnica do dia a dia, que é copiada para cá.

## Repositórios da organização

| Repositório | Papel na documentação |
|---|---|
| [`doa-sync`](https://github.com/PrjDoaSync/doa-sync) (este) | **Central**: produto, regras, modelo de dados, arquitetura, sprints e cópia das docs das equipes |
| [`doasync-backend`](https://github.com/PrjDoaSync/doasync-backend) (privado) | Código da API; origem das docs técnicas do backend |
| [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend) | Código do frontend; origem das docs técnicas do frontend |
| [`quality`](https://github.com/PrjDoaSync/quality) | Automação de testes; origem das docs de QA |

**Regra:** quando um documento mudar no repositório de origem, a cópia em `doa-sync/docs` deve ser atualizada no mesmo PR ou logo em seguida.

---

## Produto

| Documento | Assunto | Dono |
|---|---|---|
| [Levantamento-de-necessidade.md](./Levantamento-de-necessidade.md) | Necessidades do cliente| Coordenação |
| [identificacao-usuarios.md](./identificacao-usuarios.md) | Perfis de usuário e personas | Coordenação |
| [definicao-mvp.md](./definicao-mvp.md) | Escopo do MVP | Coordenação |
| [requisitos.md](./requisitos.md) | Requisitos funcionais e não funcionais | Documentação |
| [funcionalidades.md](./funcionalidades.md) | Funcionalidades organizadas por módulo | Documentação |
| [regras-negocio.md](./regras-negocio.md) | Regras de negócio (RNxx), **fonte única das regras** | Documentação |
| [wireframes.md](./wireframes.md) | Wireframes das telas principais | Coordenação |

## Modelo de dados e arquitetura

| Documento | Assunto | Dono |
|---|---|---|
| [DER.png](./DER.png) | Diagrama entidade-relacionamento, **fonte única do modelo** | Coordenação |
| [entidades-envolvidas.md](./entidades-envolvidas.md) | Descrição das entidades | Coordenação |
| [modelo-de-dados.md](./modelo-de-dados.md) | Modelo do banco real: dicionário de dados, constraints e divergências com as modelagens antigas | Documentação |
| [arquitetura.md](./arquitetura.md) | Arquitetura da aplicação | Back |
| [stack.md](./stack.md) | Stack tecnológica e justificativas | Back |

## Guias de execução

| Documento | Assunto | Dono |
|---|---|---|
| [guia-instalacao-execucao-local.md](./guia-instalacao-execucao-local.md) | Instalar e executar back-end e front-end localmente | Documentação |

## Backend

| Documento | Assunto | Dono | Origem |
|---|---|---|---|
| [backend/contrato-api.md](./backend/contrato-api.md) | **Contrato consolidado da API** — 22 rotas com método, path, perfil de acesso, request, response, erros e status (✅ implementada / 🔧 planejada) | Back | — |
| [backend/rotas-api.md](./backend/rotas-api.md) | Contrato da API: requisição e resposta (JSON) de cada rota — referência histórica; ver `contrato-api.md` | Back | — |
| [routes-plan.md](./routes-plan.md) | Planejamento da API: decisões, dependências, ordem de implementação e problemas encontrados | Back | — |
| [backend/pipeline-ci-cd.md](./backend/pipeline-ci-cd.md) | Guia de pipeline CI/CD do backend | Back | — |
| [backend/cenarios-testes-api.md](./backend/cenarios-testes-api.md) | Cenários de teste da API | QA | `quality` |
| [backend/relatorio-testes-api-doasync.md](./backend/relatorio-testes-api-doasync.md) | Relatório de testes da API | QA | `quality` |
| [backend/Guia-RESTASSURED-joao.md](./backend/Guia-RESTASSURED-joao.md) | Guia de RestAssured | QA | `quality` |
| [backend/estudoAPI-joao.md](./backend/estudoAPI-joao.md) | Estudo sobre APIs | QA | `quality` |
| [backend/Conceitos de teste - Estudo Amós.md](<./backend/Conceitos de teste - Estudo Amós.md>) | Conceitos de teste | QA | `quality` |

## Frontend

| Documento | Assunto | Dono | Origem |
|---|---|---|---|
| [frontend/DESIGN-SYSTEM.md](./frontend/DESIGN-SYSTEM.md) | Design system (tokens, componentes), usado por web e mobile | Front | — |
| [frontend/handoff-ui-ux-estados.md](./frontend/handoff-ui-ux-estados.md) | Handoff UI/UX: mapa Figma × rotas, tokens, estados (loading, vazio, erro) e mensagens por código HTTP | Documentação | — |
| [frontend/frontend-web.md](./frontend/frontend-web.md) | Frontend web | Front | `doasync-frontend` |
| [frontend/frontend-validacao.md](./frontend/frontend-validacao.md) | Validação das telas | Front | `doasync-frontend` |
| [frontend/frontend-testes-unitarios.md](./frontend/frontend-testes-unitarios.md) | Testes unitários do frontend | Front | `doasync-frontend` |
| [frontend/conceitos-testes-frontend.md](./frontend/conceitos-testes-frontend.md) | Conceitos de testes de frontend | QA | `quality` |

## QA

| Documento | Assunto | Dono | Origem |
|---|---|---|---|
| [qa/Grupo 5 - Escopo de Trabalho.md](<./qa/Grupo 5 - Escopo de Trabalho.md>) | Escopo e responsabilidades do grupo de QA | QA | — |
| [qa/plano-de-testes-manuais.md](./qa/plano-de-testes-manuais.md) | Plano de testes manuais | QA | `quality` |
| [qa/matriz-rastreabilidade.md](./qa/matriz-rastreabilidade.md) | Matriz de rastreabilidade | QA | `quality` |
| [qa/relatorio-qa-shiftleft-sprint2.md](./qa/relatorio-qa-shiftleft-sprint2.md) | Relatório shift-left (Sprint 2) | QA | `quality` |
| [qa/pipeline-ci-cd.md](./qa/pipeline-ci-cd.md) | Guia de pipeline CI/CD | QA | — |

## Sprints e acompanhamento

| Documento | Assunto | Dono |
|---|---|---|
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | Guia de contribuição: branches, commits, PRs e issues | Documentação |
| [sprints/README.md](./sprints/README.md) | Planejamento geral das sprints | Coordenação |
| [sprints/sprint-backend.md](./sprints/sprint-backend.md) | Sprint do backend | Back |
| [sprints/sprint-banco.md](./sprints/sprint-banco.md) | Sprint do banco de dados | Back |
| [sprints/sprint-frontend.md](./sprints/sprint-frontend.md) | Sprint do frontend | Front |
| [sprints/sprint-qa.md](./sprints/sprint-qa.md) | Sprint de QA e CI/CD | QA |
| [relatorio-cam-t01.md](./relatorio-cam-t01.md) | Relatório de validação das regras de negócio (CAM-T01) | Coordenação |
| [relatorio_atividades_doaSync.md](./relatorio_atividades_doaSync.md) | Relatório de atividades do projeto de extensão | Coordenação |
