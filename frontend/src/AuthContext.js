// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to store the authentication state
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem('authtoken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authtoken');
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
