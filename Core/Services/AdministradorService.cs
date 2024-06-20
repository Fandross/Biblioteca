using Core.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Services
{
    public class AdministradorService : IAdministradorService
    {
        private readonly AppDbContext _context;

        public AdministradorService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Administrador>> GetAllAsync()
        {
            return await _context.Administrador.ToListAsync();
        }

        public async Task<Administrador> GetByIdAsync(int id)
        {
            return await _context.Administrador.FindAsync(id);
        }

        public async Task AddAsync(Administrador administrador)
        {
            await _context.Administrador.AddAsync(administrador);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Administrador administrador)
        {
            _context.Administrador.Update(administrador);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var admin = await _context.Administrador.FindAsync(id);
            if (admin != null)
            {
                _context.Administrador.Remove(admin);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Administrador>> GetAdminByName(string name)
        {
            return await _context.Administrador
                .Where(a => a.Nome.Contains(name))
                .ToListAsync();
        }

        public async Task<Administrador> AuthenticateAsync(string matricula, string senha)
        {
            return await _context.Administrador.FirstOrDefaultAsync(a => a.Matricula == matricula && a.Senha == senha);
        }
    }
}
