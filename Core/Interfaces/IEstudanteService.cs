using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IEstudanteService
    {
        Task<List<Estudante>> GetEstudantesAsync();
        Task<Estudante> CreateEstudanteAsync(Estudante estudante);
        Task<Estudante> GetEstudanteByIdAsync(int id);
        Task AlugarLivroAsync(int estudanteId, int livroId);
        Task<Estudante> AuthenticateAsync(string matricula, string senha);
    }
}
