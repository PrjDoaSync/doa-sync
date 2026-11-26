# DoaSync

Plataforma web de arrecadação de doações, que conecta doadores a entidades assistenciais, com campanhas públicas, registro de doações e painel de gestão.

## Documentação

Toda a documentação do projeto está indexada em [`docs/README.md`](./docs/README.md), com o documento canônico de cada assunto. Para contribuir, leia o [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Funcionalidades

- Cadastro de doadores (pessoa física ou jurídica) e de entidades assistenciais
- Aprovação, reprovação e desativação de entidades pelo administrador
- Criação, edição, publicação e encerramento de campanhas de arrecadação
- Doação a uma campanha ou diretamente a uma entidade (PIX simulado no MVP), com comprovante e histórico
- Dashboard e gestão para entidade e administrador

Escopo completo em [`docs/definicao-mvp.md`](./docs/definicao-mvp.md) e [`docs/funcionalidades.md`](./docs/funcionalidades.md).

## Organização dos repositórios

O projeto está dividido em 4 repositórios da organização [PrjDoaSync](https://github.com/PrjDoaSync).

| Repositório | O que contém | Branch mais atual |
|---|---|---|
| [`doa-sync`](https://github.com/PrjDoaSync/doa-sync) (este) | Documentação central: requisitos, regras de negócio, modelo de dados, arquitetura, sprints | `main` |
| [`doasync-backend`](https://github.com/PrjDoaSync/doasync-backend) (privado) | API REST em Java 17 e Spring Boot, migrações Flyway | `main` (ver nota) |
| [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend) | Aplicação web em React + Vite, em `web/` | `main` (ver nota) |
| [`quality`](https://github.com/PrjDoaSync/quality) | Testes automatizados de API e interface, plano de testes manuais | `develop` |

O fluxo combinado é `feature/*` → `develop` → `main`: a `develop` integra o trabalho em andamento e a `main` recebe as entregas validadas. Regras de branches e PRs em [`CONTRIBUTING.md`](./CONTRIBUTING.md).

> **Nota (26/11/2026):** no `doasync-backend` e no `doasync-frontend`, a `main` está à frente da `develop`. A integração do frontend com a API (PR #145 do front) e a correção de CORS do backend (PR #70 do back) entraram direto na `main`. Até as equipes sincronizarem a `develop`, a versão mais recente do código está na `main`.

## Modelo de dados

As entidades abaixo seguem as migrações Flyway do backend (`V1` a `V6`). O dicionário de dados completo, o DER atualizado e as divergências em relação ao diagrama original ([`docs/DER.png`](./docs/DER.png)) estão em [`docs/modelo-de-dados.md`](./docs/modelo-de-dados.md).

| Entidade (tabela) | Descrição |
|---|---|
| `Usuario` (`usuarios`) | Conta de acesso. Tipo: `PESSOA_FISICA`, `PESSOA_JURIDICA`, `ENTIDADE` ou `ADMIN`. Status `ATIVO` ou `INATIVO` |
| `PessoaFisica` (`pessoas_fisicas`) | Especialização do usuário com CPF e data de nascimento |
| `PessoaJuridica` (`pessoas_juridicas`) | Especialização do usuário com CNPJ e razão social. Usada por doador PJ e por entidade |
| `Telefone` (`telefones`) | Telefones do usuário (1:N) |
| `Endereco` (`enderecos`) | Endereços do usuário (1:N) |
| `Entidade` (`entidades`) | Perfil institucional da entidade assistencial, responsável e status (`PENDENTE`, `APROVADA`, `REPROVADA`, `INATIVA`) |
| `Campanha` (`campanhas`) | Iniciativa de arrecadação de uma entidade, com meta, período e status (`RASCUNHO`, `AGENDADA`, `ATIVA`, `ENCERRADA`, `DESATIVADA`) |
| `Doacao` (`doacoes`) | Contribuição de um doador a uma campanha ou diretamente a uma entidade. Status `PENDENTE`, `CONFIRMADA` ou `CANCELADA` |

Não há exclusão física: todas as chaves estrangeiras usam `ON DELETE RESTRICT` para preservar o histórico (RN51).

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Java 17, Spring Boot, Spring Security (JWT), JPA, Flyway |
| Banco | PostgreSQL (homologação e produção), H2 (desenvolvimento e testes) |
| Frontend web | React + Vite |
| CI/CD | GitHub Actions |

Detalhes e justificativas em [`docs/stack.md`](./docs/stack.md) e [`docs/arquitetura.md`](./docs/arquitetura.md).

## Equipes

As equipes são identificadas pela função. Cada uma trabalha no seu repositório.

| Equipe | Responsabilidade | Repositório | Integrantes |
|---|---|---|---|
| Documentação | Produto, requisitos, regras de negócio, UX e documentação | `doa-sync` | vitorh07 (coord.), joaoalex4ndr3, LuisFelipeCorreia, IanLucasss, almeida-carol, DreBartolomeu |
| Backend | API Spring Boot, banco e módulos de usuários, entidades, campanhas, doações e dashboard | `doasync-backend` | CauaRMesquita, Trincademes, GustavoSilveira1012, JV2008, MatheusAlves08, Pedro-Vitor-Ribeiro-Silva, pietrosantos15 |
| Frontend | Aplicação web em React + Vite | `doasync-frontend` | julioCoronetti, Nicolas75460, pulcinelli123, nick0lasrm, LucasIanovski, GustavoRibasSilestrino |
| QA | Testes, qualidade e CI/CD | `quality` | Gusleme, AmosSantos02, MuriloDev1, Rekyrt24, paolacostxx, TuannyThomazelli, jenifferCamar |

O planejamento por sprint e por stack está em [`docs/sprints/README.md`](./docs/sprints/README.md).

## Proteção de branches

No `doa-sync`, a `main` e a `dev-frontend` são protegidas: merge somente por pull request com pelo menos uma aprovação, sem force push. A `main` deste repositório recebe PRs diretos das branches `docs/*` e de trabalho. Nos outros três repositórios, o fluxo `feature/*` → `develop` → `main` é acordo de equipe, sem bloqueio técnico (ver a nota em [Organização dos repositórios](#organização-dos-repositórios)).
