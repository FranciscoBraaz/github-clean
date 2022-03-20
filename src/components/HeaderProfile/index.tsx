import React from 'react';
import { Text } from 'react-native';
import { Container, Logout, Username } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProfilePrpos {
  username: string;
}

export function HeaderProfile({ username }: HeaderProfilePrpos) {
  const { logout } = useAuth();

  return (
    <Container>
      <Username>#{username}</Username>
      <Logout onPress={logout}>
        <Text style={{ color: '#fff', fontSize: 16, marginRight: 5 }}>
          Sair
        </Text>
        <MaterialCommunityIcons name="logout" size={24} color="#2c3e50" />
      </Logout>
    </Container>
  );
}
