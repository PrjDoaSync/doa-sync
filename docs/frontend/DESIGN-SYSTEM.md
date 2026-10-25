# DoaSync Design System

Este é o manual prático e de consulta rápida para Designers e Desenvolvedores do **DoaSync**, uma plataforma digital genérica de arrecadação de doações[cite: 4]. O objetivo principal deste documento é garantir a consistência visual e impedir que cada uma das cinco equipes do projeto invente padrões isolados de interface[cite: 1, 2]. 

Este Design System estabelece a base para telas de doadores, dashboards gerenciais e painéis administrativos[cite: 1, 4].

---

## 1. Classificação das Decisões

Para clareza no dia a dia, todas as regras deste documento utilizam as seguintes tags:

> **PADRÃO OFICIAL:** Regra validada, imutável e de uso obrigatório por todas as equipes.
> **PADRÃO RECOMENDADO:** Melhor prática sugerida com base em convenções de mercado.
> **⚠️ PENDENTE DE VALIDAÇÃO:** Proposta concreta elaborada para o projeto que aguarda aprovação final da gestão/arquitetura.

---

## 2. Referências Oficiais e Stack Visual

> **PADRÃO OFICIAL**

O DoaSync utiliza tecnologias modernas e unificadas. O design e o código devem seguir a mesma linguagem estabelecida pelas documentações oficiais abaixo:

*   **Design & Protótipos:** Figma.
*   **Web Framework:** React.
*   **Mobile Framework:** React Native / Expo.
*   **Estilização e Medidas:** [Tailwind CSS](https://tailwindcss.com/docs) (Fonte da verdade para espaçamentos, grids e sombras).
*   **Acessibilidade:** [WCAG 2.2 (W3C)](https://www.w3.org/TR/WCAG22/).
*   **Ícones:** [Phosphor Icons](https://phosphoricons.com/).
*   **Tipografia:** [Google Fonts](https://fonts.google.com/).

---

## 3. Tipografia

> **⚠️ PENDENTE DE VALIDAÇÃO**

A tipografia deve garantir alta legibilidade em painéis de dados densos (dashboards) e clareza nos fluxos de doação.

*   **Fonte Principal:** [Inter](https://fonts.google.com/specimen/Inter)
*   **Fallback:** `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
*   **Pesos Permitidos:** Regular (400), Medium (500), SemiBold (600), Bold (700).

### Escala Tipográfica

| Token | Tamanho | Peso | Line-height | Uso | Tailwind |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `font.display` | 48px | 700 (Bold) | 48px (1) | KPIs de Dashboard e Valores grandes | `text-5xl font-bold` |
| `font.h1` | 32px | 700 (Bold) | 40px (1.25) | Títulos principais de página | `text-3xl font-bold` |
| `font.h2` | 24px | 600 (SemiBold)| 32px (1.33) | Subtítulos e seções principais | `text-2xl font-semibold`|
| `font.h3` | 20px | 600 (SemiBold)| 28px (1.4) | Títulos de Cards e Modais | `text-xl font-semibold` |
| `font.h4` | 18px | 500 (Medium) | 28px (1.55) | Destaques menores | `text-lg font-medium` |
| `font.body` | 16px | 400 (Regular) | 24px (1.5) | Textos padrão, descrições | `text-base` |
| `font.body.small` | 14px | 400 (Regular) | 20px (1.4) | Tabelas, textos secundários | `text-sm` |
| `font.label` | 14px | 500 (Medium) | 20px (1.4) | Labels de formulário, Botões | `text-sm font-medium` |
| `font.caption` | 12px | 400 (Regular) | 16px (1.33) | Legendas, helper text | `text-xs` |

---

## 4. Cores

> **⚠️ PENDENTE DE VALIDAÇÃO**

A paleta prioriza a confiança (azul), legibilidade de dados e clareza de feedback. Cores baseadas na escala do Tailwind CSS para fácil implementação.

### Brand (Marca e Ações)
| Nome | Token | HEX | Combinação/Uso |
| :--- | :--- | :--- | :--- |
| Primary | `color.brand.primary` | `#2563EB` | Ação principal (Botões). Texto branco. |
| Primary Hover | `color.brand.primary.hover` | `#1D4ED8` | Estado hover de botões primários. |
| Primary Active | `color.brand.primary.active`| `#1E40AF` | Estado de clique (active). |
| Primary Disabled| `color.brand.primary.disabled`| `#93C5FD` | Botões desabilitados. |
| Secondary | `color.brand.secondary` | `#F1F5F9` | Fundos de botões secundários. Texto escuro. |

### Background & Surface
| Nome | Token | HEX | Combinação/Uso |
| :--- | :--- | :--- | :--- |
| Page | `color.bg.page` | `#F8FAFC` | Fundo principal da aplicação. |
| Surface | `color.bg.surface` | `#FFFFFF` | Fundo de cards, modais, tabelas e inputs. |
| Disabled | `color.bg.disabled` | `#E2E8F0` | Fundo de inputs ou elementos inativos. |

### Text (Tipografia)
| Nome | Token | HEX | Combinação/Uso |
| :--- | :--- | :--- | :--- |
| Primary | `color.text.primary` | `#0F172A` | Títulos e textos principais. |
| Secondary | `color.text.secondary` | `#475569` | Textos de apoio, legendas e ícones neutros. |
| Muted | `color.text.muted` | `#94A3B8` | Placeholders de inputs. |
| Inverse | `color.text.inverse` | `#FFFFFF` | Textos sobre fundos escuros (ex: Primary). |

### Border
| Nome | Token | HEX | Combinação/Uso |
| :--- | :--- | :--- | :--- |
| Default | `color.border.default` | `#E2E8F0` | Bordas de cards, tabelas e divisores. |
| Strong | `color.border.strong` | `#CBD5E1` | Bordas de inputs inativos. |
| Focus | `color.border.focus` | `#3B82F6` | Anéis de foco (acessibilidade). |

### Feedback (Status e Alertas)
*Nota: Nunca use feedback apenas com cor. Sempre acompanhe com ícones ou texto descritivo.*

| Nome | Token | HEX (Bg / Text) | Combinação/Uso |
| :--- | :--- | :--- | :--- |
| Success | `color.feedback.success` | `#DCFCE7` / `#166534`| Doação concluída, sucesso. |
| Warning | `color.feedback.warning` | `#FEF9C3` / `#854D0E`| Atenção, ações pendentes. |
| Error | `color.feedback.error` | `#FEE2E2` / `#991B1B`| Falhas, exclusões, erro em form. |
| Info | `color.feedback.info` | `#DBEAFE` / `#1E40AF`| Avisos neutros, dicas. |

---

## 5. Design Tokens (Espaçamento, Grid e Shapes)

> **PADRÃO RECOMENDADO**

Baseados diretamente no [Core do Tailwind CSS](https://tailwindcss.com/docs/customizing-spacing). Os valores não devem ser inventados.

### Espaçamento (Spacing & Padding)
Usar estritamente múltiplos de 4px:
*   `spacing.1` = 4px (`p-1`, `m-1`, `gap-1`)
*   `spacing.2` = 8px (`p-2`, `m-2`, `gap-2`)
*   `spacing.3` = 12px (`p-3`) - *Ideal para padding interno de botões e inputs.*
*   `spacing.4` = 16px (`p-4`) - *Padding padrão de cards e gutters.*
*   `spacing.6` = 24px (`p-6`) - *Espaçamento entre seções de um formulário.*
*   `spacing.8` = 32px (`p-8`) - *Padding externo de modais ou seções amplas.*

### Border Radius
*   `radius.sm` = 4px (`rounded-sm`) - Checkboxes, pequenas tags.
*   `radius.md` = 6px (`rounded-md`) - Inputs, Botões, Dropdowns.
*   `radius.lg` = 8px (`rounded-lg`) - Cards, Modais, Imagens.
*   `radius.full` = 9999px (`rounded-full`) - Avatares, Badges.

### Sombras (Shadows)
*   `shadow.sm` = Elevação sutil (`shadow-sm`) - Botões contornados, inputs em hover.
*   `shadow.md` = Elevação padrão (`shadow-md`) - Cards no Dashboard, Dropdowns.
*   `shadow.lg` = Elevação alta (`shadow-lg`) - Modais e Drawers.

### Grid & Breakpoints
*   **Mobile (`sm` - até 767px):** 4 colunas. Padding lateral: 16px.
*   **Tablet (`md` - 768px a 1023px):** 8 colunas. Padding lateral: 24px.
*   **Desktop (`lg`/`xl` - 1024px+):** 12 colunas. Gap: 24px. Max-width de container: 1280px.

---

## 6. Ícones (Phosphor Icons)

> **⚠️ PENDENTE DE VALIDAÇÃO**

A biblioteca escolhida é a [Phosphor Icons](https://phosphoricons.com/). Ela possui variantes consistentes e suporte nativo para React e React Native.

*   **Estilo Padrão:** `Regular` (1.5px stroke).
*   **Estilo Ativo:** `Fill` (Preenchido) para abas de navegação ativas.
*   **Tamanhos Padrão:** 16px (micro), 20px (botões e inputs), 24px (navegação).

**Dicionário de Ícones Oficiais:**
*   **Pesquisa:** `MagnifyingGlass`
*   **Editar:** `PencilSimple`
*   **Excluir:** `Trash`
*   **Filtro:** `Funnel`
*   **Mais Opções (Dropdown):** `DotsThree`
*   **Fechar/Cancelar:** `X`
*   **Exportar:** `DownloadSimple`
*   **Dashboard:** `ChartBar` ou `SquaresFour`

---

## 7. Componentes (Guia Rápido)

> **⚠️ PENDENTE DE VALIDAÇÃO**

### 7.1 Botões (Buttons)
A altura dos botões dita o ritmo da interface.
*   **Tamanhos:**
    *   *Small:* Altura 32px (`h-8`), Fonte 14px, px-3.
    *   *Medium (Padrão):* Altura 40px (`h-10`), Fonte 14px, px-4.
    *   *Large:* Altura 48px (`h-12`), Fonte 16px, px-6 (Ideal para Mobile).
*   **Variantes:**
    *   **Primary:** Bg `color.brand.primary`, Text `color.text.inverse`.
    *   **Secondary:** Bg `color.brand.secondary`, Text `color.text.primary`. Hover escurece levemente (`#E2E8F0`).
    *   **Ghost:** Sem bg, Text `color.text.secondary`. Bg sutil no hover.
    *   **Destructive:** Bg `color.feedback.error.bg`, Text `color.feedback.error.text`.
*   **Estados:**
    *   *Hover:* Muda para a cor de Hover designada.
    *   *Focus:* Adiciona anel de foco visível `ring-2 ring-blue-500 ring-offset-2`.
    *   *Disabled:* Opacidade 50% (`opacity-50`), `cursor-not-allowed`.
    *   *Loading:* Substitui ícone à esquerda por um `Spinner` rodando. Botão desabilitado.

### 7.2 Inputs de Texto
*   **Tamanho:** Altura 40px (`h-10`) para parear com botões Medium.
*   **Borda e Fundo:** Bg `color.bg.surface`, Border `color.border.strong`.
*   **Typography:** Texto interno `font.body` (16px para evitar zoom automático no iOS).
*   **Focus:** Border `color.border.focus`, sombra interna leve (`ring-1 ring-blue-500`).
*   **Error State:** Border vermelha (`border-red-500`), ícone de aviso interno à direita, texto de erro `font.caption` em vermelho abaixo do campo.

### 7.3 Cards
*   Usados amplamente nas áreas de Gestão e Dashboard[cite: 1, 4].
*   **Estrutura Base:** Fundo `color.bg.surface`, Border Radius `radius.lg` (8px), Padding `spacing.4` ou `spacing.6` (16px ou 24px), Sombra `shadow.md`.
*   Nenhum texto deve tocar as bordas.

### 7.4 Tabelas (Data Tables)
*   Para relatórios administrativos.
*   **Header (th):** Fundo cinza super claro (`#F8FAFC`), texto `font.label` (14px, Medium), `color.text.secondary`, uppercase opcional.
*   **Body (td):** Texto `font.body.small` (14px). Border bottom `color.border.default` (1px solid).
*   **Ações:** Ficam sempre na última coluna alinhadas à direita.

### 7.5 Badges / Status
*   Usados para identificar status de Campanhas ou Doações[cite: 1].
*   **Design:** `radius.full` (arredondado), padding `px-2.5 py-0.5`, `font.caption` (12px Medium).
*   **Cores:** Utilizar tokens de *Feedback* (Bg claro + Texto escuro da mesma matiz).

### 7.6 Modais
*   **Overlay:** Fundo preto com opacidade (`bg-black/50`) e blur opcional (`backdrop-blur-sm`).
*   **Container:** `radius.lg`, fundo branco, sombra `shadow-lg`, largura máxima de 500px para modais de confirmação.
*   **Header:** Título e botão "X" no canto superior direito.
*   **Footer:** Ações alinhadas à direita (Cancelar, Confirmar).

### 7.7 Dropdowns (Menus de Ação)
*   **Trigger:** Geralmente o ícone `DotsThree`.
*   **Menu:** Fundo branco, `shadow-md`, `radius.md`, border 1px `color.border.default`.
*   **Itens:** Hover com fundo cinza claro (`hover:bg-slate-50`), cursor pointer.

### 7.8 Alertas / Toasts
*   **Alertas (In-page):** Barras fixas na página. Fundo suave + borda esquerda espessa com a cor de status + Ícone + Mensagem.
*   **Toasts (Flutuantes):** Canto superior ou inferior direito. Fecham sozinhos após 4s.

---

## 8. Layout e Montagem de Páginas

> **PADRÃO RECOMENDADO**

*   **Páginas de Gestão (Equipe 4):**
    *   Layout "App-like".
    *   **Sidebar:** Navegação persistente à esquerda (240px de largura).
    *   **Header Superior:** Busca global, notificações e perfil.
    *   **Área de Conteúdo:** Fundo `color.bg.page`. Título H1 no topo + botão de ação primária alinhado à direita. O conteúdo abaixo utiliza grid e cards.
*   **Mobile:** A Sidebar vira um "Hamburger menu" ou uma "Bottom Navigation Bar". Elementos que ficavam lado a lado em cards ou grids empilham-se em coluna única (100% width).

---

## 9. Acessibilidade (Obrigatório)

> **PADRÃO OFICIAL**

O projeto lida com doadores e impacto social, a acessibilidade é inegociável[cite: 4].
1.  **Contraste:** Verifique sempre o contraste de cor (mínimo 4.5:1 para texto normal). Não escreva texto cinza claro em fundo branco.
2.  **Outline:** NUNCA remova o contorno de foco do CSS (`outline: none`) sem substituí-lo por um estilo customizado visível (ex: `focus:ring-2`). Navegação por teclado (`Tab`) deve ser cristalina.
3.  **Toque Mobile:** Qualquer botão ou link no React Native/Expo deve ter área de clique de no mínimo 44x44px.
4.  **Aria-labels:** Ícones interativos sem texto visível (ex: botão "X" de fechar) precisam de `aria-label="Fechar modal"`.
5.  **Cores como informação:** Não use apenas a cor vermelha para avisar sobre um erro; inclua sempre um texto ou ícone de aviso.

---

## 10. Implementação no Desenvolvimento

> **PADRÃO RECOMENDADO**

Desenvolvedores da plataforma Web e Mobile[cite: 1] devem mapear estes tokens na configuração dos frameworks.

### Web (React + Tailwind)
Tudo definido acima deve ser configurado no `tailwind.config.js`. **Não crie CSS inline arbitrários.**

```javascript
// Exemplo básico de tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          secondary: '#F1F5F9',
        },
        surface: '#FFFFFF',
        page: '#F8FAFC',
        // ... (mapear todas as cores de feedback)
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      }
    }
  }
}
