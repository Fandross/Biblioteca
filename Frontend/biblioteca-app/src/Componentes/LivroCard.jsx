import React from 'react';

const LivroCard = ({ book }) => {
  console.log('LivroCard props:', book); // Adicione este console.log para verificar os dados recebidos

  return (
    <div className="card max-w-sm bg-white shadow-md rounded-md p-4 m-4 border border-gray-200">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-orange-400 font-bold text-lg mb-2">{book.titulo}</h3>
          <h4 className="text-blue-900 font-semibold text-md mb-1">Autor: {book.autor}</h4>
          <p className="text-gray-700 text-sm mb-2">Gênero: {book.genero}</p>
          <p className="text-gray-700 text-sm mb-2">ISBN: {book.isbn}</p>
          <p className="text-gray-900 text-sm mb-2">Descrição: {book.descricao}</p>
          <p className="text-gray-900 text-sm mb-2">Quantidade: {book.quantidade}</p>
          {/* <p className="text-gray-900 text-sm mb-4">Usuários que alugaram: {book.usuariosQueAlugaram.join(', ')}</p> */}
        </div>
        <div className="mt-4">
          <a href={`/update/${book.id}`} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            Atualizar
          </a>
        </div>
      </div>
    </div>
  );
};

export default LivroCard;
