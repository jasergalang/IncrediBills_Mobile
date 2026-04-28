/*import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/user/register";
import Login from "./screens/user/login";
import Signup from "./screens/user/landing";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./context/auth";
import MainNavigator from "./navigators/mainNav";
import "./global.css";
import store from './redux/store';
import { Provider } from 'react-redux';
import IncrediBot from "./components/chatbot/IncrediBot";

const Stack = createNativeStackNavigator();

function AppWrapper() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? "MainNavigator" : "Signup"}>
          {isAuthenticated ? (
            <Stack.Screen
              name="MainNavigator"
              component={MainNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Signup"
                component={Signup}
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
            </>
          )}
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>

      {// 👇 Chatbot - Only show when authenticated }
      {isAuthenticated && <IncrediBot />}
    </>
  );
  // return (
  //   //   <NavigationContainer>
  //   //     <Stack.Navigator initialRouteName="MainNavigator">
  //   //       <Stack.Screen
  //   //         name="MainNavigator"
  //   //         component={MainNavigator}
  //   //         options={{ headerShown: false }}
  //   //       />
  //   //     </Stack.Navigator>
  //   //     <Toast />
  //   //   </NavigationContainer>
  //   // );
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName={isAuthenticated ? "MainNavigator" : "Signup"}>
  //       {isAuthenticated ? (
  //         <Stack.Screen
  //           name="MainNavigator"
  //           component={MainNavigator}
  //           options={{ headerShown: false }}
  //         />
  //       ) : (
  //         <>
  //           <Stack.Screen
  //             name="Signup"
  //             component={Signup}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="Login"
  //             component={Login}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="Register"
  //             component={Register}
  //             options={{ headerShown: false }}
  //           />
  //         </>
  //       )}
  //     </Stack.Navigator>
  //     <Toast />
  //   </NavigationContainer>
  // );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
}); */


import { registerRootComponent } from 'expo';
import { Text, View } from 'react-native';
import './global.css';

function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello</Text>
    </View>
  );
}

export default App;
