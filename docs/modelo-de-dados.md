# Modelo de Dados Atual — DER e Dicionário de Dados

> **DOC-10 — Issue #189** · Equipe de Documentação · Semestre 2026/2

## 1. Escopo e fonte

Este documento descreve o modelo de dados **como está implementado hoje**, e não o modelo planejado.

| Item | Valor |
|---|---|
| Fonte | Branch `dev-backend`, pasta `api/` (classes em `Models/`, `ApplicationDbContext` e `Migrations/ApplicationDbContextModelSnapshot.cs`) |
| Último commit analisado | `bc7f7b6` (merge do PR #51, CRUD de Projeto) |
| SGBD | MySQL (provider Pomelo, EF Core 9.0.10) |
| Tabelas | 7: `Usuario`, `PessoasFisicas`, `PessoasJuridicas`, `Endereco`, `Telefone`, `Projetos`, `Doacao` |

> O modelo **planejado** (com `Agendamento`, valor e forma de pagamento da doação, data de nascimento, razão social em PJ, relação de responsável etc.) está em [`entidades-envolvidas.md`](./entidades-envolvidas.md) e no diagrama [`er.jpeg`](./er.jpeg). A seção 5 compara os dois.

---

## 2. Diagrama Entidade-Relacionamento (DER)

```mermaid
erDiagram
    USUARIO ||--o| PESSOAS_FISICAS : "especializa (1:0..1)"
    USUARIO ||--o| PESSOAS_JURIDICAS : "especializa (1:0..1)"
    USUARIO ||--o{ ENDERECO : "possui"
    USUARIO ||--o{ TELEFONE : "possui"
    USUARIO ||--o{ PROJETOS : "cria"
    USUARIO }o..o{ DOACAO : "doador_id / receptor_id (sem FK)"

    USUARIO {
        int Id PK
        longtext Username
        longtext Password
        longtext Email
        int TipoUsuario "enum 0-3"
    }
    PESSOAS_FISICAS {
        int Id PK
        int UsuarioId FK "UNIQUE"
        longtext Nome
        longtext Sobrenome
        longtext CPF
    }
    PESSOAS_JURIDICAS {
        int Id PK
        int UsuarioId FK "UNIQUE"
        longtext RazaoSocial
        longtext NomeFantasia
        longtext CNPJ
    }
    ENDERECO {
        int Id PK
        int UsuarioId FK
        longtext Logradouro
        longtext Numero
        longtext Bairro
        longtext Cidade
        longtext Estado
        longtext Pais
        longtext Cep
    }
    TELEFONE {
        int Id PK
        int UsuarioId FK
        longtext Ddd
        longtext Numero
    }
    PROJETOS {
        int Id PK
        int UsuarioId FK
        longtext Titulo
        longtext Descricao
        datetime Data
        longtext Categoria
    }
    DOACAO {
        int Id PK
        int DoadorId "sem FK"
        int ReceptorId "sem FK"
        datetime DataCriacao
        longtext Local
        datetime DataPlanejada
    }
```

### 2.1 Relacionamentos

| Origem | Destino | Cardinalidade | Chave estrangeira | `ON DELETE` | Observação |
|---|---|---|---|---|---|
| `Usuario` | `PessoasFisicas` | 1 : 0..1 | `PessoasFisicas.UsuarioId` (índice único) | CASCADE | Um usuário tem no máximo um perfil de pessoa física |
| `Usuario` | `PessoasJuridicas` | 1 : 0..1 | `PessoasJuridicas.UsuarioId` (índice único) | CASCADE | Um usuário tem no máximo um perfil de pessoa jurídica |
| `Usuario` | `Endereco` | 1 : N | `Endereco.UsuarioId` | CASCADE | |
| `Usuario` | `Telefone` | 1 : N | `Telefone.UsuarioId` | CASCADE | |
| `Usuario` | `Projetos` | 1 : N | `Projetos.UsuarioId` | CASCADE | Usuário que criou o projeto |
| `Usuario` | `Doacao` | 1 : N (doador) e 1 : N (receptor) | **nenhuma** | — | `DoadorId` e `ReceptorId` são inteiros comuns, sem restrição no banco |

Não há relacionamento entre `Doacao` e `Projetos` no modelo atual.

### 2.2 Especialização de usuário

O tipo do usuário é definido pelo enum `TipoUsuario` (coluna `Usuario.TipoUsuario`, `int`):

| Valor | Nome |
|---|---|
| 0 | Indefinido |
| 1 | Administrador |
| 2 | PessoaFisica |
| 3 | PessoaJuridica |

O banco **não impede** que um mesmo usuário tenha registros em `PessoasFisicas` e `PessoasJuridicas` ao mesmo tempo, nem que o `TipoUsuario` seja incoerente com o perfil existente. Essa coerência depende da aplicação.
