import React from 'react';
import { Text } from 'react-native';
import { Container, ImageLogin, Input, ButtonSubmit } from './styles';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  async function handleSubmit() {
    await login(username);
  }

  return (
    <Container>
      <ImageLogin source={require('../../../assets/gitLogin.png')} />
      <Input
        placeholder="Usuário"
        value={username}
        onChangeText={(value: string) => setUsername(value)}
      />
      <ButtonSubmit onPress={handleSubmit}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginRight: 10 }}>
          Entrar
        </Text>
        <Feather name="arrow-right" size={24} color="black" />
      </ButtonSubmit>
    </Container>
  );
}
