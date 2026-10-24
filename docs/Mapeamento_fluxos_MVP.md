# DoaSync — Mapeamento de Fluxos do MVP

> **Documento de referência para o Grupo 5 (QA) e todas as equipes de desenvolvimento.**
> Versão: 1.0 · Ciclo 2026/2

---

## Sumário

1. [Convenções deste documento](#1-convenções-deste-documento)
2. [Atores do sistema](#2-atores-do-sistema)
3. [Fluxo 1 — Cadastro e Login](#3-fluxo-1--cadastro-e-login)
4. [Fluxo 2 — Cadastro e Aprovação de Entidades](#4-fluxo-2--cadastro-e-aprovação-de-entidades)
5. [Fluxo 3 — Criação e Acompanhamento de Campanhas](#5-fluxo-3--criação-e-acompanhamento-de-campanhas)
6. [Fluxo 4 — Realização de Doação via PIX](#6-fluxo-4--realização-de-doação-via-pix)
7. [Fluxo 5 — Confirmação e Histórico de Doações](#7-fluxo-5--confirmação-e-histórico-de-doações)
8. [Fluxo 6 — Administrativo](#8-fluxo-6--administrativo)
9. [Dependências entre funcionalidades](#9-dependências-entre-funcionalidades)
10. [Matriz de rastreabilidade (Fluxos × Requisitos)](#10-matriz-de-rastreabilidade-fluxos--requisitos)

---

## 1. Convenções deste documento

| Símbolo | Significado |
|---|---|
| `[Ator]` | Quem executa a ação |
| `→` | Próxima etapa do fluxo |
| `✓` | Condição de sucesso / caminho feliz |
| `✗` | Condição de erro / caminho alternativo |
| **Pré-condição** | O que precisa ser verdadeiro para o fluxo iniciar |
| **Pós-condição** | Estado do sistema ao fim do fluxo (caminho feliz) |
| **Dependência** | Outro fluxo ou funcionalidade que precisa existir |

---

## 2. Atores do sistema

| Ator | Descrição | Perfil de acesso |
|---|---|---|
| **Visitante** | Qualquer pessoa sem conta | Somente leitura (páginas públicas) |
| **Doador PF** | Pessoa Física cadastrada | Doações, histórico, perfil |
| **Doador PJ** | Pessoa Jurídica cadastrada | Doações, histórico, perfil |
| **Entidade** | ONG/Associação cadastrada | Campanhas, perfil institucional |
| **Admin** | Gestor da plataforma | Aprovações, gestão total |

---

## 3. Fluxo 1 — Cadastro e Login

### 1.1 Cadastro de Doador (Pessoa Física)

**Pré-condição:** Usuário não possui conta. Acessa a página pública.

```
[Visitante] Acessa /cadastro
    → Seleciona tipo de conta: "Pessoa Física"
    → Preenche: nome, CPF, e-mail, senha, confirmar senha
    → Informa data de nascimento (opcional)
    → Informa endereço (logradouro, número, bairro, cidade, UF, CEP)
    → Informa telefone (opcional)
    → Aceita os Termos de Uso  ← obrigatório
    → Clica em "Criar conta"

[Sistema] Valida campos obrigatórios
    ✗ Campo inválido → exibe erro inline no campo + impede envio
    ✗ CPF já cadastrado → exibe: "Este CPF já possui uma conta"
    ✗ E-mail já cadastrado → exibe: "Este e-mail já está em uso"
    ✓ Dados válidos → cria conta com status ATIVO
    → Redireciona para /login com mensagem de sucesso
```

**Pós-condição:** Conta criada, usuário pode fazer login imediatamente.

---

### 1.2 Cadastro de Doador (Pessoa Jurídica)

**Pré-condição:** Empresa não possui conta.

```
[Visitante] Acessa /cadastro
    → Seleciona tipo de conta: "Pessoa Jurídica"
    → Preenche: razão social, CNPJ, nome do responsável, e-mail, senha
    → Informa endereço da empresa
    → Informa telefone comercial
    → Aceita os Termos de Uso
    → Clica em "Criar conta"

[Sistema] Valida campos
    ✗ CNPJ inválido (formato) → erro inline
    ✗ CNPJ já cadastrado → "Este CNPJ já possui uma conta"
    ✓ Dados válidos → cria conta com status ATIVO
    → Redireciona para /login
```

**Pós-condição:** Conta PJ criada com acesso imediato.

---

### 1.3 Login

**Pré-condição:** Usuário possui conta ativa.

```
[Usuário] Acessa /login
    → Informa e-mail e senha
    → Clica em "Entrar"

[Sistema] Verifica credenciais
    ✗ E-mail não encontrado → "E-mail ou senha incorretos"  ← mensagem genérica (segurança)
    ✗ Senha incorreta → "E-mail ou senha incorretos"
    ✗ Conta INATIVA → "Sua conta foi desativada. Entre em contato."
    ✓ Credenciais válidas → cria sessão JWT

[Sistema] Redireciona conforme o tipo de conta
    → Admin   → /admin/entidades
    → Entidade → /entidade/perfil
    → Doador  → /campanhas  (ou dashboard do doador)
```

**Pós-condição:** Sessão ativa. Usuário acessa a área autenticada correspondente ao seu perfil.

---

### 1.4 Logout

```
[Usuário autenticado] Clica em "Sair" (sidebar ou menu)
    → [Sistema] Invalida a sessão JWT
    → Redireciona para /login
```

---

### 1.5 Recuperação de senha ⚠️ *(pós-MVP — documentado para referência futura)*

```
[Usuário] Clica em "Esqueci minha senha" na tela de login
    → Informa o e-mail cadastrado
    → [Sistema] Envia link de redefinição por e-mail
    → Usuário acessa o link e define nova senha
```

---

## 4. Fluxo 2 — Cadastro e Aprovação de Entidades

### 2.1 Cadastro da Entidade

**Pré-condição:** ONG/Associação não está cadastrada. Acessa a plataforma como visitante.

```
[Visitante] Acessa /entidades/cadastro
    → Preenche dados de acesso: nome do responsável, e-mail, senha
    → Preenche dados institucionais:
        - CNPJ
        - Razão Social
        - Nome Fantasia (opcional)
        - Descrição da organização
        - Área de atuação (Assistência Social, Educação, Saúde...)
        - Site (opcional)
    → Preenche dados de contato:
        - E-mail de contato público
        - Telefone
        - WhatsApp (opcional)
    → Preenche endereço da sede:
        - CEP (busca automática via ViaCEP)
        - Logradouro, número, complemento, bairro, cidade, UF
    → Clica em "Cadastrar Entidade"

[Sistema] Valida campos obrigatórios
    ✗ CNPJ inválido → erro inline
    ✗ CNPJ já cadastrado → "CNPJ já cadastrado na plataforma"
    ✗ E-mail já em uso → "E-mail já cadastrado"
    ✓ Dados válidos → cria Entidade com statusAprovacao = PENDENTE
    → Exibe mensagem: "Cadastro realizado! Aguardando análise."
    → Notifica os administradores (painel admin mostra +1 pendente)
```

**Pós-condição:** Entidade criada com status `PENDENTE`. Não aparece no diretório público.

---

### 2.2 Análise pelo Administrador

**Pré-condição:** Existem entidades com status `PENDENTE`.

```
[Admin] Acessa /admin/entidades
    → Filtra por status "Pendente"
    → Clica em uma entidade para ver o detalhe (/admin/entidades/[id])
    → Revisa: CNPJ, razão social, descrição, endereço, contatos

[Admin] Decide: Aprovar
    → Clica em "Aprovar"
    → Confirma no modal
    → [Sistema] statusAprovacao = APROVADA · registra data e id do admin
    → Entidade passa a aparecer no diretório público /entidades/[id]
    → [Sistema] notifica a entidade por e-mail *(pós-MVP)*

[Admin] Decide: Reprovar
    → Clica em "Reprovar"
    → Modal solicita motivo (campo obrigatório)
    → [Sistema] statusAprovacao = REPROVADA · salva motivoReprovacao
    → Entidade vê o motivo em /entidade/perfil e pode corrigir o cadastro
```

**Pós-condição (aprovação):** Entidade visível publicamente. Pode criar campanhas.
**Pós-condição (reprovação):** Entidade notificada. Cadastro permanece editável.

---

### 2.3 Edição das Informações pela Entidade

**Pré-condição:** Usuário logado com tipo `ENTIDADE`.

```
[Entidade] Acessa /entidade/perfil
    → Edita os campos desejados (exceto CNPJ)
    → Clica em "Salvar Alterações"

[Sistema] Valida campos
    ✗ Campo obrigatório vazio → erro inline
    ✓ Válido → atualiza os dados
    → Exibe mensagem de sucesso
    → Se status era REPROVADA: status permanece REPROVADA até nova análise do admin
                                 *(o admin precisa aprovar manualmente após a correção)*
```

---

### 2.4 Desativação pelo Administrador

```
[Admin] Na listagem /admin/entidades ou detalhe /admin/entidades/[id]
    → Clica em "Desativar"
    → Confirma no modal
    → [Sistema] statusAprovacao = INATIVA
    → Perfil público da entidade sai do ar (GET /entidades/[id] retorna 404)
    → Campanhas ativas da entidade ficam suspensas
```

**Pós-condição:** Entidade invisível. Admin pode reativar colocando como `PENDENTE` novamente.

---

## 5. Fluxo 3 — Criação e Acompanhamento de Campanhas

**Pré-condição:** Entidade com statusAprovacao = `APROVADA`.

### 3.1 Criação de Campanha

```
[Entidade] Acessa /entidade/campanhas/nova
    → Preenche:
        - Título da campanha
        - Descrição detalhada
        - Tipo: Financeira | Coleta de Itens | Ambas
        - Meta financeira (R$) ← se tipo Financeira
        - Lista de itens necessários ← se tipo Coleta de Itens
        - Data de início e data de encerramento
        - Imagem de capa (opcional)
    → Clica em "Publicar Campanha"

[Sistema] Valida campos
    ✗ Data de encerramento anterior à data atual → erro
    ✗ Meta financeira = 0 ou negativa → erro
    ✓ Dados válidos → cria Campanha com status = ATIVA
    → Campanha aparece em /campanhas e no perfil da entidade
```

**Pós-condição:** Campanha visível publicamente para doadores.

---

### 3.2 Acompanhamento da Campanha

```
[Entidade] Acessa /entidade/campanhas
    → Vê lista das suas campanhas com:
        - Status (ATIVA / ENCERRADA / SUSPENSA)
        - Total arrecadado vs. meta
        - Número de doações recebidas
        - Progresso da coleta de itens
    → Clica em uma campanha para ver o detalhe
    → Visualiza lista de doações recebidas (sem dados pessoais dos doadores)
```

---

### 3.3 Encerramento de Campanha

```
[Entidade] Na tela de detalhe da campanha
    → Clica em "Encerrar Campanha"
    → Confirma no modal
    → [Sistema] status = ENCERRADA
    → Botão de doação some da página pública da campanha
    → Histórico de doações permanece disponível

[Sistema] (automático) Quando data de encerramento é atingida
    → status = ENCERRADA automaticamente
    → Mesmo comportamento acima
```

---

### 3.4 Visualização Pública pelo Doador/Visitante

```
[Visitante ou Doador] Acessa /campanhas
    → Vê lista de campanhas ATIVAS com filtros:
        - Por área de atuação
        - Por tipo (Financeira / Itens)
        - Por localização
    → Clica em uma campanha
    → Vê: descrição, meta, progresso, dados da entidade responsável
    → Pode clicar no nome da entidade → vai para /entidades/[id]
    → Se campanha aceita doação financeira: vê botão "Doar"
    → Se campanha aceita itens: vê lista de itens necessários e instruções de entrega
```

---

## 6. Fluxo 4 — Realização de Doação via PIX

**Pré-condição:** Doador logado (PF ou PJ). Campanha financeira com status `ATIVA`.

### 4.1 Início da Doação

```
[Doador] Na página da campanha /campanhas/[id]
    → Clica em "Doar"
    → Informa o valor desejado (campo numérico)
        - Pode escolher um valor sugerido (R$10, R$25, R$50, R$100) ou digitar outro
        - Valor mínimo: R$ 1,00
    → Seleciona método de pagamento: PIX
    → Clica em "Continuar"
```

---

### 4.2 Geração do PIX

```
[Sistema] Recebe solicitação de doação
    → Cria registro de Doação com status = PENDENTE
    → Chama integração de pagamento (gateway PIX)
    → Gera QR Code PIX + código copia-e-cola
    → Exibe para o doador:
        - QR Code
        - Código copia-e-cola
        - Valor
        - Tempo de expiração (ex: 30 minutos)
        - Instruções de pagamento
```

---

### 4.3 Confirmação do Pagamento

```
[Doador] Paga o PIX pelo app do banco

[Gateway de Pagamento] Recebe confirmação do banco
    → Envia webhook para o DoaSync: { status: "PAGO", transactionId: "..." }

[Sistema] Recebe o webhook
    → Atualiza Doação: status = CONFIRMADA
    → Atualiza o total arrecadado da Campanha
    → Emite comprovante/recibo para o Doador (e-mail ou tela)
    → Atualiza o progresso exibido na página da campanha (barra de progresso)

[Tela do Doador] (polling ou WebSocket)
    ✓ Pagamento confirmado → exibe: "Doação realizada com sucesso! 🎉"
    → Redireciona para /doacoes/[id] (detalhe da doação)
```

---

### 4.4 Expiração sem pagamento

```
[Sistema] Tempo de expiração do QR Code atingido (30 min)
    → Doação: status = EXPIRADA
    → Exibe para o doador: "O código PIX expirou. Deseja gerar um novo?"
    ✓ Sim → reinicia o fluxo 4.2
    ✗ Não → retorna para a página da campanha
```

---

### 4.5 Falha no pagamento

```
[Gateway] Informa erro no processamento
    → Doação: status = FALHA
    → Exibe mensagem de erro ao doador com opção de tentar novamente
```

---

## 7. Fluxo 5 — Confirmação e Histórico de Doações

### 5.1 Comprovante imediato

```
[Sistema] Após confirmação do pagamento (status = CONFIRMADA)
    → Exibe tela de confirmação com:
        - Número da doação
        - Valor doado
        - Nome da campanha
        - Nome da entidade beneficiada
        - Data e hora
        - ID da transação PIX
    → Oferece opção: "Baixar comprovante" (PDF) e "Compartilhar"
```

---

### 5.2 Histórico de doações do Doador

**Pré-condição:** Doador logado.

```
[Doador] Acessa /doacoes (ou /perfil → aba "Histórico")
    → Vê lista de todas as suas doações, ordenadas da mais recente para a mais antiga
    → Cada item exibe:
        - Campanha
        - Entidade
        - Valor
        - Data
        - Status: PENDENTE | CONFIRMADA | EXPIRADA | FALHA
    → Clica em uma doação → vê o detalhe completo (/doacoes/[id])
    → Pode baixar o comprovante de doações confirmadas
```

---

### 5.3 Rastreabilidade da doação

```
[Doador] Na tela de detalhe /doacoes/[id]
    → Vê timeline da doação:
        - "Doação registrada" (data/hora)
        - "Pagamento confirmado" (data/hora)
        - "Recurso direcionado à campanha X" (data/hora)
    → Vê o status da campanha vinculada (ATIVA / ENCERRADA)
    → Vê o impacto acumulado da entidade (total arrecadado, número de beneficiados)
```

---

### 5.4 Histórico de recebimentos da Entidade

**Pré-condição:** Entidade logada.

```
[Entidade] Acessa /entidade/financeiro
    → Vê resumo financeiro:
        - Total arrecadado (todas as campanhas)
        - Total do mês atual
    → Vê lista de doações recebidas por campanha
    → Pode filtrar por campanha, período, status
    → Dados dos doadores são anonimizados (apenas "Doador Anônimo" ou primeiro nome)
```

---

## 8. Fluxo 6 — Administrativo

### 6.1 Visão geral do painel admin

```
[Admin] Acessa /admin (redireciona para /admin/entidades)
    → Sidebar com módulos:
        - Entidades (gestão de cadastros)
        - Campanhas (visão geral de todas as campanhas)
        - Doações (visão geral de transações)
        - Usuários *(pós-MVP)*
        - Relatórios *(pós-MVP)*
```

---

### 6.2 Gestão de Entidades (detalhado no Fluxo 2)

```
[Admin] /admin/entidades
    → Filtra por status: TODAS | PENDENTE | APROVADA | REPROVADA | INATIVA
    → Busca por nome ou CNPJ
    → Ações disponíveis por entidade:
        ┌─────────────────────────────────────────────────┐
        │ Status atual  │ Ações disponíveis               │
        ├─────────────────────────────────────────────────┤
        │ PENDENTE      │ Aprovar, Reprovar                │
        │ APROVADA      │ Ver perfil público, Desativar    │
        │ REPROVADA     │ Aprovar, Desativar, → Pendente   │
        │ INATIVA       │ → Pendente                       │
        └─────────────────────────────────────────────────┘
```

---

### 6.3 Gestão de Campanhas

```
[Admin] /admin/campanhas
    → Visualiza todas as campanhas de todas as entidades
    → Pode filtrar por: status, entidade, tipo, período
    → Pode suspender uma campanha (ATIVA → SUSPENSA)
        → Motivo obrigatório
        → Entidade é notificada
    → Pode reativar campanha suspensa (SUSPENSA → ATIVA)
    → Não pode criar campanhas (responsabilidade da entidade)
```

---

### 6.4 Gestão de Doações

```
[Admin] /admin/doacoes
    → Visualiza todas as transações da plataforma
    → Filtros: status, campanha, período, valor mínimo/máximo
    → Pode visualizar o detalhe de cada transação
    → Pode marcar doação como REEMBOLSADA em casos de disputa
        → Motivo obrigatório
        → Notifica o doador e a entidade
    → Exporta relatório em CSV *(pós-MVP)*
```

---

### 6.5 Notificações e alertas do admin

```
[Sistema] Gera alertas automáticos para o admin quando:
    → Nova entidade com status PENDENTE
    → Campanha próxima do prazo de encerramento (< 7 dias) sem ter atingido a meta
    → Falha em pagamentos acima de determinado volume
    → Campanha de entidade recém-aprovada recebe primeira doação
```

---

## 9. Dependências entre funcionalidades

A tabela abaixo identifica quais funcionalidades **precisam existir** antes de outras poderem ser desenvolvidas ou testadas.

| Funcionalidade | Depende de | Observação |
|---|---|---|
| Login | Cadastro de usuário | Não há login sem conta |
| Cadastro de Entidade | Cadastro de usuário base | Entidade herda de Usuario |
| Aprovação de Entidade | Cadastro de Entidade | Admin só aprova o que existe |
| Criação de Campanha | Aprovação de Entidade | Entidade precisa estar `APROVADA` |
| Perfil público da Entidade | Aprovação de Entidade | Visível apenas após aprovação |
| Realizar Doação | Criação de Campanha + Login do Doador | Campanha precisa estar `ATIVA` |
| Pagamento PIX | Realizar Doação + Integração de gateway | Depende de infraestrutura externa |
| Confirmação de Doação | Webhook do gateway de pagamento | Confirmação é assíncrona |
| Histórico de Doações | Realizar Doação | Histórico só existe após doações |
| Rastreabilidade | Confirmação de Doação | Timeline depende de status confirmado |
| Relatório financeiro da Entidade | Doações confirmadas | Somente doações com status `CONFIRMADA` |
| Painel Admin — Doações | Pagamento PIX | Admin visualiza o que o sistema processa |
| Painel Admin — Campanhas | Criação de Campanha | Admin gerencia campanhas existentes |

### Ordem de desenvolvimento recomendada (por prioridade)

```
1. Autenticação (cadastro + login)         ← base para tudo
2. Cadastro e aprovação de Entidades       ← RF02, RF07, RF08, RF09, RF10 ✅ FEITO
3. Criação e gestão de Campanhas           ← RF03, RF04, RF05, RF06
4. Doação financeira (fluxo PIX)           ← RF11, RF12, RF13, RF14
5. Histórico e rastreabilidade             ← RF15, RF16, RF17
6. Painel administrativo completo          ← RF18, RF19, RF20
```

---

## 10. Matriz de rastreabilidade (Fluxos × Requisitos)

| Fluxo | Sub-fluxo | Requisito(s) | Status |
|---|---|---|---|
| 1 — Login/Cadastro | Cadastro PF | RF01 | 🔲 A desenvolver |
| 1 — Login/Cadastro | Cadastro PJ | RF01 | 🔲 A desenvolver |
| 1 — Login/Cadastro | Login | RF01 | 🔲 A desenvolver |
| 2 — Entidades | Cadastro da entidade | RF02 | ✅ Implementado |
| 2 — Entidades | Edição de informações | RF07 | ✅ Implementado |
| 2 — Entidades | Perfil público | RF08 | ✅ Implementado |
| 2 — Entidades | Aprovação/Reprovação | RF09 | ✅ Implementado |
| 2 — Entidades | Desativação | RF10 | ✅ Implementado |
| 3 — Campanhas | Criação de campanha | RF03 | 🔲 A desenvolver |
| 3 — Campanhas | Listagem pública | RF04 | 🔲 A desenvolver |
| 3 — Campanhas | Encerramento | RF05 | 🔲 A desenvolver |
| 3 — Campanhas | Acompanhamento pela entidade | RF06 | 🔲 A desenvolver |
| 4 — Doação PIX | Início da doação | RF11 | 🔲 A desenvolver |
| 4 — Doação PIX | Geração do QR Code | RF12 | 🔲 A desenvolver |
| 4 — Doação PIX | Confirmação via webhook | RF13 | 🔲 A desenvolver |
| 4 — Doação PIX | Expiração / Falha | RF14 | 🔲 A desenvolver |
| 5 — Histórico | Comprovante imediato | RF15 | 🔲 A desenvolver |
| 5 — Histórico | Histórico do doador | RF16 | 🔲 A desenvolver |
| 5 — Histórico | Rastreabilidade | RF17 | 🔲 A desenvolver |
| 6 — Admin | Gestão de entidades | RF09, RF10 | ✅ Implementado |
| 6 — Admin | Gestão de campanhas | RF18 | 🔲 A desenvolver |
| 6 — Admin | Gestão de doações | RF19 | 🔲 A desenvolver |
