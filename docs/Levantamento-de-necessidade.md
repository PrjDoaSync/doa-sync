# Levantamento das Necessidades do Cliente — DoaSync

## 1. Necessidades Identificadas

A partir do levantamento realizado com o cliente e das informações apresentadas sobre o projeto, foram identificadas as seguintes necessidades para o DoaSync:

- Criar uma plataforma que conecte doadores e entidades assistenciais da região.
- Permitir que doadores realizem doações de forma digital.
- Permitir que entidades assistenciais apresentem suas informações e campanhas de arrecadação.
- Disponibilizar informações sobre as entidades para que os doadores possam conhecê-las antes de realizar uma doação.
- Permitir o acompanhamento do progresso das campanhas e dos valores arrecadados.
- Manter o histórico das doações realizadas e recebidas.
- Disponibilizar um ambiente administrativo para gerenciamento de usuários, entidades e campanhas.
- Garantir segurança no acesso e no tratamento dos dados dos usuários.
- Permitir que a plataforma seja utilizada tanto em computadores quanto em dispositivos móveis.
- Tornar o processo de doação simples e objetivo.

## 2. Expectativas do Cliente

Com base nas necessidades identificadas, espera-se que o DoaSync:

- Facilite a conexão entre pessoas interessadas em realizar doações e entidades assistenciais.
- Simplifique o processo de realização de doações.
- Permita que as entidades divulguem suas campanhas e acompanhem os valores arrecadados.
- Proporcione maior transparência por meio da apresentação das entidades, campanhas e progresso das arrecadações.
- Ofereça uma experiência de utilização simples e acessível.
- Mantenha os dados dos usuários e das doações protegidos.
- Disponibilize informações que auxiliem no acompanhamento dos resultados da plataforma.

## 3. Objetivos do Cliente

O principal objetivo identificado é desenvolver uma plataforma digital capaz de facilitar e organizar o processo de doação, aproximando doadores de entidades assistenciais.

Como objetivos específicos, foram identificados:

- Centralizar entidades e campanhas assistenciais em uma única plataforma.
- Facilitar a realização de doações.
- Permitir o acompanhamento das arrecadações.
- Dar maior visibilidade às entidades assistenciais.
- Organizar os registros das doações realizadas.
- Disponibilizar indicadores para acompanhamento da utilização da plataforma.
- Criar uma estrutura que possa ser evoluída posteriormente.

## 4. Dúvidas e Pontos de Validação

Durante o levantamento, alguns pontos foram identificados como passíveis de validação e detalhamento junto ao cliente:

1. Quais métodos de pagamento, além do PIX, poderão ser disponibilizados futuramente?
2. Quais informações adicionais das entidades deverão ser apresentadas no perfil público?
3. Quais critérios serão utilizados pelo Administrador para aprovar ou reprovar uma entidade?
4. Quais situações poderão levar à desativação de uma entidade ou campanha?
5. Como deverá funcionar o processo de recuperação de senha?
6. Quais informações deverão aparecer na confirmação de uma doação?
7. Como as doações anônimas deverão ser apresentadas para as entidades?
8. Quais indicadores e relatórios adicionais poderão ser necessários para o painel administrativo?
9. Qual será o volume esperado de usuários e acessos simultâneos?
10. Quais regras deverão ser utilizadas para o encerramento antecipado das campanhas?

Esses pontos deverão ser validados com o cliente antes da implementação das funcionalidades correspondentes, evitando decisões baseadas em suposições.

## 5. Decisões Registradas

Com base no levantamento realizado, foram estabelecidas as seguintes decisões para orientar o desenvolvimento do produto:

- O DoaSync será uma plataforma voltada à conexão entre doadores e entidades assistenciais.
- A plataforma terá três perfis principais de acesso: Doador, Entidade e Administrador.
- As entidades deverão passar por um processo de aprovação antes de serem disponibilizadas na plataforma.
- As entidades poderão criar campanhas de arrecadação com título, descrição, meta, data de início e data de encerramento.
- Os doadores poderão realizar doações vinculadas a campanhas ou diretamente para uma entidade.
- O PIX será utilizado como método de pagamento no escopo inicial.
- O sistema deverá registrar as informações das doações e disponibilizar seu histórico.
- O sistema deverá apresentar o progresso das campanhas, relacionando o valor arrecadado à meta estabelecida.
- O sistema contará com um painel administrativo para gerenciamento da plataforma e visualização de indicadores.
- A aplicação deverá ser responsiva e possuir mecanismos de segurança e controle de acesso.

## 6. Resultado do Levantamento

O levantamento permitiu estabelecer uma visão inicial das necessidades, expectativas e objetivos do cliente, servindo como base para a definição dos requisitos e do MVP do DoaSync.

Os pontos ainda não definidos serão mantidos como itens de validação, evitando que decisões técnicas ou de negócio sejam tomadas sem confirmação do cliente. A partir dessas informações, as próximas etapas do projeto poderão utilizar o levantamento como referência para definir o escopo, priorizar funcionalidades e orientar o desenvolvimento do produto.
