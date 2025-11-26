namespace api.DTOs.Projeto
{
    public class ProjetoResponseDTO
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public string Categoria { get; set; }
    }
}
