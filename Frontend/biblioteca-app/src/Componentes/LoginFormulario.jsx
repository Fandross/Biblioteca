import React, { useState } from 'react';

const LoginFormulario = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="flex items-center justify-center p-2 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isAdmin ? 'Login de Administrador' : 'Login de Aluno'}
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="matricula" className="block text-gray-700">
              Matrícula do {isAdmin ? 'Administrador' : 'Aluno'}
            </label>
            <input
              type="text"
              id="matricula"
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="border p-2 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleToggle}
          className="mt-4 text-blue-500 hover:underline text-center w-full"
        >
          {isAdmin ? 'Login como Aluno' : 'Login como Administrador'}
        </button>
      </div>
    </div>
  );
};

export default LoginFormulario;
