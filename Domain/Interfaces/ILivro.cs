using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ILivro
    {
        Task<IEnumerable<Livro>> GetAllAsync();
        Task<Livro> GetByIdAsync(int id);
        Task AddAsync(Livro livro);
        Task UpdateAsync(Livro livro);
        Task DeleteAsync(int id);
        Task<IEnumerable<Livro>> GetByTitleAsync(string title);
    }
}
