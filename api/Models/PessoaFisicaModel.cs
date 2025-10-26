using System.Text.Json.Serialization;

namespace api.Models
{
    public class PessoaFisicaModel
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Sobrenome { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;

        [JsonIgnore]
        public virtual Usuario? Usuario { get; set; }
    }
}