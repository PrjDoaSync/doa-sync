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
- **Sucesso que encerra um fluxo** (doação): tela dedicada (ver 4.8), não toast.
- **Desabilitado:** opacidade 50%, `cursor-not-allowed`, atributo `disabled` (DS 7.1). Sempre que possível, informar *por que* está desabilitado em texto de apoio, pois o botão desabilitado não recebe foco.
- **Foco:** nunca remover o contorno; usar `ring-2 ring-offset-2` (DS 9).

---

## 4. Estados por tela

Todos os textos são **PROPOSTA** (pendentes de validação de UX). Tabelas listam só o que **difere ou complementa** os padrões da seção 3. Onde nada é dito, vale o padrão global.

Legenda de status em badges (DS 7.5, tokens de feedback): Sucesso = verde, Atenção = amarelo, Erro = vermelho, Informação = azul. Nunca só cor: o badge sempre tem texto.

### 4.1 Tela inicial (wireframe 1)

| Estado | Especificação |
|---|---|
| Loading | Skeleton de 3 cards na faixa "Campanhas ativas". Título e botão "Ver campanhas" aparecem de imediato (não dependem da API). |
| Vazio | Ícone de coração, título "Ainda não há campanhas ativas", texto "Volte em breve para conhecer novas causas." Sem botão. |
| Erro | Bloco no lugar dos cards: "Não conseguimos carregar as campanhas" + "Tentar novamente". O restante da página continua utilizável. |
| Dados | Até 3 cards com progresso. |

### 4.2 Login (wireframe 2)

| Estado | Especificação |
|---|---|
| Padrão | Botão "Entrar" habilitado. |
| Loading | Botão "Entrando..." com spinner e desabilitado; campos ficam `readonly`. |
| Erro de campo | E-mail vazio: "Informe seu e-mail". Formato inválido: "Informe um e-mail válido". Senha vazia: "Informe sua senha". |
| Erro de credencial (401) | Alerta no topo: "E-mail ou senha incorretos." **Não indicar qual campo está errado** (RF-002). Manter o e-mail digitado; limpar a senha e focar nela. |
| Conta inativa | Alerta: "Sua conta está desativada. Entre em contato com a plataforma." |
| Erro de rede/5xx | Padrão da seção 3.4. |
| Sucesso | Redirecionar ao destino conforme o perfil (doador → campanhas, entidade → painel da entidade, admin → painel administrativo). Sem `alert()`. |

### 4.3 Cadastro (wireframe 3)

| Estado | Especificação |
|---|---|
| Padrão | Seleção "Tipo de conta" obrigatória. Campos extras de entidade (CNPJ, descrição, endereço) aparecem ao escolher "Entidade". |
| Loading | Botão "Cadastrando..." desabilitado. |
| Erro de campo | Nome vazio: "Informe seu nome". Senha curta: "A senha deve ter ao menos X caracteres" (valor a definir pelo back-end). CPF/CNPJ inválido: "Informe um CPF/CNPJ válido". Tipo de conta não escolhido: "Escolha o tipo de conta". |
| Conflito (409) | No campo e-mail: "Este e-mail já está cadastrado. Quer entrar?" com link para o login (RF-001). |
| Aceite LGPD | Caixa de aceite da política de privacidade obrigatória (RNF-005). Sem aceite: "Para continuar, aceite a política de privacidade". |
| Sucesso (doador) | Toast "Conta criada com sucesso" e login automático ou redirecionamento ao login. |
| Sucesso (entidade) | Tela de confirmação: "Cadastro enviado. Sua entidade está **em análise** e você será avisado após a aprovação." (entidade nasce `PENDENTE`). |

### 4.4 Recuperar senha (existe no código, fora dos wireframes)

| Estado | Especificação |
|---|---|
| Loading | Botão "Enviando..." desabilitado. |
| Sucesso | Mensagem fixa na tela (não toast): "Se este e-mail estiver cadastrado, enviaremos um link de recuperação." Mesma resposta com ou sem e-mail cadastrado, para não revelar quais e-mails estão cadastrados. |
| Erro | E-mail inválido no campo; falha de rede/5xx como no padrão. |
| Pendência | O envio de e-mail depende da decisão PV05 em [`arquitetura.md`](../arquitetura.md). Até lá, a tela deve indicar indisponibilidade em vez de simular sucesso. |

### 4.5 Campanhas — listagem e busca (wireframe 4)

| Estado | Especificação |
|---|---|
| Loading | Skeleton de 3 a 5 cards largos. Barra de busca já utilizável. |
| Vazio absoluto | "Nenhuma campanha disponível no momento" + texto "Novas campanhas aparecerão aqui." |
| Vazio por busca | "Nenhum resultado para '<termo>'" + "Limpar busca". |
| Erro | Bloco "Não conseguimos carregar as campanhas" + "Tentar novamente". |
| Busca em andamento | Aplicar com *debounce* de 300 ms; manter a lista anterior com `aria-busy` até chegar a nova. |
| Paginação | Carregar mais por página (RNF-028). Durante "carregar mais", spinner no rodapé da lista; em erro, "Não foi possível carregar mais" + "Tentar novamente", sem perder os itens já mostrados. |
| Barra de progresso | Valor visual limitado a 100%. Se arrecadado > meta, mostrar o valor real no texto ("R$ 5.500 de R$ 5.000") e uma etiqueta "Meta atingida". Barra com `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` e texto equivalente. |

### 4.6 Detalhes da campanha (wireframe 5)

| Estado | Especificação |
|---|---|
| Loading | Skeleton do título, bloco de descrição (4 linhas) e bloco de arrecadação. Botão "Fazer doação" desabilitado até carregar. |
| Não encontrada (404) | Tela "Esta campanha não existe ou foi removida" + "Ver campanhas". |
| Campanha encerrada | Badge "Encerrada". Botão "Fazer doação" **desabilitado** com texto de apoio "Esta campanha foi encerrada e não recebe novas doações." (RF-013). |
| Entidade desativada | Mesmo tratamento de encerrada, com texto "Esta campanha não está recebendo doações." |
| Visitante sem login | "Fazer doação" leva ao login (RF-020). Após logar, voltar para esta campanha. |
| Erro | Bloco de erro com "Tentar novamente". |

### 4.7 Fazer doação (wireframe 6)

| Estado | Especificação |
|---|---|
| Padrão | "Continuar" desabilitado até haver valor válido. |
| Erro de campo | Vazio: "Informe o valor da doação". Zero ou negativo: "O valor deve ser maior que zero". Formato inválido: "Use apenas números, por exemplo 50,00". |
| Loading | Botão "Processando doação..." desabilitado; **impedir duplo clique** (risco de doação duplicada). Se a API oferecer idempotência, enviar a chave. |
| Campanha encerrada durante o fluxo | Alerta: "Esta campanha foi encerrada e não pode mais receber doações." + "Ver outras campanhas". |
| Falha de pagamento | Alerta: "Não foi possível concluir sua doação. Nenhum valor foi cobrado." + "Tentar novamente". Só usar essa frase se o back-end garantir que não houve cobrança (RNF-008); caso contrário, "Não conseguimos confirmar sua doação. Confira em Minhas doações antes de tentar de novo." |
| Pendência | O meio de pagamento real (PIX) depende da decisão PV01. Enquanto for simulado, a interface deve indicar claramente que é um ambiente de teste. |

### 4.8 Confirmação da doação (wireframe 7)

| Estado | Especificação |
|---|---|
| Sucesso | Tela dedicada com ícone de sucesso, título "Doação realizada!", resumo (campanha, valor, data, forma de pagamento) e dois botões: "Ver minhas doações" e "Voltar para campanhas". Foco movido ao título e anunciado (`role="status"`). |
| Doação pendente | Se o status for "iniciada" (RF-022): ícone de relógio, "Estamos confirmando sua doação" e atualização automática do status; sem texto de sucesso. |
| Acesso direto sem doação | Redirecionar para campanhas. |
| Recarregar a página | Não duplicar a doação; a tela deve ser carregada a partir do id da doação, não de um novo envio. |

### 4.9 Histórico do doador (wireframe 8)

| Estado | Especificação |
|---|---|
| Loading | Skeleton de 5 linhas de tabela. |
| Vazio | "Você ainda não fez doações" + botão "Ver campanhas". |
| Erro | "Não conseguimos carregar suas doações" + "Tentar novamente". |
| Status | Coluna com badge: Concluída (sucesso), Iniciada (atenção), Cancelada (erro). |
| Doação anônima | Aparece normalmente para o próprio doador, com indicação "Anônima". |
| Mobile | Tabela vira lista de cards empilhados (campanha, data, valor, status). |

### 4.10 Painel da entidade (wireframe 9)

| Estado | Especificação |
|---|---|
| Entidade pendente | Faixa de informação no topo: "Sua entidade está em análise. Você poderá criar campanhas após a aprovação." Botão "Criar campanha" desabilitado com esse motivo. |
| Entidade reprovada | Faixa de erro: "Seu cadastro não foi aprovado." + contato com a administração. |
| Entidade inativa | Faixa de atenção: "Sua entidade está desativada." Ações de escrita desabilitadas. |
| Sem campanhas | "Você ainda não criou campanhas" + botão "Criar campanha". |
| Sem doações | Aba Doações: "Sua entidade ainda não recebeu doações." |
| Loading e erro | Skeleton por aba; erro por aba, sem derrubar o painel inteiro. |
| Salvar informações | Botão em loading; sucesso por toast; conflito/validação por campo. |
| Sem permissão (403) | Doador ou outra entidade tentando abrir: tela de acesso negado. |

### 4.11 Criar campanha (wireframe 10)

| Estado | Especificação |
|---|---|
| Erro de campo | Título vazio: "Informe o título". Meta vazia ou ≤ 0: "Informe uma meta maior que zero". Data de encerramento anterior à de início: "A data de encerramento deve ser depois da data de início". Data no formato inválido: "Use o formato DD/MM/AAAA". |
| Loading | Botão "Criando campanha..." desabilitado. |
| Sucesso | Toast "Campanha criada" e retorno ao painel, com a campanha destacada na lista. |
| Sair com dados preenchidos | Confirmar em modal: "Descartar alterações?" com "Continuar editando" e "Descartar". |
| Entidade não aprovada | Tela inacessível: aviso e redirecionamento ao painel (ver 4.10). |

### 4.12 Painel administrativo (wireframe 11)

| Estado | Especificação |
|---|---|
| Loading | Cada card de indicador tem skeleton próprio; a falha de um indicador não derruba os outros. |
| Valor zero | Mostrar **"0"** (e "R$ 0,00"). Zero é um dado válido; não tratar como vazio nem como erro. |
| Erro de indicador | No card: "—" e botão pequeno "Tentar novamente". Texto de apoio "Indisponível". |
| Fila de aprovação vazia | "Nenhuma entidade aguardando aprovação" com ícone de sucesso. |
| Aprovar/Reprovar | Botão da linha em loading e desabilitado; ao concluir, a linha sai da fila com toast "Entidade aprovada" / "Entidade reprovada". Em erro, a linha permanece e o toast de erro não fecha sozinho. |
| Reprovar | Confirmação em modal (ação sensível) com motivo opcional. |
| Admin desativando a si mesmo | Ação desabilitada com explicação "Você não pode desativar a própria conta." (regra da arquitetura). |
| Acesso negado (403) | Qualquer perfil diferente de administrador vê tela de acesso negado. |

---

## 5. Responsividade (RNF-014)

Breakpoints do Design System: mobile até 767 px (4 colunas, margem 16 px), tablet 768 a 1023 px (8 colunas, margem 24 px) e desktop a partir de 1024 px (12 colunas, contêiner máximo de 1280 px).

| Elemento de estado | Mobile | Desktop |
|---|---|---|
| Skeleton de cards | 1 coluna | 3 colunas |
| Toast | Parte inferior, largura total menos margens | Canto superior ou inferior direito |
| Bloco de erro/vazio | Padding 24 px, botão largura total | Centralizado, botão com largura do conteúdo |
| Tabelas | Viram cards empilhados | Tabela |
| Botão principal | `Large` (48 px), área de toque mínima 44 × 44 px | `Medium` (40 px) |

> No código atual, `Input` e `Button` duplicam o elemento para mobile e desktop e usam `vw`/`vh`. Para os estados funcionarem (foco, erro, `aria-describedby`), recomenda-se um **único** elemento com classes responsivas (`w-full md:w-...`).

---

## 6. Acessibilidade dos estados (RNF-012)

| Item | Regra |
|---|---|
| Anúncio de loading | `aria-busy="true"` no contêiner e texto "Carregando..." em `role="status"`. |
| Anúncio de erro | Erro de formulário em `role="alert"`; erro de campo ligado por `aria-describedby` e `aria-invalid="true"`. |
| Foco após erro de envio | Mover o foco para o primeiro campo inválido. |
| Foco após sucesso de fluxo | Mover o foco para o título da tela de confirmação. |
| Toast | Em `role="status"` (sucesso) ou `role="alert"` (erro). Toasts de erro com botão de fechar e sem fechamento automático. |
| Cor | Nunca só cor: ícone + texto em erro, sucesso, alerta e status. |
| Foco visível | Nunca `outline: none` sem substituto; `focus:ring-2`. |
| Rótulos | Todo campo com `<label>` visível. Placeholder não substitui rótulo. |
| Botão desabilitado | Informar o motivo em texto próximo, pois não recebe foco. |
| Movimento | Respeitar `prefers-reduced-motion`: sem animação de skeleton e spinner girando em loop rápido para quem pediu. |
| Teclado | Fluxo de doação concluível só com teclado (RNF-012). |

---

## 7. Catálogo de textos (microcopy)

Padrão de tom: direto, acolhedor, sem jargão técnico, sem culpar o usuário. Frases curtas, sem exclamação em erros.

| Situação | Texto |
|---|---|
| Carregando | "Carregando..." |
| Erro genérico | "Algo deu errado do nosso lado. Tente novamente em instantes." |
| Sem conexão | "Você está sem conexão. Verifique sua internet." |
| Botão de repetir | "Tentar novamente" |
| Sessão expirada | "Sua sessão expirou. Entre novamente." |
| Sem permissão | "Você não tem acesso a esta página." |
| Não encontrado | "Não encontramos o que você procura." |
| Campo obrigatório | "Informe <nome do campo>" |
| E-mail inválido | "Informe um e-mail válido" |
| Salvo com sucesso | "Alterações salvas" |
| Ação irreversível | "Esta ação não pode ser desfeita." |

---

## 8. Pendências e decisões abertas

| ID | Pendência | Responsável sugerido | Bloqueia |
|---|---|---|---|
| H-01 | Definir a paleta oficial (azul do DS ou verde/amarelo implementado), a fonte (Inter ou Poppins) e a biblioteca de ícones | Produto/UX | Cores de marca e ícones das telas de estado |
| H-02 | Validar as **propostas** deste documento (skeleton, tempos de 300 ms e 10 s, toast de erro persistente, textos) | Produto/UX | Padronização dos estados |
| H-03 | Confirmar o formato real de erro da API (.NET na `dev-backend` x contrato Spring da documentação) | Back-end | Seção 3.4 |
| H-04 | Corrigir contraste: links amarelos sobre verde (3,63:1) e `color.text.muted` do DS para placeholder (2,56:1) | UX/Front-end | RNF-012 |
| H-05 | Substituir `alert()` por toast e alertas in-page | Front-end | Seções 3.3 e 3.5 |
| H-06 | Unificar `Input` e `Button` (elemento único, com `label`, `error`, `disabled`, `loading`) | Front-end | Todos os estados de formulário |
| H-07 | Transformar links de texto em `<Link>` navegáveis por teclado | Front-end | Acessibilidade |
| H-08 | PV01 (pagamento) e PV05 (e-mail) | Gestão | Seções 4.4, 4.7 e 4.8 |
| H-09 | Definir regra mínima de senha e mensagens correspondentes | Back-end/Produto | Seção 4.3 |
| H-10 | Registrar a validação visual no checklist [`frontend-validacao.md`](./frontend-validacao.md), que hoje está todo como "Pendente" | QA/Front-end | Aprovação final |

---

## 9. Checklist de handoff (por tela)

Marcar na entrega de cada tela pelo front-end e na revisão do QA.

- [ ] Estado de **loading** implementado (skeleton ou spinner de botão), sem salto de layout
- [ ] Estado **vazio** implementado, com distinção entre vazio absoluto e vazio por filtro
- [ ] Estado de **erro** implementado para campo, formulário e carga
- [ ] Erros HTTP 401, 403, 404, 409, 422 e 5xx tratados conforme a seção 3.4
- [ ] Botões com `disabled` e `loading`, sem envio duplicado
- [ ] Nenhum `alert()` do navegador
- [ ] Nenhuma mensagem técnica exibida ao usuário (RNF-011)
- [ ] Todos os campos com `<label>`, `aria-invalid` e `aria-describedby` quando em erro
- [ ] Foco visível e fluxo completo por teclado
- [ ] Contraste mínimo 4,5:1 (texto) e 3:1 (texto grande e componentes)
- [ ] Layout validado em mobile, tablet e desktop
- [ ] Textos conferidos com o catálogo da seção 7
- [ ] Evidência (captura de tela ou PR) registrada em [`frontend-validacao.md`](./frontend-validacao.md)

---

## 10. Manutenção

Atualizar este documento quando: uma tela for implementada (marcar na seção 9), o Design System definir os estados hoje marcados como proposta, o formato de erro da API for confirmado (H-03) ou a paleta oficial for decidida (H-01). Não registrar como implementado o que não foi verificado no código.
