import React from 'react';
import { View } from 'react-native';
import { Container, Item, Number, Subtitle } from './styles';

interface NumberItemProps {
  amount: number;
  subtitle: string;
}

interface NumbersInfo {
  followers: number;
  following: number;
  public_repos: number;
}

function NumberItem({ amount, subtitle }: NumberItemProps) {
  return (
    <Item>
      <Number>{amount}</Number>
      <Subtitle>{subtitle}</Subtitle>
    </Item>
  );
}

const itemsKey = ['Seguidores', 'Seguindo', 'Repos'];

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
      {items.map((item, index) => (
        <NumberItem
          amount={item.amount}
          subtitle={item.subtitle}
          key={itemsKey[index]}
        />
      ))}
    </Container>
  );
}
