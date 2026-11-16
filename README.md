# DoaSync

Plataforma web de arrecadação de doações. Conecta doadores a entidades assistenciais (foco inicial: APAE e Associação Amor Inclusivo), com campanhas públicas, registro de doações e painel de gestão.

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

| Repositório | O que contém | Branch com o código |
|---|---|---|
| [`doa-sync`](https://github.com/PrjDoaSync/doa-sync) (este) | Documentação central: requisitos, regras de negócio, modelo de dados, arquitetura, sprints | `main` (documentação) |
| [`doasync-backend`](https://github.com/PrjDoaSync/doasync-backend) (privado) | API REST em Java 17 e Spring Boot, migrações Flyway | `develop` |
| [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend) | Aplicação web em React (Vite) em `web/` | `develop` |
| [`quality`](https://github.com/PrjDoaSync/quality) | Testes automatizados de API e interface, plano de testes manuais | `develop` |

O código de aplicação vive na branch `develop` de cada repositório de código. A `main` recebe as entregas já integradas e validadas. Regras de branches e PRs em [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Modelo de dados

As entidades abaixo seguem as migrações Flyway do backend (`V1` a `V4`) e o diagrama [`docs/DER.png`](./docs/DER.png). A descrição detalhada está em [`docs/entidades-envolvidas.md`](./docs/entidades-envolvidas.md).

| Entidade (tabela) | Descrição |
|---|---|
| `Usuario` (`usuarios`) | Conta de acesso. Tipo: `PESSOA_FISICA`, `PESSOA_JURIDICA`, `ENTIDADE` ou `ADMIN`. Status `ATIVO` ou `INATIVO` |
| `PessoaFisica` (`pessoas_fisicas`) | Especialização do usuário com CPF e data de nascimento |
| `PessoaJuridica` (`pessoas_juridicas`) | Especialização do usuário com CNPJ e razão social. Usada por doador PJ e por entidade |
| `Telefone` (`telefones`) | Telefones do usuário (1:N) |
| `Endereco` (`enderecos`) | Endereços do usuário (1:N) |
| `Entidade` (`entidades`) | Perfil institucional da entidade assistencial, responsável e status (`PENDENTE`, `APROVADA`, `REPROVADA`, `INATIVA`) |
| `Campanha` (`campanhas`) | Iniciativa de arrecadação de uma entidade, com meta, período e status (`ATIVA`, `ENCERRADA`, `DESATIVADA`) |
| `Doacao` (`doacoes`) | Contribuição de um doador a uma campanha ou diretamente a uma entidade. Status `PENDENTE`, `CONFIRMADA` ou `CANCELADA` |

Não há exclusão física: todas as chaves estrangeiras usam `ON DELETE RESTRICT` para preservar o histórico (RN51).

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Java 17, Spring Boot, Spring Security (JWT), JPA, Flyway |
| Banco | PostgreSQL (homologação e produção), H2 (desenvolvimento e testes) |
| Frontend web | React |
| CI/CD | GitHub Actions |

Detalhes e justificativas em [`docs/stack.md`](./docs/stack.md) e [`docs/arquitetura.md`](./docs/arquitetura.md).

## Equipes e responsabilidades

| Equipe | Responsabilidade |
|---|---|
| Equipe 1 | Produto, usuários e entidades |
| Equipe 2 | Módulo de campanhas |
| Equipe 3 | Módulo de doações |
| Equipe 4 | Gestão e dashboard (frontend web) |
| Grupo 5 | Qualidade de software (QA), testes e CI/CD |

O planejamento por sprint e por stack está em [`docs/sprints/README.md`](./docs/sprints/README.md).
