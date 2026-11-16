# Guia de Contribuição — DoaSync

Este guia vale para os 4 repositórios da organização: `doa-sync`, `doasync-backend`, `doasync-frontend` e `quality`. As exceções estão indicadas na seção 8.

## 1. Fluxo de branches

```
feature/* ──► develop ──► main
```

| Branch | Uso | Quem altera |
|---|---|---|
| `main` | Entregas integradas e validadas | Somente por PR vindo de `develop` |
| `develop` | Integração do trabalho em andamento. O código das aplicações vive aqui | Somente por PR vindo de uma branch de trabalho |
| `feature/*`, `fix/*`, `docs/*` | Trabalho individual | Quem abriu a branch |

Regras:

- Nunca faça commit direto em `main` ou `develop` (RNF-019).
- Abra a branch de trabalho a partir da `develop` mais recente.
- Uma branch resolve uma issue. Branches longas e com assuntos misturados dificultam a revisão.
- Apague a branch depois do merge.

## 2. Nome de branch

Formato: `<tipo>/<id-da-issue>-<descricao-curta>`, em minúsculas e com hífen.

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feature/` | Funcionalidade nova | `feature/cam-t08-ciclo-vida-api` |
| `fix/` | Correção de defeito | `fix/campanhas-visual` |
| `docs/` | Somente documentação | `docs/180-indice-documentacao` |
| `feat/` | Tarefa de definição ou planejamento | `feat/147-stack-definition` |

Em issues de módulo, use o código da task (por exemplo `cam-t08`). Nas demais, use o número da issue.

## 3. Mensagem de commit

Formato: `tipo: descrição no imperativo, em português #issue`

| Tipo | Uso |
|---|---|
| `feat` | Funcionalidade nova |
| `fix` | Correção |
| `docs` | Documentação |
| `test` | Testes |
| `refactor` | Mudança interna sem alterar comportamento |
| `chore` | Build, dependências, configuração |
| `ci` | Pipeline |

Exemplos:

```
docs: índice central da documentação e correção de links #180
feat: persistência de campanhas com migração Flyway #CAM-T07
fix: validar CNPJ duplicado no cadastro de entidade #141
```

- Primeira linha com até 72 caracteres.
- Um commit por mudança lógica.
- Nunca inclua senhas, tokens ou dados pessoais reais.

## 4. Issues

Toda tarefa começa por uma issue. Use o modelo abaixo (o formato das tasks `CAM-Txx` é a referência).

```markdown
**[CÓDIGO-NN] Título curto e objetivo**

- Objetivo: o que deve existir ao final e por quê.
- Fontes: issues, documentos ou regras (RFxx, RNxx) que embasam a tarefa.
- Critérios de aceite:
  - [ ] Critério verificável 1
  - [ ] Critério verificável 2
- Dependências: issues que precisam ser concluídas antes.
```

Cada issue deve ter responsável, label de prioridade (Alta, Média ou Baixa), label de tamanho (P, M ou G) e label da sprint.

## 5. Pull Requests

1. Atualize sua branch com a `develop` e resolva conflitos localmente.
2. Rode build e testes localmente (veja a seção 7).
3. Abra o PR para `develop` (ou de `develop` para `main`, na entrega).
4. Título no mesmo padrão do commit. Descrição com o que mudou, por quê e como testar.
5. Referencie a issue com `Closes #NN`.
6. Peça revisão a pelo menos 1 membro que não seja o autor.
7. O merge só acontece com pipeline verde e aprovação (RNF-019, RNF-024).

### Checklist do PR

Copie para a descrição do PR:

```markdown
- [ ] A issue está referenciada (`Closes #NN`)
- [ ] Build passa localmente
- [ ] Testes automatizados passam
- [ ] Novos comportamentos têm testes ou justificativa
- [ ] Documentação atualizada (endpoint, componente, regra de negócio ou README afetado)
- [ ] Se o documento tem cópia em `doa-sync/docs`, a cópia foi atualizada
- [ ] Sem segredos, tokens ou dados pessoais reais no código e nos logs
- [ ] Revisão solicitada a pelo menos 1 membro
```

## 6. Critério de pronto

Conforme [`docs/sprints/README.md`](./docs/sprints/README.md), uma entrega só está concluída quando:

1. O build passa (`./mvnw package` no backend, `npm run build` no frontend).
2. Os testes automatizados estão verdes no pipeline.
3. O PR foi revisado e aprovado por ao menos 1 membro.
4. A documentação do endpoint ou componente foi atualizada.

## 7. Rodar build e testes

| Repositório | Comando |
|---|---|
| `doasync-backend` | `./mvnw package` e `./mvnw test` |
| `doasync-frontend` | em `web/`: `npm install`, `npm run lint`, `npm run build` e `npm test` |
| `quality` | o `README.md` do repositório ainda está vazio. Documente aqui o comando ao preenchê-lo |
| `doa-sync` | sem build. Confira links e a renderização do Markdown |

## 8. Exceções por repositório

| Repositório | Exceção |
|---|---|
| `doa-sync` | Não há testes automatizados. O critério de pronto vale para a documentação: revisão e links válidos. A `main` é a branch de documentação e recebe PRs das branches `docs/*` e demais de trabalho |
| `quality` | O repositório contém os testes. O "teste verde" do critério de pronto significa a suíte nova passando e sem quebrar as existentes |

## 9. Documentação

- Cada assunto tem um documento canônico em [`docs/`](./docs/README.md). Não duplique regras de negócio em outros arquivos: referencie o `RNxx`.
- Quando um documento mudar no repositório de origem, atualize a cópia em `doa-sync/docs` no mesmo PR ou logo em seguida.
- Mudou a API? Atualize [`docs/backend/rotas-api.md`](./docs/backend/rotas-api.md) e o Swagger.
- Mudou o modelo de dados? Atualize o [`DER.png`](./docs/DER.png), [`entidades-envolvidas.md`](./docs/entidades-envolvidas.md) e a tabela do [`README.md`](./README.md).
