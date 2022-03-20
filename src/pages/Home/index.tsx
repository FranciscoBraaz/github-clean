import React from 'react';
import { View } from 'react-native';
import { UserInfo } from '../../components/UserInfo';
import { HeaderProfile } from '../../components/HeaderProfile';
import { useAuth } from '../../contexts/AuthContext';
import { Bio } from '../../components/Bio';

export function Home() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <View style={{ backgroundColor: '#292929', flex: 1 }}>
      <HeaderProfile username={user.login} />
      <UserInfo
        avatar={user.avatar_url}
        name={user.name}
        email={user.email}
        location={user.location}
      />
      <Bio bio={user.bio} />
    </View>
  );
}
