import {
  View,
  FlatList,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { UserContainer } from './styles';
import { Divider } from '../../components/Skeleton/styles';
import { Skeleton } from '../../components/Skeleton';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BarIndicator } from 'react-native-indicators';
import { SectionTitle } from '../../components/SectionTitle';
import { AntDesign } from '@expo/vector-icons';

interface UserData {
  id: number;
  login: string;
  avatar_url: string;
}

interface RenderUserProps {
  item: UserData;
  isLastItem: boolean;
}

const widthScreen = Dimensions.get('window').width;

const skeletons = [1, 2, 3, 4, 5, 6];

function RenderUser({ item, isLastItem }: RenderUserProps) {
  const AnimatedEntrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animationEntry();

    return () => animationEntry();
  }, []);

  const animationEntry = () => {
    Animated.timing(AnimatedEntrance, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const translateX = AnimatedEntrance.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  return (
    <View>
      <Animated.View style={{ transform: [{ translateX: translateX }] }}>
        <UserContainer>
          <SectionTitle
            title={`#${item.login}`}
            fontSize={20}
            hasPhoto={true}
            urlAvatar={item.avatar_url}
          />
          <View style={{ marginLeft: 'auto' }}>
            <AntDesign name="arrowright" size={24} color="#fff" />
          </View>
        </UserContainer>
      </Animated.View>

      {!isLastItem && <Divider />}
    </View>
  );
}

function UserSkeleton() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
    >
      {skeletons.map((item, index) => (
        <View key={item}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Skeleton
              widthComponent="64px"
              widthSkeleton="30%"
              heightComponent="64px"
              outputRangeFinal={widthScreen / 3}
              style={{ borderRadius: 32 }}
            />
            <Skeleton
              widthComponent="70%"
              widthSkeleton="30%"
              heightComponent="40px"
              outputRangeFinal={widthScreen}
              style={{ marginLeft: 20, borderRadius: 12 }}
            />
          </View>
          {index !== skeletons.length - 1 && <Divider />}
        </View>
      ))}
    </ScrollView>
  );
}

function LoadingIndicator({ load }: { load: boolean }) {
  if (!load) return null;
  return (
    <View style={{ marginBottom: 10 }}>
      <BarIndicator color="#ffce00" size={28} />
    </View>
  );
}

interface UserListingProps {
  title: string;
  url: string;
}

export function UserListing({ title, url }: UserListingProps) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loadMore, setLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([] as UserData[]);
  const tabBarHeight = useBottomTabBarHeight();
  const perPage = 8;

  useEffect(() => {
    setIsLoadingInitial(true);
    setLoadMore(true);
    fetchUsers();
  }, []);

  async function fetchUsers() {
    if (!loadMore) return;
    setIsLoading(true);
    await api
      .get(`${url}?page=${page}&per_page=${perPage}`)
      .then((response) => {
        setTimeout(() => {
          setUsers([...users, ...response.data]);
          setPage(page + 1);
          if (response.data.length < 8) {
            setLoadMore(false);
          }
        }, 500);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          setIsLoadingInitial(false);
        }, 500);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoadingInitial ? (
        <UserSkeleton />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: tabBarHeight }}
          data={users}
          renderItem={({ item, index }) => (
            <RenderUser item={item} isLastItem={index === users.length - 1} />
          )}
          keyExtractor={(item) => String(item.id)}
          onEndReached={fetchUsers}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator load={isLoading} />}
        />
      )}
    </View>
  );
}
