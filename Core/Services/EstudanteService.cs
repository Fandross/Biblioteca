using Core.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Services
{
    public class EstudanteService : IEstudanteService
    {
        private readonly AppDbContext _context;

        public EstudanteService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Estudante>> GetEstudantesAsync()
        {
            return await _context.Estudantes.ToListAsync();
        }

        

        public async Task<Estudante> CreateEstudanteAsync(Estudante estudante)
        {
            _context.Estudantes.Add(estudante);
            await _context.SaveChangesAsync();
            return estudante;
        }

        public async Task<Estudante> GetEstudanteByIdAsync(int id)
        {
            return await _context.Estudantes
                                .Include(e => e.EstudanteLivros)
                                .ThenInclude(el => el.Livro)
                                .FirstOrDefaultAsync(e => e.Id == id);
        }


        public async Task AlugarLivroAsync(int estudanteId, int livroId)
        {
            var estudante = await _context.Estudantes.Include(e => e.EstudanteLivros)
                                                    .FirstOrDefaultAsync(e => e.Id == estudanteId);
            if (estudante == null)
            {
                throw new Exception("Estudante não encontrado.");
            }

            var livro = await _context.Livros.FindAsync(livroId);
            if (livro == null)
            {
                throw new Exception("Livro não encontrado.");
            }

            var estudanteLivro = new EstudanteLivro
            {
                EstudanteId = estudanteId,
                LivroId = livroId,
                Estudante = estudante,
                Livro = livro
            };

            estudante.EstudanteLivros.Add(estudanteLivro);

            await _context.SaveChangesAsync();
        }

        
    }
}
