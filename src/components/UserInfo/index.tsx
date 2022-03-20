import React from 'react';
import { View } from 'react-native';
import { Highligth } from '../Highlight/styles';
import { SectionTitle } from '../SectionTitle';
import {
  Container,
  ProfileInfo,
  ProfilePhoto,
  TextName,
  UserEmail,
  UserLocation,
  UserName,
} from './styles';

interface UserInfoProps {
  avatar: string;
  name: string;
  email: string;
  location: string;
}

export function UserInfo({ avatar, name, email, location }: UserInfoProps) {
  return (
    <Container>
      <ProfilePhoto source={{ uri: avatar }} />
      <ProfileInfo>
        <SectionTitle title={name} />
        <View style={{ marginLeft: 20 }}>
          <UserEmail>{email}</UserEmail>
          <UserLocation>{location}</UserLocation>
        </View>
      </ProfileInfo>
    </Container>
  );
}
