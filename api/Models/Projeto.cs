using System.Text.Json.Serialization;

namespace api.Models
{
    public class Projeto
    {
        public int Id { get; set; }

        public int UsuarioId { get; set; }  // Quem criou o projeto (FK de Usuario)

        public string Titulo { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public DateTime Data { get; set; } = DateTime.Now;

        public string Categoria { get; set; } = string.Empty;

        // Relacionamento
        public virtual Usuario Usuario { get; set; }
    }
}