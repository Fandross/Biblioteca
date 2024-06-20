// Infrastructure.Interfaces.ILivroRepository.cs

using Domain.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class AdministradorRepository : IAdministrador
    {
        private readonly AppDbContext _appDbContext;
        public AdministradorRepository(AppDbContext appDbContext){
            _appDbContext = appDbContext;
        }



        public async Task<IEnumerable<Administrador>> GetAllAsync(){
            return await _appDbContext.Administrador.ToListAsync();
        }
        public async Task<Administrador> GetByIdAsync(int id){
            return await _appDbContext.Administrador
                                                    .FirstOrDefaultAsync(l => l.Id == id);
        }
        public async Task AddAsync(Administrador admin){
            _appDbContext.Administrador
                                            .AddAsync(admin);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task UpdateAsync(Administrador admin){
            _appDbContext.Entry(admin).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id){
            var admin = await _appDbContext.Administrador
                                                        .FindAsync(id);
            if (admin != null)
            {
                _appDbContext.Administrador
                                            .Remove(admin);
                await _appDbContext.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<Administrador>> GetAdminByNameAsync(string name){
            return await _appDbContext.Administrador
                                    .Where(l => l.Nome.Contains(name))
                                    .ToListAsync();
        }

    }
}
