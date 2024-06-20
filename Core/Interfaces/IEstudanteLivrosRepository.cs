using Domain.Entities;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IEstudanteLivrosRepository
    {
        Task RemoveByLivroIdAsync(int livroId);
        // Outros métodos conforme necessário para operações com EstudanteLivros
    }
}
