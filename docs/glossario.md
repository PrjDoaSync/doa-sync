# Glossário do Domínio — DoaSync

> **Documento:** `docs/glossario.md`  
> **Tarefa:** `[DOC-07]` (#186)  
> **Objetivo:** Padronizar a terminologia utilizada entre as equipes de Documentação, Produto/UX (Figma), Desenvolvimento (Back-end/Front-end) e Qualidade (QA), eliminando ambiguidades nos requisitos, código e interfaces.

---

## 1. Desambiguação de Termos Críticos entre Equipes

A tabela abaixo estabelece o **termo canônico oficial** do projeto frente às variações encontradas nos protótipos do Figma, na modelagem inicial de dados (DER) e nos documentos de requisitos:

| Termo Oficial (Canônico) | Termos Variantes / Outras Equipes | Diferença e Regra de Uso no DoaSync |
| :--- | :--- | :--- |
| **Campanha** | *Projeto* (README / DER inicial), *Causa*, *Ação* | **Campanha** é a unidade ativa de arrecadação com período definido (início/fim), meta financeira e/ou de itens, vinculada a uma Entidade. **Projeto** refere-se apenas à iniciativa social contínua ou estrutura legada do DER inicial; nas interfaces e APIs, deve-se usar **Campanha**. |
| **Entidade** | *Instituição*, *ONG*, *Organização*, *Entidade Assistencial* | **Entidade** (`ENTIDADE`) é a organização sem fins lucrativos cadastrada para receber doações e gerir campanhas. *Instituição* e *ONG* são aceitos apenas como sinónimos descritivos em textos de interface (UX), nunca como nome de recurso na API ou banco de dados. |
| **Doador (PF / PJ)** | *Usuário*, *Contribuinte*, *Apoiador* | **Usuário** (`USUARIO`) é a entidade base de autenticação do sistema. **Doador** é o perfil de acesso (`ROLE_DOADOR`) que realiza contribuições, podendo ser **Pessoa Física (PF)** — identificada por CPF e maior de 18 anos — ou **Pessoa Jurídica (PJ)** — identificada por CNPJ. |
| **Triagem** | *Homologação*, *Aprovação de Cadastro*, *Conferência Física* | Possui dois contextos distintos no sistema que não devem ser misturados: <br>1. **Triagem Cadastral (Onboarding):** análise administrativa dos documentos (CNPJ/estatuto) para aprovar ou reprovar uma Entidade (`PENDENTE` → `APROVADA`/`REPROVADA`). <br>2. **Triagem / Conferência de Itens:** inspeção física realizada pela Entidade ao receber doações materiais antes de dar entrada no estoque. |
| **Prestação de Contas** | *Encerramento*, *Transparência*, *Conciliação de Despesas* | Processo formal realizado pelo Gestor ao encerrar uma Campanha, detalhando a aplicação dos recursos arrecadados, saldo final e anexando comprovantes/notas fiscais para consulta pública e auditoria. |
| **Doação Anônima** | *Doação Oculta*, *Doador Convidado (Guest)* | Doação em que os dados pessoais do doador (nome, e-mail, CPF/CNPJ, telefone) são ocultados da Entidade beneficiada e da exibição pública (conformidade LGPD), mantendo-se o vínculo interno apenas para o histórico privado do próprio doador. |

---

## 2. Glossário Alfabético do Domínio

### A
* **Administrador (Admin):** Perfil de acesso (`ADMINISTRADOR`) responsável pela governança global da plataforma, incluindo triagem/homologação de entidades, desativação de campanhas por violação de políticas e monitoramento de indicadores gerais (KPIs).
* **Agendamento:** Reserva de data, turno/horário e modalidade (**Entrega na Sede** ou **Retirada em Domicílio**) vinculada a uma doação de itens físicos.
* **Almoxarifado / Controle de Estoque:** Módulo operacional da Entidade destinado ao registo de entradas (após conferência física), saídas/destinações e saldo atualizado de suprimentos doados.

### C
* **Campanha:** Iniciativa temporal de arrecadação criada por uma Entidade aprovada, contendo título, descrição, categoria, nível de urgência, período de vigência e metas financeiras e/ou de itens. Passa pelos estados: `RASCUNHO`, `AGENDADA`, `ATIVA`, `ENCERRADA` e `DESATIVADA`.
* **Comprovante / Recibo de Doação:** Documento digital (visualização em ecrã e download em PDF) emitido após a confirmação da doação, contendo código identificador único (ex.: `DS-1080`), data, valor/itens e destino.
* **Conferência Física:** Ato de validar presencialmente a quantidade e o estado de conservação dos itens físicos entregues ou recolhidos, alterando o estado da doação de `PENDENTE` para `CONCLUÍDA`.

### D
* **Doação:** Contribuição voluntária realizada por um Doador para uma Campanha ativa ou diretamente para uma Entidade aprovada. Classifica-se quanto à natureza em **Doação Financeira** (monetária, via PIX, cartão ou boleto) ou **Doação de Itens** (bens materiais).
* **Doação Recorrente (Lembrete):** Modalidade de apoio periódico (ex.: semanal/mensal) configurada pelo doador na interface para lembretes de nova contribuição, sem débito automático bancário no MVP.
* **Doador:** Perfil de utilizador (`DOADOR`) habilitado a explorar campanhas, efetuar doações financeiras ou materiais, agendar entregas, emitir recibos e consultar o seu histórico individual.
* **Doador PF / PJ:** Especialização cadastral do Doador: **Pessoa Física (PF)**, vinculada a um CPF válido (idade mínima de 18 anos), e **Pessoa Jurídica (PJ)**, vinculada a um CNPJ válido e razão social.

### E
* **Encerramento de Campanha:** Finalização definitiva de uma campanha (por expiração da data limite ou ação manual do Gestor), bloqueando o recebimento de novas doações e habilitando a etapa de Prestação de Contas.
* **Entidade (Entidade Assistencial):** Organização da sociedade civil sem fins lucrativos cadastrada no DoaSync. Inicia com estado `PENDENTE` e só pode publicar campanhas ou receber doações após atingir o estado `APROVADA`.

### G
* **Gestor de Entidade:** Perfil de utilizador (`GESTOR`) vinculado a uma única Entidade, com permissão para criar/editar campanhas, conferir doações recebidas, gerir estoque e publicar prestações de contas exclusivamente da sua instituição.

### M
* **Meta Híbrida:** Configuração de campanha que combina simultaneamente um objetivo financeiro (em Reais — BRL) e uma lista quantitativa de itens físicos necessários.

### O
* **Onboarding de Entidade:** Fluxo de registo inicial de uma organização na plataforma, exigindo dados institucionais, endereço, dados do responsável legal e envio de documentos comprobatórios em PDF para triagem administrativa.

### P
* **Prestação de Contas:** Relatório consolidado de encerramento de campanha que demonstra a destinação dos valores e itens arrecadados, acompanhado de comprovantes fiscais e relato final à comunidade.
* **Projeto:** Termo utilizado na conceção inicial do sistema (DER v1) para designar iniciativas sociais das entidades; na arquitetura atual do produto, foi consolidado sob o conceito operacional de **Campanha**.

### R
* **Rascunho:** Estado inicial de uma campanha salva durante o assistente de criação (*wizard*) antes de ser revisada e publicada oficialmente para o público.

### T
* **Timeline Comunitária:** Mural cronológico dentro da página de acompanhamento da campanha onde o Gestor publica atualizações, fotos e marcos de progresso para os doadores.
* **Triagem:** Etapa de verificação e filtragem antes da efetivação de um registo no sistema, aplicada tanto à análise documental de novas Entidades pelo Administrador quanto à conferência de itens físicos recebidos pela Entidade.

### U
* **Usuário:** Conta base de acesso ao DoaSync (`USUARIO`), composta por credenciais de autenticação (e-mail e senha armazenada em hash) e associada a um ou mais papéis de autorização (`DOADOR`, `GESTOR`, `ADMINISTRADOR`).

---

## 3. Siglas e Termos Técnicos de Engenharia

| Sigla / Termo | Significado no Contexto do Projeto |
| :--- | :--- |
| **CA / CT** | **Critério de Aceite** (especificado em Gherkin: `Dado / Quando / Então`) e **Caso de Teste** (roteiro de verificação de QA). |
| **DER** | **Diagrama Entidade-Relacionamento**, modelo conceptual da base de dados PostgreSQL do DoaSync. |
| **IDOR** | *Insecure Direct Object Reference* — vulnerabilidade testada para garantir que um Gestor não aceda a dados de outra Entidade alterando IDs na URL/API. |
| **LGPD** | **Lei Geral de Proteção de Dados**, diretriz que rege o consentimento no cadastro, mascaramento de dados sensíveis e suporte à Doação Anônima. |
| **MVP** | *Minimum Viable Product* — escopo prioritário definido em `definicao-mvp.md` (DOC-04). |
| **RBAC** | *Role-Based Access Control* — controlo de acesso baseado nos perfis `DOADOR`, `GESTOR` e `ADMINISTRADOR` via token JWT. |
| **RF / RNF** | **Requisito Funcional** e **Requisito Não Funcional**. |
| **Shift-Left** | Prática adotada pela equipa de QA para antecipar a análise de inconsistências entre protótipos (Figma) e requisitos antes da implementação. |
