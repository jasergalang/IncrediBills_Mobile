import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
const Stack = createStackNavigator();
import Login from '../screens/user/login';
import Register from '../screens/user/register';
import Signup from '../screens/user/signup';
import Profile from '../screens/user/profile';
export default function UserNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name='signup' 
        component={Signup} 
        options={{headerShown:false}} 
        />

        <Stack.Screen 
        name='login' 
        component={Login} 
        options={{headerShown:false}} 
        />

        <Stack.Screen 
        name='register' 
        component={Register} 
        options={{headerShown:false}} 
        /> 

        <Stack.Screen 
        name='profile' 
        component={Profile} 
        options={{headerShown:false}} 
        />
    </Stack.Navigator>
    // <View>
    //   <Text>User Navigator</Text>
    // </View>
  )
}
