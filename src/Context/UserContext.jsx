import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedPassword) {
      setPassword(storedPassword); // Set password directly without parsing
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    setUser(null);
    setPassword(null);
  };

  return (
    <UserContext.Provider value={{ user, password, setUser, setPassword, logout }}>
      {children}
    </UserContext.Provider>
  );
};
