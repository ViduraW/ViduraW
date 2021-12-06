import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login';
import Home from './screens/home';
import Account from './screens/account';
import Device from './screens/device';
import AddUser from './screens/adduser';
import { useFonts } from 'expo-font';


const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "roboto-regular": require('./assets/fonts/roboto-regular.ttf'),
    "roboto-light": require('./assets/fonts/roboto-300.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>

      {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Device"
          component={Device}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{ headerShown: false }}
        /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}
