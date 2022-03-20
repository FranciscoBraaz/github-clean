import React from 'react';
import { Text, View } from 'react-native';
import { Bio } from '../../components/Bio';
import { HeaderProfile } from '../../components/HeaderProfile';
import { useAuth } from '../../contexts/AuthContext';

export function Home() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <View style={{ backgroundColor: '#292929', flex: 1 }}>
      <HeaderProfile username={user.login} />
      <Bio avatar={user.avatar_url} />
    </View>
  );
}
