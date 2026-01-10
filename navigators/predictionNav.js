import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Prediction from '../screens/prediction/Prediction'

const Stack = createNativeStackNavigator();
export default function PredictionNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Prediction"
                component={Prediction}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
