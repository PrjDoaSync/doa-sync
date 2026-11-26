# Handoff UI/UX e Estados de Interface (erro, vazio, loading)

> **DOC-12 — Issue #191** · Equipe de Documentação · Semestre 2026/2
> Assume a issue **#72** (TS-05-15, guia de handoff de UI/UX) e cobre os estados pedidos em [`qa/relatorio-qa-shiftleft-sprint2.md`](../qa/relatorio-qa-shiftleft-sprint2.md), seções 4.2 e 4.3.

## 1. Objetivo, escopo e fontes

Este documento entrega ao desenvolvimento do front-end Web:

1. o **mapa das telas do Figma** com link direto para cada frame e a rota correspondente no código;
2. a **correspondência entre os tokens** do Figma/Design System e as variáveis do projeto;
3. os **estados de interface** (loading, vazio, erro, sucesso, desabilitado) e **como o código atual já os trata**;
4. as **mensagens padrão por código HTTP** (401, 403, 404, 409, 422 e 500);
5. as **diferenças conhecidas** entre Figma, Design System e implementação, e as pendências.

### 1.1 Fontes

| Fonte | Uso neste documento |
|---|---|
| Código do [`doasync-frontend`](https://github.com/PrjDoaSync/doasync-frontend), branch `develop`, commit `75f14fc`, pasta `web/` | Estado real de implementação (seção 2) |
| Documentos do `doasync-frontend` (`docs/frontend-cam-doa.md`, `frontend-ges-fechamento.md`, `frontend-design-base.md`, `componentes.md`) | Nós (`node-id`) dos frames do Figma e tokens confirmados no Figma |
| [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) | Tokens, componentes e acessibilidade previstos |
| [`qa/relatorio-qa-shiftleft-sprint2.md`](../qa/relatorio-qa-shiftleft-sprint2.md) §4.2 e §4.3 | Comportamento em erros HTTP, rede e estados ausentes |
| [`backend/rotas-api.md`](../backend/rotas-api.md) | Formato dos erros da API |
| [`requisitos.md`](../requisitos.md) | RNF-010, RNF-011, RNF-012 e RNF-014 |

### 1.2 Classificação das decisões

| Etiqueta | Significado |
|---|---|
| **Implementado** | Verificado no código do `doasync-frontend` |
| **Oficial** | Definido no Design System, nos requisitos ou no relatório de QA |
| **Proposta** | Definido aqui para preencher uma lacuna. Precisa de validação do Produto/UX |
| **Pendente** | Depende de decisão ou trabalho de outra equipe |

---

## 2. Referência do front-end vigente

> **Correção em relação à versão anterior deste documento.** A versão anterior analisava a branch `dev-frontend` (Next.js, cores verde e amarelo, primeiro semestre). Ela **não** faz parte do projeto atual e foi removida da análise. A referência passa a ser o `doasync-frontend`, conforme a stack definida em [`stack.md`](../stack.md).

Verificado em `doasync-frontend`, branch `develop`, commit `75f14fc`:

| Item | Valor |
|---|---|
| Pasta | `web/` |
| Framework | React 19 + Vite 8, JavaScript/JSX (sem TypeScript) |
| Rotas | React Router 7 |
| HTTP | Axios, `timeout` de 15 s, URL base em `VITE_API_URL` (padrão `http://localhost:8080/api`) |
| Estilos | CSS próprio, com variáveis em `src/styles/tokens.css`. **Não usa Tailwind** |
| Fonte | Inter 4.1 variável, hospedada em `public/fonts` (licença OFL) |
| Ícones | SVG próprio em `components/Ui.jsx` (componente `Icon`). **Não usa Phosphor** |
| Testes | Vitest + React Testing Library |
| Dados | Modo demonstração: dados em memória (`DemoProvider`), sem chamar a API |
| Mobile | Não há app mobile neste repositório |

O [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) cita Tailwind CSS e Phosphor Icons como base. Isso **não corresponde** ao código atual (ver seção 10, item D-07).

---

## 3. Mapa de telas: Figma × rotas

### 3.1 Arquivo do Figma

| Arquivo | Link | Onde é citado |
|---|---|---|
| `3eBaQzgxDIRMbhxY0K2DWa` | [Doasync (Figma)](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=0-1&m=dev) | Repositório `doasync-frontend` (README e todos os documentos). **É o arquivo usado nos links desta seção**, porque os `node-id` abaixo foram inspecionados nele |
| `JaIKR7tTkfIJ3fSk4weadC` | [Doasync (Figma)](https://www.figma.com/design/JaIKR7tTkfIJ3fSk4weadC/Doasync?node-id=0-1&m=dev) | Documentos `frontend/frontend-web.md` e `frontend/frontend-validacao.md` deste repositório |

> ⚠️ **Dois arquivos do Figma com o mesmo nome.** Os dois endereços respondem HTTP 200, mas o conteúdo exige login no Figma e **não foi possível confirmar o acesso** aos arquivos nem se os `node-id` existem no segundo. Pendência D-01: confirmar qual é o arquivo oficial e padronizar os links.

Formato do link de um frame: `https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=<NÓ>`, trocando `:` por `-` no número do nó (por exemplo, `49:3215` vira `49-3215`).

### 3.2 Campanhas (CAM)

| Frame | Tela | Nó | Rota no código |
|---|---|---|---|
| CAM01 | Home | [49:3215](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=49-3215) | `/` |
| CAM02 | Listagem | [49:3324](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=49-3324) | `/explorar` |
| CAM03 | Detalhe | [49:3494](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=49-3494) | `/campanhas/:id` |
| CAM04 | Dados básicos | [49:3603](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=49-3603) | `/campanhas/nova` (etapa 1) |
| CAM05 | Metas e itens | [49:3729](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=49-3729) | `/campanhas/nova` (etapa 2) |
| CAM06 | Revisão e imagens | [51:2870](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=51-2870) | `/campanhas/nova` (etapa 3) |
| CAM07 | Minhas campanhas | [51:3029](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=51-3029) | `/campanhas` |
| CAM08 | Edição | [51:3186](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=51-3186) | `/campanhas/:id/editar` |
| CAM09 | Acompanhamento | [51:3364](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=51-3364) | `/campanhas/:id/acompanhamento` |
| CAM10 | Encerramento | [51:3588](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=51-3588) | `/campanhas/:id/prestacao-de-contas` |

### 3.3 Doações (DOA)

O fluxo de doação acontece dentro de uma única rota, `/doar/:id`, em etapas. A correspondência entre cada frame e a etapa é uma inferência a partir da descrição dos frames.

| Frame | Tela | Nó | Rota no código |
|---|---|---|---|
| DOA01 | Tipo de doação | [53:2143](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=53-2143) | `/doar/:id` (etapa de tipo) |
| DOA02 | Identificação | [53:2505](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=53-2505) | `/doar/:id` (etapa de identificação) |
| DOA03 | Financeira | [53:2246](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=53-2246) | `/doar/:id` (contribuição) |
| DOA04 | PIX | [53:2639](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=53-2639) | `/doar/:id` (pagamento) |
| DOA05 | Cartão e boleto | [55:2609](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=55-2609) | `/doar/:id` (pagamento) |
| DOA06 | Itens | [53:2361](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=53-2361) | `/doar/:id` (contribuição) |
| DOA07 | Agendamento | [55:2749](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=55-2749) | `/doar/:id` (agendamento) |
| DOA08 | Confirmação | [55:2891](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=55-2891) | `/doar/:id/confirmacao/:doacaoId` |
| DOA09 | Histórico | [55:3024](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=55-3024) | `/minhas-doacoes` |
| DOA10 | Detalhe da doação | [55:3207](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=55-3207) | `/minhas-doacoes/:doacaoId` |

### 3.4 Gestão e Dashboard (GES)

| Frame | Tela | Nó | Rota no código |
|---|---|---|---|
| GES01 | Login e recuperação | [65:3954](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=65-3954) | `/login` |
| GES02 | Cadastro e onboarding | [65:4035](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=65-4035) | `/cadastro-entidade` |
| GES03 | Dashboard geral | [65:4199](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=65-4199) | `/dashboard` |
| GES04 | Dashboard analítico | [65:4357](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=65-4357) | `/dashboard/campanha` |
| GES05 | Doações recebidas | [65:4559](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=65-4559) | `/doacoes` |
| GES06 | Doadores e histórico | [69:4727](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=69-4727) | `/doadores` |
| GES07 | Controle de itens | [69:4901](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=69-4901) | `/itens` |
| GES08 | Relatórios e exportação | [69:5096](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=69-5096) | `/relatorios` |
| GES09 | Usuários e permissões | [69:5282](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=69-5282) | `/configuracoes/usuarios` |
| GES10 | Perfil e configurações | [69:5500](https://www.figma.com/design/3eBaQzgxDIRMbhxY0K2DWa/Doasync?node-id=69-5500) | `/configuracoes` |

### 3.5 Frames mobile e rotas extras

- **Frames mobile (390 px):** a issue #72 pede os links dos frames Web **e Mobile**. Os documentos do `doasync-frontend` só registram frames **desktop de 1440 px**. **Nenhum frame mobile foi identificado.** Pendência D-02.
- **Rotas sem frame no Figma** (existem no código): `/entidades`, `/ajuda`, `/privacidade`, `/termos` e a rota de "página não encontrada" (`*`).
- **Frames de estados:** o `doasync-frontend` registra que **não há frames separados** para os estados vazio, erro e loading. Eles foram definidos no código. Este documento passa a ser a especificação desses estados.

---

## 4. Tokens: correspondência Figma/Design System × projeto

As variáveis do projeto ficam em `web/src/styles/tokens.css`. O Figma confirmou (inspeção de 19/11/2026, frames `49:3215` e `69:5500`) apenas: fundo `#F8FAFC`, título `#0F172A`, título de 28 px/peso 700/entrelinha 125%, botão 14 px/peso 600, padding de 40 px e espaçamento de 24 px no conteúdo administrativo. As demais cores foram mantidas pelo código e **ainda não foram conferidas** no Figma.

| Papel | Design System | Variável no projeto | Valor no projeto | Situação |
|---|---|---|---|---|
| Ação principal | `color.brand.primary` `#2563EB` | `--azul` | `#2563eb` | Igual |
| Fundo da página | `color.bg.page` `#F8FAFC` | `--fundo` | `#f8fafc` | Igual (confirmado no Figma) |
| Superfície | `color.bg.surface` `#FFFFFF` | `--branco` | `#ffffff` | Igual |
| Texto principal | `color.text.primary` `#0F172A` | `--texto` | `#0f172a` | Igual (confirmado no Figma) |
| Texto secundário | `color.text.secondary` `#475569` | `--texto-suave` | `#5b6b80` | **Difere.** O front ajustou para melhorar o contraste, sem confirmar no Figma |
| Borda | `color.border.default` `#E2E8F0` | `--borda` | `#e7ecf2` | **Difere** |
| Sucesso | fundo `#DCFCE7`, texto `#166534` | `--sucesso-bg`, `--sucesso` | `#e8f7ee`, `#15803d` | **Difere** |
| Alerta | fundo `#FEF9C3`, texto `#854D0E` | `--alerta-bg`, `--alerta` | `#fff4e0`, `#b45309` | **Difere** |
| Erro | fundo `#FEE2E2`, texto `#991B1B` | `--perigo-bg`, `--perigo` | `#fdeaea`, `#b91c1c` | **Difere** |
| Informação | fundo `#DBEAFE`, texto `#1E40AF` | sem variável | — | Sem equivalente (o código usa `--azul-claro` `#eff4ff` com `--azul`) |
| Fonte | Inter | `--fonte-interface` | Inter, com fontes do sistema como alternativa | Igual |
| Título de página | `font.h1` 32 px / 40 px | `--titulo-tamanho`, `--titulo-entrelinha` | 28 px / 1,25 | **Difere** (28 px confirmado no Figma) |
| Rótulo de botão | `font.label` 14 px, peso 500 | `--acao-tamanho` | 14 px (peso 600 no Figma) | **Difere** no peso |
| Padding do conteúdo | múltiplos de 4 px | `--conteudo-padding` | 40 px no desktop; 24 px em 768 e 1024 px; 20 px e 16 px em 320 px | Igual ao Figma |
| Espaço entre blocos | múltiplos de 4 px | `--conteudo-gap` | 24 px | Igual ao Figma |
| Raio e sombra | `radius.*`, `shadow.*` | não há variável | valores dentro das regras de cada componente | Sem token |

### 4.1 Contraste das cores do projeto (calculado)

Razão de contraste WCAG calculada a partir dos valores de `tokens.css`. Meta: 4,5:1 para texto normal (RNF-012).

| Combinação | Razão | Resultado |
|---|---|---|
| `--texto` sobre `--fundo` | 17,06:1 | Passa |
| `--texto-suave` sobre branco | 5,44:1 | Passa |
| `--texto-suave` sobre `--fundo` | 5,20:1 | Passa |
| Branco sobre `--azul` (botão principal) | 5,17:1 | Passa |
| `--azul` sobre `--azul-claro` | 4,69:1 | Passa |
| `--sucesso` sobre `--sucesso-bg` | 4,53:1 | Passa (margem pequena) |
| `--alerta` sobre `--alerta-bg` | 4,61:1 | Passa (margem pequena) |
| `--perigo` sobre `--perigo-bg` | 5,59:1 | Passa |
| `color.text.muted` do Design System (`#94A3B8`) sobre branco | 2,56:1 | **Falha.** Não usar em texto, nem em placeholder |

---

## 5. Estados de interface: padrões e componentes

Os componentes de estado **já existem** no `doasync-frontend`. Esta seção descreve o que eles fazem hoje e o que falta, para que as telas novas os reutilizem em vez de criar soluções próprias.

### 5.1 Componentes e hooks existentes (Implementado)

| Estado | Componente ou hook | Comportamento verificado |
|---|---|---|
| Loading | `Loading` | Texto "Carregando..." (ou outro, por `message`) com `role="status"` e `aria-live="polite"` |
| Erro de carga | `ErrorMessage` | Mensagem com `role="alert"` e botão "Tentar novamente" (quando recebe `onRetry`) |
| Erro ou aviso em formulário | `Aviso` (`erro`) | `role="alert"` quando é erro e `role="status"` quando é informação; ícone `!` ou `ⓘ` |
| Vazio de página ou bloco | `Vazio` | Ícone, título (`h1` se `principal`, senão `h2`) e texto de apoio. Título padrão "Nenhum resultado encontrado" |
| Vazio de tabela | `DataTable` (`vazio`) | Parágrafo com `role="status"`. Texto padrão "Nenhum registro encontrado." |
| Orquestração de carga | `RequestState` + `useRequest` | Mostra loading, erro, vazio ou o conteúdo. Se um "tentar novamente" falha mas há dados, **mantém o conteúdo** e mostra o erro acima |
| Sucesso de ação | `Toast` | `role="status"` com botão "Dispensar aviso". **Não fecha sozinho** |
| Confirmação e detalhe | `Modal` | Diálogo nativo `<dialog>`, fecha com `Escape` |
| Situação (status) | `StatusBadge` | Tons `sucesso`, `alerta`, `perigo` e `neutro` por texto do status |
| Ação em andamento | `useAsyncAction` | Expõe `pending`, `success`, `error`; **ignora cliques duplicados** com uma trava interna |
| Progresso | `Progresso` | `role="progressbar"` com `aria-valuenow`, `aria-valuemin` e `aria-valuemax` |
| Erro de rede | `normalizeError` (`services/api.js`) | Converte o erro do Axios em `{ status, message, data, cancelled }`. Mensagens fixas: "Não foi possível conectar ao servidor." e "Tempo de resposta esgotado." |

### 5.2 Lacunas verificadas no código

| # | Lacuna | Referência |
|---|---|---|
| 1 | **Não há skeleton nem spinner.** O loading é só texto. O CSS não define animação de carga | QA §4.3 pede skeleton de cards e botão com spinner |
| 2 | **`useAsyncAction` não é usado por nenhuma página.** Hoje só `Campanhas`, `Doacoes` e `Entidades` usam `RequestState` | QA §4.3 exige bloquear duplo clique em todo envio (RNF-008) |
| 3 | **`Toast` não fecha sozinho**, enquanto o Design System define 4 segundos | DS §7.8 |
| 4 | **Não há tratamento por código HTTP.** `normalizeError` só repassa `status` e `message`. Não existe redirecionamento em 401 nem tela de acesso negado em 403 | QA §4.2 (seção 6 abaixo) |
| 5 | **O formato de erro não bate com o contrato.** `normalizeError` lê `data.message`, mas a API devolve `{ "error": "..." }` e `{ "erros": { "campo": "..." } }`. Resultado: o texto de um 401 ou 409 não aparece (a tela mostra "Erro 401 ao processar a requisição.") e os erros por campo do 422 se perdem | `rotas-api.md` |
| 6 | **Não há aviso de perda de conexão** nem salvamento local dos formulários | QA §4.2 |
| 7 | **As telas rodam com dados de demonstração.** Por isso, loading e erro de rede praticamente não aparecem hoje. Eles passam a valer quando as telas forem ligadas à API | `web/README.md` do front |

### 5.3 Comportamento padrão por estado

| Estado | Regra | Tipo |
|---|---|---|
| Botão enviando | Trocar o texto pelo verbo no gerúndio com reticências (ex.: "Publicando...") e **desabilitar o botão** para impedir envio duplicado | Oficial (QA §4.3) |
| Lista carregando | Skeleton com o mesmo formato do conteúdo final (mesma altura de card), sem salto de layout | Oficial (QA §4.3), não implementado |
| Carga muito rápida | Só mostrar o skeleton se a resposta passar de 300 ms | Proposta |
| Carga demorada | Após 10 s, manter o indicador e mostrar "Isso está demorando mais que o normal..." com "Tentar novamente" | Proposta |
| Vazio absoluto | Explicar o que fazer e, se houver, uma ação ("Você ainda não fez nenhuma doação" + "Explore as campanhas...") | Implementado em parte |
| Vazio por filtro | "Nenhum resultado" com opção de limpar filtros. Diferente do vazio absoluto | Proposta |
| Erro de campo (422) | Borda vermelha no campo e texto explicativo abaixo (`font.caption`), com `aria-invalid` e `aria-describedby` | Oficial (QA §4.2) |
| Erro de página ou lista | `ErrorMessage` com "Tentar novamente", mantendo o cabeçalho da página | Implementado |
| Sucesso de ação simples | `Toast`. Sucesso que encerra um fluxo (doação) usa tela própria | Implementado |
| Botão desabilitado | Opacidade 50% e `cursor-not-allowed`. Informar o **motivo** em texto, pois o botão desabilitado não recebe foco | Oficial (DS §7.1) |
| Foco | Nunca remover o contorno de foco. O CSS já define `:focus-visible` | Implementado |
| Cor | Nunca usar só cor: sempre ícone ou texto junto (DS §9) | Oficial |

---

## 6. Mensagens padrão por código HTTP

Critério da issue: mensagem padrão para 401, 403, 404, 409, 422 e 500. A coluna **Fonte** indica de onde vem o comportamento. O comportamento de 401, 403, 409, 422 e 500 é o definido pelo QA (§4.2). O 404 não está no relatório de QA e segue o padrão que o código já usa.

| Código | Quando acontece | Comportamento na interface | Mensagem padrão | Fonte | Implementado hoje? |
|---|---|---|---|---|---|
| **401** | Token ausente, inválido ou expirado; usuário inativo | Redirecionar **imediatamente** para o login, com aviso informativo. Depois do login, voltar à tela de origem | "Sua sessão expirou. Faça login novamente." | QA §4.2 | Não |
| **403** | Perfil sem permissão para o recurso | Tela de erro de permissão, **sem deslogar** o usuário, com botão para voltar ao início | "Você não tem permissão para acessar esta página." | Comportamento: QA §4.2. Texto: proposta | Não |
| **404** | Recurso inexistente ou não visível ao usuário | `Vazio` principal com título do recurso e link de retorno | "Página não encontrada" (rota inexistente). "Campanha não encontrada" ou "Doação não encontrada" (registro), com o texto "Verifique o endereço ou volte para a lista de campanhas." | Padrão já usado no código | **Sim**, para rota inexistente e para campanha ou doação não encontrada |
| **409** | Duplicidade ou estado inválido (ex.: campanha já encerrada, CNPJ já cadastrado) | Banner de aviso **contextual** (`Aviso` de erro) no formulário ou na tela, e erro no campo quando o conflito é de um campo | "Esta campanha já foi encerrada e não aceita novas doações." / "CNPJ já cadastrado." | QA §4.2 | Não |
| **422** | Validação de campos | **Borda vermelha** no campo e texto explicativo abaixo. Mover o foco para o primeiro campo com erro | Mensagem do campo vinda da API (`erros.campo`) | QA §4.2 | Não (as telas validam no front, sem usar `erros`) |
| **500** | Falha inesperada no servidor | **Modal centralizado** com a mensagem. **Nunca** exibir stack trace ou texto técnico (RNF-011) | "Desculpe, ocorreu uma instabilidade em nossos servidores. Nossa equipe já foi notificada." | QA §4.2 | Não |
| **Sem resposta** | Servidor fora do ar ou sem rede | `ErrorMessage` com "Tentar novamente" | "Não foi possível conectar ao servidor." | `normalizeError` | **Sim** (texto) |
| **Timeout** | Passou de 15 s | `ErrorMessage` com "Tentar novamente" | "Tempo de resposta esgotado." | `normalizeError` | **Sim** (texto) |
| **Timeout do PIX** | Gateway demora mais de 10 s para gerar o QR Code | Não travar a tela. Mostrar o aviso com "Tentar novamente" | "Instabilidade no serviço de pagamentos." | QA §4.2 | Não (PIX é simulado) |
| **Offline** | Conexão cai durante wizard ou checkout | Barra no topo e salvamento local do que foi preenchido | "Você está offline. Suas alterações foram salvas localmente." | QA §4.2 | Não |

> ⚠️ **Atenção ao texto do 500.** A frase "Nossa equipe já foi notificada" só deve ser exibida **se existir uma notificação real** (log ou alerta de erros, RNF-029). Caso contrário, use apenas a primeira frase.

### 6.1 Formato do erro que a interface deve ler

Contrato documentado em [`rotas-api.md`](../backend/rotas-api.md):

| Situação | Corpo da resposta |
|---|---|
| 400, 401, 403, 404, 500 e alguns 409 | `{ "error": "mensagem" }` |
| 422 e alguns 409 | `{ "erros": { "campo": "mensagem" } }` |

Para a tabela acima funcionar, `normalizeError` precisa ler `data.error` e `data.erros`, além de `data.message`. Isso é a pendência D-03.

---

## 7. Estados por tela

### 7.1 O que o código já trata (Implementado)

Mensagens de vazio e de "não encontrado" verificadas no `doasync-frontend`. Use estes textos como padrão e não crie variações.

| Rota | Situação | Texto no código |
|---|---|---|
| `*` (rota inexistente) | Página não encontrada | "Página não encontrada" + link "Voltar ao início" |
| `/` e `/explorar` (listagens públicas) | Sem resultado | "Nenhum resultado encontrado" / "Experimente alterar os filtros para encontrar o que procura." |
| `/campanhas/:id` | Campanha inexistente | "Campanha não encontrada" |
| `/campanhas/:id` (aba de atualizações) | Sem atualizações | "Nenhuma atualização publicada" |
| `/campanhas` | Sem campanhas | "Nenhuma campanha encontrada." (com loading e erro por `RequestState`) |
| `/campanhas/:id/editar`, `/acompanhamento`, `/prestacao-de-contas` | Campanha inexistente | "Campanha não encontrada" / "Verifique o endereço ou volte para a lista de campanhas." |
| `/campanhas/:id/acompanhamento` | Sem doações confirmadas | "Nenhuma doação confirmada ainda." |
| `/campanhas/:id/prestacao-de-contas` | Sem despesas | "Nenhuma despesa registrada ainda." |
| `/doar/:id` | Campanha sem condição de receber doação | "Campanha indisponível para doação" |
| `/doar/:id/confirmacao/:doacaoId` e `/minhas-doacoes/:doacaoId` | Doação inexistente | "Doação não encontrada" / "Verifique o endereço ou volte para suas doações." |
| `/minhas-doacoes` | Doador sem doações | "Você ainda não fez nenhuma doação" / "Explore as campanhas e apoie uma causa." |
| `/minhas-doacoes` | Filtro sem resultado | "Nenhuma doação encontrada com esses filtros." |
| `/dashboard/campanha` | Campanha inexistente | "Campanha não encontrada" |
| `/doacoes` | Sem doações (com loading e erro por `RequestState`) | "Nenhuma doação encontrada." |
| `/doadores` | Sem doadores | Texto padrão do componente `Vazio` |
| `/relatorios` | Filtro sem resultado | "Nenhum registro para os filtros selecionados." |
| `/entidades` | Sem entidades (com loading e erro por `RequestState`) | "Nenhuma entidade encontrada." |

Também implementado, segundo o registro de fechamento do front: falha de leitura ou decodificação de imagem (mostra erro e preserva os dados anteriores; JPG, PNG ou WebP, até 2 MB por arquivo e 3 fotos de galeria); doação **pendente** nunca é mostrada como dinheiro recebido; diálogos nomeados; região de tabela focável por teclado e com nome.

### 7.2 O que precisa ser implementado (Proposta)

Tudo abaixo é **Proposta**, pendente de validação do Produto/UX. Os textos de erro de HTTP estão na seção 6.

| Grupo | Telas | Especificação |
|---|---|---|
| Listagens públicas e de gestão | CAM01, CAM02, CAM07, GES05, GES06, GES08 | **Loading:** skeleton de 3 cards ou 5 linhas, com a mesma altura do conteúdo final. **Erro:** `ErrorMessage` no lugar da lista, mantendo cabeçalho e filtros. **Vazio por filtro:** além do texto atual, botão "Limpar filtros". **Paginação:** em "carregar mais", spinner no rodapé e, se falhar, "Não foi possível carregar mais" com "Tentar novamente", sem perder os itens já mostrados (RNF-028) |
| Detalhe de campanha | CAM03 | Campanha **encerrada** ou **desativada**: botão de doar desabilitado, com o motivo em texto ("Esta campanha foi encerrada e não aceita novas doações.", RF-013). Visitante sem login que clica em doar vai ao login e volta à campanha (RF-020) |
| Criação e edição de campanha | CAM04, CAM05, CAM06, CAM08 | Botão "Publicando..." desabilitado durante o envio. Erros de campo conforme 6 (422). Ao sair com dados preenchidos, modal "Descartar alterações?" com "Continuar editando" e "Descartar". Limites sugeridos pelo QA §4.1: título de 10 a 80 caracteres, descrição de 50 a 2.000 |
| Acompanhamento e encerramento | CAM09, CAM10 | Falha em um indicador não derruba a tela: mostrar "—" no card, com "Tentar novamente". Encerrar campanha exige modal de confirmação (ação sem volta) |
| Fluxo de doação | DOA01 a DOA07 | "Continuar" desabilitado até haver dado válido, com o motivo em texto. **Bloquear duplo clique** no envio (RNF-008): usar `useAsyncAction`. Valor: vazio, zero ou negativo viram erro de campo. Itens: rejeitar negativos e decimais, com máximo de 999 por transação (QA §4.1). PIX: timeout de 10 s com "Instabilidade no serviço de pagamentos." e "Tentar novamente". Enquanto o pagamento for simulado (PV01), manter o aviso de demonstração |
| Confirmação | DOA08 | Tela dedicada, com foco movido para o título. Doação **pendente** não usa texto de sucesso (RF-022). Recarregar a página não duplica a doação: a tela é carregada pelo id |
| Histórico e detalhe | DOA09, DOA10 | Skeleton de 5 linhas. Erro com "Tentar novamente". Em telas estreitas, tabela vira lista de cards |
| Login e cadastro | GES01, GES02 | Login: 401 com "E-mail ou senha inválidos." **sem indicar qual campo está errado** (RF-002). Recuperação de senha: resposta neutra ("Se este e-mail estiver cadastrado, enviaremos um link de recuperação."), sem revelar quais e-mails existem. Depende de PV05. Cadastro de entidade: ao concluir, mostrar que a entidade está **em análise** (nasce `PENDENTE`) |
| Dashboards | GES03, GES04 | **Zero é dado válido:** mostrar "0" e "R$ 0,00", sem tratar como vazio. Erro por indicador. Skeleton por card |
| Controle de itens e relatórios | GES07, GES08 | Exportação: botão em loading e erro explícito. Enquanto não houver gerador de arquivo, manter o aviso de que a exportação não gera arquivo |
| Usuários e perfil | GES09, GES10 | Mudança de papel e desativação exigem modal. O administrador não pode desativar a si mesmo, com o motivo em texto. "Salvar" em loading e "Descartar" disponível |

---

## 8. Responsividade e acessibilidade

### 8.1 Breakpoints

| Fonte | Valor |
|---|---|
| Frames do Figma | Desktop de **1440 px**. Não há frame mobile (390 px) identificado (D-02) |
| Design System | Mobile até 767 px, tablet de 768 a 1023 px, desktop a partir de 1024 px |
| CSS do front (`@media (max-width)`) | 540, 760, 800, 900, 1000, 1024, 1100 e 1280 px |
| Padding do conteúdo administrativo | 40 px no desktop; 24 px em 768 e 1024 px; 20 px e 16 px em 320 px |
| Título de página | 28 px no desktop; 22 px em 320 px |

> **Estado da validação.** O front registra que a validação visual **mobile não foi aprovada** (a inspeção real cobriu 1280 px) e que a matriz em 320, 768, 1024 e 1440 px continua pendente. As regras responsivas existem no CSS, mas não foram conferidas em tela pequena. Pendência D-09.

| Elemento de estado | Mobile | Desktop |
|---|---|---|
| Skeleton de cards | 1 coluna | 3 colunas |
| Toast | Parte inferior, com margens | Canto da tela |
| Tabelas | Rolam **dentro** da região, com acesso por teclado, ou viram cards | Tabela |
| Botão principal | Área de toque mínima de 44 × 44 px | Altura padrão |
| Bloco de erro ou vazio | Padding de 24 px, botão com largura total | Centralizado |

### 8.2 Acessibilidade dos estados (RNF-012)

| Item | Situação | Regra |
|---|---|---|
| Link "Pular para o conteúdo" e `main#conteudo` | Implementado | Manter em todos os layouts |
| Foco visível (`:focus-visible`) | Implementado | Nunca remover sem substituto |
| Rótulo de campo | Implementado: o `Campo` envolve controle e `label`, e liga a ajuda por `aria-describedby` | Placeholder não substitui rótulo |
| Loading, erro e sucesso anunciados | Implementado: `role="status"` e `role="alert"` | Manter |
| Diálogo com `Escape` | Implementado (`<dialog>` nativo) | Manter |
| Barra de progresso | Implementado (`role="progressbar"`) | Mostrar também o valor em texto |
| Status só por cor | Implementado: `StatusBadge` e `Aviso` trazem texto ou ícone | Nunca usar só cor |
| Movimento reduzido | Existe regra para `prefers-reduced-motion` | Aplicar também ao skeleton e ao spinner quando existirem |
| Erro de campo | Proposta | `aria-invalid="true"` e `aria-describedby` apontando para a mensagem. Foco no primeiro campo inválido |
| Foco após sucesso de fluxo | Proposta | Mover o foco para o título da tela de confirmação |
| Toast de erro | Proposta | `role="alert"`, com botão de fechar e **sem fechamento automático** (o texto pode não ser lido a tempo) |
| Botão desabilitado | Proposta | Mostrar o motivo em texto próximo, pois ele não recebe foco |
| Fluxo de doação por teclado | A validar | Deve ser concluível só com teclado (RNF-012) |

---

## 9. Catálogo de mensagens

Tom: direto, acolhedor, sem jargão técnico e sem culpar o usuário (RNF-011). Frases curtas.

| Situação | Texto | Origem |
|---|---|---|
| Carregando | "Carregando..." | Implementado |
| Tentar de novo | "Tentar novamente" | Implementado |
| Erro genérico | "Ocorreu um erro inesperado." | Implementado |
| Sem conexão com o servidor | "Não foi possível conectar ao servidor." | Implementado |
| Tempo esgotado | "Tempo de resposta esgotado." | Implementado |
| Rota inexistente | "Página não encontrada" | Implementado |
| Voltar | "Voltar ao início" | Implementado |
| Fechar aviso | "Dispensar aviso" | Implementado |
| Sessão expirada | "Sua sessão expirou. Faça login novamente." | QA §4.2 |
| Sem permissão | "Você não tem permissão para acessar esta página." | Proposta |
| Offline | "Você está offline. Suas alterações foram salvas localmente." | QA §4.2 |
| Falha no servidor | "Desculpe, ocorreu uma instabilidade em nossos servidores. Nossa equipe já foi notificada." | QA §4.2 |
| Campanha encerrada | "Esta campanha foi encerrada e não aceita novas doações." | QA §4.2 |
| Duplicidade | "CNPJ já cadastrado." | QA §4.2 |
| Pagamento instável | "Instabilidade no serviço de pagamentos." | QA §4.2 |
| Campo obrigatório | "Informe <nome do campo>" | Proposta |
| Salvo com sucesso | "Alterações salvas" | Proposta |
| Ação irreversível | "Esta ação não pode ser desfeita." | Proposta |

---

## 10. Diferenças conhecidas e pendências

| ID | Pendência | Responsável sugerido | Bloqueia |
|---|---|---|---|
| D-01 | Confirmar o **arquivo oficial do Figma** (`3eBaQzgx…` ou `JaIKR7tT…`), confirmar que os links abrem e padronizar os documentos | Produto/UX | Seção 3 |
| D-02 | Identificar ou criar os **frames mobile** (390 px) e registrar os links | Produto/UX | Critério da issue #72 |
| D-03 | Ajustar `normalizeError` (ou o contrato) para o front ler `error` e `erros`, e não só `message` | Front-end e Back-end | Seção 6 |
| D-04 | Tratar **401** (redirecionar ao login) e **403** (tela de acesso negado) de forma central | Front-end | Seção 6 |
| D-05 | `Toast` não fecha sozinho, e o Design System define 4 s. Decidir qual vale | UX | DS §7.8 |
| D-06 | Implementar **skeleton**, spinner em botão, aviso offline e usar `useAsyncAction` nos envios | Front-end | Seção 5.2 |
| D-07 | Decidir a **fonte de verdade dos tokens**. O Design System cita Tailwind e Phosphor, mas o código usa CSS próprio e ícones SVG. As cores de feedback, o texto secundário, a borda, o título (28 × 32 px) e o peso do botão (600 × 500) diferem | Produto/UX e Front-end | Seção 4 |
| D-08 | `color.text.muted` (`#94A3B8`) tem contraste de 2,56:1 e não pode ser usado em texto | UX | RNF-012 |
| D-09 | Fazer a validação visual em 320, 768, 1024 e 1440 px e registrar em [`frontend-validacao.md`](./frontend-validacao.md), que ainda está todo como "Pendente" | QA e Front-end | Seção 8 |
| D-10 | Decisões **PV01** (pagamento real) e **PV05** (e-mail de recuperação) | Gestão | Telas DOA04, DOA05, GES01 |
| D-11 | **Repasse técnico** aos desenvolvedores e **aceite da liderança técnica** (critérios da issue #72). Não foram realizados | Documentação e liderança | Encerramento da #72 |
| D-12 | O texto "Nossa equipe já foi notificada" depende de existir monitoramento de erros | Back-end | Mensagem do 500 |

---

## 11. Atendimento aos critérios da issue

| Critério (issue #191) | Onde | Situação |
|---|---|---|
| `DESIGN-SYSTEM.md` com tokens, componentes e estados | Tokens e componentes já existiam. Os **estados** estão na nova seção 7.9 do [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md). A correspondência com o projeto está na seção 4 deste documento | Atendido |
| Mensagens padrão por código HTTP (401, 403, 404, 409, 422, 500) | Seção 6 | Atendido. Falta implementar no front (D-03, D-04) |
| Links para as telas no Figma | Seção 3: 30 frames desktop | Parcial. Frames mobile e arquivo oficial pendentes (D-01, D-02). Os endereços respondem HTTP 200, mas o acesso ao conteúdo exige login e **não foi verificado** |
| Objetivo: cobrir os estados pedidos no relatório de QA §4.2 e §4.3 | Seções 5, 6, 7 e 8 | Atendido |

---

## 12. Checklist de handoff por tela

Marcar na entrega de cada tela pelo front-end e na revisão do QA.

- [ ] Estado de **loading** implementado (skeleton ou spinner de botão), sem salto de layout
- [ ] Estado **vazio** implementado, com diferença entre vazio absoluto e vazio por filtro
- [ ] Estado de **erro** implementado para campo, formulário e carga
- [ ] Erros HTTP 401, 403, 404, 409, 422 e 500 tratados conforme a seção 6
- [ ] Botões de envio com `disabled` e indicador de carga, sem envio duplicado
- [ ] Nenhum `alert()` do navegador e nenhuma mensagem técnica exibida (RNF-011)
- [ ] Campos com rótulo, `aria-invalid` e `aria-describedby` quando em erro
- [ ] Foco visível e fluxo completo por teclado
- [ ] Contraste mínimo de 4,5:1 em texto e 3:1 em texto grande
- [ ] Layout validado em 320, 768, 1024 e 1440 px
- [ ] Textos conferidos com a seção 9
- [ ] Link do frame do Figma conferido com a tela implementada
- [ ] Evidência (captura de tela ou PR) registrada em [`frontend-validacao.md`](./frontend-validacao.md)

---

## 13. Manutenção

Atualize este documento quando: uma tela for ligada à API (rever a seção 7.1), `tokens.css` mudar, o Design System definir os estados hoje marcados como proposta, o formato de erro da API mudar (D-03), ou os frames do Figma forem atualizados ou reorganizados. Não registre como implementado o que não foi verificado no código do `doasync-frontend`.
