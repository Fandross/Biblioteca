import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../Services/livroServices';
import LivroCard from './LivroCard';
import { jwtDecode } from "jwt-decode"; //Importacao correta
import axios from 'axios';

const LivroLista = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const apiUrl = 'http://localhost:5186/api';

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks(data);
    };
    fetchBooks();

    const isAdminToken = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminToken === 'true');
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      const decodedJwtToken = jwtDecode(jwtToken);
      setDecodedToken(decodedJwtToken);
    }
  }, []);

  const handleDeleteClick = async (bookId) => {
    try {
      const response = await axios.delete(`${apiUrl}/livros/${bookId}`);
      if (response.status === 204) {
        console.log(`Livro com ID ${bookId} deletado com sucesso`);
        setBooks(books.filter(book => book.id !== bookId));
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  const handleUpdateClick = (bookId) => {
    window.location.href = `/update/${bookId}`;
  };

  return (
    <div className="flex flex-wrap justify-center">
      {books.map((book) => (
        <LivroCard 
          key={book.id} 
          book={book} 
          isAdmin={isAdmin}
          onDeleteClick={handleDeleteClick}
          onUpdateClick={handleUpdateClick}
        />
      ))}
    </div>
  );
};

export default LivroLista;
