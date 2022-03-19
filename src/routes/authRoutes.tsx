import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../pages/Login';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginStack"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
