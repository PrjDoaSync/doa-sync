# Critérios de Aceite do MVP — DoaSync (Gherkin)

> **Referências:** `definicao-mvp.md` (DOC-04), `requisitos.md`, `funcionalidades.md` e `regras-negocio.md`.
>
> **Numeração:** os cenários seguem os IDs oficiais de `requisitos.md` (RF-001 a RF-030), no formato `CA-RF-0xx.N`. A equivalência com a numeração RF01–RF26 de `funcionalidades.md` está na seção "Equivalência de numeração" daquele arquivo. RF-016, RF-018, RF-019, RF-029 e RF-030 estão fora do MVP e não têm cenário.
>
> **Papéis:** os perfis seguem o `TipoUsuario` do backend: `PESSOA_FISICA` e `PESSOA_JURIDICA` (doadores), `ENTIDADE` (gestor da entidade) e `ADMIN`.
>
> **Pagamento:** sem gateway PIX, o pagamento é simulado e a doação já nasce `CONFIRMADA`.

```gherkin
# language: pt
Funcionalidade: Critérios de Aceite do MVP — DoaSync (RF-001 a RF-028)

  # ============================================================================
  # MÓDULO 1: USUÁRIOS, ACESSO E ENTIDADES (RF-001 a RF-009)
  # ============================================================================

  @RF-001 @cadastro-doador
  Cenário: [CA-RF-001.1] Cadastro de doador Pessoa Física com sucesso
    Dado que um visitante acessa o cadastro de doador como Pessoa Física
    Quando informa nome, e-mail único, CPF único válido, data de nascimento de maior de 18 anos, telefone e senha com no mínimo 8 caracteres contendo letras e números
    Então o sistema cria a conta com tipo "PESSOA_FISICA" e status "ATIVO"
    E armazena a senha utilizando hash seguro sem expô-la na resposta

  @RF-001 @cadastro-doador @excecao
  Cenário: [CA-RF-001.2] Bloqueio de cadastro de doador menor de 18 anos ou com dados duplicados
    Dado que um visitante preenche o cadastro de doador Pessoa Física
    Quando informa idade inferior a 18 anos ou um CPF/e-mail já existente na base
    Então o sistema rejeita o cadastro com erro de validação (idade) ou de conflito (dado duplicado) sem persistir o registro

  @RF-002 @autenticacao
  Cenário: [CA-RF-002.1] Login com credenciais válidas
    Dado que existe um usuário com status "ATIVO" cadastrado na plataforma
    Quando envia e-mail e senha corretos para autenticação
    Então o sistema retorna um token JWT válido contendo o tipo de usuário

  @RF-002 @autenticacao @excecao
  Cenário: [CA-RF-002.2] Bloqueio de login para usuário inativo ou senha incorreta
    Dado que um usuário possui status "INATIVO" ou informa senha incorreta
    Quando tenta realizar login na plataforma
    Então o sistema nega a autenticação e exibe mensagem genérica de erro

  @RF-002 @recuperacao-senha
  Cenário: [CA-RF-002.3] Solicitação e redefinição de senha por e-mail
    Dado que um usuário cadastrado solicita recuperação de senha pelo e-mail vinculado à conta
    Quando acessa o link de uso único dentro do prazo de validade de 1 hora e informa uma nova senha válida
    Então o sistema atualiza o hash da senha e invalida imediatamente o token de recuperação

  @RF-003 @autenticacao
  Cenário: [CA-RF-003.1] Logout encerra a sessão no cliente
    Dado que um usuário está autenticado na plataforma
    Quando realiza logout
    Então o cliente descarta o token JWT
    E o acesso a páginas restritas redireciona para o login

  @RF-004 @perfil
  Cenário: [CA-RF-004.1] Edição de dados permitidos do perfil e bloqueio de identificadores
    Dado que um usuário está autenticado na plataforma
    Quando atualiza seu nome ou telefone e tenta alterar CPF, CNPJ ou e-mail
    Então o sistema salva as alterações dos campos editáveis e bloqueia a alteração de CPF, CNPJ e e-mail

  @RF-005 @autorizacao
  Cenário: [CA-RF-005.1] Restrição de acesso por tipo de usuário (RBAC)
    Dado que um usuário autenticado possui tipo "PESSOA_FISICA" ou "PESSOA_JURIDICA"
    Quando tenta acessar endpoints exclusivos de "ENTIDADE" ou "ADMIN"
    Então o sistema bloqueia a requisição com status HTTP 403 (Acesso Negado)

  @RF-005 @admin
  Cenário: [CA-RF-005.2] Gerenciamento administrativo de usuários
    Dado que o Administrador está autenticado no painel administrativo
    Quando lista os usuários filtrando por tipo e status e altera o status de um usuário para "INATIVO"
    Então o sistema aplica a mudança sem exclusão física, mantendo o histórico e a integridade referencial
    E o usuário inativado deixa de conseguir fazer login

  @RF-005 @admin @excecao
  Cenário: [CA-RF-005.3] Administrador não pode desativar a própria conta (RN77)
    Dado que o Administrador está autenticado no painel administrativo
    Quando tenta alterar o status da própria conta para "INATIVO"
    Então o sistema rejeita a operação com conflito (HTTP 409)
    E a conta do Administrador continua "ATIVO"

  @RF-006 @cadastro-entidade
  Cenário: [CA-RF-006.1] Cadastro de entidade assistencial com dados obrigatórios
    Dado que um representante acessa o cadastro de entidade assistencial
    Quando informa razão social, nome fantasia, CNPJ único válido, e-mail único, telefone, endereço completo, dados do responsável (nome e CPF) e senha válida
    Então o sistema registra a entidade com tipo de usuário "ENTIDADE" e status inicial "PENDENTE"
    E impede que a entidade publique campanhas até aprovação administrativa

  @RF-006 @entidade
  Cenário: [CA-RF-006.2] Edição de informações institucionais pela entidade
    Dado que uma entidade autenticada acessa seu perfil institucional
    Quando atualiza descrição, cidade/UF e canais de contato
    Então o sistema persiste as alterações e mantém bloqueado o CNPJ

  @RF-007 @entidade @autorizacao
  Cenário: [CA-RF-007.1] Gestor opera somente a própria entidade
    Dado que um usuário do tipo "ENTIDADE" está vinculado à entidade "A"
    Quando tenta editar os dados, as campanhas ou consultar as doações da entidade "B"
    Então o sistema bloqueia a requisição com status HTTP 403 (Acesso Negado)
    Mas permite as mesmas operações sobre a entidade "A"

  @RF-008 @entidade
  Cenário: [CA-RF-008.1] Visualização do perfil público apenas de entidades aprovadas
    Dado que existem entidades com status "APROVADA", "PENDENTE", "REPROVADA" e "INATIVA"
    Quando um visitante ou doador consulta o perfil público de uma entidade
    Então o sistema exibe os dados institucionais e campanhas apenas se a entidade estiver com status "APROVADA"
    E não exibe os dados da pessoa responsável (RN56)

  @RF-009 @admin
  Cenário: [CA-RF-009.1] Aprovação de cadastro de entidade pelo Administrador
    Dado que o Administrador está autenticado no painel administrativo
    Quando aprova uma entidade com status "PENDENTE"
    Então o status da entidade passa para "APROVADA" tornando-a visível publicamente

  @RF-009 @admin @excecao
  Cenário: [CA-RF-009.2] Reprovação de entidade exige motivo (RN54)
    Dado que o Administrador está autenticado no painel administrativo
    Quando tenta reprovar uma entidade "PENDENTE" sem informar o motivo
    Então o sistema rejeita a operação com erro de validação e a entidade continua "PENDENTE"
    Mas ao informar um motivo de até 1000 caracteres a entidade passa para "REPROVADA" e o motivo fica visível para ela

  @RF-009 @entidade
  Cenário: [CA-RF-009.3] Reenvio do cadastro após reprovação (RN54)
    Dado que uma entidade está com status "REPROVADA" e consulta o motivo informado pelo Administrador
    Quando corrige os dados do cadastro e reenvia
    Então o status da entidade volta para "PENDENTE" aguardando nova análise

  @RF-009 @admin
  Cenário: [CA-RF-009.4] Desativação de entidade com encerramento automático de campanhas (RN55)
    Dado que existe uma entidade "APROVADA" com campanhas em status "ATIVA" e "AGENDADA"
    Quando o Administrador altera o status dessa entidade para "INATIVA"
    Então a entidade deixa de aparecer publicamente e de receber doações, sem exclusão física do banco
    E todas as suas campanhas "ATIVA" e "AGENDADA" passam para "ENCERRADA"

  # ============================================================================
  # MÓDULO 2: GESTÃO DE CAMPANHAS (RF-010 a RF-015, RF-026)
  # ============================================================================

  @RF-010 @campanha
  Cenário: [CA-RF-010.1] Criação de campanha por entidade aprovada
    Dado que uma entidade com status "APROVADA" está autenticada
    Quando cadastra uma campanha com título, descrição, meta maior que zero, data de início e data de encerramento igual ou posterior ao início
    Então o sistema cria a campanha vinculada à entidade com status "RASCUNHO" (se salva como rascunho), "AGENDADA" (se a data de início for futura) ou "ATIVA"

  @RF-010 @campanha @excecao
  Cenário: [CA-RF-010.2] Bloqueio de criação de campanha com datas inválidas, meta zerada ou entidade não aprovada
    Dado que uma entidade autenticada preenche o formulário de nova campanha
    Quando informa meta menor ou igual a zero, data de encerramento anterior à data de início ou a entidade não está "APROVADA"
    Então o sistema rejeita a criação da campanha com mensagem de validação ou de conflito

  @RF-011 @campanha
  Cenário: [CA-RF-011.1] Edição de campanha e bloqueio de redução de meta (RN64)
    Dado que uma entidade possui uma campanha "ATIVA" com meta de R$ 1.000,00 e R$ 600,00 em doações confirmadas
    Quando edita título e descrição e tenta reduzir a meta para R$ 500,00
    Então o sistema salva as alterações de texto
    E rejeita a redução da meta para valor abaixo do total já arrecadado
    E campanhas "ENCERRADA" ou "DESATIVADA" não podem ser editadas

  @RF-013 @campanha
  Cenário: [CA-RF-013.1] Encerramento antecipado de campanha pela entidade responsável
    Dado que uma entidade possui uma campanha com status "ATIVA"
    Quando solicita o encerramento antecipado da campanha
    Então o status da campanha passa para "ENCERRADA"
    E o sistema bloqueia edições futuras, reabertura ou novas doações para essa campanha

  @RF-013 @admin
  Cenário: [CA-RF-013.2] Desativação administrativa de campanha por violação de políticas
    Dado que o Administrador identifica uma campanha que viola as políticas da plataforma
    Quando desativa a campanha registrando o motivo obrigatório
    Então o status da campanha muda para "DESATIVADA", registra o motivo e impede novas doações

  @RF-014 @campanha
  Cenário: [CA-RF-014.1] Listagem pública de campanhas ativas
    Dado que existem campanhas nos status "RASCUNHO", "AGENDADA", "ATIVA", "ENCERRADA" e "DESATIVADA"
    Quando um visitante acessa a listagem pública de campanhas
    Então o sistema retorna apenas as campanhas com status "ATIVA"

  @RF-015 @campanha
  Cenário: [CA-RF-015.1] Acompanhamento do progresso de arrecadação da campanha
    Dado que uma campanha ativa possui meta de R$ 1.000,00 e R$ 1.150,00 em doações confirmadas
    Quando um usuário consulta os detalhes da campanha
    Então o sistema exibe o valor arrecadado, a meta definida e o percentual atingido (115%)
    E mantém a campanha aberta para novas doações até a data de encerramento ou encerramento manual

  @RF-026 @campanha @entidade
  Cenário: [CA-RF-026.1] Painel de campanhas da entidade
    Dado que uma entidade autenticada possui campanhas em diferentes status
    Quando acessa o painel de gestão e filtra suas campanhas por status
    Então o sistema lista as campanhas da própria entidade em cada status, inclusive "RASCUNHO" e "ENCERRADA", com o valor arrecadado de cada uma
    E não exibe campanhas de outras entidades

  # ============================================================================
  # MÓDULO 3: DOAÇÕES E HISTÓRICO (RF-020 a RF-024, RF-027)
  # ============================================================================

  @RF-020 @doacao
  Cenário: [CA-RF-020.1] Realização de doação com destino único e valor válido
    Dado que um doador autenticado seleciona uma campanha "ATIVA" ou uma entidade "APROVADA"
    Quando informa um valor maior que zero e submete a doação
    Então o sistema aceita a doação vinculada exclusivamente a um único destino

  @RF-020 @doacao @excecao
  Cenário: [CA-RF-020.2] Rejeição de doação com valor inválido ou destino indisponível
    Dado que um doador autenticado está no formulário de doação
    Quando informa valor menor ou igual a zero ou escolhe uma campanha que não está "ATIVA" ou uma entidade que não está "APROVADA"
    Então o sistema rejeita a doação sem registrá-la

  @RF-021 @doacao
  Cenário: [CA-RF-021.1] Registro completo dos metadados da doação
    Dado que uma doação válida é submetida pelo doador
    Quando o sistema processa a solicitação com pagamento simulado
    Então grava data/hora, valor, destino, forma de pagamento "PIX", identificador do doador e status "CONFIRMADA"

  @RF-021 @doacao @privacidade
  Cenário: [CA-RF-021.2] Preservação de anonimato em doação anônima
    Dado que um doador realiza uma doação marcando a opção "Doação Anônima"
    Quando a doação é consultada pela entidade beneficiada ou exibida publicamente
    Então o sistema exibe o doador como "Doador anônimo" e oculta nome, e-mail, CPF/CNPJ e telefone
    Mas mantém o vínculo interno para que a doação apareça no histórico privado do próprio doador

  @RF-022 @pagamento
  Cenário: [CA-RF-022.1] Pagamento PIX simulado e contabilização da doação
    Dado que um doador escolhe PIX como forma de pagamento para sua doação
    Quando submete a doação e o sistema aplica a confirmação simulada
    Então a doação é registrada diretamente com status "CONFIRMADA"
    E o valor passa a contabilizar no total arrecadado da campanha e da entidade
    E reenviar a mesma requisição com a mesma "Idempotency-Key" retorna a doação já registrada, sem duplicá-la

  @RF-023 @doacao
  Cenário: [CA-RF-023.1] Emissão de comprovante/confirmação da doação
    Dado que uma doação foi registrada e confirmada no sistema
    Quando o doador consulta a confirmação da operação
    Então o sistema exibe o código único da doação, data, destino, valor doado, forma de pagamento e status "CONFIRMADA"

  @RF-024 @historico
  Cenário: [CA-RF-024.1] Consulta ao histórico de doações pelo doador
    Dado que um doador autenticado já realizou doações identificadas e anônimas
    Quando acessa seu histórico de doações
    Então o sistema lista somente as suas doações com status "CONFIRMADA" (RN69), inclusive as anônimas, da mais recente para a mais antiga

  @RF-027 @historico
  Cenário: [CA-RF-027.1] Consulta de doações recebidas pela entidade
    Dado que uma entidade autenticada consulta as doações recebidas, com filtro opcional por campanha e período
    Quando o sistema retorna a lista
    Então exibe apenas o nome do doador nas doações não anônimas (RN73) e "Doador anônimo" nas anônimas
    E não exibe e-mail, telefone, CPF/CNPJ nem endereço do doador

  @RF-027 @relatorio
  Cenário: [CA-RF-027.2] Cálculo do valor total arrecadado por período
    Dado que uma entidade possui doações com status "CONFIRMADA" e "CANCELADA" em diferentes datas
    Quando consulta o total arrecadado informando data inicial e data final
    Então o sistema soma exclusivamente as doações com status "CONFIRMADA" dentro do intervalo informado

  # ============================================================================
  # MÓDULO 4: PAINEL ADMINISTRATIVO (RF-028)
  # ============================================================================

  @RF-028 @admin
  Cenário: [CA-RF-028.1] Controle de acesso ao painel administrativo
    Dado que um usuário autenticado possui tipo "ADMIN"
    Quando acessa a rota do painel administrativo
    Então o sistema carrega o dashboard administrativo com sucesso
    E bloqueia qualquer tentativa de acesso dos tipos "PESSOA_FISICA", "PESSOA_JURIDICA" ou "ENTIDADE"

  @RF-028 @admin
  Cenário: [CA-RF-028.2] Exibição dos indicadores gerais (KPIs) da plataforma
    Dado que o Administrador acessa o dashboard administrativo
    Quando os dados consolidados são carregados
    Então o sistema exibe valor total arrecadado, valor arrecadado no mês, doações no mês, total de doações, total de doadores, total de entidades, campanhas ativas e usuários ativos
```

**Total:** 37 cenários.
