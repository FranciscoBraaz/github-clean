import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthRoutes from './authRoutes';
import MainRoutes from './mainRoutes';

export default function Routes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthRoutes />;
  }

  return <MainRoutes />;
}
