import React from 'react';
import { Text, View } from 'react-native';
import {
  Container,
  ContainerChangeProfile,
  ContainerLogout,
  Username,
} from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useAuth, UserData } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface HeaderProfilePrpos {
  username: string;
  ownerProfile: boolean;
  user?: UserData;
}

function Logout() {
  const { logout } = useAuth();

  return (
    <ContainerLogout onPress={logout}>
      <Text style={{ color: '#fff', fontSize: 16, marginRight: 5 }}>Sair</Text>
      <MaterialCommunityIcons name="logout" size={24} color="#2c3e50" />
    </ContainerLogout>
  );
}

interface ChangeProfileProps {
  userData: UserData;
}

function ChangeProfile({ userData }: ChangeProfileProps) {
  const { changeProfile } = useAuth();
  const navigation = useNavigation();

  async function handleChangeProfile() {
    await changeProfile(userData);
    //@ts-ignore
    navigation.reset({
      index: 0,
      //@ts-ignore
      routes: [{ name: 'HomeTab' }],
    });
  }

  return (
    <ContainerChangeProfile onPress={handleChangeProfile}>
      <Text style={{ color: '#fff', fontSize: 16, marginRight: 5 }}>
        Trocar
      </Text>
      <MaterialIcons name="loop" size={24} color="#ffce00" />
    </ContainerChangeProfile>
  );
}

export function HeaderProfile({
  username,
  ownerProfile,
  user,
}: HeaderProfilePrpos) {
  const navigation = useNavigation();
  return (
    <Container>
      {!ownerProfile && (
        <View style={{ width: 60 }}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
      <Username style={!ownerProfile ? { flex: 1, textAlign: 'center' } : {}}>
        #{username}
      </Username>
      <View style={{ width: 60 }}>
        {!ownerProfile && user ? <ChangeProfile userData={user} /> : <Logout />}
      </View>
    </Container>
  );
}
