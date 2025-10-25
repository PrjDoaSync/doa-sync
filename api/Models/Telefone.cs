namespace api.Models
{
    public class Telefone{
        public int Id { get; set; }
        public string Ddd { get; set; } = string.Empty;
        public string Numero { get; set; } = string.Empty;

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;
    }    
}