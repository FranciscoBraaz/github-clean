import React from 'react';
import { Text, View } from 'react-native';
import { SectionTitle } from '../SectionTitle';
import { Contianer } from './styles';

interface BioProps {
  bio: string;
}

export function Bio({ bio }: BioProps) {
  return (
    <Contianer>
      <SectionTitle title="Bio" />
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Text style={{ fontSize: 16, color: '#fff' }}>{bio}</Text>
      </View>
    </Contianer>
  );
}
