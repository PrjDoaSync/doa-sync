namespace api.Models
{
    public class Endereco
    {
        public int Id { get; set; }
        public string Rua { get; set; } = string.Empty; 
        public string Numero { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public string Cep { get; set; } = string.Empty;

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;

    }
}