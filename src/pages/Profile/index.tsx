import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { UserInfo } from '../../components/UserInfo';
import { NumbersInfo } from '../../components/NumbersInfo';
import { ProfilePhoto } from '../../components/ProfilePhoto';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { UserData } from '../../contexts/AuthContext';
import { Bio } from '../../components/Bio';
import { api } from '../../services/api';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HeaderProfile } from '../../components/HeaderProfile';

interface ProfileProps {
  username: string;
}

export function Profile() {
  const tabBarHeight = useBottomTabBarHeight();
  const [user, setUser] = useState<UserData | null>(null);
  const route: RouteProp<{ params: { username: string } }, 'params'> =
    useRoute();

  useEffect(() => {
    api
      .get(`/users/${route.params.username}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  if (!user) return null;
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
        <HeaderProfile username={user.login} ownerProfile={false} user={user} />
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
