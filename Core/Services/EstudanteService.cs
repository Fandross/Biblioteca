using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Services
{
    public class EstudanteService
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

        public async Task<Estudante?> GetEstudanteByIdAsync(int id)
        {
            return await _context.Estudantes
                                .FirstOrDefaultAsync(e => e.Id == id);
        }

       public async Task AlugarLivroAsync(int estudanteId, int livroId)
    {
        var estudante = await _context.Estudantes
            .Include(e => e.EstudanteLivros)
            .FirstOrDefaultAsync(e => e.Id == estudanteId);

        var livro = await _context.Livros
            .Include(l => l.EstudanteLivros)
            .FirstOrDefaultAsync(l => l.Id == livroId);

        if (estudante == null || livro == null)
        {
            throw new Exception("Estudante ou livro não encontrado.");
        }

        if (!estudante.EstudanteLivros.Any(el => el.LivroId == livroId))
        {
            estudante.EstudanteLivros.Add(new EstudanteLivro
            {
                EstudanteId = estudanteId,
                LivroId = livroId,
                Estudante = estudante,
                Livro = livro
            });

            _context.Estudantes.Update(estudante);
            await _context.SaveChangesAsync();
        }
    }


        
    }
}
