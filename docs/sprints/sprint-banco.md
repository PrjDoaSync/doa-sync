# Sprint Plan — Banco de Dados (PostgreSQL / Flyway / Docker)

> Stack: PostgreSQL 16 · Flyway · H2 (dev/teste) · Docker Compose · Hibernate/JPA
> Responsabilidade: Grupo 5 — Plataforma e Qualidade

---

## Sprint 1 — Schema inicial + Infraestrutura (27/10 – 02/11)

**Objetivo:** Banco funcionando localmente com Docker e schema versionado pelo Flyway.

### Tarefas

| # | Tarefa | RNF | Estimativa |
|---|---|---|---|
| D1.1 | Criar `docker-compose.yml` com `postgres:16`, volumes nomeados e variáveis de ambiente via `.env` | RNF-025 | 0,5 dia |
| D1.2 | Configurar Flyway no Spring Boot (`spring.flyway.*`), testar migration no H2 e no PostgreSQL | RNF-025 | 0,5 dia |
| D1.3 | Migration `V1__schema_inicial.sql` — criar todas as tabelas conforme o DER | RNF-007 | 1 dia |
| D1.4 | Migration `V2__constraints.sql` — chaves estrangeiras, unique constraints, check constraints | RNF-007, RNF-008 | 0,5 dia |
| D1.5 | Migration `V3__seed_dev.sql` — dados iniciais para desenvolvimento (admin, entidades de teste) | — | 0,5 dia |

### Schema da Migration V1 (tabelas por ordem de dependência)

```sql
-- 1. usuario
-- 2. pessoa_fisica  (FK → usuario)
-- 3. pessoa_juridica (FK → usuario)
-- 4. entidade       (FK → usuario responsável, FK → usuario admin aprovador)
-- 5. endereco       (FK → entidade)
-- 6. campanha       (FK → entidade)
-- 7. doacao         (FK → usuario doador, FK → entidade, FK → campanha nullable)
```

### Constraints obrigatórias

| Tabela | Constraint | Regra |
|---|---|---|
| `usuario` | `UNIQUE (email)` | E-mail único na plataforma |
| `pessoa_fisica` | `UNIQUE (cpf)` | CPF único |
| `pessoa_juridica` | `UNIQUE (cnpj)` | CNPJ único |
| `entidade` | `UNIQUE (cnpj)` | CNPJ único |
| `doacao` | `CHECK (campanha_id IS NOT NULL OR entidade_id IS NOT NULL)` | Toda doação tem destino |
| `doacao` | `UNIQUE (idempotency_key)` | Idempotência (RNF-008) |
| `doacao` | `UNIQUE (codigo_comprovante)` | Comprovante único |
| `campanha` | `CHECK (data_fim >= data_inicio)` | Período válido |
| `doacao` | `CHECK (valor > 0)` | Valor positivo |

**Entregáveis da Sprint 1:**
- `docker-compose up` sobe PostgreSQL 16 com schema completo
- H2 em memória sobe com o mesmo schema (para testes)
- Migrations V1–V3 aplicadas e verificadas

---

## Sprint 2 — Ajustes de Schema + Índices (03/11 – 09/11)

**Objetivo:** Otimizar consultas comuns com índices e ajustar schema conforme o backend avança.

### Tarefas

| # | Tarefa | Estimativa |
|---|---|---|
| D2.1 | Migration `V4__indices.sql` — índices nas colunas mais consultadas | 0,5 dia |
| D2.2 | Revisar schema conforme feedback do backend (Sprint 1) — ajustes em tipos, nullable, default | 0,5 dia |
| D2.3 | Testar transação de doação: inserção em `doacao` + atualização de `valor_arrecadado` em `campanha` | 0,5 dia |

### Índices recomendados (Migration V4)

```sql
-- Buscas frequentes
CREATE INDEX idx_campanha_entidade ON campanha(entidade_id);
CREATE INDEX idx_campanha_status ON campanha(status);
CREATE INDEX idx_doacao_doador ON doacao(doador_id);
CREATE INDEX idx_doacao_entidade ON doacao(entidade_id);
CREATE INDEX idx_doacao_campanha ON doacao(campanha_id);
CREATE INDEX idx_doacao_status ON doacao(status);
CREATE INDEX idx_doacao_data ON doacao(data_doacao DESC);
CREATE INDEX idx_entidade_status ON entidade(status_aprovacao);
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_usuario_tipo ON usuario(tipo);
```

---

## Sprint 3 — Ambiente de Homologação (10/11 – 16/11)

**Objetivo:** Banco de homologação separado e funcional, pronto para o QA.

### Tarefas

| # | Tarefa | RNF | Estimativa |
|---|---|---|---|
| D3.1 | Configurar banco de homologação separado do desenvolvimento (RNF-025) | RNF-025 | 0,5 dia |
| D3.2 | Testar todas as migrations em PostgreSQL limpo (sem H2) | — | 0,5 dia |
| D3.3 | Criar script de seed de homologação com dados realistas (entidades reais, campanhas de exemplo) | — | 0,5 dia |
| D3.4 | Validar integridade referencial: tentar inserir doação sem doador/entidade válidos | RNF-007 | 0,5 dia |

---

## Sprint 4 — Produção + Backup (17/11 – 23/11)

**Objetivo:** Banco de produção configurado, backup automático e deploy validado.

### Tarefas

| # | Tarefa | RNF | Estimativa |
|---|---|---|---|
| D4.1 | Configurar banco de produção separado | RNF-025 | 0,5 dia |
| D4.2 | Configurar backup automático diário (pg_dump agendado ou serviço gerenciado) | RNF-030 | 0,5 dia |
| D4.3 | Testar restauração de backup em ambiente isolado e documentar o processo | RNF-030 | 0,5 dia |
| D4.4 | Revisar que nenhuma credencial está hardcoded no `compose.yml` ou nos scripts | RNF-002 | 0,5 dia |

**Entregáveis da Sprint 4:**
- 3 ambientes com bancos separados: dev (H2/PostgreSQL local), homologação, produção
- Backup automático configurado e testado
- Zero credenciais expostas em arquivos versionados

---

## Convenções obrigatórias

- **Nunca** usar `spring.jpa.hibernate.ddl-auto=create` ou `update` fora do dev local — o schema é gerenciado exclusivamente pelo Flyway
- Versionar todas as migrations sequencialmente (`V1__`, `V2__`, ...)
- Migrations são imutáveis após o merge — nunca editar uma migration já aplicada
- Credenciais de banco sempre em variáveis de ambiente (`.env` no gitignore)
- Nomes de tabela e coluna em `snake_case`
