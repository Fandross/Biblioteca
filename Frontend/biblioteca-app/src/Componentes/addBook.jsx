import React, { useState } from 'react';
import { addBook } from '../Services/livroServices';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [genero, setGenero] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoLivro = {
      titulo: titulo,
      autor: autor,
      isbn: isbn,
      descricao: descricao,
      quantidade: quantidade,
      genero: genero
    };

    addBook(novoLivro).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Adicionar novo Livro</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Titulo</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Gênero</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setGenero(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Autor</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Quantidade</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4">
          Adicionar Livro
        </button>
      </form>
    </div>
  );
}

export default AddBook;
