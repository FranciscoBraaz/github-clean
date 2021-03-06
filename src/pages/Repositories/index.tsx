import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { SectionTitle } from '../../components/SectionTitle';
import { api } from '../../services/api';
import {
  Container,
  Description,
  ExtraInfo,
  RepositoryContainer,
  Stars,
  Visibility,
} from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BarIndicator } from 'react-native-indicators';
import { Skeleton } from '../../components/Skeleton';
import { Divider } from '../../components/Skeleton/styles';

interface RepositoryData {
  id: number;
  name: string;
  description: string;
  visibility: string;
  stargazers_count: number;
}

interface RenderRepositoryProps {
  item: RepositoryData;
  isLastItem: boolean;
}

const widthScreen = Dimensions.get('window').width;

function RenderRepository({ item, isLastItem }: RenderRepositoryProps) {
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
        <RepositoryContainer>
          <SectionTitle title={item.name} fontSize={26} />
          <Description>{item.description}</Description>
          <ExtraInfo>
            <Stars>
              <FontAwesome name="star-o" size={18} color="#ffce00" />
              <Text style={{ fontSize: 18, marginLeft: 10, color: '#fff' }}>
                {item.stargazers_count}
              </Text>
            </Stars>
            <Visibility>
              <MaterialIcons name="lock-open" size={18} color="#63bf1f" />
              <MaterialIcons name="lock-outline" size={18} color="#2c3e50" />
            </Visibility>
          </ExtraInfo>
        </RepositoryContainer>
      </Animated.View>

      {!isLastItem && <Divider />}
    </View>
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

const skeletons = [1, 2, 3, 4];

function RepositorySkeleton() {
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
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 25,
              paddingBottom: 25,
            }}
          >
            <Skeleton
              widthComponent="80%"
              widthSkeleton="30%"
              heightComponent="40px"
              outputRangeFinal={widthScreen}
            />
            <Skeleton
              widthComponent="100%"
              widthSkeleton="30%"
              heightComponent="20px"
              outputRangeFinal={widthScreen}
              style={{ marginTop: 20 }}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Skeleton
                widthComponent="60px"
                widthSkeleton="30%"
                heightComponent="20px"
                outputRangeFinal={widthScreen / 3}
                style={{ marginTop: 20 }}
              />
              <Skeleton
                widthComponent="60px"
                widthSkeleton="30%"
                heightComponent="20px"
                outputRangeFinal={widthScreen / 3}
                style={{ marginTop: 20 }}
              />
            </View>
          </View>
          {index !== skeletons.length - 1 && <Divider />}
        </View>
      ))}
    </ScrollView>
  );
}

export function Repositories() {
  const [repositories, setRepositories] = useState([] as RepositoryData[]);
  const navigation = useNavigation();
  const { user } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const perPage = 8;

  useEffect(() => {
    setIsLoadingInitial(true);
    setLoadMore(true);
    fetchRepositories();
  }, []);

  async function fetchRepositories() {
    if (!loadMore) return;
    setIsLoading(true);
    await api
      .get(`/users/${user?.login}/repos?page=${page}&per_page=${perPage}`)
      .then((response) => {
        setTimeout(() => {
          setRepositories([...repositories, ...response.data]);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1f1f1f',
      },
      headerTitleAlign: 'center',
      title: 'Repos',
      headerTitle: `${user?.public_repos} Reposit??rios` || 'Reposit??rios',
    });
  }, []);

  return (
    <Container>
      {isLoadingInitial ? (
        <RepositorySkeleton />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: tabBarHeight }}
          data={repositories}
          renderItem={({ item, index }) => (
            <RenderRepository
              item={item}
              isLastItem={index === repositories.length - 1}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          onEndReached={fetchRepositories}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator load={isLoading} />}
        />
      )}
    </Container>
  );
}
