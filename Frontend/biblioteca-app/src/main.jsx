import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './Pages/Home'
import AddBook from './Componentes/addBook'
import SearchBooks from './Componentes/searchBooks'
import UpdateBook from './Componentes/updateBooks'
import './index.css'
import LoginFormulario from './Componentes/LoginFormulario'

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
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
