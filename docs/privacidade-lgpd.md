# Nota de Privacidade e LGPD — DoaSync

> **Issue:** [#194 — DOC-15](https://github.com/PrjDoaSync/doa-sync/issues/194)
> **Base:** RNF-005 e RNF-006 ([`requisitos.md`](./requisitos.md)), RN35, RN72 e RN73 ([`regras-negocio.md`](./regras-negocio.md)) e as migrações Flyway `V1` a `V6` do `doasync-backend`.

Este documento descreve quais dados pessoais o DoaSync coleta, para quê, por quanto tempo ficam guardados e quem os acessa. Ele registra o que o sistema faz **hoje** e lista as limitações conhecidas na seção 7.

> Este texto é documentação técnica do projeto. Não substitui parecer jurídico nem o texto final da política de privacidade exibida ao usuário.

## 1. Papéis no tratamento

| Papel (LGPD) | Quem é no DoaSync |
|---|---|
| Titular | Doador (pessoa física ou jurídica), responsável pela entidade e administrador |
| Controlador | A definir pela organização que operar a plataforma (limitação LGPD-01) |
| Operador | A definir, junto com o controlador (limitação LGPD-01) |

O DoaSync é uma plataforma geral de doações, sem instituição cliente fixa. Cada entidade cadastrada responde pelos dados que recebe dos doadores das suas campanhas. O foco inicial de APAE e Associação Amor Inclusivo foi a base do escopo inicial do projeto e foi descontinuado; nenhuma delas é cliente, controladora ou revisora.

## 2. Dados coletados

Campos conforme as tabelas do banco (`V1`, `V3`) e o `DoadorCadastroRequisicao` do backend. A migração `V6` só acrescenta o status `RASCUNHO` às campanhas e não cria dados pessoais.

### 2.1 Conta de acesso (todo usuário)

| Dado | Campo | Finalidade | Obrigatório |
|---|---|---|---|
| Nome | `usuarios.nome` | Identificar o usuário na plataforma | Sim |
| E-mail | `usuarios.email` | Login e comunicação. É único no sistema (RN42) | Sim |
| Senha | `usuarios.senha_hash` | Autenticação. Guardada somente como hash (RNF-001), nunca em texto | Sim |
| Tipo e status da conta | `usuarios.tipo`, `usuarios.status` | Controle de acesso por perfil e ativação da conta | Sim |
| Datas de cadastro e atualização | `data_cadastro`, `updated_at` | Auditoria e suporte | Sim (gerado) |

### 2.2 Doador pessoa física

| Dado | Campo | Finalidade | Obrigatório |
|---|---|---|---|
| CPF | `pessoas_fisicas.cpf` | Identificar a pessoa e evitar contas duplicadas (RN42) | Sim |
| Data de nascimento | `pessoas_fisicas.data_nascimento` | Verificar a idade mínima de 18 anos (RN44) | Sim |

### 2.3 Doador pessoa jurídica e entidade

| Dado | Campo | Finalidade | Obrigatório |
|---|---|---|---|
| CNPJ | `pessoas_juridicas.cnpj` | Identificar a organização (RN42) | Sim |
| Razão social | `pessoas_juridicas.razao_social` | Identificar a organização | Sim |

CNPJ e razão social identificam organizações. Mesmo assim, em entidades de pequeno porte podem se relacionar a uma pessoa, por isso são tratados com o mesmo cuidado.

### 2.4 Contato e endereço (usuários)

| Dado | Campo | Finalidade | Obrigatório |
|---|---|---|---|
| Telefone e tipo | `telefones.numero`, `telefones.tipo` | Contato com o usuário (RN45) | Sim, ao menos um |
| Endereço completo | `enderecos.*` (logradouro, número, complemento, bairro, cidade, UF, CEP) | Localizar a entidade. Para o doador é opcional (RN45) | Entidade: sim. Doador: não |

### 2.5 Entidade assistencial

| Dado | Campo | Finalidade | Obrigatório |
|---|---|---|---|
| Nome e CPF do responsável | `entidades.responsavel_nome`, `entidades.responsavel_cpf` | Identificar quem responde pela instituição (RN46) | Conforme RN46 |
| E-mail, telefone e WhatsApp de contato | `entidades.email_contato`, `telefone_contato`, `whatsapp` | Contato público com doadores | Não |
| Dados institucionais | `nome_fantasia`, `descricao`, `area_atuacao`, `site`, `logo_url` | Perfil público da entidade | Descrição: sim. Demais: não |
| Motivo de reprovação ou desativação | `entidades.motivo_status` | Informar a entidade sobre a decisão do administrador (RN54) | Quando reprovada |

### 2.6 Doação

| Dado | Campo | Finalidade | Obrigatório |
|---|---|---|---|
| Doador (referência à conta) | `doacoes.doador_id` | Histórico do doador e comprovante | Sim |
| Valor, data e forma de pagamento | `valor`, `data_doacao`, `forma_pagamento` | Registrar a contribuição e calcular o progresso das campanhas | Sim |
| Observação | `observacao` (até 500 caracteres) | Mensagem opcional do doador | Não |
| Doação anônima | `anonima` | Esconder a identidade do doador para a entidade e o público (RN72) | Padrão: não anônima |
| Código do comprovante e chave de idempotência | `codigo_comprovante`, `idempotency_key` | Comprovante e proteção contra registro duplicado | Sim (gerado) |

### 2.7 Dados que o sistema não coleta

- Dados de cartão ou conta bancária. O pagamento no MVP é PIX simulado, sem gateway. O gateway de pagamento está fora do MVP, sem data prevista (C7).
- Dados sensíveis conforme o art. 5º, II da LGPD (saúde, origem racial, convicção religiosa etc.).
- Localização do dispositivo.

> **Atenção (limitação LGPD-05):** o campo `observacao` é texto livre. O usuário pode digitar nele qualquer informação, inclusive sensível. A interface ainda não orienta sobre isso.

## 3. Bases legais e finalidades

> **Aviso:** as bases abaixo são **sugestão técnica, pendente de validação jurídica** (C6). A definição final cabe ao controlador, quando definido.

| Finalidade | Dados | Base legal sugerida (art. 7º) |
|---|---|---|
| Criar e manter a conta, autenticar | Nome, e-mail, senha, CPF/CNPJ, telefone | Execução de contrato ou de procedimentos preliminares (V) |
| Registrar doações e emitir comprovante | Dados da doação e do doador | Execução de contrato (V) |
| Verificar maioridade | Data de nascimento | Cumprimento de obrigação legal ou regulatória (II). A idade mínima é regra do produto (RN44, ainda a confirmar); se não houver exigência legal, a base passa a ser execução de contrato (V) |
| Aprovar e publicar entidades | Dados institucionais e do responsável | Execução de contrato (V) e legítimo interesse (IX) |
| Segurança, auditoria e prevenção a fraude (RNF-009) | Datas, status, chave de idempotência | Legítimo interesse (IX) |
| Aceite da política de privacidade no cadastro | Todos os dados do cadastro | Consentimento (I), exigido pelo RNF-005 — **não implementado** (limitação LGPD-04) |

## 4. Retenção

**Política proposta, ainda não implementada** (C5):

| Tipo de dado | Prazo proposto |
|---|---|
| Conta ativa | Enquanto a conta existir |
| Pedido de eliminação ou desativação | Anonimizar os dados pessoais e manter o registro da doação (compatível com a RN51, sem exclusão física) |
| Doações e prestação de contas | 5 anos |
| Logs de acesso | 6 meses |

O que o sistema faz **hoje**:

| Situação | O que acontece hoje |
|---|---|
| Exclusão de registros | Não há exclusão física. Todas as chaves estrangeiras usam `ON DELETE RESTRICT` para preservar o histórico (RN51) |
| Conta desativada | O usuário passa a `INATIVO`, perde o acesso e os dados permanecem |
| Entidade desativada | Passa a `INATIVA`. Campanhas ativas são encerradas e o histórico continua disponível (RN55) |
| Doação confirmada | Não pode ser editada nem excluída (RN74) |
| Logs e backups | Sem política definida (limitação LGPD-07) |

## 5. Quem acessa os dados

| Dado | Visitante | Doador (próprio) | Entidade | Administrador |
|---|---|---|---|---|
| Perfil público da entidade (nome, descrição, CNPJ, cidade/UF, contato, campanhas ativas) | Sim | Sim | Sim | Sim |
| Dados do responsável da entidade (nome e CPF) | Não (RN56) | Não | Sim, da própria | Sim |
| Conta do responsável (`usuario`) | Não | Não | Sim, da própria | Sim |
| Dados cadastrais do doador (e-mail, CPF, telefone, endereço) | Não | Sim | Não (RN73) | Sim |
| Nome do doador em doação não anônima | Não (RNF-006) | Sim | Sim, somente o nome | Sim |
| Doador em doação anônima | Aparece como "Doador anônimo" | Sim, no próprio histórico | Aparece como "Doador anônimo" | Sim |
| Valores individuais de doações | Não (RNF-006) | Sim, as próprias | Sim, as recebidas | Sim |
| Senha | Ninguém. Somente o hash é guardado | — | — | — |

Controles técnicos:

- Autorização verificada na API, não apenas na interface (RNF-003).
- Comunicação via HTTPS em produção (RNF-002).
- Autenticação por token JWT com validade de 8 horas.
- O dono do recurso é validado no servidor: um token válido não dá acesso a dados de terceiros.
- Os contratos de resposta omitem dados do doador quando a doação é anônima ([`contrato-api.md`](./backend/contrato-api.md)).

## 6. Direitos do titular

A LGPD (art. 18) garante ao titular os direitos abaixo.

| Direito | Situação no MVP |
|---|---|
| Confirmação e acesso aos dados | Parcial. O usuário vê o próprio perfil (`GET /usuarios/me`) |
| Correção de dados | Disponível para os dados editáveis do perfil (`PATCH /usuarios/me`). CPF e CNPJ não são editáveis |
| Anonimização, bloqueio ou eliminação | Não disponível na interface. Proposta: anonimizar e manter o registro da doação (seção 4) |
| Portabilidade | Não disponível |
| Informação sobre compartilhamento | Este documento. Ainda precisa ser publicado na interface |
| Revogação do consentimento | Não disponível |

Enquanto não houver fluxo automatizado, as solicitações devem ser tratadas por contato direto com o responsável da plataforma (canal a definir, limitação LGPD-01).

## 7. Limitações conhecidas

Recursos que ainda não foram desenvolvidos. Nenhum deles bloqueia a publicação deste documento; cada entrada registra o pedido correspondente enviado às equipes.

> Os códigos da coluna "Pedido de origem" (C = coordenação, B = backend, F = frontend) identificam as perguntas da rodada de alinhamento respondida em 23/11/2026. Esse registro não está neste repositório: ao resolver uma limitação, cite a issue correspondente no lugar do código.

| ID | Limitação | Pedido de origem |
|---|---|---|
| LGPD-01 | Controlador, DPO e canal de contato: a definir pela organização que operar a plataforma | C4 |
| LGPD-02 | Retenção proposta (seção 4) ainda não implementada | C5 |
| LGPD-03 | Fluxo de anonimização para pedidos de eliminação não implementado | C5 |
| LGPD-04 | O cadastro não registra aceite da política de privacidade (o `DoadorCadastroRequisicao` não tem esse campo), embora o RNF-005 o exija | B1, F8 |
| LGPD-05 | A interface não orienta o usuário a não incluir dados sensíveis no campo `observacao` | F8 |
| LGPD-06 | Gateway de pagamento fora do MVP, sem data prevista. Quando houver, rever a política (novos dados e um novo operador) | C7 |
| LGPD-07 | Sem política de logs e backups definida (RNF-029 e RNF-030) | B3 |
| LGPD-08 | As páginas `/privacidade` e `/termos` do frontend (`Informacoes.jsx`) descrevem o ambiente demonstrativo, não a política real. Elas ainda dizem que as doações "ficam na memória desta sessão", mas desde o PR #145 do front (24/11/2026) o cadastro de doador, o login e a doação PIX gravam dados reais na API. O texto precisa ser atualizado pela equipe de Frontend antes da publicação | F7 |

## 8. Revisão

Revisar este documento sempre que uma migração alterar tabelas com dados pessoais, quando houver mudança de provedor de hospedagem ou pagamento, e quando cada limitação da seção 7 for resolvida.
