import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import uploadNav from './uploadNav';
import gameNav from './gameNav';
import analyticsNav from './analyticsNav';
import userNav from './userNav';
import homeNav from './homeNav';

const Tab = createBottomTabNavigator();

export default function mainNav() {
  return (
    <div>mainNav</div>
  )
}
