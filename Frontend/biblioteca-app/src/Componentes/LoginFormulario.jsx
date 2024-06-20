import React, { useState } from 'react';
import axios from 'axios';

const LoginFormulario = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Add state to check if user is admin
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5186/api/Auth/login', {
        matricula,
        senha
      });
      const { token, isAdmin } = response.data;
      console.log('JWT Token:', token);
      // Store the token and admin status in localStorage or somewhere secure
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('isAdmin', isAdmin);
      setError('');
      window.location.href = '/Dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center p-20 bg-gray-100 ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="matricula" className="block text-gray-700">
              Matrícula
            </label>
            <input
              type="text"
              id="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isAdmin" className="block text-gray-700">
              Administrador
            </label>
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="border p-2 rounded"
            />
          </div>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginFormulario;
