import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/user/register'; 
import Login from './screens/user/login';
import Signup from './screens/user/signup';

const stack = createNativeStackNavigator();

export default function App() {
  
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" /> */}
    // </View>
    <NavigationContainer>
      <stack.Navigator initialRouteName='signup'>
        <stack.Screen name='Register' component={Register} options={{headerShown:false}} />
        <stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <stack.Screen name='Signup' component={Signup} options={{headerShown:false}} />
      </stack.Navigator>
    </NavigationContainer>
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
