// Infrastructure.Interfaces.ILivroRepository.cs

using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ILivroRepository
    {
        Task<IEnumerable<Livro>> GetAllLivrosAsync();
        Task<Livro> GetLivroByIdAsync(int id);
        Task CreateLivroAsync(Livro livro);
        Task UpdateLivroAsync(Livro livro);
        Task DeleteLivroAsync(int id);
        //Teste
        Task GetByTitleAsync(string title);
    }
}
