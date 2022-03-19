import React from 'react';
import { Text, View } from 'react-native';
import { Container, ImageLogin, Input, ButtonSubmit } from './styles';

export function Login() {
  return (
    <Container>
      <ImageLogin source={require('../../../assets/gitLogin.png')} />
      <Input placeholder="Usuário" />
      <ButtonSubmit>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Entrar</Text>
      </ButtonSubmit>
    </Container>
  );
}
