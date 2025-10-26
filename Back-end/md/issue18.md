# CRUD de Usuário (Issue #18)


```json
POST http://localhost:5009/api/Usuario
{
    "username": "teste",
    "password": "123456",
    "email": "teste@email.com",
    "tipoUsuario": 2
}
```

```json
POST http://localhost:5009/api/PessoaFisica
{
    "usuarioId": 1,
    "nome": "João",
    "sobrenome": "Silva",
    "cpf": "12345678901"
}
```

```json
POST http://localhost:5009/api/Endereco
{
  "logradouro": "Rua das Flores",
  "numero": "123",
  "bairro": "Jardim Primavera",
  "cidade": "São Paulo",
  "estado": "SP",
  "pais": "Brasil",
  "cep": "01234-567",
  "usuarioId": 1
}
```

```json
POST http://localhost:5009/api/Telefone
{
  "ddd": "15",
  "numero": "988887777",
  "usuarioId": 1
}
```

```json
GET http://localhost:5009/api/Usuario/1
{
  "id": 1,
  "username": "teste",
  "password": "123456",
  "email": "teste@email.com",
  "tipoUsuario": 2,
  "pessoaFisica": {
    "id": 1,
    "usuarioId": 1,
    "nome": "João",
    "sobrenome": "Silva",
    "cpf": "12345678901"
  },
  "pessoaJuridica": null,
  "telefones": [
    {
      "id": 1,
      "ddd": "15",
      "numero": "988887777",
      "usuarioId": 1
    }
  ],
  "enderecos": [
    {
      "id": 1,
      "logradouro": "Rua das Flores",
      "numero": "123",
      "bairro": "Jardim Primavera",
      "cidade": "São Paulo",
      "estado": "SP",
      "pais": "Brasil",
      "cep": "01234-567",
      "usuarioId": 1
    }
  ]
}
```