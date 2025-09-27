import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import HomeNavigator from './homeNav';
import GameNavigator from './gameNav';
import AnalyticsNavigator from './analyticsNav';
import UploadNavigator from './uploadNav';
import UserNavigator from './userNav';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Upload') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Games') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffffffff',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen 
        name="Games" 
        component={GameNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '300',
    color: '#666666',
  },
});