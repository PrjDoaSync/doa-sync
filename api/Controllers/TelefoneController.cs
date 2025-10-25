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
    public class TelefoneController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TelefoneController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Telefone>>> GetTelefones()
        {
            return await _context.Telefone.Include(t => t.Usuario).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Telefone>> GetTelefone(int id)
        {
            var telefone = await _context.Telefone
                .Include(t => t.Usuario)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (telefone == null)
                return NotFound();

            return telefone;
        }

        [HttpPost]
        public async Task<ActionResult<Telefone>> PostTelefone(Telefone telefone)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Telefone.Add(telefone);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTelefone), new { id = telefone.Id }, telefone);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTelefone(int id, Telefone telefone)
        {
            if (id != telefone.Id)
                return BadRequest();

            _context.Entry(telefone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TelefoneExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTelefone(int id)
        {
            var telefone = await _context.Telefone.FindAsync(id);
            if (telefone == null)
                return NotFound();

            _context.Telefone.Remove(telefone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TelefoneExists(int id)
        {
            return _context.Telefone.Any(e => e.Id == id);
        }
    }
}