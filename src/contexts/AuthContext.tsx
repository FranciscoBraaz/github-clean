import React, { createContext, useContext } from 'react';

// interface userData {}

interface AuthContextData {
  isAuthenticated: boolean;
}

type AuthProviderType = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderType) {
  const isAuthenticated = true;

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
