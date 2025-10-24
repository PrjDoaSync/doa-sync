using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/pessoafisica")]
    public class PessoaFisicaController : ControllerBase
    {
        private readonly IPessoaFisicaRepository _repository;

        // O ASP.NET Core injeta a implementação do IPessoaFisicaRepository (que agora é o PessoaFisicaRepository com EF Core)
        public PessoaFisicaController(IPessoaFisicaRepository repository)
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
        public IActionResult Add(PessoaFisicaModel pessoa)
        {
            var novaPessoa = _repository.Add(pessoa);
            return CreatedAtAction(nameof(GetById), new { id = novaPessoa.Id }, novaPessoa);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PessoaFisicaModel pessoaAtualizada)
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
