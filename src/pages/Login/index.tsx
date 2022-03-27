import React from 'react';
import { Text, View } from 'react-native';
import { Container, ImageLogin, Input, ButtonSubmit } from './styles';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarIndicator } from 'react-native-indicators';

export function Login() {
  const [username, setUsername] = useState('');
  const { login, isLoading } = useAuth();

  async function handleSubmit() {
    await login(username);
  }

  return (
    <Container>
      <ImageLogin source={require('../../../assets/gitLogin.png')} />
      <Input
        placeholder="Usuário"
        value={username}
        editable={!isLoading}
        selectTextOnFocus={!isLoading}
        onChangeText={(value: string) => setUsername(value)}
      />
      {isLoading ? (
        <View style={{ height: 56, marginTop: 20 }}>
          <BarIndicator size={28} color="#ffce00" />
        </View>
      ) : (
        <ButtonSubmit onPress={handleSubmit}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginRight: 10 }}>
            Entrar
          </Text>
          <Feather name="arrow-right" size={24} color="black" />
        </ButtonSubmit>
      )}
    </Container>
  );
}
