using Core.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IEstudanteService _estudanteService;
        private readonly IAdministradorService _administradorService;
        private readonly IConfiguration _configuration;

        public AuthController(IEstudanteService estudanteService, IAdministradorService administradorService, IConfiguration configuration)
        {
            _estudanteService = estudanteService;
            _administradorService = administradorService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            object user = null;
            bool isAdmin = false;

            // Check if the user is an admin
            var administrador = await _administradorService.AuthenticateAsync(request.Matricula, request.Senha);
            if (administrador != null)
            {
                user = administrador;
                isAdmin = true;
            }
            else
            {
                // Check if the user is a student
                var estudante = await _estudanteService.AuthenticateAsync(request.Matricula, request.Senha);
                if (estudante != null)
                {
                    user = estudante;
                }
            }

            if (user == null)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(user, isAdmin);
            return Ok(new { Token = token, IsAdmin = isAdmin });
        }

        private string GenerateJwtToken(object user, bool isAdmin)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, isAdmin ? ((Administrador)user).Id.ToString() : ((Estudante)user).Id.ToString()),
                new Claim(ClaimTypes.Name, isAdmin ? ((Administrador)user).Nome : ((Estudante)user).Nome),
                new Claim(ClaimTypes.SerialNumber, isAdmin ? ((Administrador)user).Matricula : ((Estudante)user).Matricula),
                new Claim("isAdmin", isAdmin.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class LoginRequest
    {
        public string Matricula { get; set; }
        public string Senha { get; set; }
    }
}
