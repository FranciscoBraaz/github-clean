import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '../pages/Profile';
import { Followers } from '../pages/Followers';

const Stack = createNativeStackNavigator();

export default function FollowersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FollowersListing" component={Followers} />
      <Stack.Screen
        name="ProfileFollower"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
