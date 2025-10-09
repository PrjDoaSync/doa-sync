# Diagrama de Classes

    ```mermaid
    classDiagram
        class Usuario {
            +int id
            +string nome
            +string documento
            +string email
            +int telefone
            +string senha
            +Endereco endereco
        }

        # classes com herança de pessoa

        class Doador{
            +fazerDoacao(item, valor, receptor): Doacao
            +visualizarHistorico() :List<Doacao>
        }
        class Receptor{
            +receberDoacao(doacao): void
            +visualizarHistorico() :List<Doacao>
        }

        class Endereco{
            +string logradouro
            +int numero
            +string bairro
            +string cidade
            +string estado
            +string pais
        }

        class Doacao {
            +int id
            +string item
            +decimal valor
            +date data
            +int doadorId
            +int receptorId
            +string status
            +confirmarDoacao(): void
            +cancelarDoacao(): void
        }
        class Projeto{
            +int id
            +string nome
            +string tipo
            +string formaDoacao
            +int instituicaoId
            +calcularValorRecebido() : decimal
            +listarItensRecebidos(): List<tipo>
        }

        class Instituicao {
            +int id
            +string nome
            +string telefone
            +Endereco endereco
            +adicionarProjeto(projeto): void
            +listarProjetos() :List<Projeto>
        }

        Doador "1" -- "0..*" Doacao : realiza
        Receptor "1" -- "0..*" Doacao : recebe
        Doador "1" --  "1" Endereco : possui
        Receptor "1" --  "1" Endereco : possui
        Instituicao "1" -- "1" Endereco : possui
        Instituicao "1" -- "0..*" Projetos : possui 
        Projeto "1" -- "0..*" Doacao : recebe

    ```