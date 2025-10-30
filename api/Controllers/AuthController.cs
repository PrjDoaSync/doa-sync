using Microsoft.AspNetCore.Mvc;
using api.Data;              
using api.DTOs;              
using api.Models;            
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        public AuthController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.UsernameOrEmail) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new { message = "Usuário/email e senha são obrigatórios." });

            Console.WriteLine($"DTO recebido: {dto.UsernameOrEmail} / {dto.Password}");

            // Busca por username OU email
            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => 
                    u.Username == dto.UsernameOrEmail || 
                    u.Email == dto.UsernameOrEmail);

            if (user == null)
            {
                Console.WriteLine("Usuário não encontrado!");
                return Unauthorized(new { message = "Credenciais inválidas." });
            }

            if (user.Password.Trim() != dto.Password.Trim())
            {
                Console.WriteLine("Senha incorreta!");
                return Unauthorized(new { message = "Credenciais inválidas." });
            }

            Console.WriteLine("Login bem-sucedido!");
            return Ok(new
            {
                message = "Login bem-sucedido!",
                usuario = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.TipoUsuario
                }
            });
        }
    }
}
