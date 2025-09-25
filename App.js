import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/user/register';
import Login from './screens/user/login';
import Signup from './screens/user/signup';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/auth';

const stack = createNativeStackNavigator();

function AppWrapper() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" /> */}
    // </View>
    <NavigationContainer>
      <stack.Navigator initialRouteName='Signup'>
        <stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      </stack.Navigator>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
