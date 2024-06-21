using Core.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers{
    [ApiController]
    [Route("/api/[Controller]")]
    public class AdministradorController : ControllerBase
    {
        private readonly IAdministradorService _administradorService;

        public AdministradorController(IAdministradorService administradorService){
            _administradorService = administradorService;
        }

        //////
        ///
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var livros = await _administradorService.GetAllAsync();
            return Ok(livros);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var admin = await _administradorService.GetByIdAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }

        [HttpGet("/{name}")] 
        public async Task<IActionResult> GetAdminByNameAsync(string name)
        {
            var admin = await _administradorService.GetAdminByName(name);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(admin);

        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmin(Administrador admin)
        {
            await _administradorService.AddAsync(admin);
            return CreatedAtAction(nameof(GetById), new { id = admin.Id }, admin);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdmin(int id, Administrador admin)
        {
            if (id != admin.Id)
            {
                return BadRequest();
            }
            await _administradorService.UpdateAsync(admin);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            await _administradorService.DeleteAsync(id);
            return NoContent();
        }


    }
}