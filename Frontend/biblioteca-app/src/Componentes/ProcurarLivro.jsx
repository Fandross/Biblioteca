import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LivroCard from './LivroCard';
import Footer from './Footer';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const apiUrl = 'http://localhost:5186/api';

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleSearch = async () => {
    if (!query) {
      setError('Por favor, digite um título para buscar');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults([]);

      const response = await axios.get(`${apiUrl}/livros/bytitle/${query}`);

      if (response.status === 200) {
        setResults(response.data);
      } else {
        setError('Erro inesperado ao buscar livros');
      }
    } catch (error) {
      if (error.response) {
        setError(`Erro ao buscar livros: ${error.response.data}`);
      } else if (error.request) {
        setError('Nenhuma resposta do servidor');
      } else {
        setError(`Erro ao buscar livros: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (bookId) => {
    try {
      const response = await axios.delete(`${apiUrl}/livros/${bookId}`);
      if (response.status === 204) {
        console.log(`Livro com ID ${bookId} deletado com sucesso`);
        // Remove o livro da lista de resultados
        setResults(results.filter(book => book.id !== bookId));
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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Pesquisar Livros</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o título do livro"
          className="border p-2 w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2 rounded">
          Pesquisar
        </button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
        {Array.isArray(results) && results.length === 0 && !loading && <p>Nenhum livro encontrado.</p>}
        {Array.isArray(results) && results.map((book) => (
          <LivroCard
            key={book.id}
            book={book}
            isAdmin={isAdmin}
            onDeleteClick={handleDeleteClick}
            onUpdateClick={handleUpdateClick}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchBooks;
