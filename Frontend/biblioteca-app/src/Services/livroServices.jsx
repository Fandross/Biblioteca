import axios from 'axios'

const API_URL = 'http://localhost:5186/api/Livros'

export const getAllBooks = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export const addBook = async (book) => {
  const response = await axios.post(API_URL, book)
  return response.data
}

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_URL}/${id}`, book)
  return response.data
}

export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

export const getBookByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}?title=${title}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar livro por título:', error);
    throw error;
  }
};

export const searchBooks = async (query) => {
    try {
        const response = await axios.get(`${API_URL}?search=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};