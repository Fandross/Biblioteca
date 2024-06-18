using Core.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Services
{
    public class LivroService : ILivroService
    {
        private readonly ILivro _livroRepository;

        public LivroService(ILivro livroRepository)
        {
            _livroRepository = livroRepository;
        }

        public async Task<IEnumerable<Livro>> GetAllAsync()
        {
            return await _livroRepository.GetAllAsync();
        }

        public async Task<Livro> GetByIdAsync(int id)
        {
            return await _livroRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Livro livro)
        {
            await _livroRepository.AddAsync(livro);
        }

        public async Task UpdateAsync(Livro livro)
        {
            await _livroRepository.UpdateAsync(livro);
        }

        public async Task DeleteAsync(int id)
        {
            await _livroRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Livro>> GetByTitleAsync(string title)
        {
            return await _livroRepository.GetByTitleAsync(title);
        }
    }
}
