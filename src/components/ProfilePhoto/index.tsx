import React from 'react';
import { Avatar } from './styles';

interface ProfilePhotoProps {
  avatar: string;
}

export function ProfilePhoto({ avatar }: ProfilePhotoProps) {
  return <Avatar source={{ uri: avatar }} />;
}
