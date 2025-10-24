using api.Models;
using System.Collections.Generic;

namespace api.Repositories
{
    public interface IPessoaFisicaRepository
    {
        IEnumerable<PessoaFisicaModel> GetAll();
        PessoaFisicaModel? GetById(int id);
        PessoaFisicaModel Add(PessoaFisicaModel pessoa);
        bool Update(int id, PessoaFisicaModel pessoaAtualizada);
        bool Delete(int id);
    }
}