// Core/Interfaces/ILivroService.cs
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ILivroService
    {
        Task<IEnumerable<Livro>> GetAllAsync();
        Task<Livro> GetByIdAsync(int id);
        Task AddAsync(Livro livro);
        Task UpdateAsync(Livro livro);
        Task DeleteAsync(int id);
        //teste
        Task<IEnumerable<Livro>>GetByTitleAsync(string title);
        Task RemoveDependenciesAsync(int livroId);
    }
}
