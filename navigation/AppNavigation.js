import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapNavPage, } from '../pages';
import { WelcomeScreen, SigninScreen, SignUpScreen, AuthCheck  } from '../screens';
import BottomNavigatorScreen from './BottomTabNavigator';
import { StatusBar } from 'expo-status-bar';



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'authcheck'}>
        <Stack.Screen options={{ headerShown: false }} name="authcheck" component={AuthCheck} />
        <Stack.Screen options={{ headerShown: false }} name="welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="signin" component={SigninScreen} />
        <Stack.Screen options={{ headerShown: false }} name="signup" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="bottomTab" component={BottomNavigatorScreen} />
        
        {/* Navigations Maps */}
        <Stack.Screen options={{ headerShown: false }} name="map" component={MapNavPage} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}