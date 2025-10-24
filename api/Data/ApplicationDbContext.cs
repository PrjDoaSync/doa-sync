using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<PessoaFisicaModel> PessoasFisicas { get; set; } = default!;
        public DbSet<PessoaJuridicaModel> PessoasJuridicas { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
        }
        public DbSet<api.Models.Endereco> Endereco { get; set; } = default!;
        public DbSet<api.Models.Telefone> Telefone { get; set; } = default!;
        public DbSet<api.Models.Usuario> Usuario { get; set; } = default!;
    }
}