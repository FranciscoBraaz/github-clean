import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { UserInfo } from '../../components/UserInfo';
import { NumbersInfo } from '../../components/NumbersInfo';
import { ProfilePhoto } from '../../components/ProfilePhoto';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { UserData } from '../../contexts/AuthContext';
import { Bio } from '../../components/Bio';
import { api } from '../../services/api';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HeaderProfile } from '../../components/HeaderProfile';
import { Skeleton } from '../../components/Skeleton';

const widthScreen = Dimensions.get('window').width;

export function SkeletonProfile() {
  return (
    <View>
      <View style={{ height: 140 }}></View>
      <View>
        <Skeleton
          widthComponent="115px"
          widthSkeleton="30%"
          heightComponent="115px"
          outputRangeFinal={widthScreen / 2}
          style={{ borderRadius: 57, marginTop: -57.5, alignSelf: 'center' }}
        />
        <Skeleton
          widthComponent="80%"
          widthSkeleton="30%"
          heightComponent="40px"
          outputRangeFinal={widthScreen}
          style={{ marginTop: 40, marginLeft: 20 }}
        />
        <Skeleton
          widthComponent="60%"
          widthSkeleton="30%"
          heightComponent="20px"
          outputRangeFinal={widthScreen}
          style={{ marginTop: 10, marginLeft: 20 }}
        />
        <Skeleton
          widthComponent="90%"
          widthSkeleton="30%"
          heightComponent="80px"
          outputRangeFinal={widthScreen}
          style={{ marginTop: 40, alignSelf: 'center' }}
        />
        <Skeleton
          widthComponent="80%"
          widthSkeleton="30%"
          heightComponent="40px"
          outputRangeFinal={widthScreen}
          style={{ marginTop: 40, marginLeft: 20 }}
        />
        <Skeleton
          widthComponent="60%"
          widthSkeleton="30%"
          heightComponent="20px"
          outputRangeFinal={widthScreen}
          style={{ marginTop: 10, marginLeft: 20 }}
        />
      </View>
    </View>
  );
}

export function Profile() {
  const tabBarHeight = useBottomTabBarHeight();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const AnimatedEntrance = useRef(new Animated.Value(0)).current;
  const route: RouteProp<{ params: { username: string } }, 'params'> =
    useRoute();

  useEffect(() => {
    animationEntry();

    return () => animationEntry();
  }, []);

  const animationEntry = () => {
    Animated.timing(AnimatedEntrance, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const translateX = AnimatedEntrance.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/users/${route.params.username}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!user || isLoading) return <SkeletonProfile />;
  else
    return (
      <View
        style={{
          backgroundColor: '#292929',
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: tabBarHeight + 10,
          }}
        >
          <HeaderProfile
            username={user.login}
            ownerProfile={false}
            user={user}
          />
          <ProfilePhoto avatar={user.avatar_url} />
          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateX: translateX }],
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
          </Animated.View>
        </ScrollView>
      </View>
    );
}
