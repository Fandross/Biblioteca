using Core.Interfaces;
using Infrastructure.Data;

public class EstudanteLivrosRepository : IEstudanteLivrosRepository
{
    private readonly AppDbContext _context;

    public EstudanteLivrosRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task RemoveByLivroIdAsync(int livroId)
    {
        var estudanteLivros = _context.EstudanteLivros.Where(el => el.LivroId == livroId);
        _context.EstudanteLivros.RemoveRange(estudanteLivros);
        await _context.SaveChangesAsync();
    }

    // Implementação dos outros métodos...
}

