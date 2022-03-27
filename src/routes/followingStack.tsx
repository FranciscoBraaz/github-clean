import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '../pages/Profile';
import { Following } from '../pages/Following';

const Stack = createNativeStackNavigator();

export default function FollowingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FollowingListing" component={Following} />
      <Stack.Screen
        name="ProfileFollowing"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
