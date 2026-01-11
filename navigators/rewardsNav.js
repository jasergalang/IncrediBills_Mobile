import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Rewards from '../screens//rewards/Rewards'

const Stack = createNativeStackNavigator();
export default function RewardsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Rewards"
                component={Rewards}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
