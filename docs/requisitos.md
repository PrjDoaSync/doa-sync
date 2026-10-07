# Requisitos do Projeto

## 1. Contexto

O **DoaSync** é um sistema digital de arrecadação de doações, desenvolvido como projeto de extensão (semestre 2026/2), que conecta **doadores** a **entidades assistenciais da região**. O foco inicial é a **APAE** e a **Associação Amor Inclusivo**, com a previsão de adaptar a plataforma posteriormente para outras entidades.

A solução está organizada em cinco módulos/equipes:

| Módulo | Escopo principal |
|---|---|
| Produto, Usuários e Entidades | Cadastro, login, perfil, entidades, permissões e tipos de usuário |
| Campanhas | Criar, editar, publicar, encerrar, visualizar, buscar e compartilhar campanhas |
| Doações | Fluxo do doador: escolher campanha → doar → registro → confirmação → histórico, status e comprovantes |
| Gestão e Dashboard | Indicadores, relatórios, gestão de campanhas/doações/entidades e exportação |
| Plataforma e Qualidade | Banco de dados, APIs REST, Git/GitHub, CI/CD, deploy, ambientes e testes |

**Atores identificados:**

- **Visitante:** pessoa não autenticada que navega pelas campanhas.
- **Doador:** usuário cadastrado que realiza doações.
- **Gestor de entidade:** usuário vinculado a uma entidade (ex.: APAE), que gerencia campanhas e acompanha doações.
- **Administrador:** responsável pela gestão geral da plataforma e das entidades.

**Pontos ambíguos e interpretação adotada:**

- A documentação descreve a etapa "Realiza contribuição" e cita "Integrações", mas **não define o meio de pagamento** nem um provedor específico. Os requisitos tratam o registro da contribuição e seu status sem pressupor um gateway; a integração com meio de pagamento fica como decisão de projeto a ser detalhada.
- Os indicadores "Valor arrecadado" e "Taxa de conclusão das doações" indicam que as doações possuem **valor** e **status** (iniciada, concluída, etc.), o que foi considerado nos requisitos.
- Não há metas numéricas de desempenho ou disponibilidade na documentação; por isso, os RNFs usam critérios verificáveis sem criar valores arbitrários. Onde um número for necessário, ele deve ser definido pela equipe de Produto/Plataforma.

---

## 2. Requisitos Funcionais

### RF-001 — Cadastro de usuário
**Descrição:** O sistema deve permitir que um visitante crie uma conta informando, no mínimo, nome, e-mail e senha.
**Atores envolvidos:** Visitante
**Prioridade:** Alta
**Critério de aceitação:** Após preencher os campos obrigatórios com dados válidos, a conta é criada e o usuário consegue se autenticar; e-mail já cadastrado é recusado com mensagem informativa.
**Origem/Justificativa:** Grupo 1 — funcionalidade "Cadastro de usuários".

### RF-002 — Autenticação
**Descrição:** O sistema deve permitir que usuários cadastrados façam login com e-mail e senha.
**Atores envolvidos:** Doador, Gestor de entidade, Administrador
**Prioridade:** Alta
**Critério de aceitação:** Credenciais válidas dão acesso à área correspondente ao perfil do usuário; credenciais inválidas exibem mensagem de erro sem revelar qual campo está incorreto.
**Origem/Justificativa:** Grupo 1 — funcionalidade "Login".

### RF-003 — Encerramento de sessão
**Descrição:** O sistema deve permitir que o usuário autenticado encerre sua sessão.
**Atores envolvidos:** Doador, Gestor de entidade, Administrador
**Prioridade:** Média
**Critério de aceitação:** Após o logout, o acesso a páginas restritas redireciona para o login.
**Origem/Justificativa:** Complemento necessário do fluxo de "Login" do Grupo 1.

### RF-004 — Gerenciamento de perfil
**Descrição:** O sistema deve permitir que o usuário visualize e atualize seus dados de perfil.
**Atores envolvidos:** Doador, Gestor de entidade, Administrador
**Prioridade:** Média
**Critério de aceitação:** Alterações salvas são exibidas na próxima consulta do perfil; dados inválidos são rejeitados com mensagem.
**Origem/Justificativa:** Grupo 1 — funcionalidade "Perfil".

### RF-005 — Tipos de usuário e permissões
**Descrição:** O sistema deve associar cada usuário a um tipo (doador, gestor de entidade ou administrador) e liberar apenas as funcionalidades permitidas para esse tipo.
**Atores envolvidos:** Administrador, todos os usuários
**Prioridade:** Alta
**Critério de aceitação:** Um doador não consegue acessar telas ou operações de gestão; um gestor só gerencia dados da própria entidade.
**Origem/Justificativa:** Grupo 1 — "Permissões e tipos de usuário"; Grupo 4 — gestão "utilizada pelas entidades e administradores".

### RF-006 — Cadastro de entidade
**Descrição:** O sistema deve permitir o cadastro de entidades assistenciais com nome, descrição, dados de contato e logotipo.
**Atores envolvidos:** Administrador
**Prioridade:** Alta
**Critério de aceitação:** Entidade cadastrada aparece na lista de entidades e pode receber campanhas.
**Origem/Justificativa:** Grupo 1 — "Cadastro de entidades"; foco inicial em APAE e Associação Amor Inclusivo.

### RF-007 — Vínculo de gestor a entidade
**Descrição:** O sistema deve permitir vincular um ou mais usuários gestores a uma entidade.
**Atores envolvidos:** Administrador
**Prioridade:** Alta
**Critério de aceitação:** Após o vínculo, o gestor visualiza e gerencia apenas campanhas e doações da entidade vinculada.
**Origem/Justificativa:** Grupo 4 — funcionalidades "utilizadas pelas entidades"; necessidade de permissões por entidade (Grupo 1).

### RF-008 — Página pública da entidade
**Descrição:** O sistema deve exibir uma página pública com as informações da entidade e suas campanhas ativas.
**Atores envolvidos:** Visitante, Doador
**Prioridade:** Média
**Critério de aceitação:** A página mostra descrição, contato e a lista de campanhas publicadas da entidade.
**Origem/Justificativa:** Grupo 1 — "Informações da APAE" e "Informações da Associação Amor Inclusivo".

### RF-009 — Gestão de entidades pelo administrador
**Descrição:** O sistema deve permitir que o administrador edite, ative e desative entidades.
**Atores envolvidos:** Administrador
**Prioridade:** Média
**Critério de aceitação:** Entidade desativada deixa de aparecer nas listagens públicas e não permite publicar novas campanhas.
**Origem/Justificativa:** Grupo 4 — "Gestão de entidades"; expansão futura para outras entidades.

### RF-010 — Criação de campanha
**Descrição:** O sistema deve permitir que o gestor crie uma campanha informando título, descrição, objetivo, período e entidade beneficiada.
**Atores envolvidos:** Gestor de entidade
**Prioridade:** Alta
**Critério de aceitação:** A campanha é salva com status "rascunho" e aparece no painel da entidade.
**Origem/Justificativa:** Grupo 2 — "Criar campanha".

### RF-011 — Edição de campanha
**Descrição:** O sistema deve permitir que o gestor edite os dados de uma campanha da sua entidade.
**Atores envolvidos:** Gestor de entidade
**Prioridade:** Alta
**Critério de aceitação:** As alterações salvas são refletidas na página de detalhes da campanha.
**Origem/Justificativa:** Grupo 2 — "Editar campanha".

### RF-012 — Publicação de campanha
**Descrição:** O sistema deve permitir que o gestor publique uma campanha, tornando-a visível aos visitantes e doadores.
**Atores envolvidos:** Gestor de entidade
**Prioridade:** Alta
**Critério de aceitação:** Campanha publicada passa a constar na listagem pública; campanha em rascunho não aparece.
**Origem/Justificativa:** Grupo 2 — "Publicar campanha".

### RF-013 — Encerramento de campanha
**Descrição:** O sistema deve permitir que o gestor encerre uma campanha, impedindo novas doações a ela.
**Atores envolvidos:** Gestor de entidade
**Prioridade:** Alta
**Critério de aceitação:** Após o encerramento, a campanha exibe status "encerrada" e a opção de doar fica indisponível.
**Origem/Justificativa:** Grupo 2 — "Encerrar campanha".

### RF-014 — Listagem de campanhas disponíveis
**Descrição:** O sistema deve exibir a lista de campanhas publicadas e ativas.
**Atores envolvidos:** Visitante, Doador
**Prioridade:** Alta
**Critério de aceitação:** A listagem mostra apenas campanhas publicadas e não encerradas, com título, entidade e imagem.
**Origem/Justificativa:** Grupo 2 — "Exibir campanhas disponíveis".

### RF-015 — Detalhes da campanha
**Descrição:** O sistema deve exibir uma página de detalhes com descrição, entidade, imagens, período e progresso da arrecadação da campanha.
**Atores envolvidos:** Visitante, Doador
**Prioridade:** Alta
**Critério de aceitação:** Ao selecionar uma campanha na listagem, a página de detalhes apresenta todas essas informações.
**Origem/Justificativa:** Grupo 2 — "Página de detalhes"; Grupo 3 — "Visualiza informações".

### RF-016 — Busca de campanhas
**Descrição:** O sistema deve permitir buscar campanhas por termo presente no título ou na descrição.
**Atores envolvidos:** Visitante, Doador
**Prioridade:** Média
**Critério de aceitação:** A busca retorna somente campanhas publicadas que contenham o termo informado.
**Origem/Justificativa:** Grupo 2 — "Buscar campanha".

### RF-017 — Filtros de campanhas
**Descrição:** O sistema deve permitir filtrar campanhas por entidade e por status.
**Atores envolvidos:** Visitante, Doador, Gestor de entidade
**Prioridade:** Baixa
**Critério de aceitação:** Ao aplicar um filtro, apenas as campanhas que atendem ao critério são exibidas.
**Origem/Justificativa:** Grupo 2 — "Busca e filtros".

### RF-018 — Imagens da campanha
**Descrição:** O sistema deve permitir que o gestor envie imagens para ilustrar a campanha.
**Atores envolvidos:** Gestor de entidade
**Prioridade:** Média
**Critério de aceitação:** Imagens enviadas são exibidas na listagem e na página de detalhes; arquivos de tipo não permitido são recusados.
**Origem/Justificativa:** Grupo 2 — "Imagens e informações da campanha".

### RF-019 — Compartilhamento de campanha
**Descrição:** O sistema deve disponibilizar um link direto da campanha para compartilhamento.
**Atores envolvidos:** Visitante, Doador, Gestor de entidade
**Prioridade:** Baixa
**Critério de aceitação:** O link copiado abre a página de detalhes da campanha correspondente.
**Origem/Justificativa:** Grupo 2 — "Compartilhar campanha".

### RF-020 — Início da doação
**Descrição:** O sistema deve permitir que o doador inicie uma doação a partir da página de uma campanha ativa.
**Atores envolvidos:** Doador
**Prioridade:** Alta
**Critério de aceitação:** Ao acionar "Doar", o doador é levado ao formulário de doação já vinculado à campanha escolhida; visitantes não autenticados são direcionados ao login/cadastro.
**Origem/Justificativa:** Grupo 3 — fluxo "Escolhe campanha → Inicia doação".

### RF-021 — Registro da doação
**Descrição:** O sistema deve registrar a doação com doador, campanha, entidade, valor e data/hora.
**Atores envolvidos:** Doador
**Prioridade:** Alta
**Critério de aceitação:** Após a contribuição, a doação é gravada e consultável com todos esses dados.
**Origem/Justificativa:** Grupo 3 — "Registro da doação"; indicador "Valor arrecadado".

### RF-022 — Status da doação
**Descrição:** O sistema deve controlar o status de cada doação (ao menos: iniciada, concluída e cancelada/não concluída).
**Atores envolvidos:** Doador, Gestor de entidade
**Prioridade:** Alta
**Critério de aceitação:** Cada doação exibe um status válido, atualizado conforme o andamento do fluxo.
**Origem/Justificativa:** Grupo 3 — "Status da doação"; indicador "Taxa de conclusão das doações".

### RF-023 — Confirmação da doação
**Descrição:** O sistema deve exibir ao doador uma confirmação ao concluir a doação.
**Atores envolvidos:** Doador
**Prioridade:** Alta
**Critério de aceitação:** Ao concluir, é exibida tela de confirmação com campanha, valor e data.
**Origem/Justificativa:** Grupo 3 — etapa "Confirmação" do fluxo.

### RF-024 — Histórico de doações do doador
**Descrição:** O sistema deve permitir que o doador consulte o histórico das suas doações.
**Atores envolvidos:** Doador
**Prioridade:** Média
**Critério de aceitação:** O histórico lista todas as doações do usuário com campanha, valor, data e status.
**Origem/Justificativa:** Grupo 3 — "Histórico".

### RF-025 — Comprovante de doação
**Descrição:** O sistema deve gerar um comprovante para cada doação concluída.
**Atores envolvidos:** Doador
**Prioridade:** Média
**Critério de aceitação:** A partir do histórico, o doador acessa o comprovante de uma doação concluída contendo identificador, campanha, entidade, valor e data.
**Origem/Justificativa:** Grupo 3 — "Comprovantes".

### RF-026 — Painel de gestão de campanhas da entidade
**Descrição:** O sistema deve oferecer ao gestor uma lista das campanhas da sua entidade, com status e valor arrecadado de cada uma.
**Atores envolvidos:** Gestor de entidade
**Prioridade:** Média
**Critério de aceitação:** O painel lista todas as campanhas da entidade (rascunho, publicadas e encerradas) com seus valores arrecadados.
**Origem/Justificativa:** Grupo 4 — "Gestão de campanhas".

### RF-027 — Consulta de doações recebidas
**Descrição:** O sistema deve permitir que o gestor consulte as doações recebidas pela sua entidade, filtrando por campanha e período.
**Atores envolvidos:** Gestor de entidade, Administrador
**Prioridade:** Média
**Critério de aceitação:** A consulta retorna apenas doações da entidade do gestor (ou de todas, para o administrador) dentro dos filtros aplicados.
**Origem/Justificativa:** Grupo 4 — "Gestão de doações"; resultado esperado "Permitir acompanhamento".

### RF-028 — Dashboard de indicadores
**Descrição:** O sistema deve exibir um dashboard com os indicadores: número de entidades, doadores, doações, campanhas, usuários ativos, entidades beneficiadas, valor arrecadado e taxa de conclusão das doações.
**Atores envolvidos:** Administrador, Gestor de entidade
**Prioridade:** Média
**Critério de aceitação:** Cada indicador exibido corresponde ao valor calculado a partir dos dados registrados; o gestor visualiza os indicadores restritos à sua entidade.
**Origem/Justificativa:** Grupo 4 — "Dashboard", "Indicadores" e tabela de indicadores possíveis.

### RF-029 — Relatórios
**Descrição:** O sistema deve gerar relatórios de campanhas e doações por período.
**Atores envolvidos:** Administrador, Gestor de entidade
**Prioridade:** Baixa
**Critério de aceitação:** O relatório de um período apresenta totais de doações e valores coerentes com os registros desse período.
**Origem/Justificativa:** Grupo 4 — "Relatórios" e "Estatísticas".

### RF-030 — Exportação de dados
**Descrição:** O sistema deve permitir exportar os dados de relatórios em formato de planilha (CSV).
**Atores envolvidos:** Administrador, Gestor de entidade
**Prioridade:** Baixa
**Critério de aceitação:** O arquivo exportado abre em editor de planilhas e contém os mesmos registros exibidos no relatório.
**Origem/Justificativa:** Grupo 4 — "Exportação de informações".

---

## 3. Requisitos Não Funcionais

### RNF-001 — Armazenamento seguro de senhas
**Categoria:** Segurança
**Descrição:** O sistema deve armazenar senhas apenas na forma de hash com algoritmo próprio para senhas (ex.: bcrypt ou Argon2).
**Métrica/Critério de aceitação:** Inspeção do banco não encontra nenhuma senha em texto puro.
**Prioridade:** Alta
**Origem/Justificativa:** Cadastro de usuários e login (Grupo 1).

### RNF-002 — Comunicação criptografada
**Categoria:** Segurança
**Descrição:** Toda comunicação entre cliente e servidor em produção deve ocorrer via HTTPS.
**Métrica/Critério de aceitação:** Requisições HTTP são redirecionadas ou recusadas; o certificado é válido.
**Prioridade:** Alta
**Origem/Justificativa:** Tráfego de credenciais e dados de doações.

### RNF-003 — Autorização no servidor
**Categoria:** Segurança
**Descrição:** As permissões por tipo de usuário e por entidade devem ser verificadas na API, e não apenas na interface.
**Métrica/Critério de aceitação:** Chamadas diretas à API sem permissão retornam erro de autorização (HTTP 401/403) em testes de API.
**Prioridade:** Alta
**Origem/Justificativa:** "Permissões e tipos de usuário" (Grupo 1); APIs REST (Grupo 5).

### RNF-004 — Validação de entradas
**Categoria:** Segurança
**Descrição:** A API deve validar todos os dados recebidos, rejeitando valores inválidos e prevenindo injeção de SQL e scripts.
**Métrica/Critério de aceitação:** Testes com entradas maliciosas ou fora do formato não alteram dados nem executam código.
**Prioridade:** Alta
**Origem/Justificativa:** Integridade dos dados e APIs (Grupo 5).

### RNF-005 — Conformidade com a LGPD
**Categoria:** Privacidade
**Descrição:** O sistema deve coletar apenas os dados pessoais necessários, informar sua finalidade e obter aceite do usuário no cadastro.
**Métrica/Critério de aceitação:** O cadastro exige aceite da política de privacidade; cada campo pessoal coletado tem finalidade documentada.
**Prioridade:** Alta
**Origem/Justificativa:** Tratamento de dados pessoais de doadores (cadastro, perfil, doações).

### RNF-006 — Proteção dos dados do doador
**Categoria:** Privacidade
**Descrição:** Dados pessoais de doadores não devem ser exibidos em páginas públicas.
**Métrica/Critério de aceitação:** Páginas de campanha e entidade não exibem nome, e-mail ou valores individuais de doadores.
**Prioridade:** Alta
**Origem/Justificativa:** Exibição pública de campanhas (Grupo 2) e registro de doações (Grupo 3).

### RNF-007 — Integridade referencial
**Categoria:** Integridade dos dados
**Descrição:** O banco deve garantir, por chaves e restrições, que toda doação esteja vinculada a um doador e a uma campanha existentes, e toda campanha a uma entidade.
**Métrica/Critério de aceitação:** Tentativas de inserir registros órfãos são rejeitadas pelo banco.
**Prioridade:** Alta
**Origem/Justificativa:** Grupo 5 — "Relacionamentos" e "Integridade dos dados".

### RNF-008 — Consistência transacional das doações
**Categoria:** Confiabilidade
**Descrição:** O registro da doação e a atualização do valor arrecadado da campanha devem ocorrer de forma atômica.
**Métrica/Critério de aceitação:** Em falha simulada no meio da operação, nenhum dado parcial é persistido.
**Prioridade:** Alta
**Origem/Justificativa:** Fluxo de doações (Grupo 3) e indicador "Valor arrecadado".

### RNF-009 — Trilha de auditoria
**Categoria:** Auditabilidade
**Descrição:** O sistema deve registrar quem e quando criou, alterou, publicou ou encerrou campanhas e alterou status de doações.
**Métrica/Critério de aceitação:** Para cada uma dessas operações, existe registro com usuário, data/hora e ação.
**Prioridade:** Média
**Origem/Justificativa:** Gestão de campanhas e doações (Grupo 4); recursos de entidades assistenciais exigem transparência.

### RNF-010 — Usabilidade do fluxo de doação
**Categoria:** Usabilidade
**Descrição:** O fluxo de doação deve poder ser concluído por usuários sem treinamento prévio.
**Métrica/Critério de aceitação:** Em teste de usabilidade com usuários reais, os participantes concluem uma doação sem auxílio; a meta percentual deve ser definida pelo Grupo 1.
**Prioridade:** Alta
**Origem/Justificativa:** Objetivo "Facilitar o processo de contribuição"; "Testes de usabilidade" (Grupo 5).

### RNF-011 — Mensagens de erro compreensíveis
**Categoria:** Usabilidade
**Descrição:** Mensagens de erro devem indicar em linguagem simples o problema e como corrigi-lo, sem expor detalhes técnicos.
**Métrica/Critério de aceitação:** Nenhuma tela exibe stack trace ou código interno; revisão de UX aprova os textos.
**Prioridade:** Média
**Origem/Justificativa:** UX/UI (Grupo 1) e validação com usuários.

### RNF-012 — Acessibilidade WCAG
**Categoria:** Acessibilidade
**Descrição:** A interface deve atender ao nível AA das diretrizes WCAG 2.1.
**Métrica/Critério de aceitação:** Ferramenta automatizada (ex.: Lighthouse/axe) não aponta erros críticos nas telas principais, e o fluxo de doação é concluído usando apenas o teclado.
**Prioridade:** Alta
**Origem/Justificativa:** Entidades atendidas (APAE, Associação Amor Inclusivo) trabalham com inclusão de pessoas com deficiência.

### RNF-013 — Texto alternativo em imagens
**Categoria:** Acessibilidade
**Descrição:** Imagens de campanhas e entidades devem possuir texto alternativo.
**Métrica/Critério de aceitação:** O formulário de envio de imagem exige descrição; todas as imagens exibidas possuem atributo alt preenchido.
**Prioridade:** Média
**Origem/Justificativa:** Imagens de campanha (Grupo 2) e público das entidades atendidas.

### RNF-014 — Layout responsivo
**Categoria:** Compatibilidade
**Descrição:** A interface deve se adaptar a celulares, tablets e computadores.
**Métrica/Critério de aceitação:** As telas principais funcionam sem rolagem horizontal em larguras de celular e de desktop.
**Prioridade:** Alta
**Origem/Justificativa:** Plataforma web voltada ao público geral de doadores (Desenvolvimento Web).

### RNF-015 — Compatibilidade com navegadores
**Categoria:** Compatibilidade
**Descrição:** O sistema deve funcionar nas versões atuais dos navegadores Chrome, Edge, Firefox e Safari.
**Métrica/Critério de aceitação:** O roteiro de testes funcionais é executado com sucesso nesses navegadores.
**Prioridade:** Média
**Origem/Justificativa:** Acesso público via web por doadores.

### RNF-016 — Padronização das respostas da API
**Categoria:** Arquitetura
**Descrição:** As APIs REST devem seguir padrão único de rotas, códigos HTTP e formato de resposta e de erro.
**Métrica/Critério de aceitação:** Todos os endpoints retornam erros na mesma estrutura definida pelo Grupo 5, verificada em testes de API.
**Prioridade:** Alta
**Origem/Justificativa:** Grupo 5 — "Padronização de respostas"; integração entre módulos.

### RNF-017 — Separação entre front-end e back-end
**Categoria:** Arquitetura
**Descrição:** O front-end deve consumir dados exclusivamente pelas APIs, sem acesso direto ao banco.
**Métrica/Critério de aceitação:** Revisão de código não encontra conexão com banco no front-end.
**Prioridade:** Alta
**Origem/Justificativa:** Fluxo de integração "Campanhas/Doações/Gestão → APIs/Banco".

### RNF-018 — Documentação da API
**Categoria:** Manutenibilidade
**Descrição:** Todos os endpoints devem estar documentados em especificação OpenAPI (Swagger).
**Métrica/Critério de aceitação:** Cada endpoint implementado consta na documentação com parâmetros e exemplos de resposta.
**Prioridade:** Média
**Origem/Justificativa:** Grupo 5 — APIs "Documentação"; vários grupos consumindo as mesmas APIs.

### RNF-019 — Fluxo de versionamento
**Categoria:** Manutenibilidade
**Descrição:** Alterações no código devem ser feitas em branches e integradas por Pull Request com ao menos uma revisão aprovada.
**Métrica/Critério de aceitação:** A branch principal é protegida contra push direto e exige aprovação para merge.
**Prioridade:** Alta
**Origem/Justificativa:** Responsabilidades compartilhadas — GitHub (branches, PRs, code review).

### RNF-020 — Padrão de código
**Categoria:** Manutenibilidade
**Descrição:** O código deve seguir padrões de estilo definidos e verificados por ferramentas de lint/formatação.
**Métrica/Critério de aceitação:** O pipeline falha quando há violações de lint.
**Prioridade:** Média
**Origem/Justificativa:** Vários grupos e alunos de níveis diferentes trabalhando no mesmo repositório.

### RNF-021 — Documentação por módulo
**Categoria:** Manutenibilidade
**Descrição:** Cada módulo deve manter documentação de suas decisões, configuração e funcionamento no repositório.
**Métrica/Critério de aceitação:** Cada módulo possui documentação atualizada a cada entrega de sprint.
**Prioridade:** Média
**Origem/Justificativa:** "Cada grupo deverá documentar suas atividades e decisões"; adaptação futura a outras entidades.

### RNF-022 — Testes automatizados de API
**Categoria:** Testabilidade
**Descrição:** Os endpoints de campanhas, doações e autenticação devem possuir testes automatizados.
**Métrica/Critério de aceitação:** Cada endpoint desses módulos possui ao menos um teste de sucesso e um de erro executado no pipeline.
**Prioridade:** Alta
**Origem/Justificativa:** Grupo 5 — "Testes de API".

### RNF-023 — Testes de integração entre módulos
**Categoria:** Testabilidade
**Descrição:** O fluxo completo campanha → doação → registro → indicador deve ser coberto por teste de integração.
**Métrica/Critério de aceitação:** O teste cria uma doação e verifica seu reflexo no valor arrecadado e no dashboard.
**Prioridade:** Média
**Origem/Justificativa:** Grupo 5 — "Testes de integração"; seção "Integração entre os grupos".

### RNF-024 — Integração contínua
**Categoria:** Infraestrutura
**Descrição:** Cada Pull Request deve disparar automaticamente build, lint e testes.
**Métrica/Critério de aceitação:** PRs com falha no pipeline não podem ser integrados.
**Prioridade:** Alta
**Origem/Justificativa:** Grupo 5 — DevOps "CI/CD".

### RNF-025 — Ambientes separados
**Categoria:** Infraestrutura
**Descrição:** O sistema deve possuir ambientes distintos de desenvolvimento, homologação e produção, com bancos de dados separados.
**Métrica/Critério de aceitação:** Testes de validação com usuários ocorrem em homologação sem afetar dados de produção.
**Prioridade:** Média
**Origem/Justificativa:** Grupo 5 — "Ambientes"; etapa "Validação com os usuários".

### RNF-026 — Deploy automatizado
**Categoria:** Infraestrutura
**Descrição:** A publicação em homologação e produção deve ocorrer por pipeline, sem passos manuais no servidor.
**Métrica/Critério de aceitação:** Um merge na branch configurada gera deploy automático e reproduzível.
**Prioridade:** Média
**Origem/Justificativa:** Grupo 5 — "CI/CD" e "Deploy".

### RNF-027 — Suporte a múltiplas entidades
**Categoria:** Escalabilidade
**Descrição:** A inclusão de novas entidades deve ocorrer apenas por cadastro, sem alteração de código.
**Métrica/Critério de aceitação:** Uma nova entidade é cadastrada e recebe campanhas sem deploy ou mudança no código.
**Prioridade:** Alta
**Origem/Justificativa:** Plataforma "posteriormente adaptada para atender outras entidades assistenciais da região".

### RNF-028 — Paginação de listagens
**Categoria:** Desempenho
**Descrição:** Listagens de campanhas, doações e relatórios devem ser paginadas no servidor.
**Métrica/Critério de aceitação:** Nenhum endpoint de listagem retorna todos os registros de uma vez; o tamanho máximo da página é configurável.
**Prioridade:** Média
**Origem/Justificativa:** Crescimento previsto de doadores, doações e entidades (indicadores de expansão).

### RNF-029 — Registro de logs
**Categoria:** Observabilidade
**Descrição:** O back-end deve registrar logs de erros e operações relevantes com data/hora, nível e identificação da requisição, sem incluir senhas ou dados sensíveis.
**Métrica/Critério de aceitação:** Um erro provocado em teste aparece no log com essas informações e sem dados sensíveis.
**Prioridade:** Média
**Origem/Justificativa:** Grupo 5 — "Identificação de bugs"; correções e melhorias do ciclo de desenvolvimento.

### RNF-030 — Backup e recuperação
**Categoria:** Backup e recuperação
**Descrição:** O banco de dados de produção deve ter backups automáticos periódicos com restauração testada.
**Métrica/Critério de aceitação:** Existe rotina de backup agendada e ao menos um teste de restauração documentado; a frequência deve ser definida pelo Grupo 5.
**Prioridade:** Alta
**Origem/Justificativa:** Registros de doações e valores arrecadados das entidades não podem ser perdidos.

---

## 4. Resumo dos Requisitos

| Tipo | Quantidade |
|---|---:|
| Requisitos Funcionais | 30 |
| Requisitos Não Funcionais | 30 |
| Total | 60 |
