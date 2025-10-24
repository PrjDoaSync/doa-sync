using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace api.Repositories
{
    public class PessoaJuridicaRepository : IPessoaJuridicaRepository
    {
        private readonly ApplicationDbContext _context;

        public PessoaJuridicaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PessoaJuridicaModel> GetAll()
        {
            return _context.PessoasJuridicas.ToList();
        }

        public PessoaJuridicaModel? GetById(int id)
        {
            return _context.PessoasJuridicas.FirstOrDefault(p => p.Id == id);
        }

        public PessoaJuridicaModel Add(PessoaJuridicaModel pessoa)
        {
            _context.PessoasJuridicas.Add(pessoa);
            _context.SaveChanges();
            return pessoa;
        }

        public bool Update(int id, PessoaJuridicaModel pessoaAtualizada)
        {
            var pessoaExistente = _context.PessoasJuridicas.FirstOrDefault(p => p.Id == id);
            
            if (pessoaExistente == null) return false;

            pessoaExistente.RazaoSocial = pessoaAtualizada.RazaoSocial;
            pessoaExistente.NomeFantasia = pessoaAtualizada.NomeFantasia;
            pessoaExistente.CNPJ = pessoaAtualizada.CNPJ;
            
            _context.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            var pessoa = _context.PessoasJuridicas.FirstOrDefault(p => p.Id == id);
            if (pessoa == null) return false;

            _context.PessoasJuridicas.Remove(pessoa);
            _context.SaveChanges();
            return true;
        }
    }
}
