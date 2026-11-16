# DoaSync

Plataforma de gerenciamento e facilitação de doações.

## Documentação

Toda a documentação do projeto está indexada em [`docs/README.md`](./docs/README.md), com o documento canônico de cada assunto.

## Sobre o Projeto

O DoaSync conecta pessoas a projetos de doação, tornando o processo de contribuir mais simples e acessível. A ideia central é reduzir a fricção entre quem quer ajudar e quem precisa, centralizando projetos, campanhas e agendamentos em um único lugar.

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
