import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
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
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

interface RepositoryData {
  id: number;
  name: string;
  description: string;
  visibility: string;
  stargazers_count: number;
}

interface RenderRepositoryProps {
  item: RepositoryData;
}

function renderRepository({ item }: RenderRepositoryProps) {
  return (
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
  );
}

function LoadingIndicator({ load }: { load: boolean }) {
  if (!load) return null;
  return (
    <View>
      <BarIndicator color="#ffce00" size={28} />
    </View>
  );
}

export function Repositories() {
  const [repositories, setRepositories] = useState([] as RepositoryData[]);
  const navigation = useNavigation();
  const { user } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const perPage = 8;

  useEffect(() => {
    fetchRepositories();
  }, []);

  async function fetchRepositories() {
    if (!loadMore) return;
    setIsLoading(true);
    await api
      .get(
        `https://api.github.com/users/FranciscoBraaz/repos?page=${page}&per_page=${perPage}`,
      )
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
      headerTitle: `${user?.public_repos} Repositórios` || 'Repositórios',
    });
  }, []);

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 10 }}
        data={repositories}
        renderItem={renderRepository}
        keyExtractor={(item) => String(item.id)}
        onEndReached={fetchRepositories}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<LoadingIndicator load={isLoading} />}
      />
    </Container>
  );
}
