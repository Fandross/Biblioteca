import React, { useState, useEffect } from 'react';
import { getAllBooks, deleteBook } from '../Services/livroServices';
import LivroLista from '../Componentes/LivroLista';
import Footer from '../Componentes/Footer';

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

  return (
    <div className='flex flex-wrap justify-center'>
      <h1>Livros mais buscados:</h1>
      <div className=''>
      <LivroLista/>
      </div>
    </div>
  );
}

export default Home;
