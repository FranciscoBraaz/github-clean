import React from 'react';
import { View } from 'react-native';
import { Highligth } from '../Highlight/styles';
import { Container, Title } from './styles';

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Container>
      <Highligth />
      <View>
        <Title>{title}</Title>
      </View>
    </Container>
  );
}
