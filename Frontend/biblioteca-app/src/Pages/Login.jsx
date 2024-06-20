import { useEffect, useState } from 'react'
import { getAllBooks, deleteBook } from "../Services/livroServices"
import LoginFormulario from '../Componentes/LoginFormulario'
import Footer from '../Componentes/Footer'

function Home() {
  const [books, setBooks] = useState([])



  return (
    <div>
        <LoginFormulario/>
        <Footer />
    </div>
  )
}

export default Home
