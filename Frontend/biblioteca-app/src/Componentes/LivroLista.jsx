import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../Services/livroServices';
import LivroCard from './LivroCard';

const LivroLista = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {books.map((book) => (
        <LivroCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default LivroLista;
