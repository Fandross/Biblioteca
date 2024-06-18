using System.Collections.Generic;

namespace Domain.Entities
{
    public class Estudante
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Matricula { get; set; }
    public List<EstudanteLivro> EstudanteLivros { get; set; } = new List<EstudanteLivro>();
}
}
