using System.Text.Json.Serialization;

namespace api.Models
{
    public class PessoaJuridicaModel
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string RazaoSocial { get; set; } = string.Empty;
        public string NomeFantasia { get; set; } = string.Empty;
        public string CNPJ { get; set; } = string.Empty;

        [JsonIgnore]
        public virtual Usuario? Usuario { get; set; }
    }
}