import React, { useState, useEffect } from 'react';
import { getAllBooks, deleteBook } from '../Services/livroServices';
import LivroLista from '../Componentes/LivroLista';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const booksData = await getAllBooks();
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      // Após excluir, atualiza a lista de livros
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <LivroLista/>
      <h1 className="text-2xl font-bold mb-4">Books List(Teste para debug)</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            {book.titulo} - {book.autor}
            <button onClick={() => handleDelete(book.id)} className="ml-4 text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
