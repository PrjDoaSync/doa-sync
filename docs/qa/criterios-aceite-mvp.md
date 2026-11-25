# Critérios de Aceite do MVP — DoaSync (Gherkin)

> **Referências:** `definicao-mvp.md` (DOC-04), `funcionalidades.md` e `regras-negocio.md`.

```gherkin
# language: pt
Funcionalidade: Critérios de Aceite do MVP — DoaSync (RF01 a RF26)

  # ============================================================================
  # MÓDULO 1: GESTÃO DE USUÁRIOS E ENTIDADES (RF01–RF10)
  # ============================================================================

  @RF01 @cadastro-doador
  Cenário: [CA-RF01.1] Cadastro de doador Pessoa Física com sucesso
    Dado que um visitante acessa o cadastro de doador como Pessoa Física
    Quando informa nome, e-mail único, CPF único válido, data de nascimento de maior de 18 anos, telefone e senha com no mínimo 8 caracteres contendo letras e números
    Então o sistema cria a conta com perfil "DOADOR" e status "ATIVO"
    E armazena a senha utilizando hash seguro sem expô-la na resposta

  @RF01 @cadastro-doador @excecao
  Cenário: [CA-RF01.2] Bloqueio de cadastro de doador menor de 18 anos ou com dados duplicados
    Dado que um visitante preenche o cadastro de doador Pessoa Física
    Quando informa idade inferior a 18 anos ou um CPF/e-mail já existente na base
    Então o sistema rejeita o cadastro com erro de validação sem persistir o registro

  @RF02 @cadastro-entidade
  Cenário: [CA-RF02.1] Cadastro de entidade assistencial com dados obrigatórios
    Dado que um representante acessa o cadastro de entidade assistencial
    Quando informa razão social, nome fantasia, CNPJ único válido, e-mail único, telefone, endereço completo, dados do responsável (nome e CPF) e senha válida
    Então o sistema registra a entidade com perfil "ENTIDADE" e status inicial "PENDENTE"
    E impede que a entidade publique campanhas até aprovação administrativa

  @RF03 @autenticacao
  Cenário: [CA-RF03.1] Login e logout com credenciais válidas
    Dado que existe um usuário com status "ATIVO" cadastrado na plataforma
    Quando envia e-mail e senha corretos para autenticação
    Então o sistema retorna um token JWT válido contendo o perfil de acesso do usuário
    E ao realizar logout encerra a sessão no cliente invalidando o acesso autenticado

  @RF03 @autenticacao @excecao
  Cenário: [CA-RF03.2] Bloqueio de login para usuário inativo ou senha incorreta
    Dado que um usuário possui status "INATIVO" ou informa senha incorreta
    Quando tenta realizar login na plataforma
    Então o sistema nega a autenticação e exibe mensagem genérica de erro

  @RF04 @recuperacao-senha
  Cenário: [CA-RF04.1] Solicitação e redefinição de senha por e-mail
    Dado que um usuário cadastrado solicita recuperação de senha pelo e-mail vinculado à conta
    Quando acessa o link de uso único dentro do prazo de validade de 1 hora e informa uma nova senha válida
    Então o sistema atualiza o hash da senha e invalida imediatamente o token de recuperação

  @RF05 @perfil
  Cenário: [CA-RF05.1] Edição de dados permitidos do perfil e bloqueio de identificadores
    Dado que um usuário está autenticado na plataforma
    Quando atualiza seu nome ou telefone e tenta alterar CPF, CNPJ ou e-mail
    Então o sistema salva as alterações dos campos editáveis e bloqueia a alteração de CPF, CNPJ e e-mail

  @RF06 @autorizacao
  Cenário: [CA-RF06.1] Restrição de acesso por perfil de usuário (RBAC)
    Dado que um usuário autenticado possui perfil "DOADOR"
    Quando tenta acessar endpoints exclusivos de "ENTIDADE" ou "ADMINISTRADOR"
    Então o sistema bloqueia a requisição com status HTTP 403 (Acesso Negado)

  @RF07 @entidade
  Cenário: [CA-RF07.1] Edição de informações institucionais pela entidade
    Dado que uma entidade autenticada acessa seu perfil institucional
    Quando atualiza descrição, cidade/UF e canais de contato
    Então o sistema persiste as alterações e mantém bloqueados os campos de CNPJ e pessoa responsável

  @RF08 @entidade
  Cenário: [CA-RF08.1] Visualização do perfil público apenas de entidades aprovadas
    Dado que existem entidades com status "APROVADA", "PENDENTE" e "DESATIVADA"
    Quando um visitante ou doador consulta o perfil público de uma entidade
    Então o sistema exibe os dados institucionais e campanhas apenas se a entidade estiver com status "APROVADA"

  @RF09 @admin
  Cenário: [CA-RF09.1] Aprovação e reprovação de cadastro de entidade pelo Administrador
    Dado que o Administrador está autenticado no painel administrativo
    Quando aprova uma entidade com status "PENDENTE"
    Então o status da entidade passa para "APROVADA" tornando-a visível publicamente
    Mas se o Administrador optar por reprovar a entidade sem informar o motivo
    Então o sistema exige a justificativa obrigatória antes de concluir a reprovação

  @RF10 @admin
  Cenário: [CA-RF10.1] Desativação de entidade com encerramento automático de campanhas
    Dado que existe uma entidade "APROVADA" com campanhas em status "ATIVA"
    Quando o Administrador desativa essa entidade
    Então o status da entidade é alterado para "DESATIVADA" sem exclusão física do banco
    E todas as suas campanhas ativas são encerradas automaticamente

  # ============================================================================
  # MÓDULO 2: GESTÃO DE CAMPANHAS (RF11–RF15)
  # ============================================================================

  @RF11 @campanha
  Cenário: [CA-RF11.1] Criação de campanha por entidade aprovada
    Dado que uma entidade com status "APROVADA" está autenticada
    Quando cadastra uma campanha com título, descrição, meta maior que zero, data de início igual ou posterior à data atual e data de encerramento posterior ao início
    Então o sistema cria a campanha vinculada à entidade com status "ATIVA" (ou "AGENDADA" se a data de início for futura)

  @RF11 @campanha @excecao
  Cenário: [CA-RF11.2] Bloqueio de criação de campanha com datas inválidas ou meta zerada
    Dado que uma entidade autenticada preenche o formulário de nova campanha
    Quando informa meta menor ou igual a zero ou data de encerramento anterior/igual à data de início
    Então o sistema rejeita a criação da campanha com mensagem de validação

  @RF12 @campanha
  Cenário: [CA-RF12.1] Listagem pública de campanhas ativas
    Dado que existem campanhas nos status "ATIVA", "AGENDADA", "ENCERRADA" e "DESATIVADA"
    Quando um usuário acessa a listagem pública de campanhas
    Então o sistema retorna apenas as campanhas com status "ATIVA"

  @RF13 @campanha
  Cenário: [CA-RF13.1] Acompanhamento do progresso de arrecadação da campanha
    Dado que uma campanha ativa possui meta de R$ 1.000,00 e R$ 1.150,00 em doações confirmadas
    Quando um usuário consulta os detalhes da campanha
    Então o sistema exibe o valor arrecadado, a meta definida e o percentual atingido (115%)
    E mantém a campanha aberta para novas doações até a data de encerramento ou encerramento manual

  @RF14 @campanha
  Cenário: [CA-RF14.1] Encerramento antecipado de campanha pela entidade responsável
    Dado que uma entidade possui uma campanha com status "ATIVA"
    Quando solicita o encerramento antecipado da campanha
    Então o status da campanha passa para "ENCERRADA"
    E o sistema bloqueia edições futuras, reabertura ou novas doações para essa campanha

  @RF15 @admin
  Cenário: [CA-RF15.1] Desativação administrativa de campanha por violação de políticas
    Dado que o Administrador identifica uma campanha que viola as políticas da plataforma
    Quando desativa a campanha registrando o motivo obrigatório
    Então o status da campanha muda para "DESATIVADA", registra o motivo e impede novas doações

  # ============================================================================
  # MÓDULO 3: DOAÇÕES, HISTÓRICO E PAINEL ADMINISTRATIVO (RF16–RF26)
  # ============================================================================

  @RF16 @doacao
  Cenário: [CA-RF16.1] Realização de doação com destino único e valor válido
    Dado que um doador autenticado seleciona uma campanha "ATIVA" ou uma entidade "APROVADA"
    Quando informa um valor maior que zero e submete a doação
    Então o sistema aceita a doação vinculada exclusivamente a um único destino
    E rejeita submissões com valor menor ou igual a zero ou para campanha/entidade inativa

  @RF17 @doacao
  Cenário: [CA-RF17.1] Registro completo dos metadados da doação
    Dado que uma doação válida é iniciada pelo doador
    Quando o sistema processa a solicitação
    Então grava data/hora, valor, destino, forma de pagamento, identificador do doador e status inicial "PENDENTE"

  @RF18 @doacao
  Cenário: [CA-RF18.1] Emissão de comprovante/confirmação da doação
    Dado que uma doação foi registrada e confirmada no sistema
    Quando o doador consulta a confirmação da operação
    Então o sistema exibe o código único da doação, data, destino, valor doado e status "CONFIRMADA"

  @RF19 @doacao @privacidade
  Cenário: [CA-RF19.1] Preservação de anonimato em doação anônima
    Dado que um doador realiza uma doação marcando a opção "Doação Anônima"
    Quando a doação é consultada pela entidade beneficiada ou exibida publicamente
    Então o sistema oculta nome, e-mail, CPF/CNPJ e telefone do doador
    Mas mantém o vínculo interno para que a doação apareça no histórico privado do próprio doador

  @RF20 @pagamento
  Cenário: [CA-RF20.1] Pagamento digital via PIX e atualização de status
    Dado que um doador escolhe PIX como forma de pagamento para sua doação
    Quando o sistema gera a cobrança PIX e recebe a confirmação do pagamento
    Então o status da doação é atualizado de "PENDENTE" para "CONFIRMADA"
    E o valor passa a contabilizar no total arrecadado do destino

  @RF21 @historico
  Cenário: [CA-RF21.1] Consulta ao histórico de doações pelo doador
    Dado que um doador autenticado já realizou doações identificadas e anônimas
    Quando acessa seu histórico de doações e aplica filtro opcional por período
    Então o sistema lista todas as suas doações ordenadas da mais recente para a mais antiga

  @RF22 @historico
  Cenário: [CA-RF22.1] Consulta de doações recebidas por campanha pela entidade
    Dado que uma entidade autenticada acessa uma de suas campanhas
    Quando consulta o histórico de doações recebidas naquela campanha
    Então o sistema lista as doações da campanha exibindo os dados do doador apenas nas doações não anônimas

  @RF23 @relatorio
  Cenário: [CA-RF23.1] Cálculo do valor total arrecadado por período
    Dado que uma entidade possui doações com status "CONFIRMADA" e "PENDENTE" em diferentes datas
    Quando consulta o total arrecadado informando data inicial e data final
    Então o sistema soma exclusivamente as doações com status "CONFIRMADA" dentro do intervalo informado

  @RF24 @admin
  Cenário: [CA-RF24.1] Controle de acesso ao painel administrativo
    Dado que um usuário autenticado possui perfil "ADMINISTRADOR"
    Quando acessa a rota do painel administrativo
    Então o sistema carrega o dashboard administrativo com sucesso
    E bloqueia qualquer tentativa de acesso de perfis "DOADOR" ou "ENTIDADE"

  @RF25 @admin
  Cenário: [CA-RF25.1] Exibição dos indicadores gerais (KPIs) da plataforma
    Dado que o Administrador acessa o dashboard administrativo
    Quando os dados consolidados são carregados
    Então o sistema exibe total de entidades cadastradas, total de doadores, campanhas ativas, valor total arrecadado, quantidade de doações realizadas e usuários ativos

  @RF26 @admin
  Cenário: [CA-RF26.1] Gerenciamento administrativo de usuários, entidades e campanhas
    Dado que o Administrador está autenticado no painel administrativo
    Quando lista usuários/entidades/campanhas e altera o status de um registro (ativar, desativar, aprovar ou reprovar)
    Então o sistema aplica a mudança de status mantendo o histórico e a integridade referencial
```
