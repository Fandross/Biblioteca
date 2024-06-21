import React from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; //Importacao correta

const LivroCard = ({ book, isAdmin, onDeleteClick, onUpdateClick }) => {
  const apiUrl = 'http://localhost:5186/api';
  const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? jwtDecode(token) : null;

  const handleAlugarClick = async () => {
    if (!decodedToken) return;

    try {
      const response = await axios.post(`${apiUrl}/Estudantes/${decodedToken.nameid}/alugar/${book.id}`);
      if (response.status === 200) {
        console.log(`Livro com ID ${book.id} alugado com sucesso para o estudante com ID ${decodedToken.nameid}`);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao tentar alugar o livro:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteClick(book.id);
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  const handleUpdate = () => {
    onUpdateClick(book.id);
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{book.titulo}</h3>
      <p className="mb-2">Autor: {book.autor}</p>
      <p className="mb-2">Descrição: {book.descricao}</p>
      <p className="mb-2">ISBN: {book.isbn}</p>
      <p className="mb-2">Gênero: {book.genero}</p>
      <p className="mb-2">Quantidade: {book.quantidade}</p>
      <div className="mt-4">
        {!isAdmin && (
          <button onClick={handleAlugarClick} className="bg-green-500 text-white px-4 py-2 rounded">
            Alugar
          </button>
        )}
        {isAdmin && (
          <div>
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Atualizar
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Deletar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivroCard;
