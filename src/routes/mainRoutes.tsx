import React, { ComponentType } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/Home';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Repositories } from '../pages/Repositories';
import { Following } from '../pages/Following';

interface TabData {
  iconName: string;
}

interface IconProps {
  tab: TabData;
  tabInfo: {
    focused: boolean;
  };
}

const tabs = [
  {
    name: 'HomeTab',
    title: 'Home',
    iconName: 'home-outline',
    componentRender: Home,
  },
  {
    name: 'RepositoriesTab',
    title: 'Repos',
    iconName: 'home-outline',
    componentRender: Repositories,
  },
  {
    name: 'FollowersTab',
    title: 'Seguidores',
    iconName: 'people-outline',
    componentRender: Home,
  },
  {
    name: 'FollowingTab',
    title: 'Seguindo',
    iconName: 'people-outline',
    componentRender: Following,
  },
];

const Tab = createBottomTabNavigator();

function IoniconsComponent({ tab, tabInfo }: IconProps) {
  return (
    <Ionicons
      //@ts-ignore
      name={tab.iconName}
      size={24}
      color={tabInfo.focused ? '#000' : '#969696'}
    />
  );
}

function FatherComponent({ tab, tabInfo }: IconProps) {
  return (
    <Feather
      name="github"
      size={24}
      color={tabInfo.focused ? '#000' : '#969696'}
    />
  );
}

export default function MainRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.componentRender}
          options={{
            headerShown: index !== 0,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#969696',
            title: `${tab.title}`,
            tabBarIcon: (tabInfo) => {
              if (index !== 1) {
                return <IoniconsComponent tab={tab} tabInfo={tabInfo} />;
              } else {
                return <FatherComponent tab={tab} tabInfo={tabInfo} />;
              }
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
