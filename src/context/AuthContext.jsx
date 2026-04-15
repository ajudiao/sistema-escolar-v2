import React, { createContext, useContext, useState } from 'react';
import { demoUsers } from '../data/dados';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = demoUsers.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ username: found.username, profile: found.profile });
      return found.profile;
    }
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
