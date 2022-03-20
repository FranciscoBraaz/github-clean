import React from 'react';
import { View } from 'react-native';
import { Container, Item, Number, Subtitle } from './styles';

interface RenderItemProps {
  amount: number;
  subtitle: string;
}

interface NumbersInfo {
  followers: number;
  following: number;
  public_repos: number;
}

function RenderItem({ amount, subtitle }: RenderItemProps) {
  return (
    <Item key={subtitle}>
      <Number>{amount}</Number>
      <Subtitle>{subtitle}</Subtitle>
    </Item>
  );
}

export function NumbersInfo({
  followers,
  following,
  public_repos,
}: NumbersInfo) {
  const items = [
    {
      subtitle: 'Seguidores',
      amount: followers,
    },
    {
      subtitle: 'Seguindo',
      amount: following,
    },
    {
      subtitle: 'Repos',
      amount: public_repos,
    },
  ];

  return (
    <Container>
      {items.map((item) => (
        <RenderItem amount={item.amount} subtitle={item.subtitle} />
      ))}
    </Container>
  );
}
