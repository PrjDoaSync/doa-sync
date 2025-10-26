using api.Enums;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public TipoUsuario TipoUsuario { get; set; } // Mudado para usar o enum diretamente

        public virtual PessoaFisicaModel? PessoaFisica { get; set; }
        public virtual PessoaJuridicaModel? PessoaJuridica { get; set; }
        public virtual List<Telefone> Telefones { get; set; } = new();
        public virtual List<Endereco> Enderecos { get; set; } = new();
    }
}