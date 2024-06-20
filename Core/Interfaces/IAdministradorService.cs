using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Core.Interfaces{

    public interface IAdministradorService
    {
        Task<IEnumerable<Administrador>> GetAllAsync();
        Task<Administrador> GetByIdAsync(int id);
        Task AddAsync(Administrador admin);
        Task UpdateAsync(Administrador admin);
        Task DeleteAsync(int id);
        Task<IEnumerable<Administrador>> GetAdminByName(string name);
        Task<Administrador> AuthenticateAsync(string matricula, string senha);
    }
}