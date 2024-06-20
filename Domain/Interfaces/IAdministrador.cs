using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IAdministrador
    {
        Task<IEnumerable<Administrador>> GetAllAsync();
        Task<IEnumerable<Administrador>> GetAdminByNameAsync(string name);
        Task<Administrador> GetByIdAsync(int id);
        Task AddAsync(Administrador livro);
        Task UpdateAsync(Administrador livro);
        Task DeleteAsync(int id);
    }
}
