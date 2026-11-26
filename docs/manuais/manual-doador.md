# Manual do Usuário — Doador

> **Issue:** [#192 — DOC-13](https://github.com/PrjDoaSync/doa-sync/issues/192)
> **Versão baseada em:** frontend web integrado à API (`doasync-frontend`, branch `main`, em 26/11/2026) e nas regras de negócio ([`regras-negocio.md`](../regras-negocio.md)).

Este guia mostra como apoiar uma campanha no DoaSync. Você não precisa de conhecimento técnico.

## Antes de começar

> **Estado atual do sistema.** A área do doador já está ligada ao sistema real: o cadastro, o login, a doação e o histórico gravam e leem dados da API. O pagamento ainda é **simulado**: não há cobrança, e a doação é registrada como confirmada assim que você conclui. Recursos ainda não desenvolvidos aparecem na seção **Limitações conhecidas**, no fim deste manual.

| Símbolo | Significado |
|---|---|
| ✅ **Disponível** | A tela existe e funciona com o sistema real |
| 🕒 **Previsto** | Definido nas regras do projeto, ainda sem tela |

---

## 1. Criar sua conta ✅ Disponível

Para doar, você precisa ter uma conta de doador. Quem visita o site sem conta só pode ver as campanhas.

1. Clique em **Entrar** e, na tela de acesso, clique em **Criar conta de doador**.
2. Na tela **Crie sua conta para doar**, escolha **Pessoa física** ou **Pessoa jurídica (empresa)**.
3. Preencha os campos:

| Campo | Pessoa física | Pessoa jurídica | Observação |
|---|---|---|---|
| Nome | Nome completo | Nome do responsável | |
| CPF | Sim | — | Cada CPF só pode ter uma conta |
| Data de nascimento | Sim | — | É preciso ter 18 anos ou mais |
| CNPJ | — | Sim | Cada CNPJ só pode ter uma conta |
| Razão social | — | Sim | |
| E-mail | Sim | Sim | Cada e-mail só pode ter uma conta |
| Telefone | Sim | Sim | |
| Senha e confirmação | Sim | Sim | Mínimo de 8 caracteres |

4. Conclua o cadastro. Você já entra na conta automaticamente.

📷 *Captura pendente:* `img/doador/01-cadastro.png`

**Se algo der errado**

| Mensagem | O que fazer |
|---|---|
| E-mail, CPF ou CNPJ já cadastrado | Use a opção **Entrar** |
| Senha inválida | Use pelo menos 8 caracteres |
| Menor de idade | O cadastro é permitido somente para maiores de 18 anos |

---

## 2. Entrar na conta ✅ Disponível

1. Clique em **Entrar**, no canto superior direito.
2. Na tela **Entre na sua conta**, informe e-mail e senha.

📷 *Captura pendente:* `img/doador/02-login.png`

Se você tentar doar ou abrir **Minhas doações** sem estar logado, o sistema pede o login e depois volta para onde você estava. A sessão expira depois de 8 horas; nesse caso, entre de novo.

> O botão **Esqueci minha senha** ainda não envia e-mail (limitação L2).

---

## 3. Encontrar uma campanha ✅ Disponível

1. Na página inicial, use a busca **Busque uma campanha ou entidade**, ou clique em **Explorar campanhas** no menu.
2. Na página de exploração, use o campo **Campanha ou entidade** e os filtros por categoria e cidade para encontrar uma causa.
3. Clique no cartão da campanha para abrir os detalhes.

📷 *Captura pendente:* `img/doador/03-explorar.png`

Na página da campanha você vê a história, o prazo de encerramento, o quanto já foi arrecadado em relação à meta e a seção **Sobre a entidade**.

📷 *Captura pendente:* `img/doador/04-detalhe-campanha.png`

Somente campanhas **ativas** recebem doações.

---

## 4. Fazer uma doação ✅ Disponível (pagamento simulado)

1. Na página da campanha, clique no botão para doar. Se não estiver logado, entre na conta (seção 2).
2. **Sua contribuição:** em **Qual o valor da sua doação?**, clique em um dos valores sugeridos ou digite outro. O valor precisa ser maior que zero. A forma de pagamento é **PIX**, contribuição única.
3. **Identificação:** em **Quem está doando?**, escolha se a doação aparece com o seu nome ou como **doação anônima** (veja a seção 6). Se quiser, escreva uma mensagem para a entidade.
4. **Confirmação:** em **Confira e confirme sua doação**, revise valor, forma de pagamento e identificação, e clique em **Confirmar doação**.

📷 *Captura pendente:* `img/doador/05-fluxo-doacao.png`

Ao final, você vê o comprovante da doação.

📷 *Captura pendente:* `img/doador/06-confirmacao.png`

> **Importante:** no MVP o PIX é **simulado**. Nenhum valor é cobrado, e a doação é registrada como confirmada na hora. O gateway de pagamento está fora do MVP, sem data prevista.

---

## 5. Comprovante e histórico ✅ Disponível

Depois de doar, o sistema gera um **código de comprovante** com data, valor, destino e forma de pagamento.

1. No menu, abra **Minhas doações** (é preciso estar logado).
2. Use a busca e os filtros por situação e mês, se precisar.
3. Clique em **Ver detalhe** para abrir o comprovante.

📷 *Captura pendente:* `img/doador/07-historico.png`

Doações confirmadas **não podem ser editadas nem excluídas**. Se houver erro, entre em contato com a entidade ou com a equipe DoaSync.

---

## 6. Doar de forma anônima

Ao escolher **doação anônima**, a entidade e o público veem apenas **"Doador anônimo"**. A doação continua aparecendo no seu histórico.

Em doações **não anônimas**, a entidade vê somente o seu **nome**. E-mail, telefone, CPF e endereço nunca são mostrados a ela.

---

## 7. Seus dados

- Seus dados pessoais não aparecem em páginas públicas.
- Saiba o que é guardado e por quê em [Nota de privacidade](../privacidade-lgpd.md).
- Na mensagem da doação, **não escreva** informações de saúde ou outros dados sensíveis.

## 8. Dúvidas frequentes

| Pergunta | Resposta |
|---|---|
| Preciso de conta para ver campanhas? | Não. A conta é necessária para doar |
| Posso doar sem escolher campanha? | Pela interface, não. Hoje a doação é feita a partir da página de uma campanha |
| Posso doar itens (alimentos, roupas)? | Não. A doação de itens está fora do MVP |
| Posso doar com cartão ou boleto? | Não. O MVP prevê somente PIX |
| Posso cancelar uma doação confirmada? | Não. Entre em contato com a entidade |
| A entidade vê meu CPF? | Não |
| Esqueci minha senha. O que faço? | Procure o administrador da plataforma (limitação L2) |

## Limitações conhecidas

| ID | Limitação |
|---|---|
| L1 | O pagamento é simulado: não há gateway, nenhum valor é cobrado e a doação já nasce confirmada |
| L2 | Não há recuperação de senha. O botão **Esqueci minha senha** mostra o aviso "O serviço de recuperação ainda não está integrado" e não envia e-mail. Para redefinir, procure o administrador (B2) |
| L3 | O cadastro não pede o aceite da política de privacidade (ver LGPD-04 em [privacidade-lgpd.md](../privacidade-lgpd.md)) |
| L4 | As páginas **Ajuda**, **Privacidade** e **Termos** ainda descrevem o ambiente de demonstração (ver LGPD-08) |
