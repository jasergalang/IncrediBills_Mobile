import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from '../screens/settings/Settings'

const Stack = createNativeStackNavigator();
export default function SettingsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
