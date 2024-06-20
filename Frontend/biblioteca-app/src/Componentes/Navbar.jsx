import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagemFront from "../assets/front1.png";
import { jwtDecode } from "jwt-decode"; //Importacao correta

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(!!token);
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-blue-200 h-8 flex items-center justify-center w-full">
        <Link to="/" className="mr-4 text-black">Home</Link>
        {isAdmin && <Link to="/add" className="mr-4 text-black">Adicionar Livro</Link>}
        <Link to="/search" className="mr-4 text-black">Pesquisar Livro</Link>
        <Link to="/dashboard" className="mr-4 text-black">Dashboard</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="mr-4 text-black">Deslogar</button>
        ) : (
          <Link to="/login" className="mr-4 text-black">Login</Link>
        )}
      </nav>
      <img src={ImagemFront} alt="Front Image" className="w-full" />
    </div>
  );
}

export default Navbar;
