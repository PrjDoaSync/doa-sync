# Glossário do Domínio — DoaSync

> **Documento:** `docs/glossario.md`  
> **Tarefa:** `[DOC-07]` (#186)  
> **Objetivo:** Padronizar a terminologia utilizada entre as equipes de Documentação, Produto/UX (Figma), Desenvolvimento (Back-end/Front-end) e Qualidade (QA), eliminando ambiguidades nos requisitos, código e interfaces.

> **Fonte dos valores de enum:** os tipos de usuário e os status citados abaixo foram conferidos no código do `doasync-backend` (`main`): `TipoUsuario`, `StatusDoacao`, `StatusEntidade` e `StatusCampanha`. Termos marcados como **fora do MVP** descrevem funcionalidades previstas no levantamento que não fazem parte do escopo atual (ver [definicao-mvp.md](./definicao-mvp.md)).

---

## 1. Desambiguação de Termos Críticos entre Equipes

A tabela abaixo estabelece o **termo canônico oficial** do projeto frente às variações encontradas nos protótipos do Figma, na modelagem inicial de dados (DER) e nos documentos de requisitos:

| Termo Oficial (Canônico) | Termos Variantes / Outras Equipes | Diferença e Regra de Uso no DoaSync |
| :--- | :--- | :--- |
| **Campanha** | *Projeto* (README / DER inicial), *Causa*, *Ação* | **Campanha** é a unidade ativa de arrecadação com período definido (início/fim) e meta financeira, vinculada a uma Entidade. **Projeto** refere-se apenas à iniciativa social contínua ou estrutura legada do DER inicial; nas interfaces e APIs, deve-se usar **Campanha**. |
| **Entidade** | *Instituição*, *ONG*, *Organização*, *Entidade Assistencial* | **Entidade** é a organização sem fins lucrativos cadastrada para receber doações e gerir campanhas; sua conta de acesso tem `tipo ENTIDADE`. *Instituição* e *ONG* são aceitos apenas como sinônimos descritivos em textos de interface (UX), nunca como nome de recurso na API ou banco de dados. |
| **Doador (PF / PJ)** | *Usuário*, *Contribuinte*, *Apoiador* | **Usuário** é a conta base de autenticação do sistema. **Doador** é o ator que realiza contribuições; não existe tipo `DOADOR` no código. O doador é um usuário com `tipo PESSOA_FISICA` (PF) — identificado por CPF e maior de 18 anos — ou `tipo PESSOA_JURIDICA` (PJ) — identificado por CNPJ. |
| **Triagem** | *Homologação*, *Aprovação de Cadastro*, *Conferência Física* | No MVP, **Triagem** é apenas a **triagem cadastral (onboarding)**: análise administrativa dos dados da Entidade para aprová-la ou reprová-la (`PENDENTE` → `APROVADA`/`REPROVADA`). A triagem/conferência física de itens doados está **fora do MVP**. |
| **Prestação de Contas** | *Encerramento*, *Transparência*, *Conciliação de Despesas* | **Fora do MVP** (proposta para pós-MVP). Processo formal realizado pela Entidade ao encerrar uma Campanha, detalhando a aplicação dos recursos arrecadados, saldo final e anexando comprovantes/notas fiscais. |
| **Doação Anônima** | *Doação Oculta* | Doação em que os dados pessoais do doador (nome, e-mail, CPF/CNPJ, telefone) são ocultados da Entidade beneficiada e da exibição pública (conformidade LGPD), mantendo-se o vínculo interno apenas para o histórico privado do próprio doador. Exige conta autenticada: não se confunde com checkout de convidado (*guest*), que está fora do MVP. |

### 1.1 Atores × tipo de usuário no código

Cada usuário tem **um único** `TipoUsuario`. Não existem os papéis `DOADOR`, `GESTOR` ou `ADMINISTRADOR` no código.

| Ator (documentação / UX) | `TipoUsuario` |
| :--- | :--- |
| Doador Pessoa Física | `PESSOA_FISICA` |
| Doador Pessoa Jurídica | `PESSOA_JURIDICA` |
| Gestor de entidade | `ENTIDADE` |
| Administrador | `ADMIN` |

---

## 2. Glossário Alfabético do Domínio

### A
* **Administrador (Admin):** Usuário com `tipo ADMIN`, responsável pela governança global da plataforma, incluindo triagem de entidades, desativação de campanhas por violação de políticas e monitoramento de indicadores gerais (KPIs).
* **Agendamento:** **Fora do MVP.** Reserva de data, turno/horário e modalidade (**Entrega na Sede** ou **Retirada em Domicílio**) vinculada a uma doação de itens físicos.
* **Almoxarifado / Controle de Estoque:** **Fora do MVP.** Módulo operacional da Entidade destinado ao registro de entradas (após conferência física), saídas/destinações e saldo atualizado de suprimentos doados.

### C
* **Campanha:** Iniciativa temporal de arrecadação criada por uma Entidade aprovada, contendo título, descrição, período de vigência e meta financeira. Passa pelos estados de `StatusCampanha`: `RASCUNHO`, `AGENDADA`, `ATIVA`, `ENCERRADA` e `DESATIVADA`.
* **Comprovante / Recibo de Doação:** Documento digital exibido em tela após a confirmação da doação, contendo código identificador único (ex.: `DS-1080`), data, valor e destino.
* **Conferência Física:** **Fora do MVP.** Ato de validar presencialmente a quantidade e o estado de conservação dos itens físicos entregues ou coletados.

### D
* **Doação:** Contribuição financeira voluntária realizada por um Doador para uma Campanha ativa ou diretamente para uma Entidade aprovada. No MVP o pagamento é por PIX simulado, e a doação já é registrada como `CONFIRMADA`. Status (`StatusDoacao`): `PENDENTE`, `CONFIRMADA` e `CANCELADA`. A **doação de itens** (bens materiais) está **fora do MVP**.
* **Doação Recorrente (Lembrete):** **Fora do MVP.** Modalidade de apoio periódico (ex.: semanal/mensal) configurada pelo doador para lembretes de nova contribuição, sem débito automático bancário.
* **Doador:** Usuário com `tipo PESSOA_FISICA` ou `PESSOA_JURIDICA`, habilitado a explorar campanhas, efetuar doações financeiras, consultar comprovantes e consultar o seu histórico individual.
* **Doador PF / PJ:** Especialização cadastral do Doador: **Pessoa Física (PF)**, vinculada a um CPF válido (idade mínima de 18 anos), e **Pessoa Jurídica (PJ)**, vinculada a um CNPJ válido e razão social.

### E
* **Encerramento de Campanha:** Finalização definitiva de uma campanha (por expiração da data limite, ação manual da Entidade ou inativação da Entidade), bloqueando o recebimento de novas doações.
* **Entidade (Entidade Assistencial):** Organização da sociedade civil sem fins lucrativos cadastrada no DoaSync. Status (`StatusEntidade`): `PENDENTE`, `APROVADA`, `REPROVADA` e `INATIVA`. Inicia como `PENDENTE` e só pode publicar campanhas ou receber doações após atingir `APROVADA`. Ao virar `INATIVA`, suas campanhas ativas e agendadas são encerradas.

### G
* **Gestor de Entidade:** Pessoa que opera a conta da Entidade (`tipo ENTIDADE`), com permissão para criar/editar campanhas e consultar doações recebidas exclusivamente da sua instituição.

### M
* **Meta Híbrida:** **Fora do MVP.** Configuração de campanha que combina um objetivo financeiro (em Reais — BRL) e uma lista quantitativa de itens físicos necessários.

### O
* **Onboarding de Entidade:** Fluxo de registro inicial de uma organização na plataforma, exigindo dados institucionais, endereço e dados do responsável legal para triagem administrativa.

### P
* **Prestação de Contas:** **Fora do MVP.** Relatório consolidado de encerramento de campanha que demonstra a destinação dos valores arrecadados, acompanhado de comprovantes fiscais e relato final à comunidade.
* **Projeto:** Termo utilizado na concepção inicial do sistema (DER v1) para designar iniciativas sociais das entidades; na arquitetura atual do produto, foi consolidado sob o conceito operacional de **Campanha**.

### R
* **Rascunho:** Status `RASCUNHO` de uma campanha salva antes de ser publicada para o público.

### T
* **Timeline Comunitária:** **Fora do MVP.** Mural cronológico na página de acompanhamento da campanha onde a Entidade publica atualizações, fotos e marcos de progresso para os doadores.
* **Triagem:** Etapa de verificação antes da efetivação de um registro no sistema. No MVP, aplica-se à análise das novas Entidades pelo Administrador; a triagem física de itens recebidos está **fora do MVP**.

### U
* **Usuário:** Conta base de acesso ao DoaSync, composta por credenciais de autenticação (e-mail e senha armazenada em hash) e por um único tipo (`TipoUsuario`): `PESSOA_FISICA`, `PESSOA_JURIDICA`, `ENTIDADE` ou `ADMIN`.

---

## 3. Siglas e Termos Técnicos de Engenharia

| Sigla / Termo | Significado no Contexto do Projeto |
| :--- | :--- |
| **CA / CT** | **Critério de Aceite** (especificado em Gherkin: `Dado / Quando / Então`) e **Caso de Teste** (roteiro de verificação de QA). |
| **DER** | **Diagrama Entidade-Relacionamento**, modelo conceitual do banco de dados PostgreSQL do DoaSync. |
| **IDOR** | *Insecure Direct Object Reference* — vulnerabilidade testada para garantir que um usuário `ENTIDADE` não acesse dados de outra Entidade alterando IDs na URL/API. |
| **LGPD** | **Lei Geral de Proteção de Dados**, diretriz que rege o consentimento no cadastro, mascaramento de dados sensíveis e suporte à Doação Anônima. |
| **MVP** | *Minimum Viable Product* — escopo prioritário definido em `definicao-mvp.md` (DOC-04). |
| **RBAC** | *Role-Based Access Control* — controle de acesso baseado no `TipoUsuario` (`PESSOA_FISICA`, `PESSOA_JURIDICA`, `ENTIDADE`, `ADMIN`) via token JWT. |
| **RF / RNF** | **Requisito Funcional** e **Requisito Não Funcional**. |
| **Shift-Left** | Prática adotada pela equipe de QA para antecipar a análise de inconsistências entre protótipos (Figma) e requisitos antes da implementação. |
