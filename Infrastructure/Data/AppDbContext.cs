using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Estudante> Estudantes { get; set; }
        public DbSet<Livro> Livros { get; set; }
        public DbSet<EstudanteLivro> EstudanteLivros { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Estudante>(entity =>
            {
                entity.ToTable("Estudantes");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Matricula).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Livro>(entity =>
            {
                entity.ToTable("Livros");
                entity.HasKey(l => l.Id);
                entity.Property(l => l.Titulo).IsRequired().HasMaxLength(200);
                entity.Property(l => l.Autor).IsRequired().HasMaxLength(100);
                entity.Property(l => l.Isbn).HasMaxLength(20);
                entity.Property(l => l.Descricao).HasMaxLength(500);
                entity.Property(l => l.Genero).HasMaxLength(100);
                entity.Property(l => l.Quantidade).IsRequired();
            });

            modelBuilder.Entity<EstudanteLivro>(entity =>
            {
                entity.ToTable("Estudante_Livros");
                entity.HasKey(el => new { el.EstudanteId, el.LivroId });

                entity.HasOne(el => el.Estudante)
                    .WithMany(e => e.EstudanteLivros)
                    .HasForeignKey(el => el.EstudanteId);

                entity.HasOne(el => el.Livro)
                    .WithMany(l => l.EstudanteLivros)
                    .HasForeignKey(el => el.LivroId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
