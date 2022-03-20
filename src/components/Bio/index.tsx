import React from 'react';
import { Container, ProfileInfo, ProfilePhoto } from './styles';

interface BioProps {
  avatar: string;
}

export function Bio({ avatar }: BioProps) {
  return (
    <Container>
      <ProfilePhoto source={{ uri: avatar }} />
      <ProfileInfo></ProfileInfo>
    </Container>
  );
}
