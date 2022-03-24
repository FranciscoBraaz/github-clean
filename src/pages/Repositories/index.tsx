import React, { useEffect, useState } from 'react';
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

interface RepositoryData {
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

export function Repositories() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      await api
        .get(
          'https://api.github.com/users/FranciscoBraaz/repos?page=3&per_page=5',
        )
        .then((response) => {
          setRepositories(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    getRepositories();
  }, []);

  return (
    <Container>
      <FlatList data={repositories} renderItem={renderRepository} />
    </Container>
  );
}
