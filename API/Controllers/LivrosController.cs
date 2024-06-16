// API/Controllers/LivrosController.cs
using Core.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivrosController : ControllerBase
    {
        private readonly ILivroService _livroService;

        public LivrosController(ILivroService livroService)
        {
            _livroService = livroService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var livros = await _livroService.GetAllAsync();
            return Ok(livros);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var livro = await _livroService.GetByIdAsync(id);
            if (livro == null)
            {
                return NotFound();
            }
            return Ok(livro);
        }

        [HttpGet("bytitle/{title}")] // Alteração na rota para evitar conflito
        public async Task<IActionResult> GetByTitleAsync(string title)
        {
            var livros = await _livroService.GetByTitleAsync(title);
            if (livros == null || !livros.Any()) // Verifica se a lista de livros está vazia
            {
                return NotFound();
            }
            return Ok(livros);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Livro livro)
        {
            await _livroService.AddAsync(livro);
            return CreatedAtAction(nameof(GetById), new { id = livro.Id }, livro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Livro livro)
        {
            if (id != livro.Id)
            {
                return BadRequest();
            }
            await _livroService.UpdateAsync(livro);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _livroService.DeleteAsync(id);
            return NoContent();
        }
    }
}
