using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Estudante> Estudantes { get; set; }
        public DbSet<Livro> Livros { get; set; }
        public DbSet<EstudanteLivro> EstudanteLivros { get; set; }
        public DbSet<Administrador> Administrador { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Estudante>()
                .ToTable("Estudantes")
                .HasKey(e => e.Id);

            modelBuilder.Entity<Livro>()
                .ToTable("Livros")
                .HasKey(l => l.Id);

            modelBuilder.Entity<EstudanteLivro>()
                .ToTable("estudante_livros")
                .HasKey(el => new { el.EstudanteId, el.LivroId });

            modelBuilder.Entity<EstudanteLivro>()
                .HasOne(el => el.Estudante)
                .WithMany(e => e.EstudanteLivros)
                .HasForeignKey(el => el.EstudanteId);

            modelBuilder.Entity<EstudanteLivro>()
                .HasOne(el => el.Livro)
                .WithMany(l => l.EstudanteLivros)
                .HasForeignKey(el => el.LivroId);

                modelBuilder.Entity<Administrador>()
                .ToTable("Administrador")
                .HasKey(l => l.Id);

            base.OnModelCreating(modelBuilder);
        }

    }
}
