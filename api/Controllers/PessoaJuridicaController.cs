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
    public class PessoaJuridicaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PessoaJuridicaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaJuridicaModel>>> GetPessoasJuridicas()
        {
            return await _context.PessoasJuridicas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PessoaJuridicaModel>> GetPessoaJuridica(int id)
        {
            var pessoaJuridica = await _context.PessoasJuridicas
                .FirstOrDefaultAsync(m => m.Id == id);

            if (pessoaJuridica == null)
                return NotFound();

            return pessoaJuridica;
        }

        [HttpPost]
        public async Task<ActionResult<PessoaJuridicaModel>> PostPessoaJuridica(PessoaJuridicaModel pessoaJuridica)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.PessoasJuridicas.Add(pessoaJuridica);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPessoaJuridica), new { id = pessoaJuridica.Id }, pessoaJuridica);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPessoaJuridica(int id, PessoaJuridicaModel pessoaJuridica)
        {
            if (id != pessoaJuridica.Id)
                return BadRequest();

            _context.Entry(pessoaJuridica).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PessoaJuridicaModelExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoaJuridica(int id)
        {
            var pessoaJuridica = await _context.PessoasJuridicas.FindAsync(id);
            if (pessoaJuridica == null)
                return NotFound();

            _context.PessoasJuridicas.Remove(pessoaJuridica);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PessoaJuridicaModelExists(int id)
        {
            return _context.PessoasJuridicas.Any(e => e.Id == id);
        }
    }
}
