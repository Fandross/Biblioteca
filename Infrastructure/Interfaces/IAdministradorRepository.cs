// Infrastructure.Interfaces.ILivroRepository.cs

using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IAdministradorRepository
    {
        Task<IEnumerable<Administrador>> GetAllAdminAsync();
        Task<Administrador> GetAdminByIdAsync(int id);
        Task CreateAdminAsync(Administrador admin);
        Task UpdateAdminAsync(Administrador admin);
        Task DeleteAdminAsync(int id);
        Task<IEnumerable<Administrador>> GetAdminByNameAsync(string name);
    }
}
