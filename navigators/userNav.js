import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
const Stack = createStackNavigator();
import Login from '../screens/user/login';
import Register from '../screens/user/register';
import Signup from '../screens/user/signup';

export default function userNav() {
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
    </Stack.Navigator>
  )
}
