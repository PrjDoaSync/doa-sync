# Manual do Usuário — Entidade e Administrador

> **Issue:** [#193 — DOC-14](https://github.com/PrjDoaSync/doa-sync/issues/193)
> **Versão baseada em:** frontend web em modo demonstração (`doasync-frontend`, branch `develop`) e nas regras de negócio ([`regras-negocio.md`](../regras-negocio.md)).

Este guia é para quem representa uma **entidade assistencial** cadastrada no DoaSync e para quem **administra a plataforma**.

## Antes de começar

> **Estado atual do sistema.** A versão web disponível hoje é uma **demonstração**. Ela usa **dados fictícios**, e as alterações valem somente durante a sessão. Um aviso fixo no topo lembra disso. Alguns botões aparecem desabilitados (por exemplo, **Exportar** e **Alterar imagem**) porque dependem da integração com o backend. Recursos ainda não desenvolvidos aparecem na seção **Limitações conhecidas** no fim deste manual.

| Símbolo | Significado |
|---|---|
| ✅ **Disponível** | A tela existe na demonstração |
| 🕒 **Previsto** | Definido nas regras do projeto, ainda sem tela |

**Quem pode fazer o quê:**

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

## 1. Cadastrar a entidade ✅ Disponível (demonstração)

1. Na página inicial, clique em **Para entidades** (menu superior) ou em **Cadastrar entidade** na tela de login.
2. Em **Informações da entidade**, preencha os dados pedidos na tela. Pelas regras (RN46), a entidade deve informar também o responsável legal (nome e CPF).
3. Em **Documentos para verificação**, anexe os arquivos pedidos: comprovante de CNPJ, estatuto e documento do responsável.
4. Confira a lista de verificação:
   - dados institucionais atualizados;
   - responsável legal identificado;
   - comprovante de CNPJ;
   - estatuto e documento do responsável.
5. Envie o cadastro.

📷 *Captura pendente:* `img/entidade/01-cadastro.png`

Todo cadastro começa com o status **Pendente**. Até a aprovação, a entidade **não aparece publicamente**, não cria campanhas e não recebe doações.

| Status | Significado | O que fazer |
|---|---|---|
| Pendente | Aguardando análise do administrador | Aguardar |
| Aprovada | Entidade pública, pode criar campanhas | Usar a plataforma |
| Reprovada | O administrador informou um motivo, visível para você | Corrigir os dados e reenviar. O cadastro volta a *Pendente* |
| Inativa | Desativada pelo administrador | Falar com a equipe DoaSync. Campanhas ativas foram encerradas |

## 2. Entrar na área da entidade ✅ Disponível (demonstração)

1. Clique em **Entrar** e, na tela **Entre na sua conta**, informe e-mail e senha.
2. Você chega ao **Dashboard** da entidade.

O menu lateral tem: **Dashboard**, **Campanhas**, **Doações**, **Doadores**, **Itens doados**, **Relatórios** e **Configurações**.

📷 *Captura pendente:* `img/entidade/02-dashboard.png`

## 3. Atualizar os dados da entidade ✅ Disponível

1. No menu, clique em **Configurações**.
2. Altere as informações e salve.

O CNPJ não pode ser alterado depois do cadastro. Para dar acesso a outras pessoas da equipe, use **Usuários e permissões**: clique em convidar, informe o e-mail e escolha o perfil. Também é possível alterar o perfil ou ativar e inativar quem já tem acesso.

📷 *Captura pendente:* `img/entidade/03-configuracoes.png`

## 4. Criar uma campanha ✅ Disponível

Somente entidades **aprovadas** criam campanhas.

1. No menu, clique em **Campanhas** e depois em **Nova campanha**.
2. **Dados básicos:** nome (exemplo: "Mesa solidária para 200 famílias"), categoria, cidade e descrição. Conte a história, quem será beneficiado e como a doação será usada. Clique em **Continuar**.
3. **Metas e necessidades:** informe a meta financeira, o período e os itens necessários, com a quantidade de cada um. Clique em **Continuar**.
4. **Revisão e publicação:** escolha a imagem de capa, confira o resumo e publique.

📷 *Captura pendente:* `img/entidade/04-nova-campanha.png`

> Na demonstração, o envio de imagem própria ainda não funciona. Escolha uma imagem de exemplo.

Dicas para uma boa campanha: escolha um nome fácil de entender, explique como os recursos serão usados, informe o período e mantenha as informações transparentes.

## 5. Editar uma campanha ✅ Disponível

1. Em **Campanhas**, localize a campanha e abra a opção de edição.
2. Em **Editar campanha**, altere as informações, a meta e os itens.
3. Clique em **Salvar alterações**.

A edição só é permitida enquanto a campanha está **Ativa**. Campanhas encerradas ficam somente para consulta.

📷 *Captura pendente:* `img/entidade/05-editar-campanha.png`

## 6. Encerrar uma campanha ✅ Disponível (via API)

O encerramento é manual, via API: `PATCH /api/v1/campanhas/{id}/status` com `{ "status": "ENCERRADA" }`. A interface gráfica para essa ação ainda não existe (limitação L7). A lista de campanhas mostra os status **Rascunho**, **Agendada**, **Ativa**, **Encerrada** e **Desativada**.

## 7. Acompanhar doações e progresso ✅ Disponível

1. Em **Campanhas**, abra o **Acompanhamento** da campanha.
2. Veja:
   - **Doações recebidas**, com filtro por modalidade;
   - **Progresso dos itens**;
   - **Timeline de atualizações**.
3. Para avisar os doadores sobre o andamento, use **Publicar uma atualização**.

📷 *Captura pendente:* `img/entidade/06-acompanhamento.png`

Somente doações **confirmadas** entram no progresso da campanha. Para ver todas as doações da entidade, use **Doações** no menu. Em **Doadores** você vê apenas o nome dos doadores identificados. Doações anônimas aparecem como "Doador anônimo". E-mail, telefone, CPF e endereço do doador nunca são exibidos.

> As telas **Entidades** e **AcompanhamentoCampanha** usam dados de demonstração. **Campanhas** e **Doações** já consultam o serviço de API (F5).

Para prestar contas, abra a campanha e acesse **Prestação de contas**. Em **Relatórios** ficam os resumos da entidade.

---

# Parte 2 — Administrador

## 8. Acompanhar as entidades ✅ Disponível

1. No menu lateral, no rodapé, clique em **Entidades**.
2. Em **Gestão de entidades**, veja os totais (**Entidades ativas**, **Em análise** e **Total de entidades**).
3. Use a busca por entidade, cidade ou categoria e o filtro **Todos os status**.

📷 *Captura pendente:* `img/admin/01-gestao-entidades.png`

A tabela mostra a categoria, as campanhas ativas, as doações recebidas e o status de cada entidade.

## 9. Aprovar, reprovar e desativar entidades 🕒 Previsto

A tela de aprovação ainda não existe no frontend (limitação L5). O fluxo definido nas regras (RN52 a RN55) e disponível na API é:

1. `PATCH /api/v1/entidades/{id}/status` com `{ "status": "APROVADA" }` — entidade passa a ser pública e pode criar campanhas.
2. `PATCH /api/v1/entidades/{id}/status` com `{ "status": "REPROVADA", "motivo": "..." }` — motivo obrigatório (RN54), fica visível para a entidade.
3. `PATCH /api/v1/entidades/{id}/status` com `{ "status": "INATIVA" }` — encerra campanhas ativas automaticamente (RN55). O histórico é mantido.

## 10. Gerenciar usuários ✅ Disponível

Em **Configurações** → **Usuários e permissões**, é possível convidar pessoas, alterar o perfil de acesso e ativar ou inativar usuários da entidade.

O administrador da plataforma pode ativar e desativar qualquer usuário via API (`PATCH /api/v1/usuarios/{id}/status`), exceto a si mesmo.

## 11. Indicadores (painel administrativo) 🕒 Previsto

O painel de indicadores gerais da plataforma (KPIs) está definido na API (`GET /api/v1/dashboard/kpis`). O **Dashboard** da demonstração mostra os indicadores da entidade (limitação L6). Atualize esta seção quando o painel do administrador for entregue no frontend.

---

## 12. Dúvidas frequentes

| Pergunta | Resposta |
|---|---|
| Minha entidade foi reprovada. E agora? | Leia o motivo, corrija os dados e reenvie. O cadastro volta para análise |
| Posso criar campanha antes da aprovação? | Não |
| Posso editar uma doação confirmada? | Não. Doações confirmadas não podem ser editadas nem excluídas |
| O doador aparece com nome completo? | Apenas o nome, quando a doação não é anônima |
| Minha entidade foi desativada. O que acontece com as campanhas? | São encerradas automaticamente e o histórico continua disponível |
| Como encerro uma campanha pela interface? | Ainda não é possível pela interface (limitação L7). Use a API diretamente |

## Limitações conhecidas

| ID | Limitação |
|---|---|
| L5 | Não há tela para o administrador aprovar, reprovar ou desativar entidades. A ação é feita via API: `PATCH /api/v1/entidades/{id}/status` (F2) |
| L6 | Não há painel de KPIs do administrador na interface. Os indicadores estão disponíveis na API: `GET /api/v1/dashboard/kpis` (F3) |
| L7 | Não há botão para encerrar campanha na interface. O encerramento é feito via API: `PATCH /api/v1/campanhas/{id}/status` (F4) |
| L8 | A revisão de linguagem deste manual pelo QA e por um integrante da equipe de Documentação que não escreveu o texto está pendente (Q3, C8) |
