# Mapeamento das Entidades do Processo de Doação

## Objetivo

Mapear as entidades participantes do processo de doação, identificando o papel de cada uma dentro da solução e estabelecendo um mapa inicial dos relacionamentos entre elas.

## Entidades envolvidas

| Entidade | Papel na solução |
|---|---|
| **USUARIO** | Representa os usuários cadastrados no sistema, armazenando informações de identificação, contato, senha, data de cadastro e status. É a entidade principal de interação com a plataforma. |
| **TELEFONE** | Armazena os números de telefone associados aos usuários, permitindo que um usuário possua um ou mais telefones cadastrados. |
| **ENDERECO** | Armazena os endereços vinculados aos usuários, contendo informações como logradouro, número, bairro, cidade, UF e CEP. |
| **PESSOA FISICA** | Representa usuários classificados como pessoa física, armazenando CPF e data de nascimento. |
| **PESSOA JURIDICA** | Representa usuários classificados como pessoa jurídica, armazenando CNPJ e razão social. |
| **DOACAO** | Registra as doações realizadas, contendo valor, data, forma de pagamento e observações. Relaciona o usuário doador ao projeto beneficiado. |
| **PROJETO** | Representa os projetos que recebem as doações, contendo informações como nome, descrição, objetivo, período de execução e status. |
| **AGENDAMENTO** | Registra agendamentos relacionados aos usuários e projetos, armazenando data, horário, status e observações. |

## Especialização de Usuário

A entidade **USUARIO** possui uma especialização **total e disjunta**, podendo ser classificada em:

- **PESSOA FISICA**
  - CPF
  - Data de nascimento

- **PESSOA JURIDICA**
  - CNPJ
  - Razão social

Isso significa que todo usuário deve pertencer a uma das duas categorias, não podendo pertencer às duas simultaneamente.

## Mapa inicial dos relacionamentos

### Usuário e Telefone

- Um **USUARIO** pode possuir vários **TELEFONES**.
- Cada **TELEFONE** pertence a um único **USUARIO**.
- Cardinalidade: **1:N**.

### Usuário e Endereço

- Um **USUARIO** pode possuir vários **ENDEREÇOS**.
- Cada **ENDEREÇO** pertence a um único **USUARIO**.
- Cardinalidade: **1:N**.

### Usuário e Doação

- Um **USUARIO** pode realizar várias **DOAÇÕES**.
- Cada **DOAÇÃO** está associada a um único **USUARIO**.
- Cardinalidade: **1:N**.

### Projeto e Doação

- Um **PROJETO** pode receber várias **DOAÇÕES**.
- Cada **DOAÇÃO** está associada a um único **PROJETO**.
- Cardinalidade: **1:N**.

### Usuário e Agendamento

- Um **USUARIO** pode possuir vários **AGENDAMENTOS**.
- Cada **AGENDAMENTO** pertence a um único **USUARIO**.
- Cardinalidade: **1:N**.

### Projeto e Agendamento

- Um **PROJETO** pode possuir vários **AGENDAMENTOS**.
- Cada **AGENDAMENTO** está associado a um único **PROJETO**.
- Cardinalidade: **1:N**.


### Pessoa Física e Pessoa Jurídica

A relação **RESPONSAVEL** representa a associação entre pessoas físicas e pessoas jurídicas:

- Uma **PESSOA JURIDICA** pode estar associada a várias **PESSOAS FISICAS**.
- Cada **PESSOA FISICA** está associada a uma **PESSOA JURIDICA** responsável.
- Cardinalidade: **N:1**.

## Fluxo simplificado das principais entidades

```text
                         ┌─────────────┐
                         │   USUARIO   │
                         └──────┬──────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        ┌──────────┐      ┌──────────┐     ┌────────────┐
        │ TELEFONE │      │ ENDEREÇO │     │ AGENDAMENTO│
        └──────────┘      └──────────┘     └──────┬─────┘
                                                   │
                                                   ▼
                                            ┌────────────┐
                                            │  PROJETO   │
                                            └──────┬─────┘
                                                   │
                                                   ▼
                                            ┌────────────┐
                                            │   DOAÇÃO   │
                                            └────────────┘
