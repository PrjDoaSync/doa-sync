using api.Models;
using System.Collections.Generic;

namespace api.Repositories
{
    public interface IPessoaJuridicaRepository
    {
        IEnumerable<PessoaJuridicaModel> GetAll();
        PessoaJuridicaModel? GetById(int id);
        PessoaJuridicaModel Add(PessoaJuridicaModel pessoa);
        bool Update(int id, PessoaJuridicaModel pessoaAtualizada);
        bool Delete(int id);
    }
}