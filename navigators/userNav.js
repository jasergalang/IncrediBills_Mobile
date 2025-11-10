import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Login from "../screens/user/Login";
import Register from "../screens/user/Register";
import Landing from "../screens/user/Landing";
import Logout from "../screens/user/Logout";
import Profile from "../screens/user/Profile";

export default function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="logout"
        component={Logout}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>

  );
}
