import React from 'react';
import { Text } from 'react-native';
import { Container, ImageLogin, Input, ButtonSubmit } from './styles';
import { Feather } from '@expo/vector-icons';

export function Login() {
  return (
    <Container>
      <ImageLogin source={require('../../../assets/gitLogin.png')} />
      <Input placeholder="Usuário" />
      <ButtonSubmit>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginRight: 10 }}>
          Entrar
        </Text>
        <Feather name="arrow-right" size={24} color="black" />
      </ButtonSubmit>
    </Container>
  );
}
