import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './Pages/Home'
import AddBook from './Componentes/AdicionarLivro'
import SearchBooks from './Componentes/ProcurarLivro'
import UpdateBook from './Componentes/AtualizarLivro'
import './index.css'
import LoginFormulario from './Componentes/LoginFormulario'
import TestePage from './Pages/Teste'
import Dashboard from './Pages/Dashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="add" element={<AddBook />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path='/login' element={<LoginFormulario />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path='/home' element={<Home />} />
          <Route path="/teste" element={<TestePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
