using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;                  
using api.Models;        
using api.DTOs;
using api.DTOs.Projeto;


namespace api.Controllers
{
    [ApiController]
    [Route("projeto")]
    public class ProjetoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjetoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProjetoDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Titulo) ||
                string.IsNullOrWhiteSpace(dto.Descricao))
            {
                return BadRequest("Título e Descrição são obrigatórios.");
            }

            var usuario = await _context.Usuario.FindAsync(dto.UsuarioId);
            if (usuario == null)
            {
                return NotFound("Usuário informado não existe.");
            }

            var projeto = new Projeto
            {
                UsuarioId = dto.UsuarioId,
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Categoria = dto.Categoria,
                Data = DateTime.Now
            };

            _context.Projetos.Add(projeto);
            await _context.SaveChangesAsync();

            return Ok(projeto);
        }

        // GET /projeto
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? usuarioId)
        {
            var query = _context.Projetos.AsQueryable();

            if (usuarioId.HasValue)
                query = query.Where(p => p.UsuarioId == usuarioId);

            var lista = await query.ToListAsync();
            return Ok(lista);
        }

        // GET /projeto/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var projeto = await _context.Projetos.FindAsync(id);
            if (projeto == null)
                return NotFound();

            return Ok(projeto);
        }

        // PUT /projeto/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateProjetoDTO dto)
        {
            var projeto = await _context.Projetos.FindAsync(id);
            if (projeto == null)
                return NotFound();

            projeto.Titulo = dto.Titulo;
            projeto.Descricao = dto.Descricao;
            projeto.Categoria = dto.Categoria;

            await _context.SaveChangesAsync();

            return Ok(projeto);
        }

        // DELETE /projeto/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var projeto = await _context.Projetos.FindAsync(id);
            if (projeto == null)
                return NotFound();

            _context.Projetos.Remove(projeto);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Projeto removido com sucesso." });
        }
    }
}
