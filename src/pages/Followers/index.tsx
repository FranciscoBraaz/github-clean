import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from './styles';
import { UserListing } from '../../components/UsersListing';

export function Followers() {
  const navigation = useNavigation();
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1f1f1f',
      },
      headerTitleAlign: 'center',
      title: `${user?.followers} Seguidores`,
    });
  }, []);

  return (
    <Container>
      <UserListing title="Seguidores" url={`/users/${user?.login}/followers`} />
    </Container>
  );
}
