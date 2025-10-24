using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace api.Repositories
{
    public class PessoaFisicaRepository : IPessoaFisicaRepository
    {
        private readonly ApplicationDbContext _context;

        public PessoaFisicaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PessoaFisicaModel> GetAll()
        {
            return _context.PessoasFisicas.ToList();
        }

        public PessoaFisicaModel? GetById(int id)
        {
            return _context.PessoasFisicas.FirstOrDefault(p => p.Id == id);
        }

        public PessoaFisicaModel Add(PessoaFisicaModel pessoa)
        {
            _context.PessoasFisicas.Add(pessoa);
            _context.SaveChanges();
            return pessoa;
        }

        public bool Update(int id, PessoaFisicaModel pessoaAtualizada)
        {
            var pessoaExistente = _context.PessoasFisicas.FirstOrDefault(p => p.Id == id);
            
            if (pessoaExistente == null) return false;

            pessoaExistente.Nome = pessoaAtualizada.Nome;
            pessoaExistente.Sobrenome = pessoaAtualizada.Sobrenome;
            pessoaExistente.CPF = pessoaAtualizada.CPF;
            pessoaExistente.RG = pessoaAtualizada.RG;
            
            _context.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            var pessoa = _context.PessoasFisicas.FirstOrDefault(p => p.Id == id);
            if (pessoa == null) return false;
            
            _context.PessoasFisicas.Remove(pessoa);
            _context.SaveChanges();
            return true;
        }
    }
}
