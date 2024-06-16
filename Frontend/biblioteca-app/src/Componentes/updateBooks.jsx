import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, updateBook } from "../Services/livroServices";

function UpdateLivro() {
  const { id } = useParams(); // Obter o ID do livro da URL
  const [book, setBook] = useState({ titulo: '', autor: '', isbn: '', descricao: '', quantidade: '', genero: '' });

  useEffect(() => {
    // Carregar as informações do livro pelo ID
    getBookById(id).then(data => setBook(data));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Atualizar o livro com as novas informações
      await updateBook(id, book);
      // Redirecionar para a página inicial ou fazer outra ação após a atualização
      // Exemplo: history.push('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Atualizar Livro</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-700">Título</label>
          <input type="text" id="titulo" name="titulo" value={book.titulo} onChange={handleInputChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="autor" className="block text-gray-700">Autor</label>
          <input type="text" id="autor" name="autor" value={book.autor} onChange={handleInputChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="isbn" className="block text-gray-700">ISBN</label>
          <input type="text" id="isbn" name="isbn" value={book.isbn} onChange={handleInputChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-gray-700">Descrição</label>
          <textarea id="descricao" name="descricao" value={book.descricao} onChange={handleInputChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantidade" className="block text-gray-700">Quantidade</label>
          <input type="number" id="quantidade" name="quantidade" value={book.quantidade} onChange={handleInputChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="genero" className="block text-gray-700">Gênero</label>
          <input type="text" id="genero" name="genero" value={book.genero} onChange={handleInputChange} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Atualizar</button>
      </form>
    </div>
  );
}

export default UpdateLivro;
