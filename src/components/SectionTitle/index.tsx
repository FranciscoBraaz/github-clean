import React from 'react';
import { View } from 'react-native';
import { Highligth } from '../Highlight/styles';
import { Container, Title } from './styles';

interface SectionTitleProps {
  title: string;
  fontSize?: number;
}

export function SectionTitle({ title, fontSize = 36 }: SectionTitleProps) {
  return (
    <Container>
      <Highligth />
      <View>
        <Title style={{ fontSize }}>{title}</Title>
      </View>
    </Container>
  );
}
