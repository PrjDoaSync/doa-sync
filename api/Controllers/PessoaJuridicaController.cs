using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/pessoajuridica")]
    public class PessoaJuridicaController : ControllerBase
    {
        private readonly IPessoaJuridicaRepository _repository;

        // O ASP.NET Core injeta a implementação do IPessoaJuridicaRepository (que agora é o PessoaJuridicaRepository com EF Core)
        public PessoaJuridicaController(IPessoaJuridicaRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var pessoas = _repository.GetAll();
            return Ok(pessoas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pessoa = _repository.GetById(id);
            if (pessoa == null)
            {
                return NotFound();
            }
            return Ok(pessoa);
        }

        [HttpPost]
        public IActionResult Add(PessoaJuridicaModel pessoa)
        {
            var novaPessoa = _repository.Add(pessoa);
            return CreatedAtAction(nameof(GetById), new { id = novaPessoa.Id }, novaPessoa);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PessoaJuridicaModel pessoaAtualizada)
        {
            var sucesso = _repository.Update(id, pessoaAtualizada);
            if (!sucesso)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var sucesso = _repository.Delete(id);
            if (!sucesso)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
