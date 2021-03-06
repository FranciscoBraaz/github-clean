import React from 'react';
import { ScrollView, View } from 'react-native';
import { UserInfo } from '../../components/UserInfo';
import { HeaderProfile } from '../../components/HeaderProfile';
import { useAuth } from '../../contexts/AuthContext';
import { Bio } from '../../components/Bio';
import { NumbersInfo } from '../../components/NumbersInfo';
import { ProfilePhoto } from '../../components/ProfilePhoto';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export function Home() {
  const { user } = useAuth();
  if (!user) return null;

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View
      style={{
        backgroundColor: '#292929',
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 10 }}
      >
        <HeaderProfile username={user.login} ownerProfile={true} />
        <ProfilePhoto avatar={user.avatar_url} />
        <View
          style={{
            flex: 1,
          }}
        >
          <UserInfo
            avatar={user.avatar_url}
            name={user.name}
            email={user.email}
            location={user.location}
          />
          <NumbersInfo
            followers={user.followers}
            following={user.following}
            public_repos={user.public_repos}
          />
          <Bio bio={user.bio} />
        </View>
      </ScrollView>
    </View>
  );
}
