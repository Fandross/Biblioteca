using System.Collections.Generic;

namespace Domain.Entities
{
    public class Livro
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Autor { get; set; }
        public string Isbn { get; set; }
        public string Descricao { get; set; }
        public int Quantidade { get; set; }
        public string Genero { get; set; }
        public List<EstudanteLivro> EstudanteLivros { get; set; } = new List<EstudanteLivro>();
    }
}
