import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Games from '../screens/games/Games'

const Stack = createNativeStackNavigator()

export default function GameNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Games"
                component={Games}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}