using api.Models;
using System.Collections.Generic;
using System.Linq;

namespace api.Repositories
{
    public class PessoaFisicaRepository
    {
        private static List<PessoaFisicaModel> pessoasFisicas = new();

        public IEnumerable<PessoaFisicaModel> GetAll()
        {
            return pessoasFisicas;
        }

        public PessoaFisicaModel? GetById(int id)
        {
            return pessoasFisicas.FirstOrDefault(p => p.Id == id);
        }

        public PessoaFisicaModel Add(PessoaFisicaModel pessoa)
        {
            pessoa.Id = pessoasFisicas.Count > 0 ? pessoasFisicas.Max(p => p.Id) + 1 : 1;
            pessoasFisicas.Add(pessoa);
            return pessoa;
        }

        public bool Update(int id, PessoaFisicaModel pessoaAtualizada)
        {
            var pessoa = GetById(id);
            if (pessoa == null) return false;

            pessoa.Nome = pessoaAtualizada.Nome;
            pessoa.Sobrenome = pessoaAtualizada.Sobrenome;
            pessoa.CPF = pessoaAtualizada.CPF;
            pessoa.RG = pessoaAtualizada.RG;
            return true;
        }

        public bool Delete(int id)
        {
            var pessoa = GetById(id);
            if (pessoa == null) return false;
            pessoasFisicas.Remove(pessoa);
            return true;
        }
    }
}
