import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [decodedToken, setDecodedToken] = useState(null);
  const [estudanteLivros, setEstudanteLivros] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isAdminToken = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminToken === 'true');
    const jwtToken = localStorage.getItem('jwtToken');
    const decodedJwtToken = jwtDecode(jwtToken);
    setDecodedToken(decodedJwtToken);
    fetchEstudante(decodedJwtToken.nameid);
  }, []);

  const apiUrl = 'http://localhost:5186/api';

  const fetchEstudante = async (estudanteId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiUrl}/estudantes/${estudanteId}`);
      if (response.status === 200) {
        console.log('Estudante:', response.data);
        setEstudanteLivros(response.data.estudanteLivros); // Define os livros alugados pelo estudante
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        setError('Erro inesperado ao buscar informações do estudante');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        setError(`Erro ao buscar informações do estudante: ${error.response.data}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Nenhuma resposta do servidor ao buscar informações do estudante');
      } else {
        console.error('Error', error.message);
        setError(`Erro ao buscar informações do estudante: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDevolverClick = async (estudanteId, livroId) => {
    try {
      const response = await axios.delete(`${apiUrl}/Estudantes/${estudanteId}/devolver/${livroId}`);
      if (response.status === 204) {
        console.log(`Livro com ID ${livroId} devolvido com sucesso pelo estudante com ID ${estudanteId}`);
        // Remover o livro da lista local
        setEstudanteLivros(estudanteLivros.filter(estudanteLivro => estudanteLivro.livro.id !== livroId));
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        setError('Erro inesperado ao tentar devolver o livro');
      }
    } catch (error) {
      console.error('Erro ao tentar devolver o livro:', error);
      setError(`Erro ao tentar devolver o livro: ${error.message}`);
    }
  };

  if (isAdmin === false) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Bem vindo(a), {decodedToken.unique_name}</h1>
        <p>Matrícula: {decodedToken.certserialnumber}</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4">Livros Alugados:</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid gap-4">
          {estudanteLivros.map((estudanteLivro) => (
            <LivroCard key={estudanteLivro.livro.id} livro={estudanteLivro.livro} onDevolverClick={() => handleDevolverClick(decodedToken.nameid, estudanteLivro.livro.id)} />
          ))}
        </div>
      </div>
    );
  }

  if (isAdmin === true) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Bem vindo(a), {decodedToken.unique_name}</h1>
        <p>Em construção!</p>
        {loading && <p>Carregando...</p>}
      </div>
    );
  }

  return null; // Renderização inicial ou para outros casos não tratados
}

const LivroCard = ({ livro, onDevolverClick }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{livro.titulo}</h3>
      <p className="mb-2">Autor: {livro.autor}</p>
      <p className="mb-2">Descrição: {livro.descricao}</p>
      <p className="mb-2">ISBN: {livro.isbn}</p>
      <p className="mb-2">Gênero: {livro.genero}</p>
      <p className="mb-2">Quantidade: {livro.quantidade}</p>
      <div className="mt-4">
        <button onClick={() => onDevolverClick(livro.id)} className="bg-red-500 text-white px-4 py-2 rounded">
          Devolver
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
