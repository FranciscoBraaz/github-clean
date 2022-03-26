import React from 'react';
import { View } from 'react-native';
import { Highligth } from '../Highlight/styles';
import { Avatar, Container, Title } from './styles';

interface SectionTitleProps {
  title: string;
  fontSize?: number;
  hasPhoto?: boolean;
  urlAvatar?: string;
}

export function SectionTitle({
  title,
  fontSize = 36,
  hasPhoto = false,
  urlAvatar,
}: SectionTitleProps) {
  return (
    <Container>
      <Highligth />
      {hasPhoto && <Avatar source={{ uri: urlAvatar }} />}
      <View>
        <Title hasPhoto={hasPhoto} style={{ fontSize }}>
          {title}
        </Title>
      </View>
    </Container>
  );
}
