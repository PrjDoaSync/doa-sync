using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaFisicaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PessoaFisicaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaFisicaModel>>> GetPessoasFisicas()
        {
            return await _context.PessoasFisicas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PessoaFisicaModel>> GetPessoaFisica(int id)
        {
            var pessoaFisica = await _context.PessoasFisicas
                .FirstOrDefaultAsync(m => m.Id == id);

            if (pessoaFisica == null)
                return NotFound();

            return pessoaFisica;
        }

        [HttpPost]
        public async Task<ActionResult<PessoaFisicaModel>> PostPessoaFisica(PessoaFisicaModel pessoaFisica)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.PessoasFisicas.Add(pessoaFisica);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPessoaFisica), new { id = pessoaFisica.Id }, pessoaFisica);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPessoaFisica(int id, PessoaFisicaModel pessoaFisica)
        {
            if (id != pessoaFisica.Id)
                return BadRequest();

            _context.Entry(pessoaFisica).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PessoaFisicaModelExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoaFisica(int id)
        {
            var pessoaFisica = await _context.PessoasFisicas.FindAsync(id);
            if (pessoaFisica == null)
                return NotFound();

            _context.PessoasFisicas.Remove(pessoaFisica);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PessoaFisicaModelExists(int id)
        {
            return _context.PessoasFisicas.Any(e => e.Id == id);
        }
    }
}