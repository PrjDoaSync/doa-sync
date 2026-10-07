# 📄 Levantamento de Requisitos — DoaSync

## 1. Introdução

O DoaSync é uma plataforma digital desenvolvida para conectar doadores a entidades assistenciais da região. Este documento registra os requisitos funcionais, não funcionais e os pontos ainda pendentes de validação junto ao cliente.

---

## 2. Requisitos Funcionais

Requisitos que descrevem o que o sistema deve fazer.

### 2.1 Gestão de Usuários

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF01 | O sistema deve permitir o cadastro de doadores com nome, e-mail, senha e dados de contato. | Alta |
| RF02 | O sistema deve permitir o cadastro de entidades assistenciais com nome, CNPJ, descrição, endereço e dados de contato. | Alta |
| RF03 | O sistema deve permitir login e logout para todos os perfis de usuário. | Alta |
| RF04 | O sistema deve permitir a recuperação de senha por e-mail. | Média |
| RF05 | O sistema deve permitir que o usuário edite seu perfil. | Média |
| RF06 | O sistema deve diferenciar os perfis de acesso: Doador, Entidade e Administrador. | Alta |

### 2.2 Gestão de Entidades

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF07 | O sistema deve permitir que entidades cadastrem e editem suas informações institucionais. | Alta |
| RF08 | O sistema deve exibir uma página pública de perfil para cada entidade cadastrada. | Alta |
| RF09 | O sistema deve permitir que o Administrador aprove ou reprove o cadastro de entidades. | Alta |
| RF10 | O sistema deve permitir que entidades sejam desativadas pelo Administrador. | Média |

### 2.3 Gestão de Campanhas

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF11 | O sistema deve permitir que entidades criem campanhas de arrecadação com título, descrição, meta de valor, data de início e data de encerramento. | Alta |
| RF12 | O sistema deve exibir as campanhas ativas na página inicial da plataforma. | Alta |
| RF13 | O sistema deve permitir que entidades encerrem uma campanha antes do prazo. | Média |
| RF14 | O sistema deve exibir o progresso de arrecadação de cada campanha (valor arrecadado vs. meta). | Alta |
| RF15 | O sistema deve permitir que o Administrador desative campanhas que violem as políticas da plataforma. | Média |

### 2.4 Realização de Doações

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF16 | O sistema deve permitir que doadores realizem doações vinculadas a uma campanha ou diretamente a uma entidade. | Alta |
| RF17 | O sistema deve registrar cada doação com data, valor, doador e destino. | Alta |
| RF18 | O sistema deve emitir uma confirmação de doação para o doador após a conclusão do processo. | Alta |
| RF19 | O sistema deve permitir doações anônimas, ocultando os dados do doador na exibição pública. | Média |
| RF20 | O sistema deve suportar ao menos um método de pagamento digital (ex.: PIX). | Alta |

### 2.5 Acompanhamento e Histórico

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF21 | O sistema deve exibir ao doador o histórico de suas doações realizadas. | Alta |
| RF22 | O sistema deve exibir à entidade o histórico de doações recebidas, por campanha. | Alta |
| RF23 | O sistema deve permitir que entidades acompanhem o valor total arrecadado por período. | Média |

### 2.6 Painel Administrativo

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF24 | O sistema deve disponibilizar um painel administrativo com indicadores gerais da plataforma. | Alta |
| RF25 | O painel deve exibir: número de entidades cadastradas, número de doadores, número de doações, valor total arrecadado, campanhas ativas e usuários ativos. | Alta |
| RF26 | O Administrador deve poder gerenciar entidades, usuários e campanhas pela interface administrativa. | Alta |

---

## 3. Requisitos Não Funcionais

Requisitos que descrevem como o sistema deve se comportar.

### 3.1 Usabilidade

| ID | Requisito |
|----|-----------|
| RNF01 | A interface deve ser responsiva, funcionando adequadamente em dispositivos móveis e desktops. |
| RNF02 | O sistema deve apresentar fluxos de navegação simples, permitindo que qualquer doador realize uma doação em no máximo 5 passos. |
| RNF03 | O sistema deve exibir mensagens de feedback claras para ações do usuário (sucesso, erro, carregamento). |

### 3.2 Desempenho

| ID | Requisito |
|----|-----------|
| RNF04 | As páginas principais devem carregar em até 3 segundos em condições normais de uso. |
| RNF05 | O sistema deve suportar múltiplos acessos simultâneos sem degradação perceptível de desempenho. |

### 3.3 Segurança

| ID | Requisito |
|----|-----------|
| RNF06 | As senhas dos usuários devem ser armazenadas com criptografia (hash). |
| RNF07 | A comunicação entre o cliente e o servidor deve utilizar protocolo HTTPS. |
| RNF08 | O sistema deve controlar o acesso às funcionalidades de acordo com o perfil do usuário autenticado. |
| RNF09 | Os dados pessoais dos usuários devem ser tratados em conformidade com a LGPD. |

### 3.4 Confiabilidade

| ID | Requisito |
|----|-----------|
| RNF10 | O sistema deve registrar logs de erros para facilitar a identificação e correção de falhas. |
| RNF11 | O sistema deve garantir que nenhuma doação seja registrada de forma duplicada por falha técnica. |

### 3.5 Manutenibilidade

| ID | Requisito |
|----|-----------|
| RNF12 | O código deve ser organizado e documentado, facilitando a manutenção e evolução por outros desenvolvedores. |
| RNF13 | O sistema deve ser desenvolvido com tecnologias compatíveis com o escopo do CST, permitindo continuidade por turmas futuras. |

### 3.6 Disponibilidade

| ID | Requisito |
|----|-----------|
| RNF14 | O sistema deve estar disponível durante o horário de uso esperado, com tolerância a eventuais indisponibilidades planejadas para manutenção. |

---

## 4. Requisitos Pendentes de Validação

Itens que ainda precisam ser confirmados ou detalhados junto ao cliente antes de serem incluídos como requisitos definitivos.

| ID | Ponto em Aberto | Área |
|----|-----------------|------|
| PV01 | Quais métodos de pagamento devem ser suportados? (PIX, boleto, cartão de crédito?) | Pagamento |
| PV02 | O sistema deverá emitir recibos ou comprovantes fiscais para as doações? | Fiscal / Jurídico |
| PV03 | As entidades precisam de aprovação manual pelo Administrador antes de ficarem visíveis na plataforma? | Fluxo de cadastro |
| PV04 | É necessário suporte a doações recorrentes (mensais, semanais)? | Doação |
| PV05 | O sistema deve enviar notificações por e-mail ou push para os doadores? Se sim, em quais eventos? | Notificações |
| PV06 | É necessário um módulo de relatórios exportáveis (PDF, Excel) para as entidades? | Relatórios |
| PV07 | Como será tratada a transferência dos valores arrecadados para as entidades? Isso está no escopo do sistema? | Financeiro |
| PV08 | O doador poderá acompanhar publicamente quem são os outros doadores de uma campanha? | Privacidade |
| PV09 | Haverá integração com redes sociais para compartilhamento de campanhas? | Integrações |
| PV10 | Qual é o nível de acesso esperado para o perfil Administrador? Haverá mais de um administrador? | Perfis de acesso |

---

## 5. Fora do Escopo (MVP)

Funcionalidades identificadas, mas que não farão parte da primeira versão entregável:

- Integração com sistemas externos das entidades (ex.: sistemas internos da APAE);
- Aplicativo mobile nativo;
- Gamificação ou sistema de recompensas para doadores;
- Suporte a múltiplos idiomas;
- Módulo de voluntariado.

---

## 6. Referências

- Documento de apresentação do projeto DoaSync (fornecido pelo cliente);
- Reuniões de levantamento com representantes das entidades atendidas;
- Indicadores de acompanhamento definidos pela Equipe 1.

---

> **Observação:** Este documento está sujeito a atualizações conforme novas informações sejam obtidas junto ao cliente ao longo da Sprint 1.
