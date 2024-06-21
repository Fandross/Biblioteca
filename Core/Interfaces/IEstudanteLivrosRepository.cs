using Domain.Entities;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IEstudanteLivrosRepository
    {
        Task RemoveByLivroIdAsync(int livroId);
    }
}
