using Core.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstudantesController : ControllerBase
    {
        private readonly EstudanteService _estudanteService;

        public EstudantesController(EstudanteService estudanteService)
        {
            _estudanteService = estudanteService;
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
                return BadRequest(new { message = ex.Message });
            }
        }
        
    }
}
