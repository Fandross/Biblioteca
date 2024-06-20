import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      setAuth({ token, user });
    }
  }, []);

  const login = (token) => {
    const user = jwt_decode(token);
    setAuth({ token, user });
    localStorage.setItem('token', token);
    history.push('/');
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
