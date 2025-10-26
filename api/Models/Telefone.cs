using System.Text.Json.Serialization;

namespace api.Models
{
    public class Telefone{
        public int Id { get; set; }
        public string Ddd { get; set; } = string.Empty;
        public string Numero { get; set; } = string.Empty;

        public int UsuarioId { get; set; }
        
        [JsonIgnore]
        public Usuario? Usuario { get; set; }
    }    
}