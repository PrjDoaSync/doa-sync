# Manual do Usuário — Doador

> **Issue:** [#192 — DOC-13](https://github.com/PrjDoaSync/doa-sync/issues/192)
> **Versão baseada em:** frontend web em modo demonstração (`doasync-frontend`, branch `develop`) e nas regras de negócio ([`regras-negocio.md`](../regras-negocio.md)).

Este guia mostra como apoiar uma campanha no DoaSync. Você não precisa de conhecimento técnico.

## Antes de começar

> **Estado atual do sistema.** A versão web disponível hoje é uma **demonstração**. Ela usa **dados fictícios**, não cobra nenhum valor e não exige login real. Um aviso fixo no topo da tela lembra disso. As telas de cadastro do doador e de histórico de doações ainda **não existem** no frontend. Elas estão descritas aqui como "Previsto", conforme as regras de negócio, e este manual deve ser atualizado quando forem entregues.

| Símbolo | Significado |
|---|---|
| ✅ **Disponível** | A tela já existe na demonstração |
| 🕒 **Previsto** | Definido nas regras do projeto, ainda sem tela |

---

## 1. Criar sua conta 🕒 Previsto

Para doar, você precisa ter uma conta de doador. Quem visita o site sem conta só pode ver as campanhas.

Você pode se cadastrar como **pessoa física** ou **pessoa jurídica**.

**Dados pedidos (pessoa física):**

| Campo | Observação |
|---|---|
| Nome | |
| E-mail | Cada e-mail só pode ter uma conta |
| CPF | Cada CPF só pode ter uma conta |
| Data de nascimento | É preciso ter 18 anos ou mais |
| Telefone | Pelo menos um |
| Senha | Mínimo de 8 caracteres, com letras e números |

Pessoas jurídicas informam CNPJ e razão social no lugar de CPF e data de nascimento.

Passo a passo:

1. Na página inicial, clique em **Entrar** e escolha criar conta.
2. Preencha os campos.
3. Leia e aceite a política de privacidade ([resumo](../privacidade-lgpd.md)).
4. Clique para concluir. Depois, entre com seu e-mail e senha.

📷 *Captura pendente:* `img/doador/01-cadastro.png`

**Se algo der errado**

| Mensagem | O que fazer |
|---|---|
| E-mail ou CPF já cadastrado | Use a opção de entrar. Se esqueceu a senha, use **Esqueceu sua senha?** |
| Senha inválida | Use pelo menos 8 caracteres, com letras e números |
| Menor de idade | O cadastro é permitido somente para maiores de 18 anos |

---

## 2. Entrar na conta ✅ Disponível (demonstração)

1. Na página inicial, clique em **Entrar**, no canto superior direito.
2. Na tela **Entre na sua conta**, informe e-mail e senha.
3. Se esqueceu a senha, clique em **Esqueceu sua senha?**.

📷 *Captura pendente:* `img/doador/02-login.png`

> Na demonstração, o login não autentica ninguém. Para sair da conta no sistema real, use a opção **Sair**.

---

## 3. Encontrar uma campanha ✅ Disponível

1. Na página inicial, role até **Encontre uma causa para apoiar** ou clique em **Explorar campanhas** no menu.
2. Na página **Encontre sua próxima boa ação**, use:
   - o campo **Campanha ou entidade** para buscar por nome;
   - o filtro **Todas as categorias**;
   - o filtro **Todas as cidades**;
   - a ordenação **Mais recentes** ou **Mais próximas da meta**.
3. Clique no cartão da campanha para abrir os detalhes.

📷 *Captura pendente:* `img/doador/03-explorar.png`

Na página da campanha você vê a história, as **necessidades da campanha**, o prazo de **encerramento**, o quanto já foi arrecadado em relação à meta e a seção **Sobre a entidade**.

📷 *Captura pendente:* `img/doador/04-detalhe-campanha.png`

Somente campanhas **ativas** recebem doações. Se aparecer o aviso **Esta campanha está encerrada**, escolha outra campanha em **Explorar campanhas ativas**.

---

## 4. Fazer uma doação ✅ Disponível (simulada)

1. Na página da campanha, clique no botão para doar.
2. Em **Escolha o tipo de doação**, selecione **Financeira** (dinheiro) ou doação de **itens**.

**Doação financeira**

3. Em **Escolha o valor**, clique em um dos valores sugeridos ou digite outro em **Digite um valor**. O valor precisa ser maior que zero.
4. Em **Forma de pagamento**, escolha **PIX**, **Cartão** ou **Boleto** e siga as instruções da tela.
5. Em **Identificação do doador**, informe nome e e-mail, ou escolha **Doação anônima** (veja a seção 6).
6. Confira o quadro **Sua contribuição** e confirme.

**Doação de itens**

3. Escolha os itens que você vai doar, entre os que a campanha precisa.
4. Informe a identificação do doador (ou **Doação anônima**).
5. Em **Agende a entrega ou a retirada**, escolha o modo, a data e a janela de horário.

📷 *Captura pendente:* `img/doador/05-fluxo-doacao.png`

Ao final, a tela **Doação registrada** mostra o resumo: campanha, doador, valor, forma de pagamento e situação. Sua doação só passa a contar no progresso da campanha depois de **confirmada**.

📷 *Captura pendente:* `img/doador/06-confirmacao.png`

> **Importante:** na demonstração aparece o aviso *"Dados fictícios · nenhum valor é cobrado"*.
>
> **Diferença entre a demonstração e o MVP.** A demonstração mostra PIX, cartão, boleto e doação de itens. As regras do MVP e o backend atual aceitam somente **PIX** como forma de pagamento, e o PIX real depende da definição do gateway (pendência PV01 em [`arquitetura.md`](../arquitetura.md)). Revise esta seção quando o fluxo real for integrado.

Você também pode doar direto para uma **entidade aprovada**, sem escolher uma campanha.

---

## 5. Comprovante e histórico 🕒 Previsto

Depois de doar, o sistema gera um **código de comprovante** com data, valor, destino e forma de pagamento. Em **Minhas doações** você poderá consultar todas as doações feitas por você.

Doações confirmadas **não podem ser editadas nem excluídas**. Se houver erro, entre em contato com a entidade ou com a equipe DoaSync.

📷 *Captura pendente:* `img/doador/07-historico.png`

---

## 6. Doar de forma anônima

Ao marcar **doação anônima**, a entidade e o público veem apenas **"Doador anônimo"**. A doação continua aparecendo no seu histórico.

Em doações **não anônimas**, a entidade vê somente o seu **nome**. E-mail, telefone, CPF e endereço nunca são mostrados a ela.

---

## 7. Seus dados

- Seus dados pessoais não aparecem em páginas públicas.
- Saiba o que é guardado e por quê em [Nota de privacidade](../privacidade-lgpd.md).
- No campo de observação da doação, **não escreva** informações de saúde ou outros dados sensíveis.

## 8. Dúvidas frequentes

| Pergunta | Resposta |
|---|---|
| Preciso de conta para ver campanhas? | Não. A conta é necessária para doar |
| Posso doar sem escolher campanha? | Sim, para uma entidade aprovada |
| Posso cancelar uma doação confirmada? | Não. Entre em contato com a entidade |
| A entidade vê meu CPF? | Não |
| Posso doar com cartão ou boleto? | A demonstração mostra essas opções, mas o MVP prevê somente PIX |
