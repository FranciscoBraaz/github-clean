import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type UserData = {
  avatar_url: string;
  bio: string;
  email: string;
  location: string;
  followers: number;
  following: number;
  login: string;
  name: string;
  public_repos: 21;
};

interface AuthContextData {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (username: string) => void;
  logout: () => void;
}

type AuthProviderType = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderType) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    async function loadUserInfo() {
      try {
        const storageUser = await AsyncStorage.getItem('@githubClean:user');
        if (storageUser) {
          const parsedUser = JSON.parse(storageUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        logout();
      }
    }

    loadUserInfo();
  }, []);

  async function login(username: string) {
    api
      .get(`/users/${username}`)
      .then(async (response) => {
        try {
          await AsyncStorage.setItem(
            '@githubClean:user',
            JSON.stringify(response.data),
          );
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (err) {
          Alert.alert(
            'Erro de autenticação',
            'Não foi possível salvar os dados do usuário',
          );
        }
      })
      .catch((err) => {
        console.log(err.response);
        switch (err.response.status) {
          case 404:
            Alert.alert('Erro de autenticação', 'Usuário não encontrado');
            break;
          default:
            Alert.alert(
              'Erro de autenticação',
              'Estamos com um problema no servidor',
            );
            break;
        }
      });
  }

  async function logout() {
    await AsyncStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
