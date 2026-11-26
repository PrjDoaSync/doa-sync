# Manual do Usuário — Entidade e Administrador

> **Issue:** [#193 — DOC-14](https://github.com/PrjDoaSync/doa-sync/issues/193)
> **Versão baseada em:** frontend web (`doasync-frontend`, branch `main`, em 26/11/2026), API (`doasync-backend`, branch `main`) e regras de negócio ([`regras-negocio.md`](../regras-negocio.md)).

Este guia é para quem representa uma **entidade assistencial** cadastrada no DoaSync e para quem **administra a plataforma**.

## Antes de começar

> **Estado atual do sistema.** O **login** já é real. As telas da área de gestão ainda funcionam em **modo demonstração**: mostram **dados fictícios**, e as alterações feitas nelas valem somente durante a sessão e **não são gravadas no sistema**. Alguns botões aparecem desabilitados (por exemplo, **Exportar** e **Alterar imagem**). As ações que ainda não têm tela são feitas pela equipe de suporte. Veja a seção **Limitações conhecidas**, no fim deste manual.

| Símbolo | Significado |
|---|---|
| ✅ **Disponível** | A tela existe e funciona com o sistema real |
| 🧪 **Demonstração** | A tela existe, mas usa dados fictícios e não grava no sistema |
| 🕒 **Previsto** | Definido nas regras do projeto, ainda sem tela |
| 🚫 **Fora do MVP** | Aparece na demonstração, mas não faz parte desta versão do produto |

**Quem pode fazer o quê** (regras do sistema):

| Ação | Entidade | Administrador |
|---|---|---|
| Cadastrar a entidade | Sim | — |
| Editar dados da entidade | Sim, da própria | Sim |
| Criar, editar e encerrar campanhas | Sim, da própria (somente se aprovada) | Pode desativar campanhas |
| Acompanhar doações recebidas | Sim, da própria | Sim, de qualquer entidade |
| Aprovar, reprovar e desativar entidades | Não | Sim (limitação L5) |
| Ver indicadores gerais | Não | Sim (limitação L6) |

---

# Parte 1 — Entidade

## 1. Cadastrar a entidade 🧪 Demonstração

1. Clique em **Entrar** e, na tela de acesso, clique em **Cadastrar entidade**.
2. Em **Informações da entidade**, preencha os dados pedidos na tela. Pelas regras (RN46), a entidade deve informar também o responsável legal (nome e CPF).
3. Envie o cadastro.

📷 *Captura pendente:* `img/entidade/01-cadastro.png`

> A tela também mostra uma área **Documentos para verificação** (comprovante de CNPJ, estatuto e documento do responsável). O envio de documentos **não existe no sistema** nesta versão: ele só aparece na demonstração.

Todo cadastro começa com o status **Pendente**. Até a aprovação, a entidade **não aparece publicamente**, não cria campanhas e não recebe doações.

| Status | Significado | O que fazer |
|---|---|---|
| Pendente | Aguardando análise do administrador | Aguardar |
| Aprovada | Entidade pública, pode criar campanhas | Usar a plataforma |
| Reprovada | O administrador informou um motivo, visível para você | Corrigir os dados e reenviar. O cadastro volta a *Pendente* |
| Inativa | Desativada pelo administrador | Falar com a equipe DoaSync. Campanhas ativas e agendadas foram encerradas |

## 2. Entrar na área da entidade ✅ Disponível

1. Clique em **Entrar** e, na tela **Entre na sua conta**, informe e-mail e senha.
2. Você chega ao **Dashboard** da entidade.

O menu lateral tem: **Dashboard**, **Campanhas**, **Doações**, **Doadores**, **Itens doados**, **Relatórios** e **Configurações**.

📷 *Captura pendente:* `img/entidade/02-dashboard.png`

> O login é real, mas as telas da área de gestão ainda mostram dados de demonstração (limitação L9).

## 3. Atualizar os dados da entidade 🧪 Demonstração

1. No menu, clique em **Configurações**.
2. Altere as informações e salve.

O CNPJ não pode ser alterado depois do cadastro.

📷 *Captura pendente:* `img/entidade/03-configuracoes.png`

> 🚫 A tela **Usuários e permissões** (convidar pessoas e mudar perfis) aparece na demonstração, mas **não existe no sistema**: cada entidade tem uma única conta de acesso.

## 4. Criar uma campanha 🧪 Demonstração

Somente entidades **aprovadas** criam campanhas.

1. No menu, clique em **Campanhas** e depois em **Nova campanha**.
2. **Dados básicos:** nome (exemplo: "Mesa solidária para 200 famílias"), categoria, cidade e descrição. Conte a história, quem será beneficiado e como a doação será usada. Clique em **Continuar**.
3. **Metas e necessidades:** informe a meta financeira e o período. Clique em **Continuar**.
4. **Revisão e publicação:** confira o resumo e publique.

📷 *Captura pendente:* `img/entidade/04-nova-campanha.png`

> 🚫 Os campos de **itens necessários** e de **imagem de capa** aparecem na demonstração, mas a doação de itens está fora do MVP e o envio de imagem própria ainda não funciona.

Dicas para uma boa campanha: escolha um nome fácil de entender, explique como os recursos serão usados, informe o período e mantenha as informações transparentes.

## 5. Editar uma campanha 🧪 Demonstração

1. Em **Campanhas**, localize a campanha e abra a opção de edição.
2. Em **Editar campanha**, altere as informações e a meta.
3. Clique em **Salvar alterações**.

A edição é permitida para campanhas em **Rascunho**, **Agendada** ou **Ativa**. Campanhas **Encerradas** ou **Desativadas** ficam somente para consulta.

📷 *Captura pendente:* `img/entidade/05-editar-campanha.png`

## 6. Encerrar uma campanha 🕒 Previsto

Ainda não há botão para encerrar uma campanha antes do prazo (limitação L7). Se precisar encerrar, peça à equipe de suporte da plataforma.

Quando a data de encerramento chega, a campanha é encerrada automaticamente. A lista de campanhas mostra os status **Rascunho**, **Agendada**, **Ativa**, **Encerrada** e **Desativada**.

## 7. Acompanhar doações e progresso 🧪 Demonstração

1. Em **Campanhas**, abra o **Acompanhamento** da campanha e veja as **doações recebidas**.
2. Para ver todas as doações da entidade, use **Doações** no menu.
3. Em **Doadores**, você vê apenas o nome dos doadores identificados.

📷 *Captura pendente:* `img/entidade/06-acompanhamento.png`

Somente doações **confirmadas** entram no progresso da campanha. Doações anônimas aparecem como "Doador anônimo". E-mail, telefone, CPF e endereço do doador nunca são exibidos.

> 🚫 Aparecem na demonstração, mas estão **fora do MVP**: **Progresso dos itens**, **Itens doados**, **Timeline de atualizações** / **Publicar uma atualização**, **Prestação de contas** e **Relatórios**.

---

# Parte 2 — Administrador

## 8. Acompanhar as entidades 🧪 Demonstração

1. No menu lateral, no rodapé, clique em **Entidades**.
2. Em **Gestão de entidades**, veja os totais (**Entidades ativas**, **Em análise** e **Total de entidades**).
3. Use a busca por entidade, cidade ou categoria e o filtro **Todos os status**.

📷 *Captura pendente:* `img/admin/01-gestao-entidades.png`

A tabela mostra a categoria, as campanhas ativas, as doações recebidas e o status de cada entidade.

## 9. Aprovar, reprovar e desativar entidades 🕒 Previsto

A tela de aprovação ainda não existe (limitação L5). Enquanto isso, a ação é feita pela equipe técnica. As regras (RN52 a RN55) são:

- **Aprovar:** a entidade passa a ser pública e pode criar campanhas.
- **Reprovar:** o motivo é obrigatório (RN54) e fica visível para a entidade.
- **Desativar:** a entidade passa a *Inativa*, e as campanhas ativas e agendadas são encerradas automaticamente (RN55). O histórico é mantido.

> **Nota técnica:** `PATCH /api/v1/entidades/{id}/status` com `status` = `APROVADA`, `REPROVADA` (com `motivo`, até 1000 caracteres) ou `INATIVA`. Ver [`contrato-api.md`](../backend/contrato-api.md).

## 10. Gerenciar usuários 🕒 Previsto

Não há tela para o administrador ativar ou desativar usuários. A ação é feita pela equipe técnica. O administrador não pode desativar a própria conta (RN77).

> **Nota técnica:** `PATCH /api/v1/usuarios/{id}/status`. Ver [`contrato-api.md`](../backend/contrato-api.md).

## 11. Indicadores (painel administrativo) 🕒 Previsto

O painel de indicadores gerais da plataforma (KPIs) ainda não tem tela (limitação L6). O **Dashboard** da demonstração mostra indicadores fictícios da entidade. Atualize esta seção quando o painel do administrador for entregue.

> **Nota técnica:** `GET /api/v1/dashboard/kpis`. Ver [`contrato-api.md`](../backend/contrato-api.md).

---

## 12. Dúvidas frequentes

| Pergunta | Resposta |
|---|---|
| Minha entidade foi reprovada. E agora? | Leia o motivo, corrija os dados e reenvie. O cadastro volta para análise |
| Posso criar campanha antes da aprovação? | Não |
| Posso editar uma doação confirmada? | Não. Doações confirmadas não podem ser editadas nem excluídas |
| O doador aparece com nome completo? | Apenas o nome, quando a doação não é anônima |
| Minha entidade foi desativada. O que acontece com as campanhas? | As ativas e agendadas são encerradas automaticamente, e o histórico continua disponível |
| Como encerro uma campanha antes do prazo? | Ainda não há botão (limitação L7). Peça à equipe de suporte |
| Posso dar acesso a outras pessoas da minha entidade? | Não nesta versão. Cada entidade tem uma única conta |

## Limitações conhecidas

| ID | Limitação |
|---|---|
| L5 | Não há tela para o administrador aprovar, reprovar ou desativar entidades. Hoje a ação é feita pela equipe técnica, via API (F2) |
| L6 | Não há painel de KPIs do administrador na interface. Os indicadores existem só na API (F3) |
| L7 | Não há botão para encerrar campanha antes do prazo. Hoje a ação é feita pela equipe técnica, via API (F4) |
| L8 | A revisão de linguagem deste manual pelo QA e por um integrante da equipe de Documentação que não escreveu o texto está pendente (Q3, C8) |
| L9 | As telas da área de gestão (cadastro da entidade, configurações, campanhas, doações, doadores e entidades) ainda usam dados de demonstração e não gravam no sistema. Somente o login é real (F5) |
