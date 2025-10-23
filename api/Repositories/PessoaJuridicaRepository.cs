using api.Models;
using System.Collections.Generic;
using System.Linq;

namespace api.Repositories
{
    public class PessoaJuridicaRepository
    {
        private static List<PessoaJuridicaModel> pessoasJuridicas = new();

        public IEnumerable<PessoaJuridicaModel> GetAll() => pessoasJuridicas;

        public PessoaJuridicaModel? GetById(int id) =>
            pessoasJuridicas.FirstOrDefault(p => p.Id == id);

        public PessoaJuridicaModel Add(PessoaJuridicaModel pessoa)
        {
            pessoa.Id = pessoasJuridicas.Count > 0 ? pessoasJuridicas.Max(p => p.Id) + 1 : 1;
            pessoasJuridicas.Add(pessoa);
            return pessoa;
        }

        public bool Update(int id, PessoaJuridicaModel pessoaAtualizada)
        {
            var pessoa = GetById(id);
            if (pessoa == null) return false;

            pessoa.RazaoSocial = pessoaAtualizada.RazaoSocial;
            pessoa.NomeFantasia = pessoaAtualizada.NomeFantasia;
            pessoa.CNPJ = pessoaAtualizada.CNPJ;
            return true;
        }

        public bool Delete(int id)
        {
            var pessoa = GetById(id);
            if (pessoa == null) return false;

            pessoasJuridicas.Remove(pessoa);
            return true;
        }
    }
}
