import React from 'react';
import { Link } from 'react-router-dom';
import ImagemFront from "../assets/front1.png";

function Navbar() {
  return (
    <div>
      <nav className="bg-blue-200 h-8 flex items-center justify-center w-full">
        <Link to="/" className="mr-4 text-black">Home</Link>
        <Link to="/add" className="mr-4 text-black">Adicionar Livro</Link>
        <Link to="/search" className="mr-4 text-black">Pesquisar Livro</Link>
        <Link to="/login" className="mr-4 text-black">Login(debug)</Link>
      </nav>
      <img src={ImagemFront} alt="Front Image" className="w-full" />
      
    </div>
  );
}

export default Navbar;
