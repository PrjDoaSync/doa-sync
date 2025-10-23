using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Repositories;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaJuridicaController : ControllerBase
    {
        private readonly PessoaJuridicaRepository _repository = new();

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pessoa = _repository.GetById(id);
            if (pessoa == null) return NotFound("Pessoa Jurídica não encontrada!");
            return Ok(pessoa);
        }

        [HttpPost]
        public IActionResult Create([FromBody] PessoaJuridicaModel pessoa)
        {
            var novaPessoa = _repository.Add(pessoa);
            return CreatedAtAction(nameof(GetById), new { id = novaPessoa.Id }, novaPessoa);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] PessoaJuridicaModel pessoaAtualizada)
        {
            var atualizado = _repository.Update(id, pessoaAtualizada);
            if (!atualizado) return NotFound("Pessoa Jurídica não encontrada!");
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deletado = _repository.Delete(id);
            if (!deletado) return NotFound("Pessoa Jurídica não encontrada!");
            return NoContent();
        }
    }
}
