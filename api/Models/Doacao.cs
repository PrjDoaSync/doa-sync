using System;

namespace SeuProjeto.Models
{
    public class Doacao
    {
        public int Id { get; set; }
        public int DoadorId { get; set; }     // UsuarioId do Doador
        public int ReceptorId { get; set; }   // UsuarioId do Receptor
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public string Local { get; set; }
        public DateTime DataPlanejada { get; set; }
    }
}
