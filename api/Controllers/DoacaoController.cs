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
    public class DoacaoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoacaoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/doacao
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doacao>>> GetAll()
        {
            return await _context.Doacao.ToListAsync();
        }

        // GET: api/doacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doacao>> GetById(int id)
        {
            var doacao = await _context.Doacao.FindAsync(id);

            if (doacao == null)
                return NotFound();

            return doacao;
        }

        // POST: api/doacao
        [HttpPost]
        public async Task<ActionResult<Doacao>> Create(Doacao doacao)
        {
            _context.Doacao.Add(doacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = doacao.Id }, doacao);
        }

        // PUT: api/doacao/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Doacao doacao)
        {
            if (id != doacao.Id)
                return BadRequest("O ID da URL e do corpo não coincidem.");

            _context.Entry(doacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Doacao.Any(e => e.Id == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: api/doacao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var doacao = await _context.Doacao.FindAsync(id);

            if (doacao == null)
                return NotFound();

            _context.Doacao.Remove(doacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
