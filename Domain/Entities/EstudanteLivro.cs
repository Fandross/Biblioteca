namespace Domain.Entities
{
    public class EstudanteLivro
{
    public int EstudanteId { get; set; }
    public Estudante Estudante { get; set; }
    public int LivroId { get; set; }
    public Livro Livro { get; set; }
}
}
