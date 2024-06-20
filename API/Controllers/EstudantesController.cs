using Core.Interfaces;
using Core.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using API.Models;
using Infrastructure.Data; // Certifique-se de adicionar esta linha para importar o contexto

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstudantesController : ControllerBase
    {
        private readonly IEstudanteService _estudanteService;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context; // Adicione esta linha

        public EstudantesController(IEstudanteService estudanteService, IConfiguration configuration, AppDbContext context)
        {
            _estudanteService = estudanteService;
            _configuration = configuration;
            _context = context; // Adicione esta linha
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var estudantes = await _estudanteService.GetEstudantesAsync();
            return Ok(estudantes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Estudante>> GetEstudante(int id)
        {
            var estudante = await _estudanteService.GetEstudanteByIdAsync(id);
            if (estudante == null)
            {
                return NotFound();
            }
            return Ok(estudante);
        }

        [HttpPost]
        public async Task<ActionResult<Estudante>> CreateEstudante(Estudante estudante)
        {
            var createdEstudante = await _estudanteService.CreateEstudanteAsync(estudante);
            return CreatedAtAction(nameof(GetEstudante), new { id = createdEstudante.Id }, createdEstudante);
        }

        [HttpPost("{estudanteId}/alugar/{livroId}")]
        public async Task<IActionResult> AlugarLivro(int estudanteId, int livroId)
        {
            try
            {
                await _estudanteService.AlugarLivroAsync(estudanteId, livroId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{estudanteId}/devolver/{livroId}")]
        public async Task<IActionResult> DevolverLivro(int estudanteId, int livroId)
        {
            var estudante = await _context.Estudantes
                .Include(e => e.EstudanteLivros)
                .ThenInclude(el => el.Livro)
                .FirstOrDefaultAsync(e => e.Id == estudanteId);

            if (estudante == null)
            {
                return NotFound("Estudante não encontrado.");
            }

            var estudanteLivro = estudante.EstudanteLivros.FirstOrDefault(el => el.LivroId == livroId);
            if (estudanteLivro == null)
            {
                return NotFound("Livro não encontrado para este estudante.");
            }

            estudante.EstudanteLivros.Remove(estudanteLivro);

            var livro = await _context.Livros.Include(l => l.EstudanteLivros)
                                            .FirstOrDefaultAsync(l => l.Id == livroId);
            if (livro != null)
            {
                var livroEstudante = livro.EstudanteLivros.FirstOrDefault(le => le.EstudanteId == estudanteId);
                if (livroEstudante != null)
                {
                    livro.EstudanteLivros.Remove(livroEstudante);
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var estudante = await _estudanteService.AuthenticateAsync(model.Matricula, model.Senha);

            if (estudante == null)
            {
                return Unauthorized(); // Credenciais inválidas
            }

            // Gera token JWT
            var token = GenerateJwtToken(estudante);

            return Ok(new { token });
        }

        private string GenerateJwtToken(Estudante estudante)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, estudante.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
