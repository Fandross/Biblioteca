import React, { useState } from 'react';
import axios from 'axios';
import LivroCard from './LivroCard';
import Footer from './Footer';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'http://localhost:5186/api'; // URL base da API

  const handleSearch = async () => {
    if (!query) {
      setError('Por favor, digite um título para buscar');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults([]); // Limpa os resultados anteriores

      console.log(`Searching for books with title: ${query}`);
      const response = await axios.get(`${apiUrl}/livros/bytitle/${query}`);

      if (response.status === 200) {
        console.log('Response data:', response.data);
        setResults(response.data);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        setError('Erro inesperado ao buscar livros');
      }
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um código de status fora do intervalo 2xx
        console.error('Error response:', error.response);
        setError(`Erro ao buscar livros: ${error.response.data}`);
      } else if (error.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        console.error('Error request:', error.request);
        setError('Nenhuma resposta do servidor');
      } else {
        // Algo aconteceu ao configurar a solicitação
        console.error('Error', error.message);
        setError(`Erro ao buscar livros: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (id) => {
    window.location.href = `/update/${id}`;
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
      <div className="grid grid-cols-1 min-w[60%] sm:grid-cols-2 md:grid-cols-3 flex-grow lg:grid-cols-4 gap-4 pb-5">
        {Array.isArray(results) && results.length === 0 && !loading && <p>Nenhum livro encontrado.</p>}
        {Array.isArray(results) && results.map((book) => (
          <LivroCard key={book.id} book={book} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default SearchBooks;
