import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../pages/Home';

const Stack = createNativeStackNavigator();

export default function MainRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={Home} />
    </Stack.Navigator>
  );
}
