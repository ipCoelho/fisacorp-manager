import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import api from '../services/api';
import { getUser, signOut } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const [user, setUser] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    const storagedToken = localStorage.getItem('token');

    if (!storagedToken) {
      setGlobalLoading(false);
      setUser(null);
      pathname === '/forgot-password' ? navigate('/forgot-password') : null;
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;

    handleGetUser();
  }, []);

  async function handleGetUser() {
    try {
      const { data } = await getUser();

      setUser(data);

      if (pathname === '/login' || pathname === '/forgot-password') {
        return navigate('/dashboard');
      }
    } catch (error) {
      handleErrors(error.response);
    } finally {
      setGlobalLoading(false);
    }
  }

  function handleValidateToken(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  function handleErrors(data) {
    Errors(data);
    if (data.status === 401) {
      localStorage.clear();
      setUser(null);
      return null;
    }
  }

  function handleLogout() {
    signOut({ token: localStorage.getItem('token') });
    localStorage.clear();
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        globalLoading,
        setGlobalLoading,
        contentLoading,
        setContentLoading,
        handleErrors,
        handleLogout,
        handleValidateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
