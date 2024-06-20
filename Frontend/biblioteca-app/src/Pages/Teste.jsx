import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

function Teste() {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  return (
    <div>
      {decodedToken ? (
        <div>
            <p>ID: {decodedToken.nameid}</p>
          <p>Matrícula: {decodedToken.certserialnumber}</p>
          <p>Nome: {decodedToken.unique_name}</p>
          <p>Token: {localStorage.getItem('token')}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Teste;
