# Wireframes das Principais Telas do DoaSync

## Objetivo

Criar representações iniciais das principais telas do DoaSync, permitindo visualizar a estrutura da plataforma, a organização das informações e o fluxo básico de navegação entre as funcionalidades.

Os wireframes possuem caráter inicial e poderão ser refinados posteriormente conforme as validações com o cliente e a evolução do projeto.

---

# 1. Tela Inicial

Tela principal de acesso à plataforma, apresentando as campanhas ativas e permitindo que o usuário navegue para entidades, campanhas ou autenticação.

```text
┌──────────────────────────────────────────────────────────────┐
│                         DOASYNC                              │
│                                                              │
│  Início   Campanhas   Entidades              [Entrar]        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│              Conectando pessoas a boas causas                │
│                                                              │
│       Encontre uma campanha e faça a diferença.              │
│                                                              │
│                  [Ver campanhas]                             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  CAMPANHAS ATIVAS                                            │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │
│  │ Campanha 01    │  │ Campanha 02    │  │ Campanha 03    │ │
│  │                │  │                │  │                │ │
│  │ Meta: R$ 5.000 │  │ Meta: R$ 10.000│  │ Meta: R$ 3.000 │ │
│  │ ███████░░ 70%  │  │ █████░░░░ 50%  │  │ ████████░ 80%  │ │
│  │                │  │                │  │                │ │
│  │ [Ver campanha] │  │ [Ver campanha] │  │ [Ver campanha] │ │
│  └────────────────┘  └────────────────┘  └────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Principais funcionalidades relacionadas:**

- Visualização de campanhas ativas;
- Acesso às campanhas;
- Acesso às entidades;
- Login/cadastro.

---

# 2. Tela de Login

Tela utilizada pelos diferentes perfis para acessar a plataforma.

```text
┌──────────────────────────────────────────────┐
│                  DOASYNC                     │
│                                              │
│              Acessar conta                   │
│                                              │
│  E-mail                                      │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Senha                                       │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│              [ Entrar ]                      │
│                                              │
│          Esqueci minha senha                 │
│                                              │
│          Ainda não possui conta?             │
│          [ Criar conta ]                     │
│                                              │
└──────────────────────────────────────────────┘
```

**Principais funcionalidades relacionadas:**

- Login;
- Logout;
- Recuperação de senha;
- Cadastro.

---

# 3. Tela de Cadastro

O cadastro deverá variar de acordo com o perfil escolhido.

```text
┌──────────────────────────────────────────────┐
│              CRIAR SUA CONTA                 │
│                                              │
│  Tipo de conta                               │
│                                              │
│  ( ) Doador                                  │
│  ( ) Entidade                                │
│                                              │
│  Nome                                        │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  E-mail                                      │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Senha                                       │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Dados de contato                            │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│                [Cadastrar]                   │
│                                              │
└──────────────────────────────────────────────┘
```

Para entidades, o cadastro deverá contemplar também informações institucionais como CNPJ, descrição e endereço.

---

# 4. Tela de Campanhas

Tela destinada à visualização das campanhas disponíveis.

```text
┌──────────────────────────────────────────────────────────────┐
│ DOASYNC                                                       │
│                                                              │
│ Início   Campanhas   Entidades                  [Minha conta] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    CAMPANHAS                                 │
│                                                              │
│  [Pesquisar campanha.................................]        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ NOME DA CAMPANHA                                       │  │
│  │ Descrição resumida da campanha...                     │  │
│  │                                                        │  │
│  │ Arrecadado: R$ 3.500                                  │  │
│  │ Meta: R$ 5.000                                        │  │
│  │ ██████████████░░░░ 70%                                │  │
│  │                                                        │  │
│  │                  [Ver detalhes]                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ OUTRA CAMPANHA                                         │  │
│  │ ...                                                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Principais funcionalidades relacionadas:**

- Listagem de campanhas;
- Visualização de campanhas ativas;
- Visualização do progresso de arrecadação.

---

# 5. Tela de Detalhes da Campanha

Tela onde o doador poderá conhecer melhor a campanha antes de realizar uma doação.

```text
┌──────────────────────────────────────────────────────────────┐
│ ← Voltar                                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│              NOME DA CAMPANHA                                │
│                                                              │
│  Entidade responsável: Nome da Entidade                      │
│                                                              │
│  Descrição                                                   │
│  ──────────────────────────────────────────────────────────  │
│  Descrição completa da campanha e seus objetivos...          │
│                                                              │
│  ARRECADAÇÃO                                                 │
│                                                              │
│  R$ 3.500 arrecadados de R$ 5.000                            │
│  ██████████████░░░░ 70%                                      │
│                                                              │
│  Encerramento: DD/MM/AAAA                                    │
│                                                              │
│                  [ FAZER DOAÇÃO ]                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 6. Tela de Realização de Doação

Tela utilizada para definir o valor e as informações da doação.

```text
┌──────────────────────────────────────────────┐
│              FAZER DOAÇÃO                    │
├──────────────────────────────────────────────┤
│                                              │
│  Campanha: Nome da Campanha                  │
│                                              │
│  Valor da doação                             │
│  ┌────────────────────────────────────────┐  │
│  │ R$                                     │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Forma de pagamento                          │
│                                              │
│  (•) PIX                                    │
│                                              │
│  [ ] Desejo realizar esta doação             │
│      de forma anônima                        │
│                                              │
│                                              │
│              [Continuar]                     │
│                                              │
└──────────────────────────────────────────────┘
```

O fluxo deverá contemplar a possibilidade de doação vinculada a uma campanha ou diretamente a uma entidade, além da opção de doação anônima e pagamento digital.

---

# 7. Tela de Confirmação da Doação

```text
┌──────────────────────────────────────────────┐
│                                              │
│                    ✓                         │
│                                              │
│          DOAÇÃO REALIZADA!                   │
│                                              │
│  Sua doação foi registrada com sucesso.      │
│                                              │
│  Campanha: Nome da Campanha                  │
│  Valor: R$ 100,00                            │
│  Data: DD/MM/AAAA                            │
│  Forma de pagamento: PIX                     │
│                                              │
│       [Ver minhas doações]                   │
│       [Voltar para campanhas]                │
│                                              │
└──────────────────────────────────────────────┘
```

---

# 8. Tela de Histórico do Doador

```text
┌──────────────────────────────────────────────────────────────┐
│ MINHAS DOAÇÕES                                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Histórico de doações                                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Campanha              Data          Valor              │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ Campanha A            01/10/26      R$ 100,00          │  │
│  │ Campanha B            15/09/26      R$ 50,00           │  │
│  │ Entidade C            10/08/26      R$ 200,00          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 9. Tela da Entidade

Área destinada ao gerenciamento das informações institucionais e campanhas da entidade.

```text
┌──────────────────────────────────────────────────────────────┐
│ PAINEL DA ENTIDADE                                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [Informações] [Campanhas] [Doações] [Arrecadação]          │
│                                                              │
│  INFORMAÇÕES DA ENTIDADE                                    │
│                                                              │
│  Nome: Nome da Entidade                                     │
│  CNPJ: XX.XXX.XXX/XXXX-XX                                   │
│  E-mail: contato@entidade.com                               │
│                                                              │
│  Descrição:                                                  │
│  Descrição institucional...                                  │
│                                                              │
│                   [Editar informações]                       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  MINHAS CAMPANHAS                                            │
│                                                              │
│  [ + Criar campanha ]                                        │
│                                                              │
│  Campanha A      Ativa       R$ 3.500 / R$ 5.000             │
│  Campanha B      Encerrada   R$ 8.000 / R$ 8.000             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 10. Tela de Criação de Campanha

```text
┌──────────────────────────────────────────────────────────────┐
│                 NOVA CAMPANHA                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Título                                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Descrição                                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Meta de arrecadação                                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ R$                                                     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Data de início              Data de encerramento            │
│  ┌────────────────────┐      ┌────────────────────┐           │
│  │ DD/MM/AAAA         │      │ DD/MM/AAAA         │           │
│  └────────────────────┘      └────────────────────┘           │
│                                                              │
│                    [Criar campanha]                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 11. Painel Administrativo

```text
┌──────────────────────────────────────────────────────────────┐
│                    PAINEL ADMINISTRATIVO                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  INDICADORES                                                 │
│                                                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │ ENTIDADES  │ │  DOADORES  │ │  DOAÇÕES   │               │
│  │    25      │ │    320     │ │    850     │               │
│  └────────────┘ └────────────┘ └────────────┘               │
│                                                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │ ARRECADADO │ │ CAMPANHAS  │ │  USUÁRIOS  │               │
│  │ R$ 85.000  │ │    18      │ │    350     │               │
│  └────────────┘ └────────────┘ └────────────┘               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [Usuários]   [Entidades]   [Campanhas]                     │
│                                                              │
│  Entidades aguardando aprovação: 3                           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Entidade A       Pendente      [Aprovar] [Reprovar]    │  │
│  │ Entidade B       Pendente      [Aprovar] [Reprovar]    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 12. Fluxo Visual Básico

## Fluxo do Doador

```text
┌──────────────┐
│ Tela Inicial │
└──────┬───────┘
       │
       ▼
┌────────────────┐
│   Campanhas    │
└───────┬────────┘
        │
        ▼
┌────────────────────┐
│ Detalhes Campanha  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Fazer Doação     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Confirmação        │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Histórico Doações  │
└────────────────────┘
```

## Fluxo da Entidade

```text
┌──────────────┐
│     Login    │
└──────┬───────┘
       │
       ▼
┌────────────────────┐
│ Painel da Entidade │
└───────┬────────────┘
        │
   ┌────┴─────────────┐
   │                  │
   ▼                  ▼
┌─────────────┐  ┌──────────────────┐
│ Informações │  │    Campanhas     │
└─────────────┘  └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Criar Campanha   │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Acompanhamento   │
                 │ da Arrecadação   │
                 └──────────────────┘
```

## Fluxo do Administrador

```text
┌──────────────┐
│     Login    │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ Painel Administrativo│
└──────────┬───────────┘
           │
     ┌─────┼──────────┐
     │     │          │
     ▼     ▼          ▼
┌────────┐ ┌─────────┐ ┌───────────┐
│Usuários│ │Entidades│ │Campanhas  │
└────────┘ └────┬────┘ └─────┬─────┘
                │            │
                ▼            ▼
          ┌──────────┐ ┌───────────┐
          │ Aprovar/ │ │ Desativar │
          │ Reprovar │ │ campanha  │
          └──────────┘ └───────────┘
```

---

# Critérios de Aceitação

- [x] Wireframes das principais telas do DoaSync produzidos.
- [x] Tela inicial representada.
- [x] Tela de login e cadastro representadas.
- [x] Telas relacionadas às campanhas representadas.
- [x] Fluxo de realização de doação representado.
- [x] Tela de histórico do doador representada.
- [x] Telas principais da entidade representadas.
- [x] Painel administrativo representado.
- [x] Fluxo visual básico entre as telas representado.

## Resultado Esperado

Ao final desta atividade, deverá existir uma representação inicial da estrutura visual do DoaSync, permitindo compreender a organização das principais telas e os fluxos de navegação dos perfis de **Doador, Entidade e Administrador**.

Os wireframes possuem caráter inicial e poderão ser refinados após as validações com o cliente e durante a evolução do projeto.
