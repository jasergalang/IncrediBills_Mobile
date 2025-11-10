// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Register from "./screens/user/register";
// import Login from "./screens/user/login";
// import Signup from "./screens/user/landing";
// import Toast from "react-native-toast-message";
// import { AuthProvider } from "./context/auth";
// import MainNavigator from "./navigators/MainNav";
// const Stack = createNativeStackNavigator();
// import { useAuth } from "./context/auth";
// import "./global.css";

// function AppWrapper() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Signup">
//         {isAuthenticated ? (
//           <Stack.Screen
//             name="MainNavigator"
//             component={MainNavigator}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <>
//             <Stack.Screen
//               name="Signup"
//               component={Signup}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Login"
//               component={Login}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Register"
//               component={Register}
//               options={{ headerShown: false }}
//             />
//           </>
//         )}
//       </Stack.Navigator>
//       <Toast />
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <AppWrapper />
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/user/Register";
import Login from "./screens/user/Login";
import Signup from "./screens/user/Landing";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./context/auth";
import MainNavigator from "./navigators/MainNav";
import "./global.css";

const Stack = createNativeStackNavigator();

function AppWrapper() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainNavigator">
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});