import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

// interface userData {}

interface AuthContextData {
  isAuthenticated: boolean;
  login: (username: string) => void;
}

type AuthProviderType = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderType) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(username: string) {
    api
      .get(`/users/${username}`)
      .then((result) => {
        setIsAuthenticated(true);
        console.log(result);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
