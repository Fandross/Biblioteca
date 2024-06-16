import { useEffect, useState } from 'react'
import { getAllBooks, deleteBook } from "../Services/livroServices"
import LoginFormulario from '../Componentes/LoginFormulario'

function Home() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    getAllBooks().then(setBooks)
  }, [])


  return (
    <div>
        <LoginFormulario/>
    </div>
  )
}

export default Home
