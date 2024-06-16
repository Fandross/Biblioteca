import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Componentes/Navbar';
import LivroLista from './Componentes/LivroLista';


function App() {
  return (
    
      <div className="container mx-auto p-4">
        <Navbar/>
        {/* <LivroLista/> */}
        <Outlet />
      </div>

  );
}

export default App;
