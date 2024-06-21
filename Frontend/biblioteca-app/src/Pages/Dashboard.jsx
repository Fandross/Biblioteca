import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

function Dashboard() {
  const [decodedToken, setDecodedToken] = useState(null);
  const [estudanteLivros, setEstudanteLivros] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [estudantes, setEstudantes] = useState([]);
  const [newEstudante, setNewEstudante] = useState({
    nome: '',
    matricula: '',
    senha: ''
  });

  useEffect(() => {
    const isAdminToken = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminToken === 'true');
    const jwtToken = localStorage.getItem('jwtToken');
    const decodedJwtToken = jwtDecode(jwtToken);
    setDecodedToken(decodedJwtToken);

    if (isAdminToken === 'true') {
      fetchEstudantes();
    } else {
      fetchEstudante(decodedJwtToken.nameid);
    }
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

  const fetchEstudantes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiUrl}/estudantes`);
      if (response.status === 200) {
        setEstudantes(response.data);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        setError('Erro inesperado ao buscar estudantes');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        setError(`Erro ao buscar estudantes: ${error.response.data}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Nenhuma resposta do servidor ao buscar estudantes');
      } else {
        console.error('Error', error.message);
        setError(`Erro ao buscar estudantes: ${error.message}`);
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

  const handleCreateEstudante = async () => {
    try {
      const response = await axios.post(`${apiUrl}/estudantes`, newEstudante);
      if (response.status === 201) {
        console.log('Estudante criado com sucesso:', response.data);
        fetchEstudantes();
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        setError('Erro inesperado ao criar estudante');
      }
    } catch (error) {
      console.error('Erro ao criar estudante:', error);
      setError(`Erro ao criar estudante: ${error.message}`);
    }
  };

  const handleDeleteEstudante = async (estudanteId) => {
    try {
      const response = await axios.delete(`${apiUrl}/estudantes/${estudanteId}`);
      if (response.status === 204) {
        console.log(`Estudante com ID ${estudanteId} deletado com sucesso`);
        fetchEstudantes();
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        setError('Erro inesperado ao deletar estudante');
      }
    } catch (error) {
      console.error('Erro ao deletar estudante:', error);
      setError(`Erro ao deletar estudante: ${error.message}`);
    }
  };

  const handleUpdateEstudante = async (estudanteId, updatedData) => {
    try {
      const response = await axios.put(`${apiUrl}/estudantes/${estudanteId}`, updatedData);
      if (response.status === 204) {
        console.log(`Estudante com ID ${estudanteId} atualizado com sucesso`);
        fetchEstudantes();
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        setError('Erro inesperado ao atualizar estudante');
      }
    } catch (error) {
      console.error('Erro ao atualizar estudante:', error);
      setError(`Erro ao atualizar estudante: ${error.message}`);
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
      
      <div className=''>
        <h1 className="text-2xl font-bold mb-4">Bem vindo(a), {decodedToken.unique_name}</h1>

        <h2 className="text-xl font-bold mb-4">Cadastrar Novo Estudante</h2>
        <div className="border p-4 rounded shadow-md mb-4">
          <div className="mb-4">
            <label className="block mb-2">Nome:</label>
            <input
              type="text"
              value={newEstudante.nome}
              onChange={(e) => setNewEstudante({ ...newEstudante, nome: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Matrícula:</label>
            <input
              type="text"
              value={newEstudante.matricula}
              onChange={(e) => setNewEstudante({ ...newEstudante, matricula: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Senha:</label>
            <input
              type="password"
              value={newEstudante.senha}
              onChange={(e) => setNewEstudante({ ...newEstudante, senha: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
          <button onClick={handleCreateEstudante} className="bg-green-500 text-white px-4 py-2 rounded">
            Cadastrar
          </button>
        </div>
        <h2 className="text-xl font-bold mt-8 mb-4">Estudantes Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid gap-4 mb-4 ">
          {estudantes.map((estudante) => (
            <div key={estudante.id} className="border p-4 rounded shadow-md">
              <h3 className="text-lg font-bold">{estudante.nome}</h3>
              <p className="mb-2">Matrícula: {estudante.matricula}</p>
            </div>
          ))}
        </div>

        
      </div>
    );
  }

  return null; 
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
