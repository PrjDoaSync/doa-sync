# DoaSync

Plataforma de gerenciamento e facilitação de doações, desenvolvida em parceria com o projeto de extensão **Amor Inclusivo**.

## Sobre o Projeto

O DoaSync conecta pessoas a projetos de doação, tornando o processo de contribuir mais simples e acessível. A ideia central é reduzir a fricção entre quem quer ajudar e quem precisa, centralizando projetos, campanhas e agendamentos em um único lugar.

O projeto é desenvolvido em parceria com o **Amor Inclusivo**, iniciativa de extensão universitária com foco em inclusão social e apoio a comunidades vulneráveis.

## Funcionalidades

- Cadastro de usuários (pessoa física e jurídica)
- Listagem e acompanhamento de projetos de doação
- Registro de doações com valor, forma de pagamento e observações
- Agendamento de entregas ou participações em projetos
- Gestão de produtos e pedidos vinculados às campanhas

## Modelo de Dados

A aplicação é estruturada em torno das seguintes entidades principais:

| Entidade | Descrição |
|---|---|
| `Usuario` | Pessoa cadastrada na plataforma |
| `Pessoa Física / Jurídica` | Especialização do usuário (CPF ou CNPJ) |
| `Projeto` | Campanha ou iniciativa que recebe doações |
| `Doacao` | Registro de uma contribuição feita por um usuário a um projeto |
| `Agendamento` | Marcação de data/hora para participação em um projeto |
| `Pedido / Item Pedido` | Solicitação de produtos vinculada a um usuário |
| `Produto` | Itens disponíveis para doação ou distribuição |

## Parceria

Este projeto é desenvolvido em conjunto com o **Amor Inclusivo**, projeto de extensão universitária voltado ao acolhimento e inclusão de pessoas em situação de vulnerabilidade social.
