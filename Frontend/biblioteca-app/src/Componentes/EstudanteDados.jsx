import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function EstudanteDados() {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
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
          <p>Matrícula: {decodedToken.certserialnumber}</p>
          <p>Nome: {decodedToken.unique_name}</p>
          <p>Token: {localStorage.getItem('jwtToken')}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default EstudanteDados;
