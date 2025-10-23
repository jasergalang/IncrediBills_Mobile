import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import BillCategories from '../screens/upload/billCategories';
import UploadBill from '../screens/upload/uploadBill';

const Stack = createStackNavigator();
export default function UploadNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen 
            name="BillCategories" 
            component={BillCategories} 
            options={{
                title: "Upload Your Bills",
                // headerShown: true,
            }}
            />

            <Stack.Screen 
            name="UploadBill" 
            component={UploadBill}
            />
        </Stack.Navigator>
    );
}
