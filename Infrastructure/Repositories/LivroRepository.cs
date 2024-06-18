using Core.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class LivroRepository : ILivro
    {
        private readonly AppDbContext _context;

        public LivroRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Livro>> GetAllAsync()
        {
            return await _context.Livros.ToListAsync();
        }

        public async Task<Livro> GetByIdAsync(int id)
        {
            return await _context.Livros
                                  .Include(l => l.EstudanteLivros)
                                  .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task AddAsync(Livro livro)
        {
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Livro livro)
        {
            _context.Entry(livro).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var livro = await _context.Livros.FindAsync(id);
            if (livro != null)
            {
                _context.Livros.Remove(livro);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Livro>> GetByTitleAsync(string title)
        {
            return await _context.Livros
                                 .Where(l => l.Titulo.Contains(title))
                                 .ToListAsync();
        }
    }
}
