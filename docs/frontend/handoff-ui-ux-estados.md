# Handoff UI/UX e Estados de Interface (erro, vazio, loading)

> **DOC-12 — Issue #191** · Equipe de Documentação · Semestre 2026/2

## 1. Objetivo e como usar

Este documento entrega ao desenvolvimento front-end a especificação dos **estados de interface** de cada tela do DoaSync: carregando (loading), vazio, erro, sucesso e desabilitado. Ele complementa os wireframes, que mostram só o estado "com dados", e o Design System, que define componentes mas não define esses estados por tela.

### 1.1 Fontes

| Fonte | Uso neste documento |
|---|---|
| [`wireframes.md`](../wireframes.md) | Lista de telas e seus elementos |
| [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) | Tokens, componentes, feedback e acessibilidade |
| [`requisitos.md`](../requisitos.md) | RNF-010, RNF-011, RNF-012 e RNF-014 (usabilidade, mensagens, acessibilidade, responsivo) |
| [`regras-negocio.md`](../regras-negocio.md) e [`backend/rotas-api.md`](../backend/rotas-api.md) | Códigos de erro e contrato da API |
| Código da branch `dev-frontend` (pasta `client/`, commit `b19016c`) | Estado real de implementação |

### 1.2 Classificação das decisões

Segue a convenção do Design System:

- **PADRÃO OFICIAL:** já definido no Design System ou nos requisitos.
- **PROPOSTA:** definido neste documento para preencher uma lacuna. **Pendente de validação** pelo Produto/UX antes de virar padrão.

> O Design System só define explicitamente o estado *loading* de botão (spinner) e os toasts (fecham após 4 s). Todo o restante dos estados deste documento é **PROPOSTA**.

---

## 2. Estado atual da implementação (verificado no código)

Análise da branch `dev-frontend`. Importa para o handoff porque várias regras abaixo ainda não existem no código.

| # | Constatação | Evidência |
|---|---|---|
| 1 | **Nenhum estado de loading, vazio ou erro está implementado.** Não há skeleton, spinner, mensagem de erro ou tela de lista vazia. | Ausência nos arquivos de `client/app` e `client/components` |
| 2 | Feedback é feito com `alert()` do navegador ("Bem vindo ao sistema", "Cadastro feito com sucesso !", "Email enviado para recuperação de senha !"). | `sign-in`, `sign-up` e `recover-password` |
| 3 | Os formulários **não enviam dados nem validam**: o componente `Input` não recebe `value`, `onChange`, `name` nem mensagem de erro. | `components/Input.tsx` |
| 4 | O componente `Button` próprio não tem estado `disabled` nem `loading`. O `ui/button.tsx` (shadcn) tem `disabled`, mas só ele. | `components/Button.tsx`, `components/ui/button.tsx` |
| 5 | Campos sem `<label>`: o rótulo é só o placeholder, que some ao digitar. | `components/Input.tsx` |
| 6 | Cada `Input` e `Button` é renderizado **duas vezes** (um para desktop, outro para mobile) com `hidden`/`block`, duplicando elementos no DOM. Leitores de tela podem anunciar o campo duas vezes. | `components/Input.tsx`, `components/Button.tsx` |
| 7 | Links "Esqueceu sua senha?", "Cadastre-se" e "Faça login" são `<p>`/`<span>` com `cursor-pointer`, sem navegação nem foco por teclado. | `sign-in`, `sign-up` |
| 8 | `/home` e `/dashboard` são só um `<h1>`. Não há campanhas, doações nem indicadores ainda. | `app/(private)` |
| 9 | O front **não chama a API**; logo não existe tratamento de erro HTTP. | busca por `fetch`/`axios`/`process.env` sem resultados |

### 2.1 Divergência de identidade visual (decisão pendente)

| Aspecto | Design System (docs) | Código implementado |
|---|---|---|
| Cor principal | Azul `#2563EB` | Verde `#2E7D32` com destaque amarelo `#FFD600` |
| Fonte | Inter | Poppins (variável `--font-poppins`, em `globals.css`) |
| Ícones | Phosphor Icons | `lucide-react` |
| Base de componentes | Tokens próprios do DS | shadcn/ui (tokens neutros padrão) |

**Impacto no handoff:** as especificações de estado usam cores **por papel** (`feedback.error`, `feedback.success` etc.), que independem da paleta da marca. Quando a paleta oficial for decidida, só os tokens `brand.*` mudam.

### 2.2 Contraste das cores implementadas (calculado)

Razão de contraste WCAG calculada a partir dos HEX do código. Meta: 4,5:1 para texto normal e 3:1 para texto grande (RNF-012).

| Combinação | Uso no código | Razão | Resultado |
|---|---|---|---|
| Verde `#2E7D32` sobre amarelo `#FFD600` | Texto do botão (32 px, negrito) | 3,63:1 | Passa (texto grande) |
| Amarelo `#FFD600` sobre verde `#2E7D32` | "Clique aqui", "Faça login" (14 a 16 px) | 3,63:1 | **Falha** (texto pequeno exige 4,5:1) |
| Branco sobre verde `#2E7D32` | Títulos e textos na área verde | 5,13:1 | Passa |
| Verde `#2E7D32` sobre branco | Placeholder dos inputs | 5,13:1 | Passa |
| `#94A3B8` sobre branco | Token `color.text.muted` do DS (placeholders) | 2,56:1 | **Falha**, o próprio DS precisa de ajuste |

Cores de feedback do Design System, também calculadas: erro `#991B1B` sobre `#FEE2E2` = 6,80:1; sucesso `#166534` sobre `#DCFCE7` = 6,49:1; alerta `#854D0E` sobre `#FEF9C3` = 6,38:1; informação `#1E40AF` sobre `#DBEAFE` = 7,15:1. Todas passam.

---

## 3. Padrões globais de estado

Valem para todas as telas, salvo exceção indicada na seção 4.

### 3.1 Loading (carregando)

| Situação | Tratamento | Tipo |
|---|---|---|
| Ação em botão (enviar formulário, doar) | Substituir o ícone/texto à esquerda por spinner, **desabilitar o botão**, manter o rótulo (ex.: "Entrando...") e a largura. Impedir duplo envio. | Oficial (DS 7.1) |
| Carga inicial de lista ou cards | **Skeleton** com o mesmo formato do conteúdo final (mesma altura de card e quantidade: 3 cards ou 5 linhas de tabela). Evita salto de layout. | Proposta |
| Carga de página inteira (rota privada) | Skeleton do layout (cabeçalho + área de conteúdo), sem spinner de tela cheia. | Proposta |
| Carga muito rápida | Só mostrar skeleton se a resposta passar de **300 ms**, para evitar piscar. | Proposta |
| Carga demorada | Após **10 s**, manter o skeleton e exibir texto "Isso está demorando mais que o normal..." com botão "Tentar novamente". | Proposta |

Acessibilidade: o contêiner em carga recebe `aria-busy="true"`; o skeleton recebe `aria-hidden="true"`; um texto invisível ao olho (`sr-only`) com "Carregando..." dentro de `role="status"` anuncia a carga.

### 3.2 Vazio (sem dados)

Todo estado vazio tem: **ícone** (Phosphor, 48 px, cor `text.secondary`), **título** (`font.h3`), **texto de apoio** (`font.body`, `text.secondary`) e, quando existir ação útil, **um botão primário**. Texto centralizado, dentro da área da lista.

Distinguir sempre os dois tipos:

| Tipo | Quando | Mensagem |
|---|---|---|
| Vazio absoluto | Nunca houve dados | Explica o que fazer ("Você ainda não fez doações") |
| Vazio por filtro/busca | Há dados, mas o filtro não encontrou | "Nenhum resultado para 'termo'" + botão "Limpar busca" |

### 3.3 Erro

Escolher o componente pelo escopo do erro:

| Escopo | Componente | Comportamento |
|---|---|---|
| Campo inválido | Mensagem abaixo do campo, `font.caption`, texto `feedback.error`, ícone de aviso e borda `border-red-500` | Aparece ao sair do campo (blur) ou ao enviar. Campo recebe `aria-invalid="true"` e `aria-describedby` apontando para a mensagem. |
| Erro do formulário (negócio) | Alerta in-page no topo do formulário (DS 7.8), `role="alert"` | Permanece até o usuário corrigir ou reenviar |
| Falha ao carregar lista/página | Bloco de erro no lugar do conteúdo: ícone, título, texto e botão "Tentar novamente" | Mantém o cabeçalho da página |
| Resultado de ação rápida | Toast no canto, fecha em 4 s (DS 7.8) | Oficial. Para erro, **não fechar sozinho** (proposta), pois o texto pode não ser lido a tempo |
| Sem conexão | Faixa fixa no topo: "Você está sem conexão. Verifique sua internet." | Proposta |

Regras de texto (RNF-011): linguagem simples, dizer o que houve e como resolver, **nunca** exibir stack trace, código interno ou mensagem crua da API. Nunca usar só cor para indicar erro: sempre ícone + texto.

### 3.4 Mapeamento de erros da API para a interface

Códigos conforme o contrato documentado em [`arquitetura.md`](../arquitetura.md) e [`backend/rotas-api.md`](../backend/rotas-api.md).

> Os documentos descrevem o contrato de um back-end Spring Boot, mas o código existente em `dev-backend` é .NET e pode responder em outro formato. **Confirmar o formato real de erro com o back-end antes de implementar.**

| HTTP | Significado | Resposta da interface |
|---|---|---|
| 400 | Requisição inválida | Alerta do formulário: "Não foi possível processar. Revise os dados e tente de novo." |
| 401 | Não autenticado ou token expirado | Encerrar sessão local, redirecionar para `/sign-in` com aviso "Sua sessão expirou. Entre novamente." e voltar à tela de origem após o login |
| 403 | Sem permissão | Tela "Você não tem acesso a esta página" com botão "Voltar ao início" |
| 404 | Não encontrado | Tela "Não encontramos o que você procura" com botão "Voltar" |
| 409 | Conflito (ex.: e-mail já cadastrado) | Erro no campo envolvido ("Este e-mail já está cadastrado") |
| 422 | Validação por campo | Exibir cada mensagem no campo correspondente (`erros.campo`); foco no primeiro campo com erro |
| 5xx | Falha do servidor | Alerta/bloco de erro: "Algo deu errado do nosso lado. Tente novamente em instantes." + "Tentar novamente" |
| Sem resposta | Rede ou timeout | Mesmo tratamento de "Sem conexão" ou 5xx, conforme o caso |

### 3.5 Sucesso e desabilitado

- **Sucesso de ação simples** (salvar perfil, atualizar campanha): toast de sucesso, 4 s. Substitui o `alert()` atual.
- **Sucesso que encerra um fluxo** (doação): tela dedicada (ver 4.7), não toast.
- **Desabilitado:** opacidade 50%, `cursor-not-allowed`, atributo `disabled` (DS 7.1). Sempre que possível, informar *por que* está desabilitado em texto de apoio, pois o botão desabilitado não recebe foco.
- **Foco:** nunca remover o contorno; usar `ring-2 ring-offset-2` (DS 9).
