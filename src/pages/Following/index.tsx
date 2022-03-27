import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from './styles';
import { UserListing } from '../../components/UsersListing';

export function Following() {
  const navigation = useNavigation();
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1f1f1f',
        height: 50,
      },
      headerTitleAlign: 'center',
      title: `${user?.following} Seguindo`,
    });
  }, []);

  return (
    <Container>
      <UserListing title="Seguindo" url={`/users/${user?.login}/following`} />
    </Container>
  );
}
